'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import HeroScene from '@/components/HeroScene';

export default function Home() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    api.get('/problems').then((res) => setProblems(res.data));
  }, []);

  return (
    <main className="relative">
      <HeroScene />
      <div className="container mx-auto p-4 pt-32">
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Solve the Unsolvable.
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Join the world's most intelligent crowd-powered problem solving marketplace.
        </p>
        <div className="grid gap-6">
          {problems.map((problem: any) => (
            <div key={problem.id} className="p-6 bg-white/80 backdrop-blur-sm border rounded-xl shadow-sm hover:shadow-xl transition-all">
              <h2 className="text-2xl font-bold">{problem.title}</h2>
              <p className="text-gray-600 mt-2">{problem.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm font-medium text-gray-500">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">By {problem.author?.username}</span>
                <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1">
                   Score: {problem.voteScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

