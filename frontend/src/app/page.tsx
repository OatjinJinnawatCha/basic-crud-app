'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function page() {
  const router = useRouter();
  const data = [
    { id: 1, name: "John Doe", jobPosition: "Admin" },
    { id: 2, name: "Jane Doe", jobPosition: "Developer" },
    { id: 3, name: "Alice Doe", jobPosition: "Designer" },
  ]
  const columns = ["ID", "Name", "Job Position", "Action"];

  const handleDelete = (id: number) => {
    console.log("Delete user id : ", id);
  }
  const handleView = (id: number) => {
    router.push(`/view/${id}`);
  }

  return (
    <div className='page-layout'>
      <h1 className='page-title'>Dashboard</h1>
      <div className="flex justify-center">
        <table className="w-[90%]">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {columns.map((column) => (
                <th className="p-3 border text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`border text-gray-700 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-100 transition`}
              >
                <td className="p-2 border">{row.id}</td>
                <td className="p-2 border">{row.name}</td>
                <td className="p-2 border">{row.jobPosition}</td>
                <td className='space-x-2 p-2'>
                  <button className='action-button' onClick={() => handleView(row.id)}>View</button>
                  <button className='action-button bg-green-500'>Edit</button>
                  <button className='action-button bg-red-500' onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </div>
  )
}