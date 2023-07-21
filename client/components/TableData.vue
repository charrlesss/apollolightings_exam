<script lang="ts" setup>
    import {ref} from 'vue'
    const isShowMore = ref(false);
    const props = defineProps({
        showMore:{
            default:false
        },
    })

    function showMore(){
        isShowMore.value = !isShowMore.value
    }
</script>
<template>
    <td :class="isShowMore ? 'more' : 'hidemore'" >
        <slot></slot>
        <p class="show-more-btn" v-if="props.showMore" @click="showMore">{{isShowMore ? "show less":"show more"}}</p>
    </td>
</template>


