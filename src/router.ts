import { createRouter, createWebHistory } from "vue-router";

import LeaderBoardPage from "./pages/LeaderBoardPage.vue";
import { LadderLeague } from "./types";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/expert",
      component: LeaderBoardPage,
      props: {
        league: LadderLeague.EXPERT,
      },
    },
    {
      path: "/beginner",
      component: LeaderBoardPage,
      props: {
        league: LadderLeague.BEGINNER,
      },
    },
    {
      path: "/",
      redirect: "/expert",
    },
  ],
});
