<template>
  <div id="imgFlux">
      <ImgFluxElement :number="number" />
  </div>
</template>

<script>
import ImgFluxElement from "@/components/imgWrapper/imgFluxElement.vue";

export default {
  name: "ImgFlux",
  components: {
    ImgFluxElement,
  },
  props: {
    number: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style lang="scss">
#imgFlux {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 9;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}
</style>
