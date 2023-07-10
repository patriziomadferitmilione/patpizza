<script>
import { ref } from "vue";
import axios from "axios";

import PizzaView from "./PizzaView.vue";

export default {
  components: {
    PizzaView,
  },
  data() {

    const OrdineID = ref('')

    const showPizzaView = ref(false)
    const showOrari = ref(true)
    const showForm = ref(false)

    const NEW_ORDINE_OBJECT = ref({
      customer_id: "",
      indirizzo: "",
      nomeCampanello: "",
      orarioConsegna: "",
      zona: "",
      note: "",
    });

    return {
      NEW_ORDINE_OBJECT,
      OrdineID,
      showPizzaView,
      showOrari,
      showForm
    };
  },
  methods: {
    newOrdine(time) {

      this.NEW_ORDINE_OBJECT.orarioConsegna = time

      axios
        .post(
          "http://localhost:3000/ordine/newOrdine",
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

          this.OrdineID = res.data._id
          // console.log(this.OrdineID)

          this.showForm = true
          this.showOrari = false
        })
        .catch((error) => {
          console.log(error);
        });
    },
    patchOrdine() {

      const patchObject = {
        "zona": this.NEW_ORDINE_OBJECT.zona,
        "indirizzo": this.NEW_ORDINE_OBJECT.indirizzo,
        "nomeCampanello": this.NEW_ORDINE_OBJECT.nomeCampanello,
        "note": this.NEW_ORDINE_OBJECT.note
      }

      axios
        .patch(
          `http://localhost:3000/ordine/updateOrdine/${this.OrdineID}`,
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
          this.showForm = false
          this.showPizzaView = true
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

    <form @submit.prevent="newOrdine" v-if="this.showForm === true">
      <label for="zona">Zona</label>
      <select v-model="this.NEW_ORDINE_OBJECT.zona" name="zona" id="zona">
        <option value="1">GIAVENO</option>
        <option value="2">COAZZE</option>
        <option value="3">VALGIOIE</option>
        <option value="4">TRANA</option>
      </select>
      <!-- <label for="orario">Orario Consegna</label>
      <select
        v-model="this.NEW_ORDINE_OBJECT.orarioConsegna"
        name="orario"
        id="orario"
      >
        <option value="19:00">19:00</option>
        <option value="19:00">19:15</option>
        <option value="19:00">19:30</option>
        <option value="19:00">19:45</option>
        <option value="19:00">20:00</option>
        <option value="19:00">20:15</option>
        <option value="19:00">20:30</option>
        <option value="19:00">20:45</option>
        <option value="19:00">21:00</option>
        <option value="19:00">21:15</option>
        <option value="19:00">21:30</option>
        <option value="19:00">21:45</option>
      </select> -->
      <label for="nomeCampanello">Nome Campanello</label>
      <input
        v-model="this.NEW_ORDINE_OBJECT.nomeCampanello"
        name="nomeCampanello"
        id="nomeCampanello"
        type="text"
      />
      <label for="indirizzo">Indirizzo</label>
      <input
        v-model="this.NEW_ORDINE_OBJECT.indirizzo"
        name="indirizzo"
        id="indirizzo"
        type="text"
      />
      <label for="note">Note</label>
      <textarea
        v-model="this.NEW_ORDINE_OBJECT.note"
        name="note"
        id="note"
        cols="30"
        rows="10"
      ></textarea>
      <button @click="patchOrdine()">DAJE</button>
    </form>

    <div class="pizza">
      <PizzaView v-if="this.showPizzaView === true" :OrdineID="this.OrdineID" />
    </div>
  </main>
</template>

<style scoped>
main,
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

button {
  width: 100px;
  height: 40px;
}

button:hover {
  cursor: pointer;
}

.pizza {
  margin-top: 1rem;
  border: 3px solid red;
  padding: 1rem;
  width: 100%;
}

</style>
