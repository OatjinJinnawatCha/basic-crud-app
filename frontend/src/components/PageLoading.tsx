import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function PageLoading() {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 z-50">
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress size='5rem'/>
                </Box>
            </div>
        </>
    )
}
