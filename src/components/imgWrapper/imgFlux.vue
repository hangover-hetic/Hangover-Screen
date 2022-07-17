<template>
  <div id="imgFlux">
    <TransitionElem />
    <ImgFluxElement
      v-for="img in imgsArray"
      v-bind:key="img"
      :url="img.media.contentUrl"
      :text="img.message"
      :date="img.createdAt"
      :user="img.relatedUser"
    />
  </div>
</template>

<script>
import ImgFluxElement from "@/components/imgWrapper/imgFluxElement.vue";
import TransitionElem from "@/components/transitions/transitionsElem.vue";
import anime from "animejs";

export default {
  name: "ImgFlux",
  components: {
    ImgFluxElement,
    TransitionElem,
  },
  props: {
    imgsArray: {
      type: Array,
    },
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
        const images = document.querySelectorAll(".imgFluxElement");
        const imagesToMove = Array.from(images).slice(0, 2);
        anime({
          targets: imagesToMove,
          translateY: "-100%",
          easing: "easeInOutQuad",
          delay: 5000,
          duration: 300,
          complete: () => {
            this.$emit("CutImgs");
            imagesToMove.forEach((img) => (img.style.transform = ""));
            this.imgAnim = true;
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
  background: black;
}
</style>
