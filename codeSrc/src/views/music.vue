<template>
    <div class="main">
        <div class="content" :class="{
            rotato: played
        }"></div>
        <div class="footer">
            <Audio >
                <AudioPlayer ref="player" :src="list[music]" @prev="prev" @next="next"></AudioPlayer>
            </Audio>
        </div>
    </div>
    <div class="background"></div>
</template>
<script lang="ts" setup>
import { Audio, AudioPlayer } from '@/components/Audio/index.ts'
import { ref, computed, onMounted } from 'vue';
import hhdsail from '@/assets/music/1.mp3'
import xwzydr from '@/assets/music/2.mp3'

const list = [hhdsail, xwzydr]
const music = ref(0)
const player = ref('')

const played = computed(() => {
    return player.value.isVoucl
})

function prev() {
    music.value += 1
    if (music.value >= list.length) {
        music.value = 0
    }
}

function next() {
    music.value -= 1
    if (music.value < 0) {
        music.value = list.length - 1
    }
}
onMounted(() => {
    console.log(player.value.isVoucl)
})
</script>
<style lang="scss" scoped>
.background {
    position: absolute;
    background-image: linear-gradient(to bottom, #7A88FF, #7AFFAF);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
}

.main {
    height: calc(100vh - var(--padding-top-page));
    position: relative;
    overflow: hidden;

}

.content {
    background: url('../assets/未标题-1.png') center no-repeat;
    background-size: contain;
    width: 70%;
    height: 60%;
    margin: auto;
}
.rotato {
    animation: rotato 10s linear infinite;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 250px;
}
@keyframes rotato {
    0% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
