<script>
import { ref, watch } from 'vue'
import axios from 'axios'

import PizzaView from './PizzaView.vue'
import DashboardView from './DashboardView.vue'

export default {
  components: {
    PizzaView,
    DashboardView,
  },
  data() {
    const OrdineID = ref('')
    const showDashboard = ref(true)
    const showPizzaView = ref(false)
    const showOrari = ref(true)
    const showForm = ref(false)
    const NEW_ORDINE_OBJECT = ref({
      indirizzo: '',
      nomeCampanello: '',
      orarioConsegna: '',
      metodoPagamento: '',
      zona: '',
      note: '',
    })
    const numeroCivico = ref('')
    const counts = ref({})
    const options = ref([])
    const searchText = ref('')
    const selectedOption = ref('')

    const hours = ref([19, 20, 21])
    const minutes = ref([0, 15, 30, 45])

    watch(selectedOption, (newOption) => {
      this.loadJsonData(newOption)
    })

    const getOrdiniSlot = () => {
      axios
        .get('https://patpizza-be.onrender.com/ordine/getOrdiniToday', {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        })
        .then((response) => {
          const countsData = response.data.reduce((acc, order) => {
            const slot = order.orarioConsegna
            acc[slot] = (acc[slot] || 0) + 1
            console.log(acc)
            return acc
          }, {})

          counts.value = countsData
        })
        .catch((error) => {
          console.log(error)
        })
    }

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
      hours,
      minutes,
      getOrdiniSlot,
      counts,
    }
  },
  methods: {
    newOrdine(time) {
      this.NEW_ORDINE_OBJECT.orarioConsegna = time

      axios
        .post(
          // "http://localhost:3000/ordine/newOrdine",
          'https://patpizza-be.onrender.com/ordine/newOrdine',
          this.NEW_ORDINE_OBJECT,
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((res) => {
          // console.log("risposta " + res.data);

          this.OrdineID = res.data._id
          // console.log(this.OrdineID)

          this.showForm = true
          this.showOrari = false
          this.showDashboard = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    patchOrdine(id) {
      const optionMapping = {
        1: 'GIAVENO',
        2: 'COAZZE',
        3: 'VALGIOIE',
        4: 'TRANA',
        5: 'AVIGLIANA',
      }

      const patchObject = {
        zona: optionMapping[this.selectedOption],
        indirizzo: this.NEW_ORDINE_OBJECT.indirizzo + ' ' + this.numeroCivico,
        nomeCampanello: this.NEW_ORDINE_OBJECT.nomeCampanello,
        metodoPagamento: this.NEW_ORDINE_OBJECT.metodoPagamento,
        note: this.NEW_ORDINE_OBJECT.note,
      }

      axios
        .patch(
          `https://patpizza-be.onrender.com/ordine/updateOrdine/${id}`,
          patchObject,
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              Accept: '*/*', // Specify the media type for the response
            },
          }
        )
        .then((response) => {
          this.showForm = false
          this.showPizzaView = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async loadJsonData(option) {
      try {
        let jsonFile = ''
        switch (option) {
          case '1':
            jsonFile = '/giaveno.json'
            break
          case '2':
            jsonFile = '/coazze.json'
            break
          case '3':
            jsonFile = '/valgioie.json'
            break
          case '4':
            jsonFile = '/trana.json'
            break
          case '5':
            jsonFile = '/avigliana.json'
            break
        }

        const response = await fetch(jsonFile)
        this.options = await response.json()
      } catch (error) {
        console.error('Error loading JSON data:', error)
      }
    },
    //   axios
    //     .get('https://patpizza-be.onrender.com/ordine/getOrdiniToday', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Accept: '*/*',
    //       },
    //     })
    //     .then((response) => {
    //       // Count orders for each time slot
    //       this.counts = response.data.reduce((acc, order) => {
    //         const slot = order.orarioConsegna
    //         acc[slot] = (acc[slot] || 0) + 1
    //         return acc
    //       }, {})

    //       // Log the data if you want it
    //       console.log(JSON.stringify(response.data))

    //       // Setting individual properties for each time slot
    //       this.hours.forEach((hour) => {
    //         this.minutes.forEach((minute) => {
    //           const slot = `${hour}:${minute < 10 ? '0' + minute : minute}`
    //           this[`timeSlot${hour}${minute}`] = (this.counts[slot] || 0) < 2
    //         })
    //       })
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // },
    labelColors() {
      return {
        time_green: this.time_green,
        time_red: this.time_red,
      }
    },
    timeClass(slot) {
      const count = this.counts[slot] || 0
      if (count === 0) return 'time_green'
      if (count === 1) return 'time_white'
      return 'time_red'
    },
    newOrdineHandler(time) {
      const [hour, minute] = time.split(':')
      const formattedTime = `${hour}:${String(minute).padStart(2, '0')}`
      this.NEW_ORDINE_OBJECT.orarioConsegna = formattedTime
      this.newOrdine(formattedTime)
    },
  },
  computed: {
    filteredOptions() {
      if (this.searchText === '') {
        return this.options
      } else {
        return this.options.filter((option) =>
          option.nome.toLowerCase().includes(this.searchText.toLowerCase())
        )
      }
    },
  },
  mounted() {
    this.labelColors()
    this.getOrdiniSlot()
    this.showOrari = true
  },
}
</script>

<template>
  <main>
    <div class="dashboard_clump">
      <div class="dashboard" v-if="this.showDashboard === true">
        <h1 class="title">PROSSIMI ORDINI</h1>
        <DashboardView />
      </div>

      <div class="dashboardCount">
        <h1 class="title">Riepilogo</h1>
        <div class="cards">
          <div v-for="(count, timeSlot) in counts" :key="timeSlot" class="card">
            <div class="card-time">{{ timeSlot }}</div>
            <div class="card-count">{{ count }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="orariContainer" v-if="showOrari">
      <h1 class="scegliOrario">SCEGLI ORARIO CONSEGNA</h1>
      <table>
        <tbody>
          <tr v-for="hour in hours" :key="hour">
            <td v-for="minute in minutes" :key="minute">
              <button
                :class="
                  timeClass(`${hour}:${minute < 10 ? '' + minute : minute}`)
                "
                @click="
                  newOrdineHandler(
                    `${hour}:${minute < 10 ? '' + minute : minute}`
                  )
                "
              >
                {{ hour }}:{{ minute < 10 ? '' + minute : minute }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="form" v-if="showForm === true">
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
    <div class="form_sub" v-if="this.showForm === true">
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
  padding-top: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.dashboard {
  overflow-x: scroll;
}

.dashboard_clump {
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  overflow: scroll;
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 0.5rem;
  align-items: baseline;
}

.form_sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scegliOrario {
  text-align: center;
  background-color: var(--link);
  padding: 1rem;
  font-size: 20px;
}

button {
  width: 230px;
  height: 120px;
  font-size: 3rem;
  font-weight: bold;
  border-radius: 5px;
}

button:hover {
  cursor: pointer;
  color: var(--link);
}

.form_btn {
  background-color: var(--link_light);
  color: var(--link);
  border-radius: 5px;
}

.form_btn:hover {
  background-color: var(--link);
  color: var(--red);
}

.title {
  font-size: 3rem;
  font-weight: bold;
  background-color: var(--link);
  padding: 0.5rem;
  border-radius: 5px;
  text-align: center;
}

.time_green,
.time_red {
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 15px;
}

.time_green {
  background-color: var(--green);
  color: var(--shadow);
  box-shadow: 0px 0px 20px 0px var(--green);
}

.time_red {
  background-color: var(--red);
  color: var(--white);
  box-shadow: 0px 0px 20px 0px var(--red);
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

.time_white {
  background-color: white;
}

.card-time {
  font-weight: bold;
  font-size: 18px;
}

.card-count {
  margin-top: 10px;
  font-size: 14px;
}

/* Updated media queries */
@media only screen and (max-width: 430px) {
  .orariContainer td button {
    width: 5.5rem;
  }

  .form {
    grid-template-columns: 1fr;
  }

  button {
    width: auto;
    height: auto;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .card {
    width: 120px;
    height: 90px;
  }

  .card-time {
    font-size: 16px;
  }

  .card-count {
    font-size: 12px;
  }
}
</style>
