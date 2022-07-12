<template>
  <div id="prog">
    <ProgElem
      v-for="show in showsNow"
      :key="show"
      :name="show.name"
      :img="show.image.contentUrl"
      :startTime="show.startTime"
      :endTime="show.endTime"
      :hourLeft="show.encore"
    />
    <br />
    <ProgElem
      v-for="show in showsNext"
      :key="show"
      :name="show.name"
      :img="show.image.contentUrl"
      :startTime="show.startTime"
      :endTime="show.endTime"
      :hourIn="show.in"
    />
  </div>
</template>

<script>
import ProgElem from "@/components/progWrapper/progElement.vue";

import dayjs from "dayjs";

export default {
  name: "Prog",
  components: {
    ProgElem,
  },
  props: {
    festProgs: Array
  },
  data() {
    return {
      showsPast: [],
      showsNow: [],
      showsNext: [],
    };
  },
  mounted() {
    const now = dayjs();
    console.log(this.festProgs);
    var progs = [...this.festProgs];
    progs.forEach((element) => {
      if (dayjs(element.endTime).isBefore(now)) {
        console.log("fini");
        this.showsPast.push(element);
      } else if (dayjs(element.startTime).isBefore(now)) {
        console.log("now");
        element.encore = dayjs(element.endTime).diff(now, 'minute');
        this.showsNow.push(element);
      } else {
        console.log("après");
        element.in = dayjs(element.startTime).diff(now, 'minute');
        this.showsNext.push(element);
      }
    });

    console.log(this.showsPast, this.showsNow, this.showsNext);
  },
};
</script>

<style lang="scss">
#prog {
  padding: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-x: hidden;
}
</style>
