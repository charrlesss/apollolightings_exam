<template>
    <th @mouseover="show =true" @mouseleave="show = false"  @click="$emit('handleHeaderClick',checkIfSortable()?.id)"  :class="[checkIfSortable()?.asc ? 'rotate-up' :'rotate-down']">
      <div  >
        <slot>
        </slot>
        <div v-if="props.sortable">
            <svg fill="#000000" height="8px" width="8px"
                viewBox="0 0 330 330" xml:space="preserve">
            <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
            </svg>
            <v-tooltip
            v-if="props.showToolTip"
            v-model="show"
            activator="parent"
            location="end"
            >
                {{props.asc ? 'Sort Desc' : 'Sort Asc'}}
            </v-tooltip>

        </div>
        
      </div>
    </th>
</template>



<script lang="ts" setup>
    import {ref} from 'vue'
    const show = ref()
    const props = defineProps({
        asc:Boolean,
        id:Number,
        sortable:Boolean,
        showToolTip:Boolean
    })
    function checkIfSortable(){
        if(!props.sortable){
            return
        }
        return props
    }
</script>


<style>
    th.rotate-down div svg{
        transform: rotate(360deg);
        transition: all 300ms;
    }
    th.rotate-up div svg{
        transform: rotate(180deg);
        transition: all 300ms;
    }
    th.rotate-up{
        color:rgb(17, 107, 160) !important
    }
</style>