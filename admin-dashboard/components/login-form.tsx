'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const form = useForm<LoginFormData>();
  const { register, handleSubmit, formState: { errors } } = form;
  const router = useRouter()
  const { toast } = useToast()
  
  const onSubmit = async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        router.push('/dashboard');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: 'Login failed. Please check your credentials.',
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="login"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
