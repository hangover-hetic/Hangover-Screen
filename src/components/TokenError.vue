<template>
    <div>
        <h1>Mauvaise ou inexistante clé du festival fournie</h1>
        <div class="enterToken-container">
            <input v-model="token" placeholder="Entrez la clé">
            <button @click="sendToken" >Utiliser cette clé</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TokenError",
    data() {
        return {
            token: ""
        }
    },
    methods:{
        sendToken() {
            location.href = "/?token=" + this.token;
        }
    }
})
</script>

<style lang="scss" scoped>
div{
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
        font-size: 2em;
        padding: 0 10%;
        margin: 0 0 20px 0;
        text-align: center;
    }
    .enterToken-container{
        width: auto;
        height: auto;
        position: relative;
        z-index: auto;
        display: flex;
        flex-direction: column;
        padding: 30px;
        background: #202020;
        border-radius: 5px;
        &>*{
            margin: 20px;
            padding: 5px 10px;
        }
    }
}
</style>