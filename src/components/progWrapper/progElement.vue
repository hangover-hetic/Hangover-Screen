<template>
  <div class="progElem">
    <div class="img-wrapper" v-if="img">
      <img :src="baseImgUrl + img" alt="" />
      <div class="infos-wrapper">
        <h3>{{ name }}</h3>
        <div>
          <p>
            {{ this.getDate(this.startTime) }} -
            {{ this.getDate(this.endTime) }}
          </p>
          <p v-if="this.hourIn">
            Dans : {{ this.getTimeLeft(this.startTime) }}
          </p>
          <p v-if="this.hourLeft">
            Encore : {{ this.getTimeLeft(this.endTime) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import imgUrl from "@/data/data";
import dayjs from "dayjs";

import { defineComponent } from "vue";

export default defineComponent({
  name: "ProgElem",
  data: () => {
    return {
      baseImgUrl: imgUrl,
    };
  },
  props: {
    name: String,
    img: String,
    hourIn: Number,
    hourLeft: Number,
    startTime: String,
    endTime: String,
  },
  methods: {
    getDate(date: string) {
      return dayjs(date).format("HH:mm");
    },
    getTimeLeft(date: string) {
      var delta = dayjs(date).diff(dayjs(), "minute");
      var hour = Math.floor(delta / 60);
      var minute = Math.floor(delta % 60);
      var hourString = "";
      var minuteString = "";

      if (hour < 1) {
        hourString = "";
      } else if (hour === 1) {
        hourString = hour + " heure";
      } else if (hour > 1) {
        hourString = hour + " heures";
      }

      if (minute < 1) {
        minuteString = "";
      } else if (minute === 1) {
        minuteString = minute + " minute";
      } else if (minute > 1) {
        minuteString = minute + " minutes";
      }

      return hourString + ' ' + minuteString;
    },
  },
});
</script>

<style lang="scss">
.progElem {
  flex: none;
  max-width: 100%;
  max-height: 30vh;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  background: #202020;
  backdrop-filter: blur(5px);
  padding: 5px;
  margin: 15px 0 0 0;
  .img-wrapper {
    height: 100%;
    width: 80vw;
    max-height: 23vh;
    max-width: 80vw;
    overflow: hidden;
    border-radius: 15px;
    img {
      width: 100%;
    }
    .infos-wrapper {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      background: linear-gradient(0deg, rgba(0, 0, 0, 1), transparent);
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 20px;
      h3 {
        font-size: 2.5em;
      }
    }
  }
}
</style>
