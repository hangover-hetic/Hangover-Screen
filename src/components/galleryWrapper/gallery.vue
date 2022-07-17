<template>
  <div id="gallery">
    <TransitionElem />
    <div class="gallery-wrapper" ref="galleryWrapper">
      <GalleryElement v-for="img in gallery" :key="img" :url="img.contentUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import TransitionElem from "@/components/transitions/transitionsElem.vue";
import GalleryElement from "./galleryElement.vue";

import anime from "animejs";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Galery",
  components: {
    TransitionElem,
    GalleryElement,
  },
  props: {
    gallery: Array,
  },
  mounted() {
    var timeline = anime.timeline({
      easing: "easeOutExpo",
      duration: 1500,
    });

    for (var i = 0; i < this.gallery!.length; i++) {
      timeline.add({
        targets: this.$refs.galleryWrapper as HTMLCollection,
        translateX: - 100 * i + "vw",
      }, '+=3000');
    }

    timeline.play();
  },
});
</script>

<style lang="scss">
#gallery {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  .gallery-wrapper {
    height: 100%;
    display: flex;
    width: max-content;
  }
}
</style>
