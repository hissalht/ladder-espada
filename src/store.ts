import { defineStore } from "pinia";
import { LadderLeague, LadderTournament } from "./types";

type LadderState = Record<LadderLeague, LadderTournament | null>;

export const useStore = defineStore("ladder", {
  state: (): LadderState => ({
    [LadderLeague.BEGINNER]: null,
    [LadderLeague.EXPERT]: null,
  }),

  actions: {
    async fetchLadder(league: LadderLeague) {
      const response = await fetch(`/.netlify/functions/${league}-ladder`);
      if (response.status >= 400) {
        throw new Error("HTTP Error (" + response.status + ")");
      }
      this[league] = (await response.json()) as LadderTournament;
    },

    async fetchLadderIfNeeded(league: LadderLeague) {
      if (!this[league]) {
        await this.fetchLadder(league);
      }
    },
  },
});
