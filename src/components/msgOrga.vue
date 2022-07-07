<template>
  <div id="msgOrga">
    <MsgElement v-for="msg in allMessages" v-bind:key="msg" :content="msg.content" />
    <transition name="newmsg">
      <div v-if="newAlert" class="newMessageAlert">
        <div class="newMessageWrapper">
          <h5>{{ message.title }}</h5>
          <p>{{ message.content }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MsgElement from './msgElement/msgElement.vue'

export default {
  name: "MsgOrga",
  components: {
    MsgElement
  }, 
  props: {
    message: {
      default: () => {return {title: "Pas de message pour l'instant", content: 'Slautjkdbgsflkgqklhdgqkshbgdlk'}},
      type: Object,
    },
  },
  data() {
    return {
      newAlert: false,
      allMessages: [{title: 'coucou', content: 'Pas de message pour le moment'}]
    };
  },
  watch: {
    message() {
      const newMessage = {title: this.message.title, content: this.message.content}
      this.allMessages.push(newMessage);
      this.newAlert = true;
      setTimeout(() => (this.newAlert = false), 2000);
    },
  },
};
</script>

<style lang="scss">
#msgOrga {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  overflow: hidden;
}
.newMessageAlert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
  &.newmsg-enter-from{
    transform: translateX(-100vw);
  }
  &.newmsg-leave-to{
    transform: translateX(100vw);
  }
  &.newmsg-enter-active, &.newmsg-leave-active{
    transition: transform 0.5s ease;
  }
  .newMessageWrapper {
    height: 40%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }
}
</style>
