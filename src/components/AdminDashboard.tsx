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
    id: number
    email: string
    phone_number: string
    whatsapp_number: string
    is_subscribed: boolean
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
            const response = await fetch('https://api.examcompassng.com/api/v1/info/mailing_list')
            if (!response.ok) {
                throw new Error('Failed to fetch subscriptions')
            }
            const data: Subscription[] = await response.json()
            setSubscriptions(data)
        } catch (error) {
            console.error('Error fetching subscriptions:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const downloadCSV = () => {
        const headers = ['ID', 'Email', 'Phone Number', 'WhatsApp Number', 'Subscribed']
        const csvContent = [
            headers.join(','),
            ...subscriptions.map(sub =>
                [sub.id, sub.email, sub.phone_number, sub.whatsapp_number, sub.is_subscribed].join(',')
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
                <h2 className="text-2xl font-semibold">Mailing List Subscriptions</h2>
                <Button onClick={downloadCSV}>Download CSV</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>WhatsApp Number</TableHead>
                        <TableHead>Subscribed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                            <TableCell>{subscription.email}</TableCell>
                            <TableCell>{subscription.phone_number}</TableCell>
                            <TableCell>{subscription.whatsapp_number}</TableCell>
                            <TableCell>{subscription.is_subscribed ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}