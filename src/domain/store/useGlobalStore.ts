import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { GlobalState, GlobalActions } from "./types";
import { Status } from "../types/status";
import { Gender } from "../types/gender";

export const useGlobalStore = create<GlobalState & GlobalActions>()(
  immer((set) => ({
    currentCategory: "REBOOKING",
    values: { gender: Gender.FEMALE },
    status: Status.IN_PROGRESS,
    logs: [],
    copiedScripts: [],
    completedChecklistIds: [],

    setAsCopiedScript: (id) =>
      set((state) => {
        if (!state.copiedScripts.includes(id)) {
          state.copiedScripts.push(id);
        }
      }),

    setCategory: (category) =>
      set((state) => {
        state.currentCategory = category;
      }),

    updateValue: (id, value) =>
      set((state) => {
        state.values[id] = value;
      }),

    resetStore: () =>
      set((state) => {
        state.values = {};
        state.logs = [];
        state.currentCategory = "REBOOKING";
      }),
  })),
);
