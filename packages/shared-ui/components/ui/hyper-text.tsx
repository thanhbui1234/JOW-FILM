import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
} from "react"
import {
  AnimatePresence,
  motion,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from "motion/react"

import { cn } from "../../lib/utils"

type CharacterSet = string[] | readonly string[]

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>
type HyperTextMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"div">, "ref"> & RefAttributes<HTMLElement>
>

interface HyperTextProps extends Omit<MotionProps, "children"> {
  /** The text content to be animated */
  children: string
  /** Optional className for styling */
  className?: string
  /** Duration of the animation in milliseconds */
  duration?: number
  /** Delay before animation starts in milliseconds */
  delay?: number
  /** Component to render as - defaults to div */
  as?: MotionElementType
  /** Whether to start animation when element comes into view */
  startOnView?: boolean
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet
  /**
   * When true, parses a leading number from `children` (e.g. "200+", "98%")
   * and animates a counter from 0 to that number, appending any suffix.
   * The scramble effect is disabled in this mode.
   */
  countUp?: boolean
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
) as readonly string[]

const getRandomInt = (max: number): number => Math.floor(Math.random() * max)

/** Easing function: ease-out cubic */
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

/** Parse leading numeric part and the trailing suffix from a string, e.g. "200+" -> { value: 200, suffix: "+" } */
const parseCountValue = (
  text: string
): { value: number; suffix: string } | null => {
  const match = text.match(/^(\d+(?:\.\d+)?)(.*)/)
  if (!match) return null
  return { value: parseFloat(match[1]), suffix: match[2] }
}

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  countUp = false,
  ...props
}: HyperTextProps) {
  const MotionComponent = motionElements[Component] as HyperTextMotionComponent

  // --- countUp mode state ---
  const parsedCount = countUp ? parseCountValue(children) : null
  const [countDisplay, setCountDisplay] = useState<string>(
    parsedCount ? `0${parsedCount.suffix}` : children
  )

  // --- scramble mode state ---
  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split("")
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const iterationCount = useRef(0)
  const elementRef = useRef<HTMLElement | null>(null)

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0
      setIsAnimating(true)
    }
  }

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true)
      }, delay)
      return () => clearTimeout(startTimeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, startOnView])

  // Handle countUp animation
  useEffect(() => {
    if (!countUp || !parsedCount || !isAnimating) return

    let animationFrameId: number | null = null
    const startTime = performance.now()
    const targetValue = parsedCount.value
    const suffix = parsedCount.suffix

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress)
      const current = Math.round(easedProgress * targetValue)

      setCountDisplay(`${current}${suffix}`)

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCountDisplay(`${targetValue}${suffix}`)
        setIsAnimating(false)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, countUp, duration])

  // Handle scramble animation
  useEffect(() => {
    if (countUp) return

    let animationFrameId: number | null = null

    if (isAnimating) {
      const maxIterations = children.length
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        iterationCount.current = progress * maxIterations

        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
                ? children[index]
                : characterSet[getRandomInt(characterSet.length)]
          )
        )

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [children, duration, isAnimating, characterSet, countUp])

  // --- countUp render ---
  if (countUp && parsedCount) {
    return (
      <MotionComponent
        ref={elementRef}
        className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
        {...props}
      >
        {countDisplay}
      </MotionComponent>
    )
  }

  // --- scramble render ---
  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={index}
            className={cn("font-mono", letter === " " ? "w-3" : "")}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  )
}
