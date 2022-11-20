<script lang="ts"></script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Participant, Character } from "./types";
import ParticipantRow from "./components/ParticipantRow.vue";

const TOURNAMENT_SLUG = "LadderEspadaD1";

const tournament = ref();

const participants = ref<Participant[]>();

onMounted(async () => {
  const response = await fetch(
    `/.netlify/functions/tournament?tournament=${TOURNAMENT_SLUG}`
  );
  const data = await response.json();
  tournament.value = data.tournament;

  console.log(data.tournament.participants);

  const tempParticipants: Participant[] = data.tournament.participants.map(
    ({ participant }: any) => ({
      id: participant.id,
      name: participant.name,
      character: Character.SOL,
      wonMatches: 0,
      lostMatches: 0,
      points: 0,
    })
  );

  // parse participants
  data.tournament.matches.forEach(({ match }: any) => {
    const winnerPlayer = tempParticipants.find((p) => p.id === match.winner_id);
    if (winnerPlayer) {
      winnerPlayer.wonMatches++;
    }

    const loserPlayer = tempParticipants.find((p) => p.id === match.loser_id);
    if (loserPlayer) {
      loserPlayer.lostMatches++;
    }
  });

  // sort participants, most wins first
  tempParticipants.sort((a, b) => {
    if (a.wonMatches !== b.wonMatches) {
      return b.wonMatches - a.wonMatches;
    }
    if (a.lostMatches !== b.lostMatches) {
      return a.lostMatches - b.lostMatches;
    }
    if (a.points !== b.points) {
      return a.points - b.points;
    }
    return 0;
  });

  participants.value = tempParticipants;
});
</script>

<template>
  <div v-if="tournament" class="container">
    <ol class="participants">
      <li v-for="(participant, i) in participants" :key="participant.id">
        <ParticipantRow
          :participant="participant"
          :rank="i + 1"
          :large="i < 4"
        />
      </li>
    </ol>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap");

:root {
  --green: #5f9b42;
  --red: #d84035;
  font-family: "Lato", sans-serif;
}
</style>

<style scoped>
.container {
  max-width: 52rem;
  margin: auto;
}
.participants {
  list-style: none;
}

.participants > * + * {
  margin-top: 0.25rem;
}
</style>
