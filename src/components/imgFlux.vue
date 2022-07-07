<template>
  <div id="imgFlux">
    <ImgFluxElement v-for="img in imgsArray" v-bind:key="img" :number="img.number" />
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
    imgsArray: {
      type: Array
    }
  },
  data() {
    return {
      imgAnim: true,
    };
  },
  methods: {
    animate() {
      if (this.imgsArray.length > 1 && this.imgAnim) {
        this.imgAnim = false;
        anime({
          targets: ".imgFluxElement",
          translateY: "-100%",
          easing: 'easeInOutQuad',
          complete: () => {
            this.$emit('CutImgs')
            document
              .querySelectorAll(".imgFluxElement")
              .forEach((img) => (img.style.transform = ""));
            setTimeout(() => (this.imgAnim = true), 8000);
          },
        });
      }

      window.requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.animate();
  },
};
</script>

<style lang="scss">
#imgFlux {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background: black;
}
</style>
