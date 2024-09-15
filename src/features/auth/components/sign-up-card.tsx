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
import { useSignUp } from '@/features/auth/hooks/use-sign-up';
import { TriangleAlert } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export const SignUpCard = () => {
  const mutation = useSignUp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onProviderSignUp = (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: '/' });
  };

  const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = form;
    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
          });
        },
      }
    );
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Use below services to sign up</CardDescription>
      </CardHeader>
      {!!mutation.error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{mutation.error.message}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={mutation.isPending}
            onClick={() => onProviderSignUp('github')}
            variant="outline"
            size="lg"
            className="w-full flex items-center space-x-2"
          >
            <FaGithub className="size-5" />
            <span>Continue with Github</span>
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() => onProviderSignUp('google')}
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
            Or sign up with your own email
          </span>
          <div className="w-full h-px bg-gray-500" />
        </div>
        <form onSubmit={onCredentialSignUp} className="space-y-2.5">
          <Input
            disabled={mutation.isPending}
            value={form.name}
            onChange={handleOnChange}
            placeholder="Full name"
            type="text"
            name="name"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={form.email}
            onChange={handleOnChange}
            placeholder="Email"
            type="email"
            name="email"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={form.password}
            onChange={handleOnChange}
            placeholder="Password"
            type="password"
            name="password"
            required
            minLength={3}
            maxLength={20}
          />
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in">
            <span className="text-sky-700 hover:underline">Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
