<template>
  <div id="imgFlux">
    <ImgFluxElement v-for="img in imgs" v-bind:key="img" :number="img.number" />
  </div>
</template>

<script>
import ImgFluxElement from "@/components/imgWrapper/imgFluxElement.vue";
import anime from "animejs";

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
  data() {
    return {
      imgs: [{ number: 0 }],
      imgAnim: true,
    };
  },
  methods: {
    animate() {
      if (this.imgs.length > 1 && this.imgAnim) {
        this.imgAnim = false;
        anime({
          targets: ".imgFluxElement",
          translateY: "-100%",
          easing: 'easeInOutQuad',
          complete: () => {
            this.imgs = this.imgs.slice(1);
            document
              .querySelectorAll(".imgFluxElement")
              .forEach((img) => (img.style.transform = ""));
            setTimeout(() => (this.imgAnim = true), 5000);
          },
        });
      }

      window.requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.animate();
  },
  watch: {
    number(newval, oldVal) {
      console.log(newval, oldVal);
      this.imgs.push({ number: newval });
      console.log(this.imgs);
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background: black;
}
</style>
