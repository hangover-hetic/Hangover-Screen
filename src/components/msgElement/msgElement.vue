<template>
  <div>
    <h5>{{ title }}</h5>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: "MsgElement",
  props: {
    title: {
      type: String,
      default: "Ceci est un message",
    },
    content: {
      type: String,
      default: "Bonjour je suis un superbe message",
    },
  },
};
</script>

<style lang="scss"></style>
