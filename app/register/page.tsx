'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await register(email, username, password);
        } catch (err) {
            console.error(err);
            setError('Failed to register');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-black"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-black"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Register
                    </button>

                    <p className="mt-10 text-center">
                        Already registered?
                        <a
                            href="/login"
                            className="pl-1 text-blue-500 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/login');
                            }}
                        >
                            Click here to login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
