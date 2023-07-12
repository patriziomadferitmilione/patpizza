<script>
import { ref, setTransitionHooks } from "vue";
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
    const showOrdine = ref(false);

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
      showOrdine,
    };
  },
  methods: {
    getMenu() {
      axios
        .get("https://patpizza-be.onrender.com/menu/getMenu", {
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
        .post("https://patpizza-be.onrender.com/pizza/newPizza", pizzaData, {
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

      this.showOrdine = true;
    },
    addAggiunte(id_pizza, prog_ingrediente) {
      let patchObject = {
        aggiunte: [prog_ingrediente],
      };
      axios
        .patch(
          `https://patpizza-be.onrender.com/pizza/addAggiunte/${id_pizza}`,
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
          `https://patpizza-be.onrender.com/pizza/addRimozioni/${id_pizza}`,
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
        .get(`https://patpizza-be.onrender.com/pizza/getOrdinePizze/${id}`, {
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
    getIngredientiPopolari() {
      axios
        .get("https://patpizza-be.onrender.com/ingrediente/getIngredienti/popolari", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.ingredienti = response.data;
          // console.log("risposta " + response.data);
          this.getIngredientiCarne()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredientiCarne() {
      axios
        .get("https://patpizza-be.onrender.com/ingrediente/getIngredienti/carne", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.ingredienti = response.data;
          // console.log("risposta " + response.data);
          this.getIngredientiFormaggi()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredientiFormaggi() {
      axios
        .get("https://patpizza-be.onrender.com/ingrediente/getIngredienti/formaggi", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.ingredienti = response.data;
          // console.log("risposta " + response.data);
          this.getIngredientiVerdura()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredientiVerdura() {
      axios
        .get("https://patpizza-be.onrender.com/ingrediente/getIngredienti/verdura", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.ingredienti = response.data;
          // console.log("risposta " + response.data);
          this.getIngredientiCreme()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredientiCreme() {
      axios
        .get("https://patpizza-be.onrender.com/ingrediente/getIngredienti/creme", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.ingredienti = response.data;
          // console.log("risposta " + response.data);
          this.getIngredientiVari()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredientiVari() {
      axios
        .get("https://patpizza-be.onrender.com/ingrediente/getIngredienti/vari", {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Accept: "*/*", // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.ingredienti = response.data;
          // console.log("risposta " + response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIngredientePROG(prog) {
      axios
        .get(
          `https://patpizza-be.onrender.com/ingrediente/getIngredienteProg/${prog}`,
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
              Accept: "*/*", // Specify the media type for the response
            },
          }
        )
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
    refresh() {
      location.reload();
    },
    more() {
      this.showMenu = true;
    },
  },
  mounted() {
    this.getMenu();
    this.getIngredientiPopolari();
  },
};
</script>

<template>
  <main>
    <button class="btn" @click="more()" v-if="this.showOrdine === true">
      AGGIUNGI
    </button>

    <div class="ordineContainer" v-if="this.showOrdine === true">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Aggiunte</th>
            <th>Rimozioni</th>
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
        :key="ingrediente.categoria"
      >
        <span> {{ ingrediente.nome }} </span>

        <div class="topping_btn">
          <button @click="addAggiunte(this.pizzaID, ingrediente.progressivo)">
            +
          </button>
          <button @click="addRimozioni(this.pizzaID, ingrediente.progressivo)">
            -
          </button>
        </div>
      </div>
    </div>
    <button class="btn" @click="refresh()">CONFERMA ORDINE</button>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

table {
  padding: 10px;
  border: 2px solid var(--link_light);
  /* box-shadow: 0px 0px 10px 0px var(--link); */
  border-radius: 5px;
  background-color: var(--white);
  text-align: center;
  font-size: 2rem;
  /* background-color: #f4d03f;
  background-image: radial-gradient(circle farthest-side, var(--link) 0%, var(--white) 100%); */
  background-color: var(--white);
  /* width: 90vw; */
  margin-bottom: 1rem;
}

th:first-child,
td:first-child {
  width: 50%;
}

th:nth-child(2),
th:last-child,
td:nth-child(2),
td:last-child {
  width: 25%;
}

th {
  border-bottom: 3px solid var(--link_light);
  font-weight: bold;
}

td {
  border-bottom: 1px solid var(--white);
}

.ordineContainer table tbody tr {
  margin: 1rem;
}

.ingredientiContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

.ingrediente {
  display: flex;
  flex-direction: row;
  width: 250px;
  height: 100px;
  margin: 0.3rem 0;
  padding: 0.5rem;
  border: 3px solid var(--link_light);
  border-radius: 5px;
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  text-align: center;
}

.ingrediente span {
  width: 80%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
}

.topping_btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0.2rem;
}

.topping_btn button {
  height: 30px;
  width: 30px;
}

.btn {
  background-color: var(--link);
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 1.5rem;
}

.btn:hover {
  cursor: pointer;
  color: var(--white);
}

.menuContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}
.menuContainer button {
  width: 250px;
  height: 50px;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
}

.menuContainer button:hover {
  cursor: pointer;
  color: var(--link);
}
</style>
