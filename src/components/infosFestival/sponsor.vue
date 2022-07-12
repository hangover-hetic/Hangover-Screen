<template>
  <div class="sponsor">
    <img v-if="imgUrl" :src="baseImgUrl + imgSponsorUrl" alt="" />
    <p v-else v-html="name"></p>
  </div>
</template>

<script>
import imgUrl from "@/data/data";

export default {
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
};
</script>

<style lang="scss"></style>
