'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default function LoginPage() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/auth/login', data);
      setAuth(res.data.user, res.data.access_token);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input {...register('email')} className="w-full p-2 border rounded" type="email" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input {...register('password')} className="w-full p-2 border rounded" type="password" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Sign In
        </button>
      </form>
    </div>
  );
}
