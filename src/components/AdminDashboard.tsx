'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface Subscription {
    id: string
    email: string
    telephone: string
    whatsapp: string
    role: string
    createdAt: string
}

export default function AdminDashboard() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchSubscriptions()
    }, [])

    const fetchSubscriptions = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/subscriptions')
            if (!response.ok) {
                throw new Error('Failed to fetch subscriptions')
            }
            const data = await response.json()
            setSubscriptions(data)
        } catch (error) {
            console.error('Error fetching subscriptions:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const downloadCSV = () => {
        const headers = ['ID', 'Email', 'Telephone', 'WhatsApp', 'Role', 'Created At']
        const csvContent = [
            headers.join(','),
            ...subscriptions.map(sub =>
                [sub.id, sub.email, sub.telephone, sub.whatsapp, sub.role, sub.createdAt].join(',')
            )
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', 'subscriptions.csv')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Subscriptions</h2>
                <Button onClick={downloadCSV}>Download CSV</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Telephone</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                            <TableCell>{subscription.email}</TableCell>
                            <TableCell>{subscription.telephone}</TableCell>
                            <TableCell>{subscription.whatsapp}</TableCell>
                            <TableCell>{subscription.role}</TableCell>
                            <TableCell>{new Date(subscription.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

