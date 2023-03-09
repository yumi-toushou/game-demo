import { ref } from 'vue'
const audioNode = ref('')
const setAudioNode = (val) => {
    audioNode.value = val
}

export default function useAudio() {
    return {
        audioNode,
        setAudioNode
    }
}