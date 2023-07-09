<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <button><RouterLink to="/">Home</RouterLink></button>
      <button><RouterLink to="/about">About</RouterLink></button>
    </nav>
  </header>

  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  float: left;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav {
  display: flex;
  flex-direction: column;
}

.content {
  float: right;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
