<template>
  <div style="padding-bottom: var(--tab-bar-height)">
    <RouterView />
  </div>
  <div class="nav">
    <TabBar :navs="navs" />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import TabBar from '../Tabbar/index.vue'
import { reactive } from 'vue';

const navs = reactive([
  { name: 'gobang', title: '五子棋' },
  // { name: 'lottery', title: '抽奖' },
  { name: 'stepblack', title: '别踩白块' },
  { name: 'music', title: '音乐' },
])
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  // height: 64px;
  background: #fff;
  transition: box-shadow .3s;
  box-shadow: 0 1px 4px rgb(21 26 48 / 8%);
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 30px;

  .logo {
    min-width: 200px;
  }
}

.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 10px 2px #f0f0f0;
  height: var(--tab-bar-height);
}
</style>