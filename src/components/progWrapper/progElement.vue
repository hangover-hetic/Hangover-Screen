<template>
  <div class="progElem">
    <div class="img-wrapper">
      <img :src="src" alt="" />
    </div>
    <div class="infos-wrappe">
      <p>Imagine Dragon</p>
      <p>16h-24h</p>
      <p>Scène Saint Jean</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgElem",
  data: () => {
    return {
      src: "https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg",
    };
  },
};
</script>

<style lang="scss">
.progElem {
  flex: none;
  max-width: 30vw;
  max-height: 100%;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  background: #d3d3d3;
  padding: 5px;
  margin-left: 10px;
  .img-wrapper {
    height: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 15px;
    margin-right: 15px;
    img {
      width: 100%;
    }
  }
}
</style>
