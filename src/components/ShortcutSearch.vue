<template>
  <div>
    <!-- Med v-model lave vi en 2-way binding, så vi for den opdateret værdi fra input feltet -->
    <!-- den binder vi til vores searchQuery property i data() -->
    <input class="shortcut-search" type="text" v-model="searchQuery" placeholder="Search shortcut" />

    <!--  -->
    <select
      class="shortcutSelector"
      v-if="resultQuery !== null"
      v-model="selected"
      :size="resultQuery.length + 1"
    >
      <option
        class="shortcutSelector__shortcutItem"
        selected
        v-for="r of resultQuery"
        :key="r.shortcut_id"
        :value="r.shortcut_name"
        @click="
          clearSearch(); // funktion der ryder vores søgning
          shortcutModal(); // funktion der åbner vores modal
          sendShortcutValue(); // funktion der sender og gemmer den valgte shortcut
        "
      >
        {{ r.shortcut_name }}
      </option>
    </select>
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit.js'
import { getDocs, collection } from 'firebase/firestore';

export default {
  name: 'shortcutSearch',
  data() {
    return {
      shortcuts: [],
      myData: null,
      searchQuery: null, // laver en tom property til søgning-
      selected: '',
      shortcutRoute: '',
      openModal: ''
    }
  },

  computed: {
    // Result funktion. Tjekker vores indtastning op imod vores data
    resultQuery() {
      // en hurtigt if else til at tjekke der bliver søgt på noget
      if (this.searchQuery) {
        // Filter laver en ny array, der indholder det, der stemmer overens med indtastning.
        return this.shortcuts.filter((item) => {
          return this.searchQuery 
            .toLowerCase() // sætter søgning til lowercase
            .split(" ") // splitter vores string op, så vi kan match på hvert bogstav
            .every((v) => item.shortcut_name.toLowerCase().includes(v)) // Sætter dataen til lowercase. finder hver title der inkludere noget fra søgningen
        });
      } else {
        return null; // retunere ingenting, hvis der ikke er søgt på noget.
      }
    }
  },
  methods: {
    clearSearch() {
      // rydder vores søgning
      this.searchQuery = null

    },
    shortcutModal() {
      // modalOpen til true, der viser modal
      this.$store.state.modalOpen = true
    },
    sendShortcutValue() {
      // Vi den shortcut vi vil vælge ved at match på navn og gemmer den i en temp variable i store
      this.$store.state.shortcutRouteTemp = this.shortcuts.find(item => item.shortcut_name === this.selected)
    }

  },
  mounted(){
    getDocs(collection(db, 'shortcuts')).then((snapshot) => {

      snapshot.docs.forEach((doc) => {
        this.shortcuts.push({...doc.data(), id: doc.id})
      })

    })
  }
}
</script>
