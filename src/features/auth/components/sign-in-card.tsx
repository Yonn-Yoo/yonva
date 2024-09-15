'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TriangleAlert } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function SignInCard() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const params = useSearchParams();
  const error = params.get('error');

  const onCredentialSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  const onProviderSignIn = (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: '/' });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign in to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignIn('github')}
            variant="outline"
            size="lg"
            className="w-full flex items-center space-x-2"
          >
            <FaGithub className="size-5" />
            <span>Continue with Github</span>
          </Button>
          <Button
            onClick={() => onProviderSignIn('google')}
            variant="outline"
            size="lg"
            className="w-full flex items-center space-x-2"
          >
            <FcGoogle className="size-5" />
            <span>Continue with Google</span>
          </Button>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full h-px bg-gray-500" />
          <span className="mx-3 shrink-0 text-sm text-gray-500">
            Or continue with your email
          </span>
          <div className="w-full h-px bg-gray-500" />
        </div>
        <form onSubmit={onCredentialSignIn} className="space-y-2.5">
          <Input
            value={form.email}
            onChange={handleOnChange}
            placeholder="Email"
            type="email"
            name="email"
            required
          />
          <Input
            value={form.password}
            onChange={handleOnChange}
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up">
            <span className="text-sky-700 hover:underline">Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
