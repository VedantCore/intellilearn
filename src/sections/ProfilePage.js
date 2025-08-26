import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User, Edit3, Save } from 'lucide-react';

export default function ProfilePage({ session }) {
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: "",
        age: "",
        gender: "",
        phone: "",
        enrollmentNo: "",
    });

    // Fetch profile data when the component loads
    useEffect(() => {
        let isMounted = true;
        async function getProfile() {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from('profiles')
                .select(`full_name, age, gender, phone_no, enrollment_no`)
                .eq('id', user.id)
                .single();

            if (isMounted) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setProfileData({
                        fullName: data.full_name,
                        age: data.age,
                        gender: data.gender,
                        phone: data.phone_no,
                        enrollmentNo: data.enrollment_no,
                    });
                }
                setLoading(false);
            }
        }

        getProfile();
        return () => { isMounted = false; };
    }, [session]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            full_name: profileData.fullName,
            age: profileData.age,
            gender: profileData.gender,
            phone_no: profileData.phone,
            enrollment_no: profileData.enrollmentNo,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            alert('Profile updated successfully!');
            setIsEditing(false);
        }
        setLoading(false);
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img src="https://placehold.co/80x80/1e293b/94a3b8?text=PW" alt="Profile" className="w-20 h-20 rounded-full border-2 border-blue-500" />
                            <div>
                                <CardTitle className="flex items-center"><User className="mr-2 text-blue-400"/> Student Profile</CardTitle>
                                <CardDescription>View and edit your personal information.</CardDescription>
                            </div>
                        </div>
                        <Button onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)} disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700">
                            {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit3 className="mr-2 h-4 w-4" />}
                            {isEditing ? (loading ? 'Saving...' : 'Save') : 'Edit'}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-400">Full Name</label>
                            <Input name="fullName" value={profileData.fullName || ''} onChange={handleInputChange} disabled={!isEditing} />
                        </div>
                         <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-400">Email Address</label>
                            <Input name="email" type="email" value={session.user.email} disabled={true} className="cursor-not-allowed bg-gray-800" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-400">Enrollment No.</label>
                            <Input name="enrollmentNo" value={profileData.enrollmentNo || ''} onChange={handleInputChange} disabled={!isEditing} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-400">Phone Number</label>
                            <Input name="phone" type="tel" value={profileData.phone || ''} onChange={handleInputChange} disabled={!isEditing} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-400">Age</label>
                            <Input name="age" type="number" value={profileData.age || ''} onChange={handleInputChange} disabled={!isEditing} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-400">Gender</label>
                             <select name="gender" value={profileData.gender || ''} onChange={handleInputChange} disabled={!isEditing} className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}