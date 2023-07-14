<script>
import { ref, watch } from "vue";
import axios from "axios";

import PizzaView from "./PizzaView.vue";
import DashboardView from "./DashboardView.vue";

export default {
  components: {
    PizzaView,
    DashboardView,
  },
  data() {
    const OrdineID = ref("");

    const showDashboard = ref(true);
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
    const numeroCivico = ref("");
    const counts = ref([]);
    const options = ref([]);
    const searchText = ref("");
    const selectedOption = ref("");

    watch(selectedOption, (newOption) => {
      this.loadJsonData(newOption);
    });

    // LABELS
    const time_green = ref(false);
    const time_red = ref(false);
    const timeSlot19 = ref(false);
    const timeSlot1915 = ref(false);
    const timeSlot1930 = ref(false);
    const timeSlot1945 = ref(false);
    const timeSlot20 = ref(false);
    const timeSlot2015 = ref(false);
    const timeSlot2030 = ref(false);
    const timeSlot2045 = ref(false);
    const timeSlot21 = ref(false);
    const timeSlot2115 = ref(false);
    const timeSlot2130 = ref(false);
    const timeSlot2145 = ref(false);

    return {
      NEW_ORDINE_OBJECT,
      OrdineID,
      showPizzaView,
      showOrari,
      showDashboard,
      showForm,
      options,
      searchText,
      selectedOption,
      numeroCivico,
      time_green,
      time_red,
      timeSlot19,
      timeSlot1915,
      timeSlot1930,
      timeSlot1945,
      timeSlot20,
      timeSlot2015,
      timeSlot2030,
      timeSlot2045,
      timeSlot21,
      timeSlot2115,
      timeSlot2130,
      timeSlot2145,
      counts
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
          this.showDashboard = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    patchOrdine(id) {
      const patchObject = {
        zona: this.selectedOption,
        indirizzo: this.NEW_ORDINE_OBJECT.indirizzo + " " + this.numeroCivico,
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
          // console.log(response.data);
          this.showForm = false;
          this.showPizzaView = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadJsonData(option) {
      try {
        let jsonFile = "";
        switch (option) {
          case "1":
            jsonFile = "/giaveno.json";
            break;
          case "2":
            jsonFile = "/coazze.json";
            break;
          case "3":
            jsonFile = "/valgioie.json";
            break;
          case "4":
            jsonFile = "/trana.json";
            break;
          case "5":
            jsonFile = "/avigliana.json";
            break;
        }

        const response = await fetch(jsonFile);
        this.options = await response.json();
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    },
    getOrdiniSlot() {
      axios
        .get("https://patpizza-be.onrender.com/ordine/getOrdiniToday", {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        })
        .then((response) => {
          console.log(JSON.stringify(response.data));

          this.counts = response.data; // Assuming the response data is an object with count values

          this.timeSlot19 = (this.counts["19"] || 0) <= 1;
          this.timeSlot1915 = (this.counts["19:15"] || 0) <= 1;
          this.timeSlot1930 = (this.counts["19:30"] || 0) <= 1;
          this.timeSlot1945 = (this.counts["19:45"] || 0) <= 1;
          this.timeSlot20 = (this.counts["20"] || 0) <= 1;
          this.timeSlot2015 = (this.counts["20:15"] || 0) <= 1;
          this.timeSlot2030 = (this.counts["20:30"] || 0) <= 1;
          this.timeSlot2045 = (this.counts["20:45"] || 0) <= 1;
          this.timeSlot21 = (this.counts["21"] || 0) <= 1;
          this.timeSlot2115 = (this.counts["21:15"] || 0) <= 1;
          this.timeSlot2130 = (this.counts["21:30"] || 0) <= 1;
          this.timeSlot2145 = (this.counts["21:45"] || 0) <= 1;

          this.time_green = true;
          this.time_red = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    labelColors() {
      return {
        time_green: this.time_green,
        time_red: this.time_red,
      };
    },
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
    this.labelColors();
    this.getOrdiniSlot();
  },
};
</script>

<template>
  <main>
    <div class="dashboard" v-if="this.showDashboard === true">
      <h1 class="title">PROSSIMI ORDINI</h1>
      <DashboardView />
    </div>
    <h1 class="title">Riepilogo</h1>
    <div class="dashboardCount">
      
    <div class="cards">
      <div v-for="(count, timeSlot) in counts" :key="timeSlot" class="card">
        <div class="card-time">{{ timeSlot }}</div>
        <div class="card-count">{{ count }}</div>
      </div>
    </div>
  </div>

    <h1 class="title" v-if="this.showOrari === true">SCEGLI ORARIO CONSEGNA</h1>
    <div v-if="this.showOrari === true">
      <table>
        <tbody>
          <tr>
            <td v-if="this.timeSlot19 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('19:00')"
              >
                19:00
              </button>
            </td>
            <td v-else-if="this.timeSlot19 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('19:00')"
              >
                19:00
              </button>
            </td>

            <td v-if="this.timeSlot1915 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('19:15')"
              >
                19:15
              </button>
            </td>
            <td v-else-if="this.timeSlot1915 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('19:15')"
              >
                19:15
              </button>
            </td>

            <td v-if="this.timeSlot1930 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('19:30')"
              >
                19:30
              </button>
            </td>
            <td v-else-if="this.timeSlot1930 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('19:30')"
              >
                19:30
              </button>
            </td>

            <td v-if="this.timeSlot1945 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('19:45')"
              >
                19:45
              </button>
            </td>
            <td v-else-if="this.timeSlot1945 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('19:45')"
              >
                19:45
              </button>
            </td>
          </tr>
          <tr>
            <td v-if="this.timeSlot20 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('20:00')"
              >
                20:00
              </button>
            </td>
            <td v-else-if="this.timeSlot20 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('20:00')"
              >
                20:00
              </button>
            </td>

            <td v-if="this.timeSlot2015 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('20:15')"
              >
                20:15
              </button>
            </td>
            <td v-else-if="this.timeSlot2015 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('20:15')"
              >
                20:15
              </button>
            </td>

            <td v-if="this.timeSlot2030 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('20:30')"
              >
                20:30
              </button>
            </td>
            <td v-else-if="this.timeSlot2030 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('20:30')"
              >
                20:30
              </button>
            </td>

            <td v-if="this.timeSlot2045 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('20:45')"
              >
                20:45
              </button>
            </td>
            <td v-else-if="this.timeSlot2045 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('20:45')"
              >
                20:45
              </button>
            </td>
          </tr>
          <tr>
            <td v-if="this.timeSlot21 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('21:00')"
              >
                21:00
              </button>
            </td>
            <td v-else-if="this.timeSlot21 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('21:00')"
              >
                21:00
              </button>
            </td>

            <td v-if="this.timeSlot2115 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('21:15')"
              >
                21:15
              </button>
            </td>
            <td v-else-if="this.timeSlot2115 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('21:15')"
              >
                21:15
              </button>
            </td>

            <td v-if="this.timeSlot2130 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('21:30')"
              >
                21:30
              </button>
            </td>
            <td v-else-if="this.timeSlot2130 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('21:30')"
              >
                21:30
              </button>
            </td>

            <td v-if="this.timeSlot2145 === true">
              <button
                :class="{ time_green: time_green }"
                @click="newOrdine('21:45')"
              >
                21:45
              </button>
            </td>
            <td v-else-if="this.timeSlot2145 === false">
              <button
                :class="{ time_red: time_red }"
                @click="newOrdine('21:45')"
              >
                21:45
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="form" v-if="this.showForm === true">
      <div class="form_sub">
        <label for="zona">Zona</label>
      <select v-model="this.selectedOption" name="zona" id="zona">
        <option value="1">GIAVENO</option>
        <option value="2">COAZZE</option>
        <option value="3">VALGIOIE</option>
        <option value="4">TRANA</option>
        <option value="5">AVIGLIANA</option>
      </select>
      </div>
      <!-- <pre>{{ this.options }}</pre> -->

      <div class="form_sub">
        <label for="indirizzo">Indirizzo</label>
      <input
        type="text"
        v-model="searchText"
        placeholder="Cerca..."
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
      <select
        v-model="this.NEW_ORDINE_OBJECT.indirizzo"
        id="indirizzo"
        name="indirizzo"
      >
        <option
          v-for="(option, index) in filteredOptions"
          :key="index"
          :value="option.nome"
        >
          {{ option.nome }}
        </option>
      </select>
      </div>


      
      <div class="form_sub">
        <label for="nomeCampanello">Nome sul Campanello</label>
      <input
        v-model="this.NEW_ORDINE_OBJECT.nomeCampanello"
        name="nomeCampanello"
        id="nomeCampanello"
        type="text"
      />
      </div>
      <div class="form_sub">
        <label for="numeroCivico">Numero Civico</label>
      <input
        v-model="this.numeroCivico"
        name="numeroCivico"
        id="numeroCivico"
        type="text"
      />
      </div>
      
      <div class="form_sub">
        <label for="metodoPagamento">Metodo Pagamento</label>
      <select
        v-model="this.NEW_ORDINE_OBJECT.metodoPagamento"
        name="metodoPagamento"
        id="metodoPagamento"
      >
        <option value="CONTANTI">CONTANTI</option>
        <option value="POS-BANCOMAT">POS-BANCOMAT</option>
        <option value="SATISPAY">SATISPAY</option>
      </select>
      </div>
      <div class="form_sub">
        <label for="cellulare">Numero di Telefono</label>
      <input
        v-model="this.NEW_ORDINE_OBJECT.cellulare"
        name="cellulare"
        id="cellulare"
        type="tel"
      />
      </div>
      


      
    </div>
    <div class="form_sub">
        <label for="note">Note</label>
      <textarea
        v-model="this.NEW_ORDINE_OBJECT.note"
        name="note"
        id="note"
        cols="100"
        rows="5"
      ></textarea>
      </div>
    <button class="form_btn" @click="patchOrdine(this.OrdineID)">
        SCEGLI PIZZE
      </button>

    <div class="pizza">
      <PizzaView v-if="this.showPizzaView === true" :OrdineID="this.OrdineID" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: .5rem;
  align-items: baseline;
}

.form_sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.dashboard {
  margin-bottom: 1rem;
  padding: 1rem;
  width: 100%;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  background-color: var(--link);
  padding: 0.5rem;
  border-radius: 5px;
  margin: 1rem 0;
  text-align: center;
}

.time_green {
  background-color: var(--green);
  color: var(--shadow);
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 0px var(--green);
}
.time_red {
  background-color: var(--red);
  color: var(--white);
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 0px var(--red);
}

.dashboardCount {
  display: flex;
  justify-content: center;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 150px;
  height: 100px;
  margin: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-time {
  font-weight: bold;
  font-size: 18px;
}

.card-count {
  margin-top: 10px;
  font-size: 14px;
}
</style>
