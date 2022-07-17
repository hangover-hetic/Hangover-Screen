<template>
  <div class="sponsors-wrapper" ref="sponsors">
    <div class="sponsors-container" ref="container">
      <Sponsor
        v-for="sponsor in sponsors"
        :key="sponsor"
        :name="sponsor.name"
        :imgSponsorUlr="sponsor.logo"
        ref="sponsor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Sponsor from "./sponsor.vue";

import anime from "animejs";

export default defineComponent({
  name: "Sponsors",
  components: {
    Sponsor,
  },
  props: {
    sponsors: Array,
    number: {
      default: 1,
    },
  },
  methods: {
    // eslint-disable-next-line no-undef
    getLargestComponent(list: NodeListOf<Element>) {
      var largestWidth = 0;
      var listElement = Array.from(list);
      listElement.forEach((element) => {
        element.clientWidth > largestWidth
          ? (largestWidth = element.clientWidth)
          : "";
      });
      return largestWidth;
    },
    createTimeline(width: number) {
      var timeline = anime.timeline({
        easing: "easeOutExpo",
        duration: 2000,
        loop: true,
      });

      var timeToMove = 0;

      if (
        Math.round(this.sponsors!.length / this.number) ===
        this.sponsors!.length / this.number
      ) {
        timeToMove = this.sponsors!.length / this.number;
      } else if (
        Math.round(this.sponsors!.length / this.number) !==
        this.sponsors!.length / this.number
      ) {
        timeToMove = Math.trunc(this.sponsors!.length / this.number) + 1;
      }

      for (var i = 0; i < timeToMove; i++) {
        timeline.add(
          {
            targets: this.$refs.container as HTMLElement,
            translateX: -width * this.number * i + 1,
          },
          "+=2000"
        );
      }

      timeline.add(
        {
          targets: this.$refs.container as HTMLElement,
          translateX: 0,
        },
        "+=2000"
      );

      timeline.play();
    },
    setWidth() {
      var sponsors = this.$refs.sponsors as HTMLElement;
      var elements = sponsors.querySelectorAll(".sponsor");
      var largestWidth = this.getLargestComponent(elements);
      var idContainer = Math.floor(Math.random() * 1000);
      (this.$refs.sponsors as HTMLElement).id = idContainer.toString();

      var wrapper = document.getElementById(idContainer.toString());

      wrapper!.style.width = largestWidth * this.number + "px";
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      wrapper!.querySelector(".sponsors-container").style.width =
        largestWidth * elements.length + "px";
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      wrapper!.querySelectorAll(".sponsor").forEach((element: HTMLElement) => {
        element.style.width = largestWidth + "px";
      });

      this.createTimeline(largestWidth);
    },
  },
  mounted() {
    var interval = setInterval(() => {
      if (document.readyState === "complete") {
        this.setWidth();
        clearInterval(interval);
      }
    }, 1000);
  },
});
</script>

<style lang="scss" scoped>
.sponsors-wrapper {
  overflow: hidden;
  .sponsors-container {
    display: flex;
    flex-wrap: nowrap;
    & > div {
      display: flex;
      justify-content: center;
      padding: 0 10px;
    }
  }
}
</style>
