<script setup>
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

    <form action="">
     
      <label for="zona">Zona</label>
      <select name="zona" id="zona">
        <option value="1">GIAVENO</option>
        <option value="2">COAZZE</option>
        <option value="3">VALGIOIE</option>
        <option value="4">TRANA</option>
      </select>
      <label for="orario">Orario Consegna</label>
      <select name="orario" id="orario">
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
      <label for="indirizzo">Indirizzo</label>
      <input name="indirizzo" type="text">
      <label for="note">Note</label>
      <textarea name="note" id="note" cols="30" rows="10"></textarea>
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