import React from 'react'

interface ActionButtonProps {
    onClick: () => void;
    color: string;
    text: string;
}
export default function ActionButton({onClick, color='blue', text}: ActionButtonProps) {
    return (
        <>
            <button
                onClick={onClick}
                className={`bg-${color}-500 hover:bg-${color}-700 hover:cursor-pointer text-white font-medium py-2 px-4 rounded transition duration-300`}>
                    {text}
            </button>
        </>
    )
}
