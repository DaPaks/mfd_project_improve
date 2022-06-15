<template>
  <button @click="() => TogglePopup('buttonTrigger')">Open Popup</button>
  <PopUp v-if="popupTriggers.buttonTrigger" 
  :TogglePopup="() => TogglePopup('buttonTrigger')">
    <h2>Popup</h2>
  </PopUp>
</template>

<script>
import PopUp from './components/PopUp.vue'
export default {
    components: {
        PopUp
    },
    setup () {
    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      popupTriggers,
      TogglePopup
    }
  }
}
</script>

<style>

</style>