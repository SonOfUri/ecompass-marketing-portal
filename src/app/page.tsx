import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SubscriptionForm from '@/components/SubscriptionForm'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[linear-gradient(to_bottom,#d8cd33,#ffffff)] from-blue-100 to-white">
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl font-bold mb-6 text-[#0b2f30]">Be The First To know!</h1>
              <p className="text-xl mb-8 text-[#0b2f30]">
                  Don&apos;t miss out! Join thousands of students already on the path of success with EXAMCOMPASS.
                  <br/>
                  <br/>
                
                  Sign up for newsletters to receive tips, updates, and exclusive access to our launch!
              </p>
              <Image
              src="/banner.svg?height=400&width=600"
              alt="Launch Illustration"
              width={300}
              height={200}
              className="hidden md:block"
            />
          </div>
          <div className="lg:w-1/2 bg-white rounded-lg shadow-xl p-8">
            <SubscriptionForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

