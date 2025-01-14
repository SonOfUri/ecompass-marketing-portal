'use server'

export async function subscribeUser(formData: FormData) {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Get form data
    const email = formData.get('email')
    const telephone = formData.get('telephone')
    const whatsapp = formData.get('whatsapp')
    const role = formData.get('role')

    // Validate email (basic validation)
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return { success: false, message: 'Please provide a valid email address.' }
    }

    // Validate role
    if (!role || typeof role !== 'string' || !['student', 'parent', 'teacher'].includes(role)) {
        return { success: false, message: 'Please select a valid role.' }
    }

    // Here you would typically save the data to your database
    console.log('Subscription data:', { email, telephone, whatsapp, role })

    // Return success
    return { success: true }
}

