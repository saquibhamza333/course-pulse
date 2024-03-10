import Image from "next/image"

export const Logo = () =>{
return (
    <div>
        <Image height= {50} width={50}  alt='logo' src='/logo.svg'></Image>
    </div>
)
} 