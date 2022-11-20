import { defineStore } from "pinia";
import { LadderLeague, LadderTournament } from "./types";

type LadderState = Record<LadderLeague, LadderTournament | null>;

export const useStore = defineStore("ladder", {
  state: (): LadderState => ({
    beginner: null,
    expert: null,
  }),

  actions: {
    async fetchLadder(league: LadderLeague) {
      const response = await fetch(`/.netlify/functions/${league}-ladder`);
      if (response.status >= 400) {
        throw new Error("HTTP Error (" + response.status + ")");
      }
      this[league] = (await response.json()) as LadderTournament;
    },

    fetchExpertLadder() {
      return this.fetchLadder(LadderLeague.EXPERT);
    },

    fetchBeginnerLadder() {
      return this.fetchLadder(LadderLeague.BEGINNER);
    },
  },
});
