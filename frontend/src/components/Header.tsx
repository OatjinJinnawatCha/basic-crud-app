import React from 'react'

export default function Header() {
    return (
        <>
            <header className="bg-blue-500 p-4 shadow-md">
                <div className="mx-auto flex justify-between items-center">
                    <h1 className="text-white text-3xl font-extrabold tracking-wide">My App</h1>
                    <nav className="space-x-4">
                        <a href="/" className="header-menu">
                            Home
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
