<template>
  <Main
    v-if="true"
    :festName="festivalData.festName"
    :festLogoUrl="festivalData.festLogoUrl"
    :festSponsors="festivalData.festSponsors"
  />
  <transition name="screens" mode="out-in" :duration="500">
    <Prog v-if="containerState.prog" :festProgs="festivalData.festProgs" />
  </transition>
  <ImgFluxContainer :state="containerState.imageFlux" :imageInfos="imageFluxElement" />
  <transition name="screens" mode="out-in" :duration="500">
    <MsgOrga v-if="containerState.orga" :message="messageorga" />
  </transition>
</template>

<script>
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
const EventSource = NativeEventSource || EventSourcePolyfill;

import Main from "./components/main.vue";
import Prog from "./components/prog.vue";
import MsgOrga from "./components/msgOrga.vue";
import ImgFluxContainer from "./components/imgFluxContainer.vue";

import Timer from "./class/timer";

import * as jsonDataIn from "./assets/data.json";


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
      message: "No message yet!",
      imageFluxElement: Object,
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
      festivalData: {
        festName: "default",
        festLogoUrl: "default",
        festSponsors: [{ name: "default" }],
        festProgs: [{ name: "default" }],
      },
      mercureToken: ''
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

      this.timeout.timeout = new Timer(() => {
        this.createBoucle();
      }, this.jsonData[index].duration);
    },
    pauseTimeout() {
      console.log("pause timeout");
      this.timeout.timeout.pause();
    },
    playTimeout() {
      console.log("play timeout");
      this.timeout.timeout.resume();
    },
    mercureSubscribe(urlTopic) {
      const url = new URL(
        "https://hangover-hub.timotheedurand.fr/.well-known/mercure"
      );
      url.searchParams.append("topic", urlTopic, {
        headers: {
          Accept: "text/event-stream",
          Authorization: "Bearer " + this.mercureToken,
        },
      });

      const eventSource = new EventSource(url);

      eventSource.onmessage = (e) => {
        var post = JSON.parse(e.data);
        console.log('[mercure] : ', post);

        //this.arr.push(this.post);
      };
    },
  },
  async mounted() {
    this.jsonData = jsonDataIn.default;

    this.createBoucle();

    const url = new URL(document.location.href);
    const urlParams = new URLSearchParams(url.search);

    const token = urlParams.get("token");

    await fetch("https://hangover.timotheedurand.fr/screen/" + token, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (data) => (
          (this.festivalData = {
            festName: data.screen.festival.name,
            festLogoUrl: data.screen.festival.logo.contentUrl,
            festSponsors: data.screen.festival.sponsors,
            festProgs: data.screen.festival.shows,
          }),
          this.mercureToken = data.mercureToken,
          this.mercureSubscribe(data.screen.festival.mercureFeedTopics)
        )
      );

    console.log(this.festivalData);

    var pause = false;

    window.addEventListener("click", () => {
      this.messageorga = {
        title: this.messageorga.title + this.number,
        content: this.messageorga.content + this.number,
      };

      pause
        ? (this.playTimeout(), (pause = false))
        : (this.pauseTimeout(), (pause = true));
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

.screens-enter-to,
.screens-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.screens-enter-active,
.screens-leave-active {
  transition: all ease 0.5s;
}
</style>
