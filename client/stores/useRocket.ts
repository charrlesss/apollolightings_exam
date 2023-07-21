


type diameter = {
    site_name?:string,
}

type height = {
    rocket:{
        id:string
        name:string
    }
}

type mass = {
    rocket:{
        id:string
        name:string
    }
}

export type rocketTypes = {
    name:string
    description:string
    first_flight:Date,
    stages:Int32List,
    wikipedia:string
    height:height
    diameter:diameter
    mass:mass
}

 type stateTpes = {
    rocket:Array<rocketTypes>
    loading:boolean,
    error:any,
    id:string
}

const  query = gql`
query Rocket($rocketId: ID!) {
    rocket(id: $rocketId) {
       name
      description
      first_flight
      stages,
      wikipedia
      height {
        feet
        meters
      }
      diameter {
        feet
        meters
      }
      mass {
        kg
        lb
      }
    }
  }
`

export const useRocket = defineStore('rocket',{
    state:():stateTpes=>({rocket:[],loading:false,error:null,id:''}),
    actions:{
        async fetchRocketDetails(){
            this.loading = true
            const { onResult,onError } = useQuery<{
                rocket: Array<rocketTypes>
            }>(query,{rocketId:this.id})
            
            onResult(queryResult => {
                this.rocket = queryResult.data.rocket
                this.loading = false
            })
            onError((err)=>{
                this.loading = false
                this.error = new Error(err.message)
                throw new Error(err.message)
            })
        },
        setIsLoading(){
            this.loading = true;
        },
        setId(id:string){
            this.id = id;
        },
    }
})