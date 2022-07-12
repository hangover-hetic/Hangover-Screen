<template>
  <div class="progElem">
    <div class="img-wrapper">
      <img v-if="img" :src="baseImgUrl + img" alt="" />
    </div>
    <div class="infos-wrappe">
      <p>{{ name }}</p>
      <p>{{ this.startTimeHour }} - {{ this.endTimeHour }}</p>
      <p v-if="this.hourIn">Dans : {{ this.HourInDate }}</p>
      <p v-if="this.hourLeft">Encore : {{ this.HourLeftDate }}</p>
      <p>Scène Saint Jean</p>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/data/data"
import dayjs from "dayjs";

export default {
  name: "ProgElem",
  data: () => {
    return {
      HourInDate: "",
      HourLeftDate: "",
      startTimeHour: "",
      endTimeHour: "",
      baseImgUrl: imgUrl
    };
  },
  props: {
    name: String,
    img: String,
    startTime: String,
    endTime: String,
    hourIn: Number,
    hourLeft: Number,
  },
  mounted() {
    this.startTimeHour = dayjs(this.startTime).format("HH:mm");
    this.endTimeHour = dayjs(this.endTime).format("HH:mm");

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
  background: #d3d3d3;
  padding: 5px;
  .img-wrapper {
    height: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 15px;
    margin-right: 15px;
    img {
      width: 100%;
    }
  }
}
</style>
