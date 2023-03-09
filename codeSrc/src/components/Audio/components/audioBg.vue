<template>
    <canvas ref="canvasNode" style="width: 100%;" width="350" height="150"></canvas>
    <slot></slot>
</template>
<script lang="ts" setup>
import { ref, onMounted, provide } from 'vue';
import useAudio from './useAudio.ts'
const { audioNode } = useAudio()
const canvasNode = ref('')
const WIDTH = 350, HEIGHT = 150;
const analyser = ref('')
// methods
const init = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    analyser.value = audioCtx.createAnalyser();
    analyser.value.fftSize = 512;
    var source = audioCtx.createMediaElementSource(audioNode.value);
    source.connect(analyser.value);
    analyser.value.connect(audioCtx.destination);
}

const draw = () => {
    if (analyser.value.context.state !== 'running') {
        analyser.value.context.resume()
    }

    var bufferLength = analyser.value.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var barWidth = WIDTH / bufferLength * 1.5;
    var barHeight;
    const ctx = canvasNode.value.getContext('2d')

    function renderFrame() {
        requestAnimationFrame(function () {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            analyser.value.getByteFrequencyData(dataArray);
            let x = 0
            for (let i = 0; i < dataArray.length; i++) {
                barHeight = dataArray[i];
                var r = barHeight + 25 * (i / bufferLength);
                var g = 255 * (i / bufferLength);
                var b = 100;
                ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + "0.5" +")";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                x += barWidth + 2;
            }
            renderFrame()
        });
    }
    renderFrame()
}

provide('analyser', analyser)
provide('draw', draw)

onMounted(() => {
    init()
})
</script>