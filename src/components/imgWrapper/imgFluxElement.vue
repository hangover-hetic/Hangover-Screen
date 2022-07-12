<template>
  <div ref="imgFlux" class="imgFluxElement">
    <img :src="baseImageUrl + url" alt="" />
    <p v-html="text"></p>
  </div>
</template>

<script>
import imgUrl from '@/data/data';

export default {
  name: "ImgFluxElement",
  data: () => {
    return {
      baseImageUrl: imgUrl
    };
  },
  props: {
    url: String,
    text: String,
    date: String
  },
  mounted() {
    this.$refs.imgFlux.style.backgroundImage = "url(" + this.baseImageUrl + this.url + ")";
  },
};
</script>

<style lang="scss">
.imgFluxElement {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-position: center;
  background-size: cover;
  img {
    max-width: 100%;
    max-height: 100%;
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
