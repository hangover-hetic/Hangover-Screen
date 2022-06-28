<template>
  <div ref="imgFlux" class="imgFluxElement">
    <img :src="src" alt="" />
    <p v-html="number"></p>
  </div>
</template>

<script>
export default {
  name: "ImgFluxElement",
  data: () => {
    return {
      src: "https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg",
    };
  },
  props: {
    number: {
      type: Number,
      default: 5,
    },
  },
  mounted() {
    this.$refs.imgFlux.style.backgroundImage = "url(" + this.src + ")";
  },
};
</script>

<style lang="scss">
.imgFluxElement {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-position: center;
  background-size: cover;
  img {
    max-width: 100%;
    height: 100%;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
  }
  > * {
    z-index: 1;
  }
}
</style>
