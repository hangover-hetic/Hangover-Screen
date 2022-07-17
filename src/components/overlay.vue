<template>
  <div id="main">
    <div class="festivalName">
      <img :src="baseLinkUrl + festLogoUrl" alt="" />
      <p v-html="festName"></p>
    </div>
    <div class="festivalSponsors">
      <Sponsors :sponsors="festSponsors" :number="1" />
    </div>
  </div>
</template>

<script>
import imgUrl from "@/data/data";

import Sponsors from "./infosFestival/sponsorsWrapper.vue";

export default {
  name: "Overlay",
  components: {
    Sponsors,
  },
  props: {
    festName: String,
    festLogoUrl: String,
    festSponsors: Array,
  },
  data() {
    return {
      baseLinkUrl: imgUrl,
      indexSponsor: 0,
    };
  },
  methods: {
    changeIndex() {
      this.indexSponsor < this.festSponsors.length - 1
        ? this.indexSponsor++
        : (this.indexSponsor = 0);

      setTimeout(this.changeIndex, 5000);
    },
  },
  mounted() {
    setTimeout(this.changeIndex, 5000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#main {
  background: transparent !important;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  & > div {
    background: #202020;
    box-shadow: 2px 3px 10px rgba($color: #000000, $alpha: 0.3);
  }
  .festivalName {
    border-radius: 0 0 25px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 30px;
    position: absolute;
    left: 0;
    top: 0;
    img {
      max-width: 100px;
      max-height: 100px;
      margin-right: 20px;
    }
  }
  .festivalSponsors {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    padding: 30px;
    align-items: center;
    border-radius: 0 0 0 25px;
  }
}
</style>
