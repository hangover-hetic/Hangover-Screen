<template>
    <div id="prog">
        <ProgElem />
        <ProgElem />
        <ProgElem />
        <ProgElem />
        <ProgElem />
        <ProgElem />
        <ProgElem />
        <ProgElem />
    </div>
</template>

<script>
import ProgElem from '@/components/progWrapper/progElement.vue';

export default {
    name: 'Prog',
    components: {
        ProgElem
    },
    mounted() {
        console.log(Date.now());
    }
}
</script>

<style lang="scss">
    #prog{
        padding: 5px;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: hidden;
    }
</style>