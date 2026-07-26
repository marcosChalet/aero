import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Gender } from "../../domain/types/gender";
import { Status } from "../../domain/types/status";
import type { FlowActions, FlowState } from "../../domain/types/flow.types";
import { mockDbResponseLATAM } from "../../../../app/mock.agent";

const getInitialState = () => {
  const context: Record<string, boolean> = {};

  mockDbResponseLATAM.map((item) => {
    item.alerts.forEach((alert) => {
      context[alert.id] = false;
    });

    item.scripts.forEach((script) => {
      context[script.id] = false;
    });
    item.inputs.forEach((input) => {
      context[input.id] = false;
    });
  });

  return context;
};

export const useFlowStore = create<FlowState & FlowActions>()(
  immer((set) => ({
    currentCategory: "account",
    values: { gender: Gender.FEMALE },
    context: getInitialState(),
    status: Status.IN_PROGRESS,
    logs: [],
    copiedScripts: [],
    completedChecklistIds: [],

    updateContext: (key, value) =>
      set((state) => {
        state.context[key.value] = value;
      }),

    setAsCopiedScript: (id) =>
      set((state) => {
        if (!state.copiedScripts.includes(id.value)) {
          state.copiedScripts.push(id.value);
        }
      }),

    setCategory: (category) =>
      set((state) => {
        state.currentCategory = category;
      }),

    updateValue: (id, value) =>
      set((state) => {
        state.values[id.value] = value;
      }),

    resetStore: () =>
      set((state) => {
        state.values = {};
        state.logs = [];
        state.currentCategory = "REBOOKING";
      }),
  })),
);
