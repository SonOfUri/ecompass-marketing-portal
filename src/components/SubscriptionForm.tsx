'use client'

import { useState } from 'react'
import { subscribeUser } from '@/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function SubscriptionForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus('loading')

        const formData = new FormData(event.currentTarget)
        const result = await subscribeUser(formData)

        if (result.success) {
            setStatus('success')
            setMessage('Thank you for subscribing!')
            event.currentTarget.reset()
        } else {
            setStatus('error')
            setMessage(result.message || 'An error occurred. Please try again.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="telephone">Telephone</Label>
                <Input type="tel" id="telephone" name="telephone" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input type="tel" id="whatsapp" name="whatsapp" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select name="role" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" disabled={status === 'loading'} className="w-full bg-[#0b2f30]">
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
            {message && (
                <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </form>
    )
}

