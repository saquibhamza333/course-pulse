'use client'

import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemProps{
    icon :LucideIcon,
    label : string,
    href : string
}

export const SidebarItem = ({icon:Icon,label,href}:SidebarItemProps)=>{

    const pathName = usePathname();
    const router = useRouter();

    const isActive = (pathName==='/' && href==='/') || pathName ===href || pathName?.startsWith(`${href}/`);
    const onClick = ()=>{
        router.push(href);
    }
    return (
        <div></div>

    )
}