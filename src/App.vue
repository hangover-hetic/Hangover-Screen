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
  <ImgFluxContainer
    :state="containerState.imageFlux"
    :imageInfos="imageFluxElement"
  />
  <transition name="screens" mode="out-in" :duration="500">
    <MsgOrga v-if="containerState.orga" />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
const EventSource = NativeEventSource || EventSourcePolyfill;

import Main from "./components/main.vue";
import Prog from "./components/prog.vue";
import MsgOrga from "./components/msgOrga.vue";
import ImgFluxContainer from "./components/imgFluxContainer.vue";

import { timer } from "./class/boucle";

export default defineComponent({
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
      jsonData: [],
      containerState: {
        imageFlux: false,
        prog: false,
        orga: true,
      },
      timeout: {
        timeout: {} as timer.Boucle,
      },
      festivalData: {
        festName: "default",
        festLogoUrl: "default",
        festSponsors: [{ name: "default" }],
        festProgs: [{ name: "default" }],
      },
      mercureToken: "",
    };
  },
  methods: {
    createBoucle() {
      this.timeout.timeout = new timer.Boucle();

      document.addEventListener("changePage", (event) => {
        // @ts-ignore
        console.log("[custom event]", event.detail);
      });
    },
    pauseTimeout() {
      console.log("pause timeout");
      this.timeout.timeout.stopTimer();
    },
    playTimeout() {
      console.log("play timeout");
      this.timeout.timeout.resume();
    },
    mercureSubscribe(urlTopic: String) {
      const url = new URL(
        "https://hangover-hub.timotheedurand.fr/.well-known/mercure"
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      url.searchParams.append("topic", urlTopic, {
        headers: {
          Accept: "text/event-stream",
          Authorization: "Bearer " + this.mercureToken,
        },
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const eventSource = new EventSource(url);

      eventSource.onmessage = (e) => {
        var post = JSON.parse(e.data);
        console.log("[mercure] : ", post);
        this.timeout.timeout.changeProps("flux", true);
        this.imageFluxElement = post;
      };
    },
  },
  async mounted() {
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
          data.screen.festival.shows
            ? this.timeout.timeout.changeProps("prog", true)
            : "",
          data.screen.festival.gallery.length > 1
            ? this.timeout.timeout.changeProps("orga", true)
            : "",
          (this.festivalData = {
            festName: data.screen.festival.name,
            festLogoUrl: data.screen.festival.logo.contentUrl,
            festSponsors: data.screen.festival.sponsors,
            festProgs: data.screen.festival.shows,
          }),
          (this.mercureToken = data.mercureToken),
          this.mercureSubscribe(data.screen.festival.mercureFeedTopics)
        )
      );

    console.log(this.festivalData);

    var pause = false;

    window.addEventListener("click", () => {
      pause
        ? (this.playTimeout(), (pause = false))
        : (this.pauseTimeout(), (pause = true));
    });
  },
});
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
