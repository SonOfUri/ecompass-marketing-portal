'use server'

import { revalidatePath } from 'next/cache'

// This is a mock database. In a real application, you would use a proper database.
const subscriptions = [
    { id: '1', email: 'user1@example.com', telephone: '1234567890', whatsapp: '1234567890', role: 'student', createdAt: '2023-05-01T12:00:00Z' },
    { id: '2', email: 'user2@example.com', telephone: '0987654321', whatsapp: '0987654321', role: 'parent', createdAt: '2023-05-02T14:30:00Z' },
    { id: '3', email: 'user3@example.com', telephone: '1122334455', whatsapp: '1122334455', role: 'teacher', createdAt: '2023-05-03T09:15:00Z' },
]

export async function subscribeUser(formData: FormData) {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Get form data
    const email = formData.get('email') as string
    const telephone = formData.get('telephone') as string
    const whatsapp = formData.get('whatsapp') as string
    const role = formData.get('role') as string

    // Validate email (basic validation)
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return { success: false, message: 'Please provide a valid email address.' }
    }

    // Validate role
    if (!role || typeof role !== 'string' || !['student', 'parent', 'teacher'].includes(role)) {
        return { success: false, message: 'Please select a valid role.' }
    }

    // Create a new subscription
    const newSubscription = {
        id: (subscriptions.length + 1).toString(),
        email,
        telephone,
        whatsapp,
        role,
        createdAt: new Date().toISOString(),
    }

    // Add the new subscription to the mock database
    subscriptions.push(newSubscription)

    // In a real application, you would save this to your database
    console.log('New subscription:', newSubscription)

    // Revalidate the admin page to show the new subscription
    revalidatePath('/admin')

    // Return success
    return { success: true }
}

