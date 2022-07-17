<template>
  <div ref="imgFlux" class="imgFluxElement">
    <img :src="baseImageUrl + url" alt="" />
    <div class="infos-img">
      <div class="name-container">
        <p v-html="user.firstName"></p>
        <p v-html="user.lastName"></p>
      </div>
      <p v-if="text" v-html="text"></p>
      <p>Il y a {{ this.getDateInForm(this.date) }} minutes</p>
    </div>
  </div>
</template>

<script lang="ts">
import imgUrl from "@/data/data";

import dayjs from "dayjs";

import { defineComponent } from "vue";

export default defineComponent({
  name: "ImgFluxElement",
  data: () => {
    return {
      baseImageUrl: imgUrl,
    };
  },
  props: {
    url: String,
    text: String,
    date: String,
    user: Object,
  },
  methods: {
    getDateInForm(date: string) {
      return dayjs(date).diff(dayjs(), "minute");
    },
  },
  mounted() {
    (this.$refs.imgFlux as HTMLElement).style.backgroundImage =
      "url(" + this.baseImageUrl + this.url + ")";
  },
});
</script>

<style lang="scss">
.imgFluxElement {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-position: center;
  background-size: cover;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .infos-img{
    position: absolute;
    left: 0;
    bottom: 5%;
    background: rgba($color: #000000, $alpha: 0.8);
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .name-container{
      display: flex;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
  }
  > * {
    z-index: 1;
  }
}
</style>
