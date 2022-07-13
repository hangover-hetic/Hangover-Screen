<template>
  <transition name="screens" mode="out-in" :duration="500">
    <ImgFlux v-if="state" :imgsArray="imgs" @CutImgs="dropFirstImg" />
  </transition>
</template>

<script>
import ImgFlux from "./imgFlux.vue";

export default {
  name: "ImgFluxContainer",
  components: {
    ImgFlux,
  },
  props: {
    state: {
      default: false,
      type: Boolean,
    },
    imageInfos: Object
  },
  data() {
    return {
      imgs: [],
    };
  },
  watch: {
    imageInfos(newval) {
      this.imgs.push(newval);
    },
  },
  methods: {
    dropFirstImg() {
      this.imgs = this.imgs.slice(1);
    },
  },
};
</script>
