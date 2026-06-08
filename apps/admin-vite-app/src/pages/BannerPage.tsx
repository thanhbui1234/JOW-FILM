import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Film } from "lucide-react";
import { useBanner } from "@/context/admin-context";
import { PageContainer } from "@/components/composite/PageContainer";
import { SectionCard } from "@/components/composite/SectionCard";
import { FormField } from "@/components/composite/FormField";
import { SaveBar } from "@/components/composite/SaveBar";
import { Input } from "shared-ui";
import type { BannerData } from "@/types";

export function BannerPage() {
  const { data, save } = useBanner();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<BannerData>({ defaultValues: data });

  useEffect(() => reset(data), [data, reset]);

  const submit = handleSubmit((values) => {
    save(values);
    reset(values);
  });

  const videoSrc = watch("videoSrc");
  const logoSrc = watch("logoSrc");

  return (
    <form onSubmit={submit}>
      <PageContainer
        title="Hero Banner"
        description="The fullscreen video on the homepage, plus the centred logo overlay."
      >
        <SectionCard
          icon={<Film className="h-4 w-4" />}
          title="Media"
          description="Paths are resolved from /public in the user app."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Video source" htmlFor="banner-video">
              <Input
                id="banner-video"
                placeholder="/images/demo/banner.mp4"
                {...register("videoSrc")}
              />
            </FormField>
            <FormField label="Logo source" htmlFor="banner-logo">
              <Input
                id="banner-logo"
                placeholder="/images/logo-white-slogan.png"
                {...register("logoSrc")}
              />
            </FormField>
            <FormField label="Logo alt text" htmlFor="banner-alt">
              <Input id="banner-alt" {...register("logoAlt")} />
            </FormField>
            <FormField
              label="Scroll button label"
              htmlFor="banner-scroll"
              hint="Used as an aria-label for the chevron at the bottom of the hero."
            >
              <Input id="banner-scroll" {...register("scrollLabel")} />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard
          icon={<Film className="h-4 w-4" />}
          title="Preview"
          description="Live preview of the current asset paths."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Video
              </p>
              <div className="aspect-video overflow-hidden rounded-lg border bg-black">
                {videoSrc ? (
                  <video
                    key={videoSrc}
                    src={videoSrc}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    No video set
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Logo
              </p>
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border bg-stone-900">
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt="Banner logo preview"
                    className="max-h-[70%] max-w-[70%] object-contain"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">No logo set</span>
                )}
              </div>
            </div>
          </div>
        </SectionCard>

        <SaveBar
          isDirty={isDirty}
          onSave={submit}
          onReset={() => reset(data)}
          saveLabel="Save banner"
        />
      </PageContainer>
    </form>
  );
}
