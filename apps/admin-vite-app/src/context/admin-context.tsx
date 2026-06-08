import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  AboutData,
  AdminState,
  BannerData,
  Collection,
  CollectionItemMap,
  CollectionKey,
  ContactCtaData,
  FooterData,
  HeaderData,
  LayoutSection,
  LayoutSectionKey,
  ThemedSection,
} from "@/types";
import { INITIAL_STATE } from "@/data/mock-data";

type Action =
  | { type: "SET_BANNER"; payload: BannerData }
  | { type: "SET_HEADER"; payload: HeaderData }
  | { type: "SET_ABOUT"; payload: AboutData }
  | { type: "SET_CONTACT_CTA"; payload: ContactCtaData }
  | { type: "SET_FOOTER"; payload: FooterData }
  | { type: "SET_SECTION_CONFIG"; section: CollectionKey; payload: ThemedSection }
  | {
      type: "ADD_ITEM";
      section: CollectionKey;
      payload: CollectionItemMap[CollectionKey];
    }
  | {
      type: "UPDATE_ITEM";
      section: CollectionKey;
      payload: CollectionItemMap[CollectionKey];
    }
  | { type: "DELETE_ITEM"; section: CollectionKey; id: string }
  | { type: "SET_LAYOUT"; payload: LayoutSection[] }
  | { type: "TOGGLE_SECTION"; key: LayoutSectionKey };

function reducer(state: AdminState, action: Action): AdminState {
  switch (action.type) {
    case "SET_BANNER":
      return { ...state, banner: action.payload };
    case "SET_HEADER":
      return { ...state, header: action.payload };
    case "SET_ABOUT":
      return { ...state, about: action.payload };
    case "SET_CONTACT_CTA":
      return { ...state, contactCta: action.payload };
    case "SET_FOOTER":
      return { ...state, footer: action.payload };
    case "SET_SECTION_CONFIG":
      return {
        ...state,
        [action.section]: { ...state[action.section], config: action.payload },
      };
    case "ADD_ITEM":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          items: [...state[action.section].items, action.payload],
        },
      } as AdminState;
    case "UPDATE_ITEM":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          items: state[action.section].items.map((item) =>
            item.id === action.payload.id ? action.payload : item,
          ),
        },
      } as AdminState;
    case "DELETE_ITEM":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          items: state[action.section].items.filter((item) => item.id !== action.id),
        },
      } as AdminState;
    case "SET_LAYOUT":
      return { ...state, layout: action.payload };
    case "TOGGLE_SECTION":
      return {
        ...state,
        layout: state.layout.map((entry) =>
          entry.key === action.key
            ? { ...entry, visible: !entry.visible }
            : entry,
        ),
      };
    default:
      return state;
  }
}

interface AdminContextValue {
  state: AdminState;
  dispatch: React.Dispatch<Action>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

function useAdminContext(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within <AdminProvider>");
  return ctx;
}

/* ────────────────────────────────────────────────────────────
 *  Domain hooks — pages depend on these, not the reducer shape.
 * ──────────────────────────────────────────────────────────── */

export function useBanner() {
  const { state, dispatch } = useAdminContext();
  const save = useCallback(
    (payload: BannerData) => dispatch({ type: "SET_BANNER", payload }),
    [dispatch],
  );
  return { data: state.banner, save };
}

export function useHeader() {
  const { state, dispatch } = useAdminContext();
  const save = useCallback(
    (payload: HeaderData) => dispatch({ type: "SET_HEADER", payload }),
    [dispatch],
  );
  return { data: state.header, save };
}

export function useAbout() {
  const { state, dispatch } = useAdminContext();
  const save = useCallback(
    (payload: AboutData) => dispatch({ type: "SET_ABOUT", payload }),
    [dispatch],
  );
  return { data: state.about, save };
}

export function useContactCta() {
  const { state, dispatch } = useAdminContext();
  const save = useCallback(
    (payload: ContactCtaData) => dispatch({ type: "SET_CONTACT_CTA", payload }),
    [dispatch],
  );
  return { data: state.contactCta, save };
}

export function useFooter() {
  const { state, dispatch } = useAdminContext();
  const save = useCallback(
    (payload: FooterData) => dispatch({ type: "SET_FOOTER", payload }),
    [dispatch],
  );
  return { data: state.footer, save };
}

export function useLayout() {
  const { state, dispatch } = useAdminContext();
  const reorder = useCallback(
    (payload: LayoutSection[]) => dispatch({ type: "SET_LAYOUT", payload }),
    [dispatch],
  );
  const toggle = useCallback(
    (key: LayoutSectionKey) => dispatch({ type: "TOGGLE_SECTION", key }),
    [dispatch],
  );
  return { layout: state.layout, reorder, toggle };
}

export interface CollectionApi<K extends CollectionKey> {
  config: ThemedSection;
  items: CollectionItemMap[K][];
  saveConfig: (config: ThemedSection) => void;
  add: (item: CollectionItemMap[K]) => void;
  update: (item: CollectionItemMap[K]) => void;
  remove: (id: string) => void;
}

export function useCollection<K extends CollectionKey>(section: K): CollectionApi<K> {
  const { state, dispatch } = useAdminContext();
  const slice = state[section] as Collection<ThemedSection, CollectionItemMap[K]>;

  const saveConfig = useCallback(
    (config: ThemedSection) =>
      dispatch({ type: "SET_SECTION_CONFIG", section, payload: config }),
    [dispatch, section],
  );
  const add = useCallback(
    (item: CollectionItemMap[K]) =>
      dispatch({ type: "ADD_ITEM", section, payload: item }),
    [dispatch, section],
  );
  const update = useCallback(
    (item: CollectionItemMap[K]) =>
      dispatch({ type: "UPDATE_ITEM", section, payload: item }),
    [dispatch, section],
  );
  const remove = useCallback(
    (id: string) => dispatch({ type: "DELETE_ITEM", section, id }),
    [dispatch, section],
  );

  return {
    config: slice.config,
    items: slice.items,
    saveConfig,
    add,
    update,
    remove,
  };
}

export function useAdminState(): AdminState {
  return useAdminContext().state;
}
