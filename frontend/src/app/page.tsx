'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Breadcrumbs, Link } from '@mui/material';
import PageLoading from '@/components/PageLoading';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

interface User {
  id: number;
  name: string;
  jobPosition: string;
  createdDate: string;
  description: string;
}
export default function page() {
  const router = useRouter();
  const backendAPI = process.env.NEXT_PUBLIC_API_URL;

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${backendAPI}/user/getAll`);
        if (!response.status) throw new Error("Failed to fetch users");
        setUsers(response.data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, [backendAPI]);

  const columns: GridColDef[] = [
    {
      field: "view",
      headerName: "View".toUpperCase(),
      width: 60,
      renderCell: (params: { row: User }) => {
        return (
          <div className="flex justify-center items-center w-full h-full hover:cursor-pointer">
            <VisibilityIcon
              onClick={() => handleView(params.row.id)}
              color='primary'
              sx={{ fontSize: 30 }}
            />
          </div>
        );
      }
    },
    {
      field: "edit",
      headerName: "Edit".toUpperCase(),
      width: 60,
      renderCell: (params: { row: User }) => {
        return (
          <div className="flex justify-center items-center w-full h-full hover:cursor-pointer">
            <ModeEditIcon
              onClick={() => handleEdit(params.row.id)}
              color='primary'
              sx={{ fontSize: 30 }}
            />
          </div>
        )
      }
    },
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "jobPosition", headerName: "Job Position", width: 170 },
    { field: "description", headerName: "Description", width: 300 }
  ]

  const handleView = (id: number) => {
    router.push(`/view/${id}`);
  }
  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`);
  }
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      EMS
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/" sx={{ color: 'text.primary' }}>
      Dashboard
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
          <h1 className='page-title'>Dashboard</h1>
          <div className="flex justify-center">
            <Box sx={{ width: '100%' }}>
              <DataGrid
                columns={columns}
                rows={users}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      )}
    </>
  )
}