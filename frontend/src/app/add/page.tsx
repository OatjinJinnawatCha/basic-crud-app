'use client'
import ActionButton from '@/components/ActionButton'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AlertBox from '@/components/AlertBox';
import axios from 'axios';
import { Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface UserData {
    name: string;
    jobPosition: string;
    description: string;
}
export default function page() {
    const router = useRouter();
    const backendAPI = process.env.NEXT_PUBLIC_API_URL;

    const [userData, setUserData] = useState<UserData>({ name: '', jobPosition: '', description: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleCancel = () => {
        router.push('/');
    }
    const handleCreate = async () => {
        const response = await axios.post(`${backendAPI}/user/create`, userData)
        if (response.status === 201) {
            setAlertMessage("Created");
            setAlertType('success');
            handleAlert();
        } else{
            setAlertMessage("Failed to create");
            setAlertType('error');
            handleAlert();
        }
    }
    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false),
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
            Add
        </Link>,
    ];

    return (
        <>
            <div className='page-layout'>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
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
                            onClick={handleCreate}
                            color={'blue'}
                            text={'Create'} />
                        <ActionButton
                            onClick={handleCancel}
                            color={'red'}
                            text={'Cancel'} />
                    </div>
                </form>
            </div>

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
