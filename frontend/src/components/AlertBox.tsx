import React from 'react'

interface AlertBoxProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
    onShow: () => void;
}
export default function AlertBox({ message, type = 'info', onClose, onShow }: AlertBoxProps) {
    const typeClasses = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white',
    }
    return (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded shadow-md flex items-center ${typeClasses[type]}`}>
            <span className="mr-3">{message}</span>
            <button onClick={onClose} className="text-white font-bold ml-2 hover:opacity-75 hover:cursor-pointer">✖</button>
        </div>
    )
}
