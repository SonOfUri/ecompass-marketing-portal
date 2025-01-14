import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you would use a proper database.
const mockSubscriptions = [
    { id: '1', email: 'user1@example.com', telephone: '1234567890', whatsapp: '1234567890', role: 'student', createdAt: '2023-05-01T12:00:00Z' },
    { id: '2', email: 'user2@example.com', telephone: '0987654321', whatsapp: '0987654321', role: 'parent', createdAt: '2023-05-02T14:30:00Z' },
    { id: '3', email: 'user3@example.com', telephone: '1122334455', whatsapp: '1122334455', role: 'teacher', createdAt: '2023-05-03T09:15:00Z' },
]

export async function GET() {
    // In a real application, you would fetch this data from your database
    return NextResponse.json(mockSubscriptions)
}

