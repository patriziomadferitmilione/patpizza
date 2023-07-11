<script>
import { ref, watch } from "vue";
import axios from "axios";

import PizzaView from "./PizzaView.vue";

export default {
  components: {
    PizzaView,
  },
  data() {
    const OrdineID = ref("");

    const showPizzaView = ref(false);
    const showOrari = ref(true);
    const showForm = ref(false);

    const NEW_ORDINE_OBJECT = ref({
      customer_id: "",
      indirizzo: "",
      nomeCampanello: "",
      orarioConsegna: "",
      metodoPagamento: "",
      zona: "",
      note: "",
    });
    const numeroCivico = ref('')

    const options = ref([]);
    const searchText = ref("");
    const selectedOption = ref('');

    watch(selectedOption, (newOption) => {
      this.loadJsonData(newOption);
    });

    return {
      NEW_ORDINE_OBJECT,
      OrdineID,
      showPizzaView,
      showOrari,
      showForm,
      options,
      searchText,
      selectedOption,
      numeroCivico
    };
  },
  methods: {
    newOrdine(time) {
      this.NEW_ORDINE_OBJECT.orarioConsegna = time;

      axios
        .post(
          // "http://localhost:3000/ordine/newOrdine",
          "https://patpizza-be.onrender.com/ordine/newOrdine",
          this.NEW_ORDINE_OBJECT,
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
              Accept: "*/*", // Specify the media type for the response
            },
          }
        )
        .then((res) => {
          // console.log("risposta " + res.data);

          this.OrdineID = res.data._id;
          // console.log(this.OrdineID)

          this.showForm = true;
          this.showOrari = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    patchOrdine(id) {
      const patchObject = {
        zona: this.selectedOption,
        indirizzo: this.NEW_ORDINE_OBJECT.indirizzo + ' ' + this.numeroCivico,
        nomeCampanello: this.NEW_ORDINE_OBJECT.nomeCampanello,
        metodoPagamento: this.NEW_ORDINE_OBJECT.metodoPagamento,
        note: this.NEW_ORDINE_OBJECT.note,
      };

      axios
        .patch(
          // `http://localhost:3000/ordine/updateOrdine/${id}`,
          `https://patpizza-be.onrender.com/ordine/updateOrdine/${id}`,
          patchObject,
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
              Accept: "*/*", // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.showForm = false;
          this.showPizzaView = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadJsonData(option) {
      try {
        let jsonFile = '';
        switch (option) {
          case '1':
            jsonFile = '/giaveno.json';
            break;
          case '2':
            jsonFile = '/coazze.json';
            break;
          case '3':
            jsonFile = '/valgioie.json';
            break;
          case '4':
            jsonFile = '/trana.json';
            break;
          case '5':
            jsonFile = '/avigliana.json';
            break;
        }

        const response = await fetch(jsonFile);
        this.options = await response.json();
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    }
  },
  computed: {
    filteredOptions() {
      if (this.searchText === "") {
        return this.options;
      } else {
        return this.options.filter((option) =>
          option.nome.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    },
  },
  mounted() {

  },
};
</script>

<template>
  <main>

    <table v-if="this.showOrari === true">
      <tbody>
        <tr>
          <td><button @click="newOrdine('19:00')">19:00</button></td>
          <td><button @click="newOrdine('19:15')">19:15</button></td>
          <td><button @click="newOrdine('19:30')">19:30</button></td>
          <td><button @click="newOrdine('19:45')">19:45</button></td>
        </tr>
        <tr>
          <td><button @click="newOrdine('20:00')">20:00</button></td>
          <td><button @click="newOrdine('20:15')">20:15</button></td>
          <td><button @click="newOrdine('20:30')">20:30</button></td>
          <td><button @click="newOrdine('20:45')">20:45</button></td>
        </tr>
        <tr>
          <td><button @click="newOrdine('21:00')">21:00</button></td>
          <td><button @click="newOrdine('21:15')">21:15</button></td>
          <td><button @click="newOrdine('21:30')">21:30</button></td>
          <td><button @click="newOrdine('21:45')">21:45</button></td>
        </tr>
      </tbody>
    </table>

      <div class="form" v-if="this.showForm === true">
      <label for="zona">Zona</label>
      <select v-model="this.selectedOption" name="zona" id="zona">
        <option value="1">GIAVENO</option>
        <option value="2">COAZZE</option>
        <option value="3">VALGIOIE</option>
        <option value="4">TRANA</option>
        <option value="5">AVIGLIANA</option>
      </select>
      <!-- <pre>{{ this.options }}</pre> -->
      <label for="nomeCampanello">Nome Campanello</label>
      <input
        v-model="this.NEW_ORDINE_OBJECT.nomeCampanello"
        name="nomeCampanello"
        id="nomeCampanello"
        type="text"
      />
      <label for="indirizzo">Indirizzo</label>
      <input type="text" v-model="searchText" placeholder="Cerca..." />
      <select v-model="this.NEW_ORDINE_OBJECT.indirizzo" id="indirizzo" name="indirizzo">
        <option
          v-for="(option, index) in filteredOptions"
          :key="index"
          :value="option.nome"
        >
          {{ option.nome }}
        </option>
      </select>
      <label for="numeroCivico">Numero Civico</label>
      <input
        v-model="this.numeroCivico"
        name="numeroCivico"
        id="numeroCivico"
        type="text"
      />
      <label for="metodoPagamento">Metodo Pagamento</label>
      <select v-model="this.NEW_ORDINE_OBJECT.metodoPagamento" name="metodoPagamento" id="metodoPagamento">
        <option value="CONTANTI">CONTANTI</option>
        <option value="POS-BANCOMAT">POS-BANCOMAT</option>
        <option value="SATISPAY">SATISPAY</option>
      </select>
      <label for="note">Note</label>
      <textarea
        v-model="this.NEW_ORDINE_OBJECT.note"
        name="note"
        id="note"
        cols="100"
        rows="5"
      ></textarea>
      <button class="form_btn" @click="patchOrdine(this.OrdineID)">SCEGLI PIZZE</button>
  </div>

    <div class="pizza">
      <PizzaView v-if="this.showPizzaView === true" :OrdineID="this.OrdineID" />
    </div>
  </main>
</template>

<style scoped>
main,
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

button {
  width: 200px;
  height: 70px;
  font-size: 3rem;
  font-weight: bold;
  border-radius: 5px;
}

button:hover {
  cursor: pointer;
  color: var(--link);
}

.form_btn {
  background-color: var(--link);
  margin: 1rem 0;
  border-radius: 5px;
  border: none;
  width: fit-content;
}

.form_btn:hover {
  background-color: var(--link_light);
}

.pizza {
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
}
</style>
