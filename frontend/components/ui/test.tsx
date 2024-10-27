
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";
import { useUpdateProfile } from "@/hooks/useProfile"; 
import { useRouter } from 'next/navigation';
import '@/styles/settings.css';
import React, { useEffect, useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const Settings = () => {
    const { profile } = useProfile();
    const router = useRouter();
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token'); 
        if (!accessToken) {
            router.push('/auth'); 
        }
    }, [router]);  
    const { handleUpdateProfile, handleUpdateImage, loading } = useUpdateProfile();
    const [username, setUsername] = useState(profile?.username || '');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number || '');
    const [image, setImage] = useState<File | null>(null); 
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);  
        }
    };

    useEffect(() => {
        setUsername(profile?.username || '');
        setPassword('');
        setPhoneNumber(profile?.phone_number || '');
        setImage(null); 
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedProfile = {
            id: profile?.id as number, 
            username,
            password,
            phone_number: phoneNumber, 
        };
        await handleUpdateProfile(updatedProfile); 

        if (image) {
            await handleUpdateImage(image); 
        }
    };

    const handleSubmitImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (image) {
            await handleUpdateImage(image); 
        }
    };
    return (   
        
        <Dialog>
            <DialogTrigger>        
                <p className=" relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none 
                transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 
                [&>svg]:shrink-0 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">Настройки</p>            
            </DialogTrigger>
            <DialogContent>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Изменить логин или пароль</AccordionTrigger>
                        <AccordionContent>
                        <div className="settings__form-container">
                            <h1 className="settings__title">Изменить имя или пароль</h1>
                            <form className="settings__form" onSubmit={handleSubmit}>
                                <label className="label__settings">Имя пользователя</label>
                                <Input 
                                    className="username__input" 
                                    type="text" 
                                    value={username} 
                                    onChange={handleUsernameChange} 
                                />
                                <label className="label__settings">Номер телефона</label>
                                <Input 
                                    className="phone__input" 
                                    type="text" 
                                    value={phoneNumber} 
                                    onChange={handlePhoneNumberChange} 
                                />
                                <label className="label__settings">Пароль</label>
                                <Input 
                                    className="password__input" 
                                    type="password" 
                                    value={password} 
                                    onChange={handlePasswordChange} 
                                />

                                <Button className="w-full" type="submit" disabled={loading}>
                                    {loading ? 'Сохранение...' : 'Сохранить'}
                                </Button>
                            </form>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Изменить аватар</AccordionTrigger>
                        <AccordionContent>
                        <div className="settings__form-container">
                            <h1 className="settings__title">Изменить аватар</h1>
                            <form className="settings__form" onSubmit={handleSubmitImage}>
                                <label className="label__settings">Изменить аватар</label>
                                <div className="settings__form__image" style={{display: "flex",}}>
                                    <div className="settings__form__image">
                                    <Input 
                                        className="image__input" 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        style={{marginBottom: "16px"}}
                                    />
                                    <Button className="" style={{width: "100%"}} type="submit" disabled={loading}>
                                        {loading ? 'Сохранение...' : 'Сохранить'}
                                    </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </DialogContent>
        </Dialog>
     );
}
 
export default Settings;