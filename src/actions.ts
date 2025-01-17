'use server'
//
// import { revalidatePath } from 'next/cache'

// // This is a mock database. In a real application, you would use a proper database.
// const subscriptions = [
//     { id: '1', email: 'user1@example.com', telephone: '1234567890', whatsapp: '1234567890', role: 'student', createdAt: '2023-05-01T12:00:00Z' },
//     { id: '2', email: 'user2@example.com', telephone: '0987654321', whatsapp: '0987654321', role: 'parent', createdAt: '2023-05-02T14:30:00Z' },
//     { id: '3', email: 'user3@example.com', telephone: '1122334455', whatsapp: '1122334455', role: 'teacher', createdAt: '2023-05-03T09:15:00Z' },
// ]

export async function subscribeUser(formData: FormData) {
    try {
        // Extract and map required fields to match the API structure
        const data = {
            email: formData.get('email'),
            phone_number: formData.get('telephone'), // Map 'telephone' to 'phone_number'
            whatsapp_number: formData.get('whatsapp'),
            role: formData.get('role'), // Include the 'role' field if needed
            is_subscribed: true // Default to true as per the API requirements
        }

        const response = await fetch('https://api.examcompassng.com/api/v1/info/mailing_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ensure the API expects JSON
            },
            body: JSON.stringify(data) // Convert the data object to JSON for the API
        })

        // Handle the response
        if (!response.ok) {
            // If the response is not okay, throw an error
            const errorData = await response.json()
            return { success: false, message: errorData.message || 'Something went wrong' }
        }

        return { success: true } // Successful response
    } catch (error) {
        console.error(error) // Debugging purposes
        return { success: false, message: 'An error occurred while subscribing. Please try again.' }
    }
}

