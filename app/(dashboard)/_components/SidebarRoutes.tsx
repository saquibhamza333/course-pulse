'use client '

import { Compass, Layout } from "lucide-react"

const guestRoutes = [
    {
        icon :Layout,
        label: 'dashboard',
        href :'/'
    },
    {
        icon :Compass,
        label: 'Browse',
        href :'/search'
    }
]

export const SidebarRoutes = ()=>{
    const routes = guestRoutes
    return (
        <div className="flex flex-col w-full">
            {routes.map((route)=>(
                <SidebarItem key= {route.href} icon={route.icon} label={route.label} href={route.href}/>
            ))}
        </div>
    )
}