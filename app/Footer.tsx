import Image from 'next/image'
import logo from '@/assets/images/logo.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 py-4 mt-24 fixed bottom-0 left-0 right-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div>
          <p className="text-sm text-gray-300 mt-2 md:mt-0">
            &copy; {currentYear} Faulkner Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
