import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserPlus } from 'lucide-react';

export default function RegisterPage({ handleShowLogin }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '', age: '', gender: 'Select Gender', phone: '', enrollmentNo: '', email: '', password: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // The database trigger will automatically create the profile.
            // We pass the full_name in the 'data' option so the trigger can access it.
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        // Note: Supabase auth metadata is limited. Other fields must be updated later.
                    }
                }
            });

            if (error) throw error;

            alert('Registration successful! Please check your email to confirm your account (if enabled).');
            handleShowLogin();

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center justify-center p-4 animate-fade-in-up">
            <Card className="w-full max-w-lg">
                <form onSubmit={handleRegister}>
                    <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center"><UserPlus className="mr-2"/> Create Student Account</CardTitle>
                        <CardDescription>Please fill in your details to register.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input name="fullName" placeholder="Full Name" onChange={handleInputChange} required />
                            <Input name="age" type="number" placeholder="Age" onChange={handleInputChange} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select name="gender" onChange={handleInputChange} required className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                            <Input name="phone" type="tel" placeholder="Phone No." onChange={handleInputChange} required />
                        </div>
                        <Input name="enrollmentNo" placeholder="Enrollment No." onChange={handleInputChange} required />
                        <hr className="border-gray-700" />
                        <Input name="email" type="email" placeholder="Student Email" onChange={handleInputChange} required />
                        <Input name="password" type="password" placeholder="Create Password" onChange={handleInputChange} required />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                        <Button type="button" variant="link" onClick={handleShowLogin} className="text-gray-400 hover:text-white">
                            Already have an account? Sign In
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}