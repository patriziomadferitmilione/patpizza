<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  data() {
    const ordini = ref([])

    return {
      ordini,
    }
  },

  methods: {
    getOrdini() {
      const today = new Date().toISOString().split('T')[0] // Get today's date in the format 'YYYY-MM-DD'
      const twoAndHalfHoursBefore = new Date()
      twoAndHalfHoursBefore.setHours(twoAndHalfHoursBefore.getHours() - 2)
      twoAndHalfHoursBefore.setMinutes(twoAndHalfHoursBefore.getMinutes() - 30)

      axios
        .get('https://patpizza-be.onrender.com/ordine/getOrdini', {
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            Accept: '*/*', // Specify the media type for the response
          },
        })
        .then((response) => {
          const filteredOrdini = response.data.filter((ordine) => {
            const createdAt = new Date(ordine.createdAt)
            const orarioConsegna = new Date(
              today + 'T' + ordine.orarioConsegna + ':00Z'
            )

            return (
              createdAt.toISOString().split('T')[0] === today &&
              orarioConsegna >= twoAndHalfHoursBefore
            )
          })

          const sortedOrdini = filteredOrdini.sort((a, b) => {
            if (a.orarioConsegna < b.orarioConsegna) return -1
            if (a.orarioConsegna > b.orarioConsegna) return 1
            if (a.zona < b.zona) return -1
            if (a.zona > b.zona) return 1
            return 0
          })

          this.ordini = sortedOrdini
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getOrdini()
  },
}
</script>

<template>
  <div class="ordineContainer">
    <div v-for="ordine in ordini" :key="ordine._id" class="ordine">
      <span class="zona" v-if="ordine.zona === '1'"> GIAVENO </span>
      <span class="zona" v-else-if="ordine.zona === '2'"> COAZZE </span>
      <span class="zona" v-else-if="ordine.zona === '3'"> VALGIOIE </span>
      <span class="zona" v-else-if="ordine.zona === '4'"> TRANA </span>
      <span class="zona" v-else-if="ordine.zona === '5'"> AVIGLIANA </span>
      <span class="orario">
        {{ ordine.orarioConsegna }}
      </span>
      <span class="indirizzo">
        {{ ordine.indirizzo }}
      </span>
      <span class="pagamento">
        {{ ordine.metodoPagamento }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.ordineContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: scroll;
  overflow: scroll;
}

.ordine {
  border: 3px solid var(--link_light);
  width: 3rem;
  height: 5rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: radial-gradient(circle farthest-side, #fceabb, #f8b500);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

@media only screen and (max-width: 430px) {
  .ordineContainer {
    overflow-x: scroll;
  }

  .ordine {
    height: 200px;
    width: 130px;
  }
}
</style>
