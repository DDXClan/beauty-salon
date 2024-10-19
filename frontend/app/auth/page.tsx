import Link from "next/link"

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


const Auth = () => {
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
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input id="username" type="text"  required />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                Login
                </Button>
            </div>
            {/* <div className="mt-4 text-center text-sm">
                У вас нету аккаунта?{" "}
                <Link href="#" className="underline">
                    Зарегестрируйтесь
                </Link>
            </div> */}
            </CardContent>
        </Card>
        </TabsContent>
        <TabsContent value="register">
        <Card className="mx-auto max-w-sm">
            <CardHeader>
            <CardTitle className="text-2xl">Регистрации</CardTitle>
            <CardDescription>
                Введите данные для регистрации
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input id="username" type="text"  required />
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input
                        id="phone"
                        type="phone"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Пароль</Label>
                    </div>
                <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>
            {/* <div className="mt-4 text-center text-sm">
                Уже есть аккаунт?{" "}
                
                <Link href="#" className="underline">
                    Войти
                </Link>
            </div> */}
            </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
    );
}
 
export default Auth;