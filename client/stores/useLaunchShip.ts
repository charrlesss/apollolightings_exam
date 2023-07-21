import { reactive } from "~~/.nuxt/imports";

type launch_site = {
    site_name?:string,
}

type rocket = {
    rocket:{
        id:string
        name:string
    }
}

export type shipsLunchType = {
   id:string,
   mission_name:string,
   launch_date_utc:string,
   launch_date_unix:number,
   launch_date_local:string,
   details:string,
   launch_site:launch_site,
   rocket:rocket,
}

type stateType = {
    lunches:Array<shipsLunchType> ,
    loading:boolean,
    error:any,
    subDataLunches:Array<shipsLunchType>,
    subDataFavorites:Array<shipsLunchType>,
    favorite:Array<shipsLunchType>
}

const query = gql
`query Launches {
    launches {
            id
            launch_date_local
            mission_name
            launch_date_utc
            launch_date_unix
            launch_date_local
            launch_site {
                site_name
            }
            rocket {
                rocket {
                    id
                    name
                }
            }
            details
        }
    }
`

export const useLaunchShip = defineStore('lunches', {
    state:():stateType=>({
        lunches:[],
        loading:false,
        error:null,
        subDataLunches:[],
        subDataFavorites:[],
        favorite:[],
    }),
    actions:{
       async fetchLunchShip(){
            this.loading = true
            const { onResult,onError } = useQuery<{
                launches: Array<shipsLunchType>
            }>(query)
            
            onResult(queryResult => {
                this.lunches = queryResult.data.launches
                this.subDataLunches = this.lunches
                this.loading = false
            })
            onError((err)=>{
                this.loading = false
                this.error = new Error(err.message)
                throw new Error(err.message)
            })
        },
        setLunches(data:Array<shipsLunchType>){
            this.lunches = data
        },
        setFavorite(data:stateType['favorite']){
            this.favorite = data
        },
        setIsLoading(){
            this.loading = true;
        },
        filterDataLunches(input:string,cb:CallableFunction) {
            cb(this.subDataLunches)
            if(input && input !== ''){
                console.log(this.lunches)
                console.log(input)
                cb(this.lunches.filter((data)=>new Date(data.launch_date_local).toLocaleDateString().split('/')[2] === input))  
            }else{
                cb(this.subDataLunches)
            }
        },
        filterDataFavortire(input:string,cb:CallableFunction) {
            cb(this.subDataFavorites)
            if(input && input !== ''){
                cb(this.favorite.filter((data)=>new Date(data.launch_date_local).toLocaleDateString().split('/')[2] === input))  
            }else{
                cb(this.subDataFavorites)
            }
        },
        sortData(id:number,asc:boolean , data:Array<shipsLunchType>,cb:CallableFunction){
            let copyLunches =[ ...data]

            switch(id){
                case 1 :
                    copyLunches.sort((a,b)=>{
                        if ((!asc && a.mission_name < b.mission_name) || (asc && b.mission_name < a.mission_name)){
                            return -1;
                        }
                        if ( (!asc && a.mission_name > b.mission_name ) || (asc && b.mission_name > a.mission_name )){
                            return 1;
                        }
                        return 0;
                   })
                   cb(copyLunches)
                break
                case 2 :
                    copyLunches.sort((a,b)=>{
                        if ((!asc && new Date(b.launch_date_local) < new Date(a.launch_date_local)) || (asc && new Date(a.launch_date_local) < new Date(b.launch_date_local))){
                            return -1;
                        }
                        if ( (!asc &&  new Date(b.launch_date_local) >  new Date(a.launch_date_local)) || (asc &&  new Date(a.launch_date_local) >  new Date(b.launch_date_local)) ){
                            return 1;
                        }
                        return 0;
                   })
                    cb(copyLunches)
                
                break 
                case 4 :
                    copyLunches.sort((a,b)=>{
                        if ((!asc && (a.rocket.rocket.name as string) < (b.rocket.rocket.name as string)) || (asc && (b.rocket.rocket.name as string) < (a.rocket.rocket.name as string))  ){
                            return -1;
                        }
                        if ((asc && (a.rocket.rocket.name as string) > (b.rocket.rocket.name as string)) || (asc && (a.rocket.rocket.name as string) > (b.rocket.rocket.name as string))){
                            return 1;
                        }
                        return 0;
                   })
                    cb(copyLunches)
                break
                default:
                     cb(copyLunches)
            }
        },
        setAddToFavorite(data:shipsLunchType ,id:string){
            this.favorite.push({...data})
            this.subDataFavorites = this.favorite
        },
        removeAddToFavorite(idx:string){
          this.favorite =   this.favorite.filter((data)=>data.id !== idx)
        },
        isFavAlready(id:string){
           const favId = this.favorite.some(data=>data.id === id)
           if(favId){
            return true
           }
           return false
        },      
    }
  })

