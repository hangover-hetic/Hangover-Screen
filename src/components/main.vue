<template>
  <div id="main">
    <div class="festivalName">
      <p v-html="festName" ></p>
      <img :src="baseLinkUrl + festLogoUrl" alt="" />
    </div>
    <div class="festivalSponsors">
      <Sponsor v-for="sponsor in festSponsors" :key="sponsor" :name="sponsor.name" :imgSponsorUlr="sponsor.logo" />
    </div>
  </div>
</template>

<script>
import imgUrl from '@/data/data';

import Sponsor from './infosFestival/sponsor.vue'

export default {
  name: "Main",
  components: {
    Sponsor
  },
  props: {
    festName: String,
    festLogoUrl: String,
    festSponsors: Array
  },
  data() {
    return{
      baseLinkUrl: imgUrl
    }
  },
  methods: {},
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
  z-index: 5;
  .festivalName{
    width: 30vw;
    height: 20vh;
    background: white;
    border-radius: 0 0 25px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 10px;
    position: absolute;
    left: 0;
    top: 0;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .festivalSponsors{
    background: white;
    width: 30vw;
    height: 20vh;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    border-radius: 0 0 0 25px;
    >*{
      width: 100%;
    }
  }
}
</style>
