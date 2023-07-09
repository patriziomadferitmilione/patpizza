<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    pizze = ref([]);

    return {
      pizze,
    };
  },
  methods: {
    getPizze() {
      axios
        .get("http://localhost:3000/pizza/getPizze", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.pizze = response.data;
          // console.log('risposta ' + response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <h1>DAJE</h1>
  <main>
    <button @click="getPizze()">Carica Pizze</button>
    <!-- <button v-for="pizza in pizze" :key="pizza._id">
      {{ pizza.nome }}
    </button> -->
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
