<script>
import HomeView from "./views/HomeView.vue";
import BluetoothView from "./views/BluetoothView.vue";

export default {
  components: {
    HomeView,
    BluetoothView
  }
}
</script>

<template>
  <BluetoothView />
  <HomeView />
</template>

<style scoped>

</style>
