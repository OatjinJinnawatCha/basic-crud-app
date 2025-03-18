import { Breadcrumbs, Link } from '@mui/material';
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function page() {
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
        <div className='page-layout'>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
            <h1 className='page-title'>View User</h1>
            {/* User Details */}
            <div>
                <h2>User ID: 1</h2>
                <p>Name: John Doe</p>
                <p>Job Position: Admin</p>
            </div>
        </div>
    )
}
