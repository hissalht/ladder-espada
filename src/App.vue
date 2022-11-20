<script lang="ts"></script>

<script setup lang="ts">
import { onMounted } from "vue";
import ParticipantRow from "./components/ParticipantRow.vue";
import { useStore } from "./store";

const store = useStore();

onMounted(() => {
  store.fetchBeginnerLadder();
});
</script>

<template>
  <div v-if="store.beginner" class="container">
    <ol class="participants">
      <li
        v-for="(participant, i) in store.beginner.participants"
        :key="participant.id"
      >
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
