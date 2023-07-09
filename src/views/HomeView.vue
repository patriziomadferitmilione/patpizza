<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {

    const NEW_ORDINE_OBJECT = ref({
      customer_id: "",
      indirizzo: "",
      nomeCampanello: "",
      orarioConsegna: "",
      zona: "",
      note: ""
    });

    return {
      NEW_ORDINE_OBJECT
    };
  },
  methods: {
    onSubmit() {
      
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
          console.log('risposta ' + res.data)
         
          // Extract _id and name from the response
          // const { _id, name } = res.data;
          // this.newPersonId = _id;
          // this.newPersonName = name;

          setTimeout(this.refreshPage(), 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }
}
</script>

<template>
  <main>
    <table>
      <tbody>
        <tr>
          <td><button>19:00</button></td>
          <td><button>19:15</button></td>
          <td><button>19:30</button></td>
          <td><button>19:45</button></td>
        </tr>
        <tr>
          <td><button>20:00</button></td>
          <td><button>20:15</button></td>
          <td><button>20:30</button></td>
          <td><button>20:45</button></td>
        </tr>
        <tr>
          <td><button>21:00</button></td>
          <td><button>21:15</button></td>
          <td><button>21:30</button></td>
          <td><button>21:45</button></td>
        </tr>
      </tbody>
    </table>

    <form v-on:submit="onSubmit()">
     
      <label for="zona">Zona</label>
      <select v-model="this.NEW_ORDINE_OBJECT.zona" name="zona" id="zona">
        <option value="1">GIAVENO</option>
        <option value="2">COAZZE</option>
        <option value="3">VALGIOIE</option>
        <option value="4">TRANA</option>
      </select>
      <label for="orario">Orario Consegna</label>
      <select v-model="this.NEW_ORDINE_OBJECT.orarioConsegna" name="orario" id="orario">
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
      </select>
      <label for="nomeCampanello">Nome Campanello</label>
      <input v-model="this.NEW_ORDINE_OBJECT.nomeCampanello" name="nomeCampanello" type="text">
      <label for="indirizzo">Indirizzo</label>
      <input v-model="this.NEW_ORDINE_OBJECT.indirizzo" name="indirizzo" type="text">
      <label for="note">Note</label>
      <textarea v-model="this.NEW_ORDINE_OBJECT.note" name="note" id="note" cols="30" rows="10"></textarea>
      <button type="submit">DAJE</button>
    </form>
  </main>
</template>

<style scoped>

main, form {
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

</style>