// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useProfile } from "@/hooks/useProfile";
// import { useUpdateProfile } from "@/hooks/useProfile"; 
// import { useRouter } from 'next/navigation';
// import '@/styles/settings.css';
// import React, { useEffect, useState } from 'react';

// const Settings = () => {
//     const router = useRouter();
//     useEffect(() => {
//         const accessToken = localStorage.getItem('access_token'); 
//         if (!accessToken) {
//             router.push('/auth'); 
//         }
//     }, [router]);

//     const { profile } = useProfile();
//     const { handleUpdateProfile, handleUpdateImage, loading, error } = useUpdateProfile();

//     const [username, setUsername] = useState(profile?.username || '');
//     const [password, setPassword] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number || '');
//     const [image, setImage] = useState<File | null>(null); 

//     const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUsername(e.target.value);
//     };
//     const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(e.target.value);
//     };
//     const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPhoneNumber(e.target.value);
//     };
    
//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             setImage(file);  
//         }
//     };

//     useEffect(() => {
//         setUsername(profile?.username || '');
//         setPassword('');
//         setPhoneNumber(profile?.phone_number || '');
//         setImage(null); 
//     }, [profile]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const updatedProfile = {
//             id: profile?.id as number, 
//             username,
//             password,
//             phone_number: phoneNumber, 
//         };
//         await handleUpdateProfile(updatedProfile); 

//         if (image) {
//             await handleUpdateImage(image); 
//         }
//     };

//     const handleSubmitImage = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (image) {
//             await handleUpdateImage(image); 
//         }
//     };

//     return (
//         <div className="settings">
//             <div style={{display: "flex"}} className="settings__container" >
//                 <div className="settings__form-container">
//                     <h1 className="settings__title">Изменить имя или пароль</h1>
//                     <form className="settings__form" onSubmit={handleSubmit}>
//                         <label className="label__settings">Имя пользователя</label>
//                         <Input 
//                             className="username__input" 
//                             type="text" 
//                             value={username} 
//                             onChange={handleUsernameChange} 
//                         />
//                         <label className="label__settings">Номер телефона</label>
//                         <Input 
//                             className="phone__input" 
//                             type="text" 
//                             value={phoneNumber} 
//                             onChange={handlePhoneNumberChange} 
//                         />
//                         <label className="label__settings">Пароль</label>
//                         <Input 
//                             className="password__input" 
//                             type="password" 
//                             value={password} 
//                             onChange={handlePasswordChange} 
//                         />

//                         <Button className="w-[200px]" type="submit" disabled={loading}>
//                             {loading ? 'Сохранение...' : 'Сохранить'}
//                         </Button>
//                     </form>
//                 </div>
//                 <form style={{marginLeft: "20px" }} className="settings__form__image" onSubmit={handleSubmitImage}>
//                 <h1  className="settings__title">Изменить изображение профиля</h1>
//                 <label className="label__settings">Изображение профиля</label>
//                     <Input 
//                         className="image__input" 
//                         type="file" 
//                         accept="image/*" 
//                         onChange={handleImageChange} 
//                     />
//                     <Button className="w-[200px]" type="submit" disabled={loading}>
//                         {loading ? 'Сохранение...' : 'Сохранить'}
//                     </Button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Settings;
