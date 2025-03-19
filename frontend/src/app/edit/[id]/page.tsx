'use client'
import ActionButton from '@/components/ActionButton';
import AlertBox from '@/components/AlertBox';
import { Breadcrumbs, Link } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PageLoading from '@/components/PageLoading';

interface UserData {
    name: string;
    jobPosition: string;
    description: string;
}
export default function page() {
    const router = useRouter();
    const { id } = useParams();
    const backendAPI = process.env.NEXT_PUBLIC_API_URL;

    const [userData, setUserData] = useState<UserData>({ name: '', jobPosition: '', description: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendAPI}/user/getUser?id=${id}`);
                if (!response.status) throw new Error("Failed to fetch user");
                setUserData(response.data.data || {});
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setIsLoading(true);
            }
        }
        fetchUserData();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleUpdate = async () => {
        setIsLoading(true);
        const response = await axios.put(`${backendAPI}/user/update?id=${id}`, userData)
        if (response.status === 200) {
            setIsLoading(false);
            setAlertMessage("Updated");
            setAlertType('success');
            handleAlert();
        } else {
            setIsLoading(false);
            setAlertMessage("Failed to update");
            setAlertType('error');
            handleAlert();
        }
    }
    const handleDelete = async () => {
        setIsLoading(true);
        const response = await axios.delete(`${backendAPI}/user/delete?id=${id}`)
        if (response.status === 200) {
            setIsLoading(false);
            setAlertMessage("Deleted");
            setAlertType('success');
            handleAlert();
        } else {
            setIsLoading(false);
            setAlertMessage("Failed to delete");
            setAlertType('error');
            handleAlert();
        }
    }
    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false)
            router.push('/')
        }, 1500);
    }
    const handleCloseAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
        setAlertType('info');
    }
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            EMS
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/">
            Dashboard
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/add" sx={{ color: 'text.primary' }}>
            Edit
        </Link>,
    ];
    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : (
                <div className='page-layout'>
                    {/* Breadcrumbs Section */}
                    <div className="mb-4">
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </div>
                    <h1 className='page-title'>Add Employee</h1>

                    {/* Form to Add User */}
                    <form onSubmit={(e) => e.preventDefault()} className='flex flex-col'>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={userData.name}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>
                        <div>
                            <label htmlFor="jobPosition">Job Position:</label>
                            <input
                                type="text"
                                id="jobPosition"
                                name="jobPosition"
                                required
                                value={userData.jobPosition}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                value={userData.description}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>
                        <div className='flex space-x-2 py-2 items-center justify-center'>
                            <ActionButton
                                onClick={handleUpdate}
                                color={'blue'}
                                text={'Edit'} />
                            <ActionButton
                                onClick={handleDelete}
                                color={'red'}
                                text={'Delete'} />
                        </div>
                    </form>
                </div>
            )}

            {/* Alert Box */}
            {showAlert && (
                <AlertBox
                    message={alertMessage}
                    severity={alertType}
                    onClose={handleCloseAlert}
                    onShow={handleAlert}>
                </AlertBox>
            )}
        </>
    )
}
