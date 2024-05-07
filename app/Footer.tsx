import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import { FaHouseChimney } from 'react-icons/fa6'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 py-4 mt-24 absolute bottom-0 right-0 left-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <FaHouseChimney className="text-3xl text-white" />
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
