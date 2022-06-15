<template>
  <div class="modalOverlay">
    <div class="modalOverlay__infoBox infoBox">
      <p class="infoBox__text">Swap a shortcut with <span>{{this.$store.state.shortcutRouteTemp.shortcut_name}} </span>?</p>

      <!-- Loop igennem alle shortcuts og binder værdien -->
      <select class="infoBox__select" size="4" v-model="selected">
        <option class="infoBox__option" v-for="item in this.$store.state.userShortcuts" :key="item.shortcut_id" :value="item.shortcut_route">{{ item.shortcut_name }}</option>
      </select>

      <!-- Ved brug af $event kan man bruge samme funktion, men tjekke hvad for en knap, der blev trykt på -->
      <button @click="shortcutModal($event)" class="infoBox__addBtn gradient-button">Swap</button>
      <button @click="shortcutModal($event)" class="infoBox__cancelBtn">Cancel</button>
      
    </div>
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit.js'
import {  doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import userShortcuts from '@/assets/mixins/userShortcuts'

export default {
  name: 'shortcutModal',
  mixins: [userShortcuts],
  data() {
    return {
      selected: '',
      data: this.$store.state.userData,
      user_shortcuts: [],
      shortcutTemp:'',
      updateShortcuts:'',
      userData:[],
      updatedData: this.$store.state.userDataUpdate
    }
  },
  created(){

    this.getUserShortcuts(this.$store.state.userData)
    // db.collection('userInfo').onSnapshot(result => {
    //   const changes = result.docChanges();

    //   changes.forEach(change => {
    //     if(change.type === 'added'){
    //       this.userData.push({
    //         ...change.doc.data(),
    //         id: change.doc.id
    //       })
    //     }
    //   })
    // })
  },
  watch: {
        'updatedData': function (){
            this.getUserShortcuts(this.$store.state.userData)
        }
  }, // mounted end
  methods: {
    
    
    // Funktion til at styre, hvad der skal ske, når man trykker på 1 af knapperne
    async shortcutModal(e){
      // når der trykkes på en knap, bliver denne værdi false, hvilke lukker modal 
      
      // her tjekker vi på $event, hvilken knap der er trykket på
      if(e.target.innerHTML === 'Cancel'){
        // ved cancel rydder vi op i vores variable, så de er tomme igen.
        this.$store.state.shortcutRouteTemp = ''
        this.$store.state.shortcutName = ''
        this.$store.state.modalOpen = false
      }
      if(e.target.innerHTML === 'Swap'){
        if(this.selected !== ''){
          this.shortcutTemp =  this.$store.state.userShortcuts.find(item => item.shortcut_route === this.selected)

        const shortcutRef = doc(db, "userinfo", this.data.user_id);
        
        // Atomically remove a region from the "regions" array field.
        await updateDoc(shortcutRef, {
            user_shortcuts: arrayRemove(this.shortcutTemp.id)
        });

        await updateDoc(shortcutRef, {
          user_shortcuts: arrayUnion(this.$store.state.shortcutRouteTemp.id)
        });
        // når alt er byttet ud, rydder vi op i vores variabler så de er tomme igen.
        this.$store.state.shortcutRouteTemp = ''
        this.$store.state.shortcutName = ''
        this.$store.state.modalOpen = false
        this.shortcutTemp = ''
        }else{
          console.log('select to swap')
        }
        
      } // if swap end
    } // shortcutModal end
  } // methods end
}
</script>

<style lang="scss">

</style>