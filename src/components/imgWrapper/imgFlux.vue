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

<script lang="ts">
import { defineComponent } from "vue";
import ImgFluxElement from "@/components/imgWrapper/imgFluxElement.vue";
import TransitionElem from "@/components/transitions/transitionsElem.vue";
import anime from "animejs";

export default defineComponent({
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
      timeout: 0,
    };
  },
  methods: {
    animate() {
      if (this.imgsArray!.length > 1 && this.imgAnim) {
        this.imgAnim = false;
        const images = document.querySelectorAll(".imgFluxElement");
        const imagesToMove = Array.from(images).slice(0, 2);
        anime({
          targets: imagesToMove,
          translateY: "-100%",
          easing: "easeInOutQuad",
          complete: () => {
            this.$emit("CutImgs");
            imagesToMove.forEach((img: any) => (img.style.transform = ""));
            this.timeout = setTimeout(() => (this.imgAnim = true), 5000);
          },
        });
      }

      window.requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.animate();
    if (this.imgsArray!.length < 2) {
      this.$emit("noMoreFlux");
    }
  },
  unmounted() {
    clearTimeout(this.timeout);
  },
});
</script>

<style lang="scss">
#imgFlux {
  overflow: hidden;
  background: black;
}
</style>
