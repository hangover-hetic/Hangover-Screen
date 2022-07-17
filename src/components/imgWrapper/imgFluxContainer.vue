<template>
  <CustomTransition>
    <ImgFlux
      v-if="state === 'flux'"
      :imgsArray="imgs"
      @CutImgs="dropFirstImg"
      @noMoreFlux="this.$emit('noMoreFlux')"
    />
  </CustomTransition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ImgFlux from "./imgFlux.vue";
import CustomTransition from "@/components/transitions/transitions.vue";

export default defineComponent({
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
      imgs: [] as Array<Object>,
    };
  },
  watch: {
    imageInfos(newval: Object) {
      this.imgs.push(newval);
    },
  },
  methods: {
    dropFirstImg() {
      this.imgs = this.imgs.slice(1);
      if (this.imgs.length < 2) {
        this.$emit("noMoreFlux");
      }
    },
  },
});
</script>
