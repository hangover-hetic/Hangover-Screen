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
    }
}
</script>

<style lang="scss">
    #prog{
        grid-row-start: 9;
        grid-row-end: 11;
        grid-column-start: 1;
        grid-column-end: 3;
        padding: 5px;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: hidden;
    }
</style>