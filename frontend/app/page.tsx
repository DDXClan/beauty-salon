"use client";
import "@/styles/main.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ServiceList from "@/components/servicelist";
import Review from "@/components/ui/review";
import Footer from "@/components/ui/footer";

export default function Main() {
  return (
    <div className="main">
    <div className="header-main" >
      <div className="header-main-text">
          <h2 className="header-main-text-title">Салон красоты</h2>
          <div className="header-main-text-linar">
            <h1 className="header-main-text-name">Волшебство стиля и красоты!</h1>
          </div>
          <p className="header-main-text-desc">Мы предлагаем широкий спектр услуг, чтобы подчеркнуть вашу индивидуальность и сделать вас еще более красивыми.</p>
          <Button className="header-main-button">Подробнее</Button>
          <div className="header-main-text-social">
            <p className="header-main-text-social-text">Мы в соцсетях</p>
            <div className="header-main-text-social-icons">
              <Image width={40} height={40} src={"/youtube.png"} alt="youtube" />
              <Image width={40} height={40} src={"/vk.png"} alt="vk" />
              <Image width={40} height={40} src={"/telegram.png"} alt="telegram" />
            </div>
          </div>
      </div>
          <Image className="header-main-img" width={400} height={400} src={"/logo.png"} alt="logo" />
    </div>
      <div className="main-info">
          <ServiceList />
          <div className="main-info-text">
            <h2 className="main-info-title">Наши услуги</h2>
            <p className="main-info-desc">В нашем салоне красоты мы предлагаем широкий спектр услуг, направленных на то, чтобы подчеркнуть вашу индивидуальность и сделать вас еще более привлекательными.</p>
            <Button className="main-info-button" variant={"outline"} >Подробнее</Button>
          </div>
      </div>
      <div className="main-review">
        <Review />
      </div>
      <Footer />
    </div>

  );
}
