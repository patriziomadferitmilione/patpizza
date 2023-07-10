<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "PizzaView",
  props: {
    OrdineID: String,
  },
  data() {
    const pizzaID = ref("");
    const pizze = ref([]);
    const menu = ref([]);
    const ingredienti = ref([]);
    const ingrediente_modificato = ref();
    const aggiunte = ref([]);
    const rimozioni = ref([]);

    const showMenu = ref(true);
    const showPizze = ref(true);
    const showIngredienti = ref(false);

    return {
      pizze,
      menu,
      ingredienti,
      showIngredienti,
      showPizze,
      showMenu,
      aggiunte,
      rimozioni,
      ingrediente_modificato,
      pizzaID,
    };
  },
  methods: {
    getMenu() {
      axios
        .get("http://localhost:3000/menu/getMenu", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.menu = response.data;
          // console.log('risposta ' + response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newPizza(idOrdine, nomePizza) {
      // Create an object for the body
      const pizzaData = {
        nome: nomePizza,
        ordine_id: idOrdine,
      };

      // Create pizza
      axios
        .post("http://localhost:3000/pizza/newPizza", pizzaData, {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          this.pizzaID = response.data._id;
          this.getPizze(this.OrdineID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addAggiunte(id_pizza, prog_ingrediente) {
      let patchObject = {
        aggiunte: [prog_ingrediente],
      };
      axios
        .patch(
          `http://localhost:3000/pizza/addAggiunte/${id_pizza}`,
          patchObject,
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
              Accept: "*/*", // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          console.log(
            prog_ingrediente + " aggiunto a pizza con id " + id_pizza
          );
          console.log(response.data);
          this.getPizze(this.OrdineID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addRimozioni(id_pizza, prog_ingrediente) {
      let patchObject = {
        rimozioni: [prog_ingrediente],
      };
      axios
        .patch(
          `http://localhost:3000/pizza/addRimozioni/${id_pizza}`,
          patchObject,
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
              Accept: "*/*", // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          console.log(
            prog_ingrediente + " rimosso da pizza con id " + id_pizza
          );
          console.log(response.data);
          this.getPizze(this.OrdineID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPizze(id) {
      axios
        .get(`http://localhost:3000/pizza/getOrdinePizze/${id}`, {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          console.log(response);
          this.pizze = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredienti() {
      axios
        .get("http://localhost:3000/ingrediente/getIngredienti", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.ingredienti = response.data;
          console.log("risposta " + response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredientePROG(prog) {
      axios
        .get(`http://localhost:3000/ingrediente/getIngredienteProg/${prog}`, {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          // console.log('risposta ' + response.data)

          return (this.ingrediente_modificato = response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showToppings() {
      this.showMenu = false;
      this.showIngredienti = true;
    },
  },
  mounted() {
    this.getMenu();
    this.getIngredienti();
  },
};
</script>

<template>
  <main>
    <div class="ordineContainer">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Aggiunte</th>
            <th>Rimozioni</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pizza in pizze" :key="pizza._id">
            <td>
              {{ pizza.nome }}
            </td>
            <td>
              {{ pizza.aggiunte }}
            </td>
            <td>
              {{ pizza.rimozioni }}
            </td>
            <td>
              {{ pizza.note }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="menuContainer" v-if="this.showMenu === true">
      <button
        v-for="menuItem in menu"
        :key="menuItem._id"
        @click="newPizza(this.OrdineID, menuItem.nome), showToppings()"
      >
        {{ menuItem.nome }}
      </button>
    </div>
    <div class="ingredientiContainer" v-else-if="this.showIngredienti === true">
      <div
        class="ingrediente"
        v-for="ingrediente in ingredienti"
        :key="ingrediente._id"
      >
        <span> {{ ingrediente.nome }} </span>
        <button @click="addAggiunte(this.pizzaID, ingrediente.progressivo)">
          +
        </button>
        <button @click="addRimozioni(this.pizzaID, ingrediente.progressivo)">
          -
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.menuContainer,
.ingredientiContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
