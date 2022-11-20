<script lang="ts" setup>
import { LadderLeague, Participant } from "../types";
import ParticipantRow from "./ParticipantRow.vue";

defineProps<{
  participants: Participant[];
  league: LadderLeague;
}>();
</script>

<template>
  <div class="header" :class="league" aria-hidden="true">
    <div class="rank">Rank</div>
    <div class="character">Main</div>
    <div class="name">Player</div>
    <div class="won">Won</div>
    <div class="lost">Lost</div>
  </div>

  <ol class="participants">
    <li v-for="(participant, i) in participants" :key="participant.id">
      <ParticipantRow
        :participant="participant"
        :rank="i + 1"
        :large="i < 4"
        :league="league"
      />
    </li>
  </ol>
</template>

<style scoped>
.header {
  --participant-base-size: 3rem;
  --participant-color: var(--expert-red);

  display: grid;
  grid-template-columns:
    var(--participant-base-size)
    calc(2 * var(--participant-base-size))
    1fr
    repeat(3, var(--participant-base-size));
  height: calc(0.5 * var(--participant-base-size));
  gap: 0.25rem;

  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
}

.header.beginner {
  --participant-color: var(--beginner-blue);
}

.header > * {
  background-color: var(--participant-color);
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
}

.header .name {
  justify-content: flex-start;
  padding: 0 0.5rem;
}

.participants {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0.25rem;
}

.participants > * + * {
  margin-top: 0.25rem;
}
</style>
