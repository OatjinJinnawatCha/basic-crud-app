'use client'
import React from 'react'

export default function Header() {
    return (
        <>
            <header className="bg-blue-500 p-4 shadow-md">
                <div className="mx-auto flex justify-between items-center">
                    <div>
                    <h1 className="text-white text-3xl font-extrabold tracking-wide">EMS</h1>
                    <h2 className="text-white font-extrabold tracking-wide">Employee Management System</h2>
                    </div>    
                    <nav className="space-x-4">
                        <a href="/" className="header-menu">
                            Dashboard
                        </a>
                        <a href="/add" className="header-menu">
                            Add
                        </a>
                    </nav>
                </div>
            </header>
        </>
    )
}
