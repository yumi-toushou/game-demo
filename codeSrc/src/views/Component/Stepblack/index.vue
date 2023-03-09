<template>
    <div class="container">
        <div style="padding: 0 10px;display: flex;justify-content: space-between;">
            <span>
                <button style="margin-right: 5px;" @click="start">开始</button>
                <button @click="reSet">重置</button>
            </span>
            <span>得分：
                <span style="color: blue;">
                    {{ score }}
                </span>
            </span>
            <span>OP：
                <span style="color: red;">
                    {{ OP }}
                </span>
            </span>
        </div>
        <div ref="rootNode" class="root">
            <div class="row" v-for="(row, rowIndex) in blockData" :key="rowIndex"
                :style="{ top: `${baseLine + (rowIndex - blockData.length) * root.blockHeight}px` }">
                <div class="cell" @click="clearBlack(rowIndex, cellIndex)" :style="blockStyle(cell)"
                    v-for="(cell, cellIndex) in row" :key="cellIndex">
                    <!-- {{ rowIndex }} -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const WHITE = 0, BLACK = 1;
const config = {
    rows: 5,
    columns: 3,
    op: 3
}

// data
const rootNode = ref()
const blockData = ref()
const baseLine = ref(0)
const timeId = ref(-1)
const score = ref(0)
const OP = ref(config.op)
const speed = ref(1)
// computed
const root = computed(() => {
    return {
        width: rootNode.value.clientWidth,
        height: rootNode.value.clientHeight,
        blockWidth: rootNode.value.clientWidth / config.columns,
        blockHeight: rootNode.value.clientHeight / config.rows,
    }
})

const blockStyle = (type) => {
    return {
        width: `${root.value.width / config.columns}px`,
        height: `${root.value.height / config.rows}px`,
        backgroundColor: type === WHITE ? 'white' : 'black'
    }
}
// methods
const generateRowData = () => {
    let result = new Array(config.columns)
    let blackIndex = parseInt(Math.random() * config.columns)
    for (let column = 0; column < config.columns; column++) {
        if (column === blackIndex) {
            result[column] = BLACK
        } else {
            result[column] = WHITE
        }
    }
    return result
}

const initBlockData = () => {
    let result = new Array(config.rows)
    root.value.width / config.rows
    for (let row = 0; row < config.rows; row++) {
        result[row] = generateRowData()
    }
    blockData.value = result
}

const clearBlack = (row, column) => {
    const type = blockData.value[row][column]

    if (type === WHITE) {
        OP.value -= 1
        if (OP.value <= -1) {
            clearInterval(timeId.value)
            alert("游戏结束！")
        }
        return
    }
    if (row === config.rows - 1) {
        if (type === BLACK) {
            blockData.value[row][column] = WHITE
            score.value += 1
            const tag = 10
            if (score.value % tag === 0) {
                speed.value = Math.tanh(score.value * 45 / 300 / tag) + 1
            }
            blockData.value.unshift(generateRowData())
        }
    }
}

const start = () => {
    clearInterval(timeId.value)
    timeId.value = setInterval(() => {
        baseLine.value += speed.value

        if (baseLine.value >= root.value.height) {
            let final = false
            const rowData = blockData.value[blockData.value.length - 1]
            final = rowData.indexOf(BLACK) !== -1
            if (final) {
                OP.value -= 1
                if (OP.value <= -1) {
                    clearInterval(timeId.value)
                    alert("游戏结束！")
                }
            } else {
                baseLine.value -= root.value.blockHeight
                blockData.value.pop()
            }
        }
    })
}
const reSet = () => {
    clearInterval(timeId.value)
    OP.value = config.op
    score.value = 0
    speed.value = 1
    baseLine.value = 0
    initBlockData()
}

onMounted(() => {
    initBlockData()
})
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: calc(100vh - var(--padding-top-page));
    overflow: hidden;
}

.root {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .row {
        display: flex;
        position: absolute;
    }

    .cell {
        border: 1px solid rgb(240, 240, 240);
    }
}
</style>