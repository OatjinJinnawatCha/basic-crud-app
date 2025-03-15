'use client'
import ActionButton from '@/components/ActionButton'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AlertBox from '@/components/AlertBox';

interface UserData {
    name: string;
    jobPosition: string;
}
export default function page() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData>({ name: '', jobPosition: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleCancel = () => {
        setAlertMessage("Cancel");
        setAlertType('warning');
        handleAlert();
    }
    const handleCreate = () => {
        setAlertMessage("Created");
        setAlertType('success');
        handleAlert();
    }
    const handleAlert = () => {
        setShowAlert(true);
    }
    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    return (
        <>
            <div className='page-layout'>
                <h1 className='page-title'>Add User</h1>

                {/* Form to Add User */}
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col'>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            // required
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
                            // required
                            value={userData.jobPosition}
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
                        <ActionButton
                            onClick={() => setShowAlert(true)}
                            color={'yellow'}
                            text={'Alert'} />
                    </div>
                </form>
            </div>

            {/* Alert Box */}
            {showAlert && (
                <AlertBox
                    message={alertMessage}
                    type={alertType}
                    onClose={handleCloseAlert}
                    onShow={handleAlert}>
                </AlertBox>
            )}
        </>
    )
}
