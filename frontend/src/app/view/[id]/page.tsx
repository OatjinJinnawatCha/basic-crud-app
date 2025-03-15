import React from 'react'

export default function page() {
    return (
        <div className='page-layout'>
            <h1 className='page-title'>View User</h1>
            {/* User Details */}
            <div>
                <h2>User ID: 1</h2>
                <p>Name: John Doe</p>
                <p>Job Position: Admin</p>
            </div>
            <button className='action-button bg-blue-500'>Edit</button>
            <button className='action-button bg-red-500'>Delete</button>
            <button className='action-button'>Back</button>
        </div>
    )
}
