"use client";

import { usePathname } from "next/navigation"; 
import "@/styles/header.css";
import Link from 'next/link';

const Header = () => {
    const pathname = usePathname(); 
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
                </ul>
            </nav>
        </div>
    );
}
 
export default Header;
