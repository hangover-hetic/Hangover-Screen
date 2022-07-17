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
          <p v-if="this.hourIn">Dans : {{ this.HourInDate }}</p>
          <p v-if="this.hourLeft">Encore : {{ this.HourLeftDate }}</p>
          <p>Scène Saint Jean</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/data/data";
import dayjs from "dayjs";

export default {
  name: "ProgElem",
  data: () => {
    return {
      HourInDate: "",
      HourLeftDate: "",
      startTimeHour: "",
      endTimeHour: "",
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
    getDate(date) {
      return dayjs(date).format("HH:mm");
    },
  },
  mounted() {
    if (this.hourIn) {
      this.HourInDate = Math.floor(this.hourIn / 60) + ":" + (this.hourIn % 60);
    }

    if (this.hourLeft) {
      this.HourLeftDate =
        Math.floor(this.hourLeft / 60) + ":" + (this.hourLeft % 60);
    }
  },
};
</script>

<style lang="scss">
.progElem {
  flex: none;
  max-width: 100%;
  max-height: 30%;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  background: #202020;
  backdrop-filter: blur(5px);
  padding: 5px;
  margin: 30px 0 0 0;
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
        font-size: 3em;
      }
    }
  }
}
</style>
