<template>
  <div class="transitionElement">
    <div class="div"></div>
    <div class="div"></div>
    <div class="div"></div>
    <div class="div"></div>
    <div class="div"></div>
  </div>
</template>

<script>
export default {
  name: "TransitionElem",
};
</script>

<style lang="scss" scoped>
.transitionElement {
  position: absolute;
  display: block;
  background: transparent;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
  z-index: 9998;
  .div{
    height: 100%;
    width: 20%;
    &:nth-child(1) {
      background: #FEAC5E;
    }
    &:nth-child(2) {
      background: #e2929a;
    }
    &:nth-child(3) {
      background: #C779D0;
    }
    &:nth-child(4) {
      background: #8a9bcc;
    }
    &:nth-child(5) {
      background: #4BC0C8;
    }
  }
}
</style>
