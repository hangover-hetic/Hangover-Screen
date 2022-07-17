<template>
  <div class="sponsor">
    <img v-if="imgUrl" :src="baseImgUrl + imgSponsorUrl" alt="" />
    <p v-else v-html="name"></p>
  </div>
</template>

<script lang="ts">
import imgUrl from "@/data/data";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Sponsor",
  props: {
    name: {
      default: "default",
      type: String,
    },
    imgSponsorUlr: {
      default: "default",
      type: String,
    },
  },
  data() {
    return {
      baseImgUrl: imgUrl,
    };
  },
});
</script>

<style lang="scss"></style>
