<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "../store";
import { LadderLeague } from "../types";
import Leaderboard from "../components/Leaderboard.vue";

const props = defineProps<{
  league: LadderLeague;
}>();

const store = useStore();

onMounted(() => {
  store.fetchLadderIfNeeded(props.league);
});

// Refetch ladder when the league in the URL changes
watch(
  () => props.league,
  () => {
    store.fetchLadderIfNeeded(props.league);
  }
);

const tournament = computed(() => store[props.league]);
</script>

<template>
  <div v-if="tournament" class="container">
    <Leaderboard :participants="tournament.participants" :league="league" />
  </div>
</template>

<style scoped>
.container {
  max-width: 52rem;
  margin: auto;
}
</style>
