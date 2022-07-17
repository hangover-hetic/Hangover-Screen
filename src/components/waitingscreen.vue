<template>
  <div>
    <TransitionElem />
    <div class="waiting-container">
      <h1>{{ festival.festName }}</h1>
      <img :src="imgBaseUrl + festival.festLogoUrl" alt="" />
      <div class="sponsors-section">
        <h3>Nos sponsors :</h3>
        <Sponsors :sponsors="festival.festSponsors" :number="2" />
      </div>
      <div class="date">
        <p v-html="getDate(festival.festDate.startDate)"></p>
        <p style="margin: 0 10px 0 10px">-</p>
        <p v-html="getDate(festival.festDate.endDate)"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TransitionElem from "@/components/transitions/transitionsElem.vue";
import imgUrl from "@/data/data";
import Sponsors from "@/components/infosFestival/sponsorsWrapper.vue";

import dayjs from "dayjs";

export default defineComponent({
  name: "WaitingScreen",
  components: {
    TransitionElem,
    Sponsors,
  },
  data() {
    return {
      imgBaseUrl: imgUrl,
    };
  },
  props: {
    festival: Object,
  },
  methods: {
    getDate(date: string) {
      return dayjs(date).format("dddd D MMMM YYYY");
    },
  },
});
</script>

<style lang="scss">
.waiting-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10% 0 8% 0;
  h1 {
    text-transform: uppercase;
    font-size: 4em;
  }
  img {
    max-width: 90vw;
  }
  .date {
    display: flex;
  }
  h3{
    text-align: center;
  }
}
</style>
