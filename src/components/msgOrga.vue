<template>
  <div id="msgOrga">
    <p>{{ message }}</p>
    <transition name="newmsg">
      <div v-if="newAlert" class="newMessageAlert">
        <div class="newMessageWrapper">
          <p>{{ message }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MsgOrga",
  props: {
    message: {
      default: "Pas de message pour l'instant",
      type: String,
    },
  },
  data() {
    return {
      newAlert: false,
    };
  },
  watch: {
    message(newMessage, oldMessage) {
      console.log(newMessage, oldMessage);
      this.newAlert = true;
      setTimeout(() => (this.newAlert = false), 2000);
    },
  },
};
</script>

<style lang="scss">
#msgOrga {
  grid-row-start: 2;
  grid-row-end: 4;
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
