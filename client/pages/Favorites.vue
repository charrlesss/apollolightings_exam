<template>
    <DefaultLayout>
      <v-container>
        <h1 
        style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; padding-left:20px ;"
        >Favorites</h1>
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
                            <tr v-if="store.favorite.length <= 0">
                                <td style="text-align: center; height: 300px; font-size: 2em; color: darkgray; " :colspan="6" :rowspan="6">Empty</td>
                            </tr>
                            <template v-else>
                                <tr v-for="fav in store.favorite" :key="fav.id" :class="fav.id" @dblclick="onDoubleClick($event,fav.rocket.rocket.id)" >
                                    <v-tooltip
                                        v-if="showToolTip"
                                        activator="parent"
                                        location="top"
                                    >
                                        Double click to view rocket
                                    </v-tooltip>
                                    <TableData >{{ fav.mission_name }}</TableData>
                                    <TableData >{{ new Date(fav.launch_date_local).toLocaleDateString() }}</TableData>
                                    <TableData class="td-sitename">{{ fav?.launch_site?.site_name }}</TableData>
                                    <TableData >{{ fav.rocket.rocket.name }}</TableData>
                                    <TableData class="td-details" :showMore="fav.details && fav.details.length > 50 ? true: false" ><div>{{ fav.details }}</div></TableData>
                                    <TableData>
                                        <v-chip color="orange" style="cursor: pointer;" @click="store.removeAddToFavorite(fav.id)">Remove Favorite</v-chip>
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
const store = useLaunchShip()
const route = useMyRouter()
const searchInput = ref('')
const showToolTip = ref(false)
let debounceTimer:any = null
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

    function performSearch() {
      debounce(() => {
        store.filterDataFavortire(searchInput.value,store.setFavorite)
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
        if(id === undefined || store.favorite.length <= 0){
            return
        }
       headers.value = headers.value.map((data)=>{
            if(data.id === id){
                store.sortData(id,data.asc ,store.favorite,store.setFavorite)
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
</style>