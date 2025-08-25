import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { GraduationCap, LogIn } from 'lucide-react';

export default function LoginPage({ handleLogin, handleShowRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center justify-center p-4 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-8">
                <GraduationCap className="h-12 w-12 text-blue-500" />
                <div>
                    <h1 className="text-3xl font-bold text-white">IntelliLearn</h1>
                    <p className="text-gray-400">by MIT-ADT University</p>
                </div>
            </div>
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center"><LogIn className="mr-2"/> Welcome Back</CardTitle>
                    <CardDescription>Please sign in to continue.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-400">Email</label>
                        <Input 
                            type="email" 
                            placeholder="student@mitadt.edu.in" 
                            className="mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-400">Password</label>
                        <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button onClick={() => handleLogin(email)} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                        Sign In
                    </Button>
                    <Button variant="link" onClick={handleShowRegister} className="text-gray-400 hover:text-white">
                        Don't have an account? Register
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}