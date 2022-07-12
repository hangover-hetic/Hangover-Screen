<template>
  <div id="imgFlux">
    <ImgFluxElement
      v-for="img in imgsArray"
      v-bind:key="img"
      :url="img.media.contentUrl"
      :text="img.message"
      :date="img.createdAt"
    />
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
      type: Array,
    },
  },
  data() {
    return {
      imgAnim: true,
      timeout: ''
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
          complete: () => {
            this.$emit("CutImgs");
            imagesToMove.forEach((img) => (img.style.transform = ""));
            this.timeout = setTimeout(() => (this.imgAnim = true), 5000);
          },
        });
      }

      window.requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.animate();
  },
  unmounted() {
    clearTimeout(this.timeout);
  }
};
</script>

<style lang="scss">
#imgFlux {
  overflow: hidden;
  background: black;
}
</style>
