import type {Router} from 'vue-router'
import { useRouter } from 'nuxt/app'

const __router = () => useRouter()

type toNewTab = (url:string,newTab?:boolean)=>void

interface NewRouter extends Router{
    toNewTab:toNewTab
 }

 const newTabFunction:toNewTab = (url ,newTab = true)=>{
    const link = document.createElement('a')
    link.href = url
    link.target = newTab ? '_blank' : ''
    if (newTab) link.rel = 'noopener noreferrer' 
    link.click()
 }

export const useMyRouter = ():NewRouter=>{
    const newRouter:NewRouter =  Object(__router())
    newRouter.toNewTab = newTabFunction

    return newRouter 
}