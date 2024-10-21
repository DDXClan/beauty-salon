"use client"
import Card_order from "@/components/ui/card_order";
import "@/styles/profile.css";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import * as React from 'react';
const Profile = () => {
    const router = useRouter();

    React.useEffect(() => {
        const accessToken = localStorage.getItem('access_token'); 
        if (!accessToken) {
            router.push('/auth'); 
        }
    }, [router]);
    const profile = useProfile();
    return ( 
        <div className="profile">
            <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Ваши заказы</h1>
            <div className="profile__content">
                <Card_order />
            </div>
        </div>
     );
}
 
export default Profile;