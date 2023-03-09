<template>
    <div class="nav">
        <span class="back" @click="goback"> 
            <el-icon>
                <ArrowLeftBold />
            </el-icon>
        </span>
        {{ title }}
    </div>
    <div style="padding-top: 50px;">
        <RouterView />
    </div>
</template>
  
<script lang="ts" setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import {ArrowLeftBold} from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
const title = computed(() => {
    return route.meta.title
})

const goback = () => {
    router.go(-1)
}
</script>
  
<style lang="scss" scoped>
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    height: var(--padding-top-page);
    line-height: var(--padding-top-page);
    background-color: transparent;
    font-weight: 500;
}

.back {
    position: absolute;
    left: 5px;
}
</style>