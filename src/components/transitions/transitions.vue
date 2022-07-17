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

<script>
import anime from "animejs";

export default {
  name: "CustomTransition",
  methods: {
    onBeforeEnter(el) {
      el.style.opacity = 0;
      el.querySelectorAll(".transitionElement>.div").forEach((element) => {
        element.style.height = "100%";
      });
    },
    onEnter(el) {
      setTimeout(() => {
        el.style.opacity = 1;
        anime({
          targets: el.querySelectorAll(".transitionElement>.div"),
          height: "0%",
          duration: 400,
          easing: "easeInOutQuad",
          delay: anime.stagger(100, { from: "first", start: 500 }),
        });
      }, 800);
    },
    onLeave(el) {
      anime({
        targets: el.querySelectorAll(".transitionElement>.div"),
        height: "100%",
        duration: 400,
        easing: "easeInOutQuad",
        delay: anime.stagger(100, { from: "first" }),
      });
    },
  },
};
</script>

<style lang="scss"></style>
