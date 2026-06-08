import { createContext, useContext, useReducer, type ReactNode } from "react";
import type {
  AdminState,
  HighlightVideo,
  ReelItem,
  FilmItem,
  AboutData,
  SectionConfig,
  FooterData,
} from "@/types";
import { INITIAL_STATE } from "@/data/mock-data";

type Action =
  | { type: "UPDATE_ABOUT"; payload: AboutData }
  | { type: "UPDATE_HIGHLIGHTS_CONFIG"; payload: SectionConfig }
  | { type: "ADD_HIGHLIGHT"; payload: HighlightVideo }
  | { type: "UPDATE_HIGHLIGHT"; payload: HighlightVideo }
  | { type: "DELETE_HIGHLIGHT"; payload: string }
  | { type: "UPDATE_REELS_CONFIG"; payload: SectionConfig }
  | { type: "ADD_REEL"; payload: ReelItem }
  | { type: "UPDATE_REEL"; payload: ReelItem }
  | { type: "DELETE_REEL"; payload: string }
  | { type: "UPDATE_FILMS_CONFIG"; payload: SectionConfig }
  | { type: "ADD_FILM"; payload: FilmItem }
  | { type: "UPDATE_FILM"; payload: FilmItem }
  | { type: "DELETE_FILM"; payload: string }
  | { type: "UPDATE_FOOTER"; payload: FooterData };

function adminReducer(state: AdminState, action: Action): AdminState {
  switch (action.type) {
    case "UPDATE_ABOUT":
      return { ...state, about: action.payload };
    case "UPDATE_HIGHLIGHTS_CONFIG":
      return { ...state, highlights: { ...state.highlights, config: action.payload } };
    case "ADD_HIGHLIGHT":
      return { ...state, highlights: { ...state.highlights, items: [...state.highlights.items, action.payload] } };
    case "UPDATE_HIGHLIGHT":
      return { ...state, highlights: { ...state.highlights, items: state.highlights.items.map((i) => (i.id === action.payload.id ? action.payload : i)) } };
    case "DELETE_HIGHLIGHT":
      return { ...state, highlights: { ...state.highlights, items: state.highlights.items.filter((i) => i.id !== action.payload) } };
    case "UPDATE_REELS_CONFIG":
      return { ...state, reels: { ...state.reels, config: action.payload } };
    case "ADD_REEL":
      return { ...state, reels: { ...state.reels, items: [...state.reels.items, action.payload] } };
    case "UPDATE_REEL":
      return { ...state, reels: { ...state.reels, items: state.reels.items.map((i) => (i.id === action.payload.id ? action.payload : i)) } };
    case "DELETE_REEL":
      return { ...state, reels: { ...state.reels, items: state.reels.items.filter((i) => i.id !== action.payload) } };
    case "UPDATE_FILMS_CONFIG":
      return { ...state, films: { ...state.films, config: action.payload } };
    case "ADD_FILM":
      return { ...state, films: { ...state.films, items: [...state.films.items, action.payload] } };
    case "UPDATE_FILM":
      return { ...state, films: { ...state.films, items: state.films.items.map((i) => (i.id === action.payload.id ? action.payload : i)) } };
    case "DELETE_FILM":
      return { ...state, films: { ...state.films, items: state.films.items.filter((i) => i.id !== action.payload) } };
    case "UPDATE_FOOTER":
      return { ...state, footer: action.payload };
    default:
      return state;
  }
}

interface AdminContextType {
  state: AdminState;
  dispatch: React.Dispatch<Action>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, INITIAL_STATE);
  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
