<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <div class="main">
    <div class="app">
      <router-view></router-view>
    </div>
    <div class="bottom-bar">
      <router-link to="/" class="bottom-bar-item"
        ><i class="mdi mdi-file-document-plus"></i
      ></router-link>
      <router-link to="/graphs" class="bottom-bar-item"
        ><i class="mdi mdi-chart-line"></i
      ></router-link>
      <router-link to="/newItem" class="bottom-bar-item"
        ><i class="mdi mdi-plus-box"></i
      ></router-link>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  max-height: 90vh;
  top: 0;
  overflow: hidden;
}

.bottom-bar {
  width: 100%;
  max-width: 100vw;
  height: 10vh;
  min-height: 10vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: var(--shadow);
  color: var(--link);
  width: 100%;
  font-size: 1.2rem;
}

.bottom-bar-item {
  font-size: 2rem;
  padding: 5px;
  cursor: pointer;
  color: var(--link);
  background-color: var(--shadow);
}

.bottom-bar-item:hover {
  color: var(--link_light);
}
</style>
