import { ref, watch } from 'vue'

// data
const currentIndex = ref(0)
const nextIndex = ref(-1)
const prevIndex = ref(-1)
const items = ref([])
const direction = ref('left')

// methods
const addItem = (item) => {
    items.value.push(item)
}
const removeItem = (item) => {
    const index = items.value.findIndex(i => i.uid === item.uid)
    index !== -1 && items.value.splice(index, 1)
}

const reSet = () => {
    currentIndex.value = 0
    nextIndex.value = -1
    prevIndex.value = -1
    items.value = []
}
// hooks
export default function useCarousel() {
    return {
        currentIndex,
        nextIndex,
        prevIndex,
        items,
        addItem,
        removeItem,
        direction,
        reSet
    }
}