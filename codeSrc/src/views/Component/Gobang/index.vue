<template>
  <div style="background: #f7f8fe;height: calc(100vh - 50px);">
    <div class="gobang-container">、
      <!-- 棋盘 -->
      <div class="gobang-table-content" :style="{ width: gobangTableWidth + 'px' }">
        <div v-for="(item, index) in tableContentData" :key="index"
          :style="{ height: gobangTableWidth / config.rows + 'px' }">
          <span class="rect" :class="rectClass(index, index2)" v-for="(i, index2) in item" :key="index2" :style="{
            width: gobangTableWidth / config.colums + 'px',
            height: gobangTableWidth / config.rows + 'px',
          }" @click="clickTable(index, index2)">
            <span :class="i" class="qizi"></span>
          </span>
        </div>
      </div>
    </div>
    <div class="user-message">
      <div class="user-message-item">
        <span class="user-white qizi"></span>
        <span class="user-name" :style="{color: isBlack ? '' : '#222'}">白棋</span>
      </div>
      <div>
        <span class="user-black qizi"></span>
        <span class="user-name" :style="{color: isBlack ? '#222' : ''}">黑棋</span>
      </div>
    </div>
    <div style="text-align:center;margin-top: 25px;">
      <el-icon style="font-size: 35px;" @click="reSet">
        <Refresh />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

const config = reactive({
  rows: 16,
  colums: 16,
  // width: 600
})

const isBlack = ref(true)
const isFinal = ref(false)
const tableContentData = ref(new Array(config.rows))

const initTableContentData = () => {
  for (let i = 0; i < config.rows; i++) {
    tableContentData.value[i] = new Array(config.colums)
  }
}

const rectClass = (row: number, colums: number) => {
  if (row === 0 && colums === 0) {
    return 'left-top'
  } else if (row === 0 && colums === config.colums - 1) {
    return 'right-top'
  } else if (row === config.rows - 1 && colums === 0) {
    return 'left-bottom'
  } else if (row === config.rows - 1 && colums === config.colums - 1) {
    return 'right-bottom'
  } else if (colums === 0) {
    return 'border-left'
  } else if (colums === config.colums - 1) {
    return 'border-right'
  } else if (row === 0) {
    return 'border-top'
  } else if (row === config.rows - 1) {
    return 'border-bottom'
  } else {
    return 'border-common'
  }
}

const gobangTableWidth = computed(() => {
  return config.width || document.body.clientWidth * 0.95
})

const checkWin = (x: number, y: number) => {
  // 四个方向计算
  let final = false
  let type = tableContentData.value[x][y]
  // 垂直方向上的
  let startX = x - 5
  while (startX <= x && !final) {
    if (startX > -1) {
      let flag = 0;
      let isContinue = true
      let i = 0
      // 开始判断
      while (isContinue && i < 5) {
        if (tableContentData.value[startX + i][y] != type) {
          startX += i;
          isContinue = false
        } else {
          flag++
        }
        i++
      }
      final = flag === 5
      startX += 1
    } else {
      startX += 1
    }
  }

  if (final) {
    return final
  }

  // 水平方向上的
  let startY = y - 5
  while (startY <= y && !final) {
    if (startY > -1) {
      let flag = 0;
      let isContinue = true
      let i = 0
      // 开始判断
      while (isContinue && i < 5) {
        if (tableContentData.value[x][startY + i] != type) {
          startY += i;
          isContinue = false
        } else {
          flag++
        }
        i++
      }
      final = flag === 5
      startY += 1
    } else {
      startY += 1
    }
  }

  if (final) {
    return final
  }

  // 斜135方向
  let [obliqueX, obliqueY] = [x - 5, y - 5]
  while (obliqueX <= x && !final) {
    if (obliqueX > -1) {
      let flag = 0;
      let isContinue = true
      let i = 0
      // 开始判断
      while (isContinue && i < 5) {
        if (tableContentData.value[obliqueX + i][obliqueY + i] != type) {
          obliqueX += i;
          obliqueY += i;
          isContinue = false
        } else {
          flag++
        }
        i++
      }
      obliqueX += i;
      obliqueY += i;
      final = flag === 5
    } else {
      obliqueX += 1
      obliqueY += 1
    }
  }

  if (final) {
    return final
  }

  // 斜45方向
  let [newobliqueX, newobliqueY] = [x + 5, y - 5]
  while (obliqueX >= x && !final) {
    if (newobliqueY > -1 && newobliqueX < config.rows) {
      let flag = 0;
      let isContinue = true
      let i = 0
      // 开始判断
      while (isContinue && i < 5) {
        console.log(tableContentData.value[newobliqueX - i][newobliqueY + i])
        if (tableContentData.value[newobliqueX - i][newobliqueY + i] != type) {
          newobliqueX -= i;
          newobliqueY += i;
          isContinue = false
        } else {
          flag++
        }
        i++
      }
      newobliqueX -= i;
      newobliqueY += i;
      final = flag === 5
    } else {
      newobliqueX -= 1
      newobliqueY += 1
    }
  }

  if (final) {
    return final
  }
}

const clickTable = (row: number, column: number) => {
  if (tableContentData.value[row][column]) {
    return
  }
  if (isFinal.value) {
    return
  }
  console.log(row, column)
  const flag = isBlack.value
  tableContentData.value[row][column] = flag ? 'black' : 'white'
  isBlack.value = !flag

  const final = checkWin(row, column)
  if (final) {
    isFinal.value = true
    nextTick(() => {
      setTimeout(() => {
        alert(`${tableContentData.value[row][column]}赢了！`)
      }, 200);
    })
  }
}

const reSet = () => {
  isFinal.value = false
  initTableContentData()
}

onMounted(() => {
  initTableContentData()
})

</script>

<style scoped lang="scss">
.gobang-container {
  width: 100%;
  text-align: center;

  position: relative;

  .gobang-table-content {
    margin: auto;
    background: antiquewhite;

    .rect {
      display: inline-block;
      background-size: cover;
      // background-size: 113%;
      // border: 2px solid black;
    }

    .border-common {
      background: url('./assets/rect.svg') no-repeat center;
    }

    .border-left {
      background: url('./assets/border-left.svg') no-repeat center;
    }

    .border-right {
      background: url('./assets/border-right.svg') no-repeat center;
    }

    .border-top {
      background: url('./assets/border-top.svg') no-repeat center;
    }

    .border-bottom {
      background: url('./assets/border-bottom.svg') no-repeat center;
    }

    .left-top {
      background: url('./assets/left-top.svg') no-repeat center;
    }

    .right-top {
      background: url('./assets/right-top.svg') no-repeat center;
    }

    .left-bottom {
      background: url('./assets/left-bottom.svg') no-repeat center;
    }

    .right-bottom {
      background: url('./assets/right-bottom.svg') no-repeat center;
    }

    .qizi {
      display: inline-block;
      width: 80%;
      height: 80%;
      margin: auto;
      margin-top: 10%;
    }

    .black {
      background: url('./assets/black.png') no-repeat center;
      background-size: cover;
    }

    .white {
      background: url('./assets/white.png') no-repeat center;
      background-size: cover;
    }
  }
}

.user-message {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;

  .user-message-item {
    line-height: 20px;

  }

  .qizi {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .user-white {
    background: url('./assets/white.png') no-repeat center;
    background-size: cover;
  }

  .user-black {
    background: url('./assets/black.png') no-repeat center;
    background-size: cover;
  }

  .user-name {
    vertical-align: middle;
    margin-left: 5px;
    color: #bbb;
  }
}
</style>