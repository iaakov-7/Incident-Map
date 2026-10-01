import { create } from "zustand";
import type { IncidentsStore } from "../types";

export const useIncidentsStore = create<IncidentsStore>((set) => ({
  incidents: [],
  setIncidents: (incidents) =>
    set({
      incidents: incidents,
    }),
  addIncident: (newIncident) =>
    set((state) => ({ incidents: [...state.incidents, newIncident] })),
  updateIncident: (toUpdate) =>
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc._id === toUpdate._id ? toUpdate : inc,
      ),
    })),
  removeIncident: (id) =>
    set((state) => ({
      incidents: state.incidents.filter((inc) => inc._id !== id),
    })),
}));
