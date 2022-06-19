<template>
  <div id="main" @click="click">
    <p v-html="msg"></p>
  </div>
</template>

<script>
import Emoji from '@/class/emojiClass.js';

export default {
  name: 'Main',
  props: {
    msg: {
      type: String,
      default: 'no message'
    }
  },
  methods: {
    click: () => {
      const emoji = new Emoji('hello');

      console.log(emoji.launch());
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
