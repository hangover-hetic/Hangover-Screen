<template>
  <Main :msg="message" />
  <ImgFlux :number="number" />
  <Prog />
  <MsgOrga />
</template>

<script>
import Main from "./components/main.vue";
import ImgFlux from "./components/imgFlux.vue";
import Prog from "./components/prog.vue";
import MsgOrga from "./components/msgOrga.vue";

import io from 'socket.io-client';

export default {
  name: "App",
  components: {
    ImgFlux,
    Main,
    Prog,
    MsgOrga,
  },
  data() {
    return {
      socket: {},
      connectedStatus: "Not connected!",
      message: "No message yet!",
      number: 1,
      messageorga: {title: 'coucou', content: 'saltudkjhkjsqdhklgqlskhdglkh'}
    };
  },
  async mounted() {
    this.socket = await io('http://localhost:3000');

    this.socket.on('connected', (data) => {
      console.log(data);
    })

    console.log(this.socket);

    this.socket.on('numberChanged', (data) => {
      console.log(data);
      this.number = data.number;
    })

    this.socket.on('message', (data) => {
      this.message = data.data;
    })

    window.addEventListener('click', () => {
      this.messageorga = {title: this.messageorga.title + this.number, content: this.messageorga.content + this.number};
    })
  },
  methods: {
    
  },
};
</script>

<style lang="scss">
body,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background: #030303;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(10, 1fr);
  gap: 20px;
  height: 100vh;
  padding: 20px;
  > div {
    background-color: #f3f3f3;
    border-radius: 20px;
  }
}
</style>
