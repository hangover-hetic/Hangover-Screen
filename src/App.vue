<template>
  <Main v-if="false" :msg="message" />
  <transition name="screens" mode="out-in" :duration="500">
    <Prog v-if="containerState.prog" />
  </transition>
  <ImgFluxContainer :state="containerState.imageFlux" :number="number" />
  <transition name="screens" mode="out-in" :duration="500">
    <MsgOrga v-if="containerState.orga" :message="messageorga" />
  </transition>
</template>

<script>
import Main from "./components/main.vue";
import Prog from "./components/prog.vue";
import MsgOrga from "./components/msgOrga.vue";
import ImgFluxContainer from "./components/imgFluxContainer.vue";

import * as jsonDataIn from "./assets/data.json";

import io from "socket.io-client";

export default {
  name: "App",
  components: {
    Main,
    Prog,
    MsgOrga,
    ImgFluxContainer,
  },
  data() {
    return {
      socket: {},
      connectedStatus: "Not connected!",
      message: "No message yet!",
      number: 1,
      messageorga: { title: "coucou", content: "saltudkjhkjsqdhklgqlskhdglkh" },
      jsonData: [],
      containerState: {
        imageFlux: false,
        prog: false,
        orga: false,
      },
      timeout: {
        index: 0,
        timeout: "",
      },
    };
  },
  methods: {
    createBoucle() {
      const index = this.timeout.index;

      const name = this.jsonData[index].name;

      console.log(name, index);

      switch (name) {
        case "imageFlux":
          this.containerState.imageFlux = true;
          this.containerState.prog = false;
          this.containerState.orga = false;
          break;
        case "prog":
          this.containerState.imageFlux = false;
          this.containerState.prog = true;
          this.containerState.orga = false;
          break;
        case "orga":
          this.containerState.imageFlux = false;
          this.containerState.prog = false;
          this.containerState.orga = true;
          break;
        default:
          console.log("problème switch" + name);
          break;
      }

      console.log(this.jsonData.length);

      index < this.jsonData.length - 1
        ? this.timeout.index++
        : (this.timeout.index = 0);

      this.timeout.timeout = setTimeout(() => {
        this.createBoucle();
      }, this.jsonData[index].duration);
    },
  },
  async mounted() {
    this.jsonData = jsonDataIn.default;

    this.timeout.timeout = setTimeout(() => {
      this.createBoucle();
    }, 0);

    this.socket = await io("http://localhost:3000");

    this.socket.on("connected", (data) => {
      console.log(data);
    });

    console.log(this.socket);

    this.socket.on("numberChanged", (data) => {
      console.log(data);
      this.number = data.number;
    });

    this.socket.on("message", (data) => {
      this.message = data.data;
    });

    window.addEventListener("click", () => {
      this.messageorga = {
        title: this.messageorga.title + this.number,
        content: this.messageorga.content + this.number,
      };
    });
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
  height: 100vh;
  padding: 10px;
  overflow: hidden;
  > div {
    background-color: #f3f3f3;
    border-radius: 20px;
    height: 100%;
    width: 100%;
  }
}

.screens-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.screens-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.screens-enter-to, .screens-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.screens-enter-active,
.screens-leave-active {
  transition: all ease 0.5s;
}
</style>
