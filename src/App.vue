<template>
  <Overlay
    v-if="true"
    :festName="festivalData.festName"
    :festLogoUrl="festivalData.festLogoUrl"
    :festSponsors="festivalData.festSponsors"
  />
  <CustomTransition>
    <Prog
      v-if="containerState === 'prog'"
      :festProgs="festivalData.festProgs"
    />
  </CustomTransition>
  <ImgFluxContainer
    @noMoreFlux="noMoreFlux"
    :state="containerState"
    :imageInfos="imageFluxElement"
  />
  <CustomTransition>
    <Gallery
      v-if="containerState === 'orga'"
      :gallery="festivalData.festGallery"
    />
  </CustomTransition>
  <CustomTransition>
    <WaitingScreen
      v-if="containerState === 'waiting'"
      :festival="festivalData"
    />
  </CustomTransition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
const EventSource = NativeEventSource || EventSourcePolyfill;

import Overlay from "./components/overlay.vue";
import Prog from "./components/progWrapper/prog.vue";
import Gallery from "./components/galleryWrapper/gallery.vue";
import ImgFluxContainer from "./components/imgWrapper/imgFluxContainer.vue";
import WaitingScreen from "./components/waitingscreen.vue";

import CustomTransition from "./components/transitions/transitions.vue";

import { timer } from "./class/boucle";

export default defineComponent({
  name: "App",
  components: {
    Overlay,
    Prog,
    Gallery,
    ImgFluxContainer,
    WaitingScreen,
    CustomTransition,
  },
  data() {
    return {
      message: "No message yet!",
      imageFluxElement: Object,
      jsonData: [],
      containerState: "",
      timeout: {
        timeout: {} as timer.Boucle,
      },
      festivalData: {
        festName: "default",
        festLogoUrl: "default",
        festSponsors: [{ name: "default" }],
        festProgs: [{ name: "default" }],
        festDate: {},
        festGallery: [],
      },
      mercureToken: "",
    };
  },
  methods: {
    createBoucle() {
      this.timeout.timeout = new timer.Boucle();

      document.addEventListener("changePage", (e: any) => {
        this.containerState = e.detail;
      });
    },
    noMoreFlux() {
      console.log("a pu de flux");
      if (this.timeout.timeout.noMoreFlux) {
        this.timeout.timeout.noMoreFlux();
      }
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
        this.timeout.timeout.newFlux();
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
          console.log(data),
          data.screen.festival.shows
            ? this.timeout.timeout.changeProps("prog", true)
            : "",
          data.screen.festival.gallery.length > 1
            ? this.timeout.timeout.changeProps(
                "orga",
                true,
                4500 * data.screen.festival.gallery.length
              )
            : "",
          (this.festivalData = {
            festName: data.screen.festival.name,
            festLogoUrl: data.screen.festival.logo.contentUrl,
            festSponsors: data.screen.festival.sponsors,
            festProgs: data.screen.festival.shows,
            festDate: {
              startDate: data.screen.festival.startDate,
              endDate: data.screen.festival.endDate,
            },
            festGallery: data.screen.festival.gallery,
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700;800;900&display=swap");

body,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

#app {
  background: #202020;
  height: 100vh;
  width: 100vw;
  padding: 10px;
  overflow: hidden;
  color: white;
  > div {
    background-color: #252525;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
