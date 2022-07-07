<template>
  <Main :msg="message" />
  <ImgFlux v-if="containerState.imageFlux" :number="number" />
  <Prog v-if="containerState.prog" />
  <MsgOrga v-if="containerState.orga" :message="messageorga" />
</template>

<script>
import Main from "./components/main.vue";
import ImgFlux from "./components/imgFlux.vue";
import Prog from "./components/prog.vue";
import MsgOrga from "./components/msgOrga.vue";

import * as jsonDataIn from './assets/data.json';

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
      messageorga: {title: 'coucou', content: 'saltudkjhkjsqdhklgqlskhdglkh'},
      jsonData: [],
      containerState: {
        imageFlux: false,
        prog: false,
        orga: false
      },
      timeout: {
        index: 0,
        timeout: ''
      }
    };
  },
  methods: {
    createBoucle() {
      const index = this.timeout.index;

      const name = this.jsonData[index].name;

      console.log(name, index);

      switch (name) {
        case 'imageFlux':
          this.containerState.imageFlux = true;
          this.containerState.prog = false;
          this.containerState.orga = false;
          break;
        case 'prog':
          this.containerState.imageFlux = false;
          this.containerState.prog = true;
          this.containerState.orga = false;
          break;
        case 'orga':
          this.containerState.imageFlux = false;
          this.containerState.prog = false;
          this.containerState.orga = true;
          break;
        default:
          console.log('problème switch' + name);
          break;
      }

      console.log(this.jsonData.length);

      index < (this.jsonData.length - 1) ? this.timeout.index++ : this.timeout.index = 0;

      this.timeout.timeout = setTimeout(() => {this.createBoucle()}, this.jsonData[index].duration);
    }
  },
  async mounted() {
    this.jsonData = jsonDataIn.default;

    this.timeout.timeout = setTimeout(() => {this.createBoucle()}, 0)

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
  }
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
