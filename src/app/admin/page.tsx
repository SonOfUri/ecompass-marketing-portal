import { Metadata } from 'next'
import AdminDashboard from '@/components/AdminDashboard'

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'View and manage subscription data',
}

export default function AdminPage() {
    return (
        <div className= "container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
            Admin Dashboard
        </h1>
            < AdminDashboard />
        </div>
  )
}

