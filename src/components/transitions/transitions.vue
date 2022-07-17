<template>
  <transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    :duration="800"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import anime from "animejs";

export default defineComponent({
  name: "CustomTransition",
  methods: {
    onBeforeEnter(el: HTMLElement) {
      el.style.opacity = "0";
      el.querySelectorAll(".transitionElement>.div").forEach((element: any) => {
        element.style.height = "100%";
      });
    },
    onEnter(el: HTMLElement) {
      setTimeout(() => {
        el.style.opacity = '1';
        anime({
          targets: el.querySelectorAll(".transitionElement>.div"),
          height: "0%",
          duration: 400,
          easing: "easeInOutQuad",
          delay: anime.stagger(100, { from: "first", start: 500 }),
        });
      }, 800);
    },
    onLeave(el: HTMLElement) {
      anime({
        targets: el.querySelectorAll(".transitionElement>.div"),
        height: "100%",
        duration: 400,
        easing: "easeInOutQuad",
        delay: anime.stagger(100, { from: "first" }),
      });
    },
  },
});
</script>

<style lang="scss"></style>
