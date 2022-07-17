<template>
  <CustomTransition>
    <ImgFlux
      v-if="state === 'flux'"
      :imgsArray="imgs"
      @CutImgs="dropFirstImg"
    />
  </CustomTransition>
</template>

<script>
import ImgFlux from "./imgFlux.vue";
import CustomTransition from "@/components/transitions/transitions.vue";

export default {
  name: "ImgFluxContainer",
  components: {
    ImgFlux,
    CustomTransition,
  },
  props: {
    state: {
      default: false,
      type: Boolean,
    },
    imageInfos: Object,
  },
  data() {
    return {
      imgs: [],
    };
  },
  watch: {
    imageInfos(newval) {
      this.imgs.push(newval);
    },
  },
  mounted() {
    console.log(this.imgs.length);
    if (this.imgs.length < 2) {
      console.log(this.imgs.length);
      this.$emit("noMoreFlux");
    }
  },
  methods: {
    dropFirstImg() {
      this.imgs = this.imgs.slice(1);
      if (this.imgs.length < 2) {
        console.log(this.imgs.length);
        this.$emit("noMoreFlux");
      }
    },
  },
};
</script>
