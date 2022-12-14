<script lang="ts" setup>
import { LadderLeague, Participant } from "../types";
import { bleachify } from "../utils";

defineProps<{
  participant: Participant;
  rank: number;
  large: boolean;
  league: LadderLeague;
}>();
</script>
<template>
  <div class="participant" :class="[{ large }, league]">
    <div class="rank">{{ rank }}</div>

    <div class="character">
      <img
        v-if="participant.character"
        :alt="participant.character"
        :src="`/characters/${participant.character}.webp`"
        class="character-portrait"
      />
      <template v-else>
        <span aria-hidden="true">???</span>
      </template>
    </div>

    <div class="name" v-html="bleachify(participant.name)" />

    <div class="won">
      {{ participant.wonMatches }}
    </div>

    <div class="lost">
      {{ participant.lostMatches }}
    </div>
  </div>
</template>

<style scoped>
.participant {
  --participant-base-size: 3rem;
  --participant-color: var(--expert-red);

  display: grid;
  grid-template-columns:
    var(--participant-base-size)
    calc(2 * var(--participant-base-size))
    1fr
    repeat(3, var(--participant-base-size));
  grid-template-rows: var(--participant-base-size);
  gap: 0.25rem;

  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 900;
}

.participant.large {
  grid-template-rows: calc(2 * var(--participant-base-size));
}

.participant.beginner {
  --participant-color: var(--beginner-blue);
}

.rank,
.character,
.name,
.won,
.lost {
  background-color: var(--participant-color);
  display: flex;
  color: white;
  align-items: center;
  padding: 0 0.5rem;
}

.rank,
.character,
.won,
.lost {
  justify-content: center;
}

.character {
  padding: 0;
  position: relative;
}

.character-portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.character::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: var(--participant-color);
  opacity: 0.5;
}
</style>
