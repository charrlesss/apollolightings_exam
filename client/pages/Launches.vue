<template>
   <DefaultLayout>
    <v-container>
        <h1 
        style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; padding-left:20px ;"
        >Rocket Launches</h1>
        <div class="combo-box">
            <v-checkbox
            v-model="showToolTip"
            color="blue"
             label="Show Tooltip"
             ></v-checkbox>
            <div class="combo-box-wrapper"> 
                <v-combobox
                v-model:modelValue="searchInput"
                clearable
                label="Filter by Year"
                :items="
                [
                    '2023',
                    '2022',
                    '2021',
                    '2020',
                    '2019',
                    '2018',
                    '2017',
                    '2016',
                    '2015',
                    '2014',
                    '2013',
                    '2012',
                    '2011',
                    '2010',
                    '2009',
                    '2008',
                    '2007',
                    '2006',
                    '2005',
                    '2004',
                    '2003',
                    '2002',
                    '2001',
                    '2000',
                    '1999',
                    '1998',
                    '1997',
                    '1996',
                    '1995',
                    '1994',
                    '1993',
                    '1992',
                    '1991',
                    '1990',
                    '1989',
                    '1988',
                    '1987',
                    '1986',
                    '1985',
                    '1984',
                    '1983',
                    '1982',
                    '1981',
                    '1980',
                    ]
                    "
                >
                </v-combobox>
            </div>
        </div>
              <client-only>
                <div  class="table" :class="[store.loading ? 'deactive' :'active']">
                    <v-table>
                        <thead>
                            <tr >
                               <TableHead 
                                    v-for="headerData in headers" :key="headerData.id"
                                    :class="headerData.class"
                                    :asc="headerData.asc" 
                                    :id="headerData.id" 
                                    :sortable="headerData.sortable"
                                    @handleHeaderClick="handleHeaderClick"
                                    :showToolTip="showToolTip"
                                    >
                                     {{ headerData.title }}
                                </TableHead>
                            </tr>
                        </thead>
                        <tbody>
                            <client-only>
                                <div class="loading-container" v-show="store.loading">
                                    <v-progress-circular
                                    :size="45"
                                    color="primary"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>
                            </client-only>
                            <tr v-if="store.lunches.length <= 0">
                                <td style="text-align: center; height: 300px; font-size: 2em; color: darkgray; " :colspan="5" :rowspan="5">Empty</td>
                            </tr>
                            <template v-else>
                                <tr v-for="(lunchesShip,idx) in store.lunches" :key="lunchesShip.id" :id="lunchesShip.id" @dblclick="onDoubleClick($event,lunchesShip.rocket.rocket.id)" >
                                <v-tooltip
                                    v-if="showToolTip"
                                    activator="parent"
                                    location="top"
                                >
                                    Double click to view rocket
                                </v-tooltip>
                                <TableData >{{ lunchesShip.mission_name }}</TableData>
                                <TableData >{{ new Date(lunchesShip.launch_date_local).toLocaleDateString() }}</TableData>
                                <TableData class="td-sitename">{{ lunchesShip?.launch_site?.site_name }}</TableData>
                                <TableData >{{ lunchesShip.rocket.rocket.name }}</TableData>
                                <TableData class="td-details" :showMore="lunchesShip.details && lunchesShip.details.length > 50 ? true: false" ><div>{{ lunchesShip.details }}</div></TableData>
                                 <TableData class="td-action">
                                    <v-chip v-if="store.isFavAlready(lunchesShip.id)" color="orange" style="cursor: pointer;" @click="store.removeAddToFavorite(lunchesShip.id)">Favorite</v-chip>
                                    <v-chip v-else  color="green" style="cursor: pointer;"   @click="store.setAddToFavorite(lunchesShip,lunchesShip.id)">Add Favorites</v-chip>
                                </TableData> 
                            </tr> 
                            </template>
                    </tbody>
                </v-table>
                </div>
              </client-only>
            
    </v-container>
   </DefaultLayout>
</template>


<script lang="ts" setup>

    const route = useMyRouter()
    const searchInput = ref('')
    const showToolTip = ref(false)
    let debounceTimer:any = null
    const store = useLaunchShip()
    const headers = 
    ref([
        {
            id:1,
            title:'Mission name',
            class:'',
            asc:false,
            sortable:true
        },
        {
             id:2,
            title:'Launch date',
            class:'',
            asc:false,
            sortable:true
        },
        {
             id:3,
            title:'Launch site name',
            class:'th-sitename',
            asc:false,
            sortable:false
        },
        {
             id:4,
            title:'Rocket name',
            class:'',
            asc:false,
            sortable:true
        },
        {
            id:5,
            title:'Details',
            class:'th-details',
            asc:false,
            sortable:false
        },
        {
            id:6,
            title:'Action',
            class:'btn-fav',
            asc:false,
            sortable:false
        },
    ])

    onMounted(()=>{
        if(store.lunches.length > 0){
            return
        }
        store.setIsLoading()
        store.fetchLunchShip()
    })

   function performSearch() {
      debounce(() => {
        store.filterDataLunches(searchInput.value,store.setLunches)
      }, 300);
    }

   function debounce(func:CallableFunction, delay:number) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(func, delay);
    }

    watch(searchInput,()=>{
        performSearch()
    })

    function handleHeaderClick(id:number){
        if(id === undefined || store.lunches.length <= 0){
            return
        }
       headers.value = headers.value.map((data)=>{
            if(data.id === id){
                store.sortData(id,data.asc ,store.lunches,store.setLunches)
                data.asc = !data.asc
            }else{
                data.asc = false
            }
            return data
        })
        
    }

    function onDoubleClick (e:any,id:string){
        e.preventDefault()
        route.toNewTab(`/rocket/${id}`)
    }

</script>

<style>
  .btn-fav{
        display: flex;
        justify-content: center;
    }
    .td-action{
        text-align: center;
    }
    .combo-box{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .combo-box-wrapper{
        width: 300px;
    }
    .table{
        position: relative !important;
    }
    .table th{
        font-size: 14px;
        white-space: nowrap;
        cursor: pointer;
    }
    .table th div{
        display: flex;
        align-items: center;
        column-gap: 5px;
    }
    .table th:hover{
        color:rgb(17, 107, 160) !important
    }
    .table th:hover svg{
        fill:rgb(17, 107, 160) !important
    }
    .table tbody tr{
        cursor: pointer;
    }
    .table tbody tr:hover{
        cursor: pointer;
        background-color: rgba(224, 224, 224, 0.699);
    }
    .table tbody tr td{
        font-size: 13px;
        max-width: 350px;
        padding: 10px 0;
        z-index: 9999999;
    }
    .table td.hidemore div{
        font-size: 13px;
        text-overflow: ellipsis;
        overflow: hidden; 
        width: 300px; 
        height: 1.2em; 
        white-space: nowrap;
        transition: all 300ms;
    }

    .table td.more div{
        font-size: 13px;
        text-overflow: ellipsis;
        overflow: none; 
        width: 300px; 
        height: auto; 
        white-space: pre-wrap;
        padding: 5px 0;
        transition: all 300ms;
    } 
    .table.deactive{
        overflow-y: none;
    }
    .table.active{
        overflow-y: auto;
        max-height: 500px;
    }
    .loading-container{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 500px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(240, 236, 236, 0.774);
    }

    .show-more-btn{
        color: rgb(168, 170, 172);
        font-size: 11px;
        margin-top: 10px;
        width: 60px;
    }
    .show-more-btn:hover{
        color: rgb(138, 140, 141);
    }
    
    @media (max-width: 800px) {
        .table.active{
            overflow: auto;
            max-height: 450px;
        } 
        .th-sitename,
        .td-sitename{
            display: none !important;
            visibility: hidden !important;
        }
    }

    @media (max-width: 650px) {
        .table.active{
            overflow: auto;
            max-height: 400px;
        } 
        .th-details,
        .td-details{
            display: none !important;
            visibility: hidden !important;
        }
        .table th{
            font-size: 13px;
            white-space: nowrap;
        }
        .table td{
            font-size: 12px;
        }
    }


</style>