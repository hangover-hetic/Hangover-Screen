<template>
  <div class="gallery-img-container">
    <img :src="imgBaseUrl + url" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import imgUrl from "@/data/data";

export default defineComponent({
  name: "GalleryElement",
  props: {
    url: String,
  },
  data() {
    return {
      imgBaseUrl: imgUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
    .gallery-img-container{
        width: 100vw;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            max-height: 100%;
            max-width: 100%;
        }
    }
</style>
