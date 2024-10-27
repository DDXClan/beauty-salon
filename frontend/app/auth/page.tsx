"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import { useLogin } from "@/hooks/useLogin";
import { useSignup } from "@/hooks/useSingup"


const Auth = () => {
    const { handleLogin, loading, error } = useLogin();
    const { handleSignup, loading: loadingSingup, error: errorSingup } = useSignup();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');;
    const [phone_number, setPhone] = React.useState('');
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(username, password);
      };
      
      const onSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSignup(username, password, phone_number); 
    };

    return ( 
        <Tabs defaultValue="login" className="w-[400px]" style={{margin: "0 auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Войти</TabsTrigger>
          <TabsTrigger value="register">Зерегестрироваться</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
        <Card className="mx-auto max-w-sm">
            <CardHeader>
            <CardTitle className="text-2xl">Войти</CardTitle>
            <CardDescription>
                Введите свое имя пользователя и пароль чтобы войти
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={onSubmit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full"  disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                </Button>
                {error && <p>{error}</p>}
            </div>
            </form>
            </CardContent>
        </Card>
        </TabsContent>
        <TabsContent value="register">
        <Card className="mx-auto max-w-sm">
            <CardHeader>
            <CardTitle className="text-2xl">Регистрация</CardTitle>
            <CardDescription>
                Введите данные для регистрации
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={onSignupSubmit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}  required />
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input
                        id="phone"
                        type="phone"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Пароль</Label>
                    </div>
                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Зерегестрироваться
                </Button>
            </div>
            </form>
            </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
    );
}
 
export default Auth;