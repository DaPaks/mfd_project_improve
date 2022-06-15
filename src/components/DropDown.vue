<template>
  <div class="dropdown" @click="isOpen = !isOpen">
      <button>More Information</button>
      <div class="foldOut" v-if="isOpen">
          <h3>Lorem Ipsum</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo fugiat numquam minus voluptate consequatur expedita nesciunt omnis, rem tempora deleniti, in nam facere error quis excepturi soluta cumque sunt ab.</p>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    }
}
</script>

<style>

</style>