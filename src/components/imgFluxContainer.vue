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
    number: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      imgs: [{ number: 0 }],
    };
  },
  watch: {
    number(newval, oldVal) {
      console.log(newval, oldVal);
      this.imgs.push({ number: newval });
      console.log(this.imgs);
    },
  },
  methods: {
    dropFirstImg() {
      this.imgs = this.imgs.slice(1);
    },
  },
};
</script>
