import Link from 'next/link'
import Image from 'next/image';
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="w-full bg-gray-100 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center bg-gray-100">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/logo.png" // Replace with your logo path
                        alt="LaunchPad Logo"
                        width={150} // Adjust width as needed
                        height={150} // Adjust height as needed
                    />
                </Link>
                <nav>
                    <Button variant="ghost" asChild>
                        <Link href="">Home</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="">Signup</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="">Contact</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}

