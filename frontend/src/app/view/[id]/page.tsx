'use client'
import { Breadcrumbs, Link } from '@mui/material';
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PageLoading from '@/components/PageLoading';

interface UserData {
    id: number;
    name: string;
    jobPosition: string;
    description: string;
}

export default function page() {
    const { id } = useParams();
    const backendAPI = process.env.NEXT_PUBLIC_API_URL;

    const [user, setUser] = useState<UserData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${backendAPI}/user/getUser?id=${id}`);
                if (!response.status) throw new Error("Failed to fetch users");
                setUser(response.data.data)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setIsLoading(false);
            }
        }
        fetchUser();
    }, []);
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            EMS
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/">
            Dashboard
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/add" sx={{ color: 'text.primary' }}>
            View
        </Link>,
    ];
    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : (
                <div className="page-layout">
                    {/* Breadcrumbs Section */}
                    <div className="mb-4">
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </div>

                    {/* Page Title */}
                    <h1 className="page-title">View User</h1>

                    {/* User Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">User ID: {user?.id}</h2>

                        <div className="space-y-2">
                            <p className="text-lg text-gray-600"><strong>Name:</strong> {user?.name}</p>
                            <p className="text-lg text-gray-600"><strong>Job Position:</strong> {user?.jobPosition}</p>
                            <p className="text-lg text-gray-600"><strong>Description:</strong> {user?.description}</p>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}
