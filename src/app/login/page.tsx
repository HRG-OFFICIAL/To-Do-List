'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isDemoTyping, setIsDemoTyping] = useState(false);

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  const typeIntoField = async (
    field: 'email' | 'password',
    value: string,
    stepMs = 60
  ) => {
    setValue(field, '');
    for (let i = 1; i <= value.length; i++) {
      setValue(field, value.slice(0, i), { shouldValidate: false, shouldDirty: true });
      await sleep(stepMs);
    }
  };

  const handleDemoLogin = async () => {
    if (isSubmitting || isDemoTyping) return;
    setIsDemoTyping(true);
    try {
      const demoEmail = 'demo@example.com';
      const demoPassword = 'password';

      await typeIntoField('email', demoEmail, 50);
      await sleep(250);
      await typeIntoField('password', demoPassword, 70);
      await sleep(250);

      // Submit
      await onSubmit({ email: demoEmail, password: demoPassword });
    } finally {
      setIsDemoTyping(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const result = await login(data);
      if (result.success) {
        toast.success('Login successful!');
        router.push('/');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner h-8 w-8"></div>
      </div>
    );
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[hsl(var(--card))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-[hsl(var(--foreground))]">
            Sign in to your account
          </h2>
  <p className="mt-2 text-center text-sm text-gray-600 dark:text-[hsl(var(--muted-foreground))]">
            Or{' '}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="Enter your email"
              disabled={isSubmitting || isDemoTyping}
            />
            
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Enter your password"
              disabled={isSubmitting || isDemoTyping}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting || isDemoTyping}
          >
            Sign in
          </Button>

          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoLogin}
              disabled={isSubmitting || isDemoTyping}
              className="mt-2"
            >
              Guest Account (auto-fill)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
