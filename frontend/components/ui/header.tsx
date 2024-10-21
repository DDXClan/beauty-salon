"use client";
import { usePathname } from "next/navigation"; 
import "@/styles/header.css";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Link from 'next/link';
import React from "react";
import { useProfile } from "@/hooks/useProfile";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

 

const Header = () => {
    const pathname = usePathname(); 
    const profile = useProfile();
    const getShortenedUsername = (username:string | undefined) => {
        if (!username) return '';
        const shortened = username.slice(0, 2).toUpperCase(); 
        return shortened;
    };

    const [accessToken, setAccessToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        setAccessToken(accessToken);
    }, []);

    const handleLogout = () => {
        
        localStorage.removeItem('access_token');
        setAccessToken(null); 
        window.location.reload(); 
    };
    
    
    return ( 
        <div className="header">
            <nav className="header-nav">
                <ul className="header-ul">
                    <li className="header-li">
                        <Link 
                            className={`headerLink-main ${pathname === '/' ? 'active' : ''}`} 
                            href="/">
                            Главная
                        </Link>
                    </li>
                    <li className="header-li">
                        <Link 
                            href="/services" 
                            className={`headerLink ${pathname === '/services' ? 'active' : ''}`}
                        >
                            Услуги
                        </Link>
                    </li>
                        <li className="header-li-auth">
                        {profile.profile ? (
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                <AvatarImage src={profile.profile?.image} alt="avatar" />
                                <AvatarFallback>{getShortenedUsername(profile.profile?.username)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-58">
                                <DropdownMenuLabel>{profile.profile?.username}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href="/profile">Профиль</Link></DropdownMenuItem>
                                <DropdownMenuItem><Link href="/settings">Настройки</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem style={{color: 'red'}}><button onClick={handleLogout}>Выход</button></DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link 
                                href="/auth" 
                                className={`headerLink-auth ${pathname === '/auth' ? 'active' : ''}`}
                            >
                                Авторизация
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}
 
export default Header;
