<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'PizzaView',
  props: {
    OrdineID: String,
  },
  data() {
    const pizzaID = ref('')
    const pizze = ref([])
    const menu = ref([])
    const ingredientiPop = ref([])
    const ingredientiCarne = ref([])
    const ingredientiForm = ref([])
    const ingredientiVerd = ref([])
    const ingredientiCreme = ref([])
    const ingredientiVari = ref([])
    const aggiunte = ref([])
    const rimozioni = ref([])
    const quantita = ref(1)

    const showMenu = ref(true)
    const showPizze = ref(true)
    const showIngredienti = ref(false)
    const showOrdine = ref(true)

    return {
      pizze,
      menu,
      ingredientiPop,
      ingredientiCarne,
      ingredientiCreme,
      ingredientiForm,
      ingredientiVari,
      ingredientiVerd,
      showIngredienti,
      showPizze,
      showMenu,
      aggiunte,
      rimozioni,
      pizzaID,
      showOrdine,
      quantita,
    }
  },
  methods: {
    getMenu() {
      axios
        .get('https://patpizza-be.onrender.com/menu/getMenu', {
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            Accept: '*/*', // Specify the media type for the response
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.menu = response.data
          // console.log('risposta ' + response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    newPizza(idOrdine, nomePizza, quantita) {
      // Convert quantita to string
      let quantitaString = quantita.toString()

      // Create an object for the body
      const pizzaData = {
        nome: nomePizza,
        ordine_id: idOrdine,
        quantita: quantitaString,
      }

      // Create pizza
      axios
        .post('https://patpizza-be.onrender.com/pizza/newPizza', pizzaData, {
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            Accept: '*/*', // Specify the media type for the response
          },
        })
        .then((response) => {
          this.pizzaID = response.data._id
          this.getPizze(this.OrdineID)
          console.log(this.OrdineID.toString())
        })
        .catch((error) => {
          console.log(error)
        })

      this.showOrdine = true
      this.quantita = 1
    },
    addAggiunte(id_pizza, nome_ingrediente) {
      let patchObject = {
        aggiunte: [nome_ingrediente],
      }
      axios
        .patch(
          `https://patpizza-be.onrender.com/pizza/addAggiunte/${id_pizza}`,
          patchObject,
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          console.log(nome_ingrediente + ' aggiunto a pizza con id ' + id_pizza)
          console.log(response.data)
          this.getPizze(this.OrdineID)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addRimozioni(id_pizza, nome_ingrediente) {
      let patchObject = {
        rimozioni: [nome_ingrediente],
      }
      axios
        .patch(
          `https://patpizza-be.onrender.com/pizza/addRimozioni/${id_pizza}`,
          patchObject,
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          console.log(nome_ingrediente + ' rimosso da pizza con id ' + id_pizza)
          console.log(response.data)
          this.getPizze(this.OrdineID)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getPizze(id) {
      axios
        .get(`https://patpizza-be.onrender.com/pizza/getOrdinePizze/${id}`, {
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            Accept: '*/*', // Specify the media type for the response
          },
        })
        .then((response) => {
          console.log(response)
          this.pizze = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIngredientiPopolari() {
      axios
        .get(
          'https://patpizza-be.onrender.com/ingrediente/getIngredienti/popolari',
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          this.ingredientiPop = response.data
          console.log('popolari ' + JSON.stringify(response))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIngredientiCarne() {
      axios
        .get(
          'https://patpizza-be.onrender.com/ingrediente/getIngredienti/carne',
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          this.ingredientiCarne = response.data

          console.log('carne ' + JSON.stringify(response))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIngredientiFormaggi() {
      axios
        .get(
          'https://patpizza-be.onrender.com/ingrediente/getIngredienti/formaggi',
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          // const newData = response.data;
          // this.ingredientiForm = [...this.ingredienti, ...newData];
          this.ingredientiForm = response.data

          console.log('formaggi ' + JSON.stringify(response))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIngredientiVerdura() {
      axios
        .get(
          'https://patpizza-be.onrender.com/ingrediente/getIngredienti/verdura',
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          this.ingredientiVerd = response.data

          console.log('verdura ' + JSON.stringify(response))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIngredientiCreme() {
      axios
        .get(
          'https://patpizza-be.onrender.com/ingrediente/getIngredienti/creme',
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          this.ingredientiCreme = response.data

          console.log('creme ' + JSON.stringify(response))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIngredientiVari() {
      axios
        .get(
          'https://patpizza-be.onrender.com/ingrediente/getIngredienti/vari',
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          this.ingredientiVari = response.data

          console.log('vari ' + JSON.stringify(response))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showToppings() {
      this.showMenu = false
      this.showIngredienti = true
    },
    refresh() {
      location.reload()
    },
    more() {
      this.showMenu = true
      this.showIngredienti = false
    },
  },
  mounted() {
    this.getMenu()
    // this.getIngredientiPopolari();
  },
}
</script>

<template>
  <main>
    <button class="btn" @click="more()" v-if="this.showOrdine === true">
      NUOVA PIZZA
    </button>

    <div class="ordineContainer" v-if="this.showOrdine === true">
      <table class="table_ordine">
        <thead>
          <tr>
            <th>Quantita</th>
            <th>Nome</th>
            <th>Modifiche</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pizza in pizze" :key="pizza._id">
            <td>
              {{ pizza.quantita }}
            </td>
            <td>
              {{ pizza.nome }}
            </td>
            <td>
              <ul>
                <li v-for="aggiunta in pizza.aggiunte" :key="aggiunta">
                  + {{ aggiunta }}
                </li>
              </ul>
              <ul>
                <li v-for="rimozione in pizza.rimozioni" :key="rimozione">
                  - {{ rimozione }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="qt_pizza" v-if="this.showMenu === true">
      <label for="quantita">Quantità</label>
      <input
        type="number"
        id="quantita"
        name="quantita"
        v-model="this.quantita"
      />
    </div>
    <div class="menuContainer" v-if="this.showMenu === true">
      <button
        class="btn_menu_item"
        v-for="menuItem in menu"
        :key="menuItem._id"
        @click="
          newPizza(this.OrdineID, menuItem.nome, this.quantita),
            showToppings(),
            getIngredientiPopolari(),
            getIngredientiCarne(),
            getIngredientiFormaggi(),
            getIngredientiVerdura(),
            getIngredientiCreme(),
            getIngredientiVari()
        "
      >
        {{ menuItem.nome }}
      </button>
    </div>

    <!-- Ingredienti Inizio -->
    <div class="ingredientiSection" v-if="this.showIngredienti === true">
      <!-- Ingredienti Popolari -->
      <div class="ingr">
        <h1>Più Usati</h1>
        <div class="ingredientiContainer">
          <div
            class="ingrediente"
            v-for="ingrediente in ingredientiPop"
            :key="ingrediente._id"
          >
            <span> {{ ingrediente.nome }} </span>

            <div class="topping_btn">
              <button @click="addAggiunte(this.pizzaID, ingrediente.nome)">
                +
              </button>
              <button @click="addRimozioni(this.pizzaID, ingrediente.nome)">
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ingredienti Carne -->
      <div class="ingr">
        <h1>Carne e Pesce</h1>

        <div class="ingredientiContainer">
          <div
            class="ingrediente"
            v-for="ingrediente in ingredientiCarne"
            :key="ingrediente._id"
          >
            <span> {{ ingrediente.nome }} </span>

            <div class="topping_btn">
              <button @click="addAggiunte(this.pizzaID, ingrediente.nome)">
                +
              </button>
              <button @click="addRimozioni(this.pizzaID, ingrediente.nome)">
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ingredienti Formaggi -->
      <div class="ingr">
        <h1>Latticini</h1>

        <div class="ingredientiContainer">
          <div
            class="ingrediente"
            v-for="ingrediente in ingredientiForm"
            :key="ingrediente._id"
          >
            <span> {{ ingrediente.nome }} </span>

            <div class="topping_btn">
              <button @click="addAggiunte(this.pizzaID, ingrediente.nome)">
                +
              </button>
              <button @click="addRimozioni(this.pizzaID, ingrediente.nome)">
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ingredienti Verdura -->
      <div class="ingr">
        <h1>Frutta e Verdura</h1>

        <div class="ingredientiContainer">
          <div
            class="ingrediente"
            v-for="ingrediente in ingredientiVerd"
            :key="ingrediente._id"
          >
            <span> {{ ingrediente.nome }} </span>

            <div class="topping_btn">
              <button @click="addAggiunte(this.pizzaID, ingrediente.nome)">
                +
              </button>
              <button @click="addRimozioni(this.pizzaID, ingrediente.nome)">
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ingredienti Creme -->
      <div class="ingr">
        <h1>Creme</h1>

        <div class="ingredientiContainer">
          <div
            class="ingrediente"
            v-for="ingrediente in ingredientiCreme"
            :key="ingrediente._id"
          >
            <span> {{ ingrediente.nome }} </span>

            <div class="topping_btn">
              <button @click="addAggiunte(this.pizzaID, ingrediente.nome)">
                +
              </button>
              <button @click="addRimozioni(this.pizzaID, ingrediente.nome)">
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ingredienti Vari -->
      <div class="ingr">
        <h1>Vari</h1>

        <div class="ingredientiContainer">
          <div
            class="ingrediente"
            v-for="ingrediente in ingredientiVari"
            :key="ingrediente._id"
          >
            <span> {{ ingrediente.nome }} </span>

            <div class="topping_btn">
              <button @click="addAggiunte(this.pizzaID, ingrediente.nome)">
                +
              </button>
              <button @click="addRimozioni(this.pizzaID, ingrediente.nome)">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Ingredienti Fine -->

    <button class="btn" @click="refresh()">CONFERMA ORDINE</button>
  </main>
</template>

<style scoped>
main {
  padding-top: 100rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.ingr {
  margin-top: 4rem;
  margin-bottom: 4rem;
}

table {
  border: 2px solid var(--link_light);
  border-radius: 5px;
  background-color: var(--white);
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  width: 100%;
}

th:first-child,
td:first-child {
  width: 10%;
}

th {
  border-bottom: 3px solid var(--link_light);
  font-weight: bold;
}

td {
  border-bottom: 1px solid var(--link);
}

ul,
li {
  list-style: none;
}

.ordineContainer table tbody tr {
  margin: 1rem;
}

.ingredientiSection {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: fit-content;
  padding-top: 190rem;
}

.ingredientiSection h1 {
  font-weight: bold;
  font-size: 40px;
  color: var(--input_background);
  text-shadow: 3px 0px 7px var(--white), -3px 0px 7px var(--white),
    0px 4px 7px rgba(81, 67, 21, 0.8);
  text-align: center;
  padding: 1rem;
}

.ingredientiContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 5px;
  height: 300px;
  overflow-y: scroll;
}

.ingrediente {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 8rem;
  padding: 0.5rem;
  border: 3px solid var(--link_light);
  border-radius: 5px;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  text-align: center;
  box-shadow: 0px 0px 20px 0px var(--link_light);
}

.btn_menu_item {
  box-shadow: 0px 0px 10px 0px var(--link_light);
}

.ingrediente span {
  flex: 1;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
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

.btn,
.menuContainer button {
  background-color: var(--link);
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 1.5rem;
  width: 250px;
}

.btn:hover,
.menuContainer button:hover {
  cursor: pointer;
  color: var(--white);
}

.menuContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  border: 3px solid var(--link);
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 0px 20px 0px var(--link_light);
}

.qt_pizza {
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.qt_pizza input {
  font-size: 30px;
  width: 150px;
  text-align: center;
}

@media only screen and (max-width: 430px) {
  main,
  .ordineContainer {
    overflow-x: scroll;
    width: 100vw;
    padding: 1rem;
  }

  .menuContainer {
    grid-template-columns: 1fr 1fr;
  }

  .ingrediente {
    width: 85%;
    margin: 0.2rem;
  }

  .ingredientiContainer {
    border-radius: 5px;
    height: 500px;
    max-width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
  }

  .btn_menu_item {
    max-width: 150px;
  }

  .table_ordine {
    overflow-x: scroll;
  }
}
</style>
