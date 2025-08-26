import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { GraduationCap, LogIn, KeyRound } from 'lucide-react';

export default function LoginPage({ handleShowRegister }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent

    // Step 1: Send the OTP to the user's email
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
            });
            if (error) throw error;
            alert('Check your email for the login code!');
            setOtpSent(true); // Show the OTP input field
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify the OTP and log the user in
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.verifyOtp({
                email: email,
                token: otp,
                type: 'email',
            });
            if (error) throw error;
            // The onAuthStateChange listener in App.js will handle the successful login
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

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
                {!otpSent ? (
                    // --- Email Form ---
                    <form onSubmit={handleSendOtp}>
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center"><LogIn className="mr-2"/> Secure Login</CardTitle>
                            <CardDescription>Enter your email to receive a login code.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <label className="text-sm font-medium text-gray-400">Email</label>
                            <Input 
                                type="email" 
                                placeholder="student@mitadt.edu.in" 
                                className="mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                {loading ? 'Sending...' : 'Send Login Code'}
                            </Button>
                            <Button type="button" variant="link" onClick={handleShowRegister} className="text-gray-400 hover:text-white">
                                Don't have an account? Register
                            </Button>
                        </CardFooter>
                    </form>
                ) : (
                    // --- OTP Form ---
                    <form onSubmit={handleVerifyOtp}>
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center"><KeyRound className="mr-2"/> Enter Code</CardTitle>
                            <CardDescription>A 6-digit code was sent to {email}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <label className="text-sm font-medium text-gray-400">Login Code</label>
                            <Input 
                                type="text" 
                                placeholder="123456" 
                                className="mt-1"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                {loading ? 'Verifying...' : 'Sign In'}
                            </Button>
                            <Button type="button" variant="link" onClick={() => setOtpSent(false)} className="text-gray-400 hover:text-white">
                                Use a different email
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </div>
    );
}   