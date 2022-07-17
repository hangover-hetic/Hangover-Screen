<template>
  <div id="prog">
    <TransitionElem />
    <div class="before" v-if="showsPast.length >= 1 && showsNow.length < 1 && showsNext.length < 1">
      <h2>C'est fini !</h2>
      <ProgElem
        v-for="show in showsPast.slice(-3)"
        :key="show"
        :name="show.name"
        :img="show.image ? show.image.contentUrl : ''"
        :startTime="show.startTime"
        :endTime="show.endTime"
      />
    </div>
    <div class="now" v-if="showsNow.length >= 1">
      <h2>En ce moment</h2>
      <ProgElem
        v-for="show in showsNow.slice(-3)"
        :key="show"
        :name="show.name"
        :img="show.image ? show.image.contentUrl : ''"
        :startTime="show.startTime"
        :endTime="show.endTime"
        :hourLeft="show.encore"
      />
    </div>
    <br />
    <div class="next" v-if="showsNext.length >= 1">
      <h2>A suivre</h2>
      <ProgElem
        v-for="show in showsNext.slice(- 3 - showsNow.lenght)"
        :key="show"
        :name="show.name"
        :img="show.image ? show.image.contentUrl : ''"
        :startTime="show.startTime"
        :endTime="show.endTime"
        :hourIn="show.in"
      />
    </div>
  </div>
</template>

<script>
import ProgElem from "@/components/progWrapper/progElement.vue";
import TransitionElem from "@/components/transitions/transitionsElem.vue";

import dayjs from "dayjs";

export default {
  name: "Prog",
  components: {
    ProgElem,
    TransitionElem,
  },
  props: {
    festProgs: Array,
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
        element.encore = dayjs(element.endTime).diff(now, "minute");
        this.showsNow.push(element);
      } else {
        console.log("après");
        element.in = dayjs(element.startTime).diff(now, "minute");
        this.showsNext.push(element);
      }
    });

    console.log(this.showsPast, this.showsNow, this.showsNext);
  },
};
</script>

<style lang="scss">
#prog {
  padding: 12% 0 5% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: hidden;
  h2{
    text-align: center;
    font-size: 3.3em;
    text-transform: uppercase;
  }
}
</style>
