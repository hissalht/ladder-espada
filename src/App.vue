<template>
  <nav class="navigation">
    <RouterLink class="beginner-link" to="/beginner">Beginner</RouterLink>
    <RouterLink class="expert-link" to="/expert">Expert</RouterLink>
  </nav>
  <router-view></router-view>
</template>

<style>
:root {
  --green: #5f9b42;
  --expert-red: #d84035;
  --beginner-blue: #373e8e;
  font-family: "Avant Garde", sans-serif;
}
</style>

<style scoped>
.navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  padding: 2rem;
}

.beginner-link,
.expert-link {
  text-decoration: none;
  opacity: 0.75;
  letter-spacing: 0.05em;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
}

.beginner-link:hover,
.beginner-link:focus-visible,
.expert-link:hover,
.expert-link:focus-visible {
  text-decoration-line: underline;
  text-decoration-thickness: 0.15em;
  text-underline-offset: 0.3em;
}

.beginner-link.router-link-exact-active,
.expert-link.router-link-exact-active {
  opacity: 1;
  font-weight: 900;
}

.beginner-link {
  color: var(--beginner-blue);
  justify-self: flex-end;
}

.expert-link {
  color: var(--expert-red);
  justify-self: flex-start;
}
</style>
