

import Image from 'next/image';
import Link from 'next/link';
import "@/styles/footer.css";


const Footer = () => {
    return ( 
        <footer className="footer">
            <div className="footer__container">
                <nav className='footer__nav'>
                    <div className='footer__block'>
                        <Image className='footer__img' width={150} height={150} src= {"/logo.png"} alt=""/>
                        <p className='footer__text'>By Konaisya</p>
                    </div>
                    <ul className='footer__ul'>
                        <div className='footer__pages'>
                            <h2 className='footer__title'>Страницы</h2>
                            <li className='footer__li'><Link href="/">Главная</Link></li>
                            <li className='footer__li'><Link href="/services">Наши услуги</Link></li>
                            <li className='footer__li'><Link href="/auth">Авторизация</Link></li>
                        </div>
                        <div className='footer__links'>
                            <h2 className='footer__title'>Ссылки</h2>
                            <li className='footer__li'><Link href = "https://t.me/Konaisya">YouTube</Link></li>
                            <li className='footer__li'><Link href = "">VK</Link></li>
                            <li className='footer__li'><Link href = "">Telegram</Link></li>
                        </div>
                        {/* <div className='footer__social'>
                            <li className='footer__li'>Discord</li>
                            <li className='footer__li'>Github</li>
                        </div> */}
                    </ul>
                </nav>
            </div>
        </footer>
     );
}
 
export default Footer;