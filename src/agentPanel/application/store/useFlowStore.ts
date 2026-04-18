import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import type { FlowActions, FlowState } from "../../domain/store/flow.types";
import { Gender } from "../../domain/types/gender";
import { Status } from "../../domain/types/status";

export const useFlowStore = create<FlowState & FlowActions>()(
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
