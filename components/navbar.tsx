import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between p-5'>
        <Link href={'/'}>
          <Image src={'/logo.svg'} width={200} height={200} alt='Stack3d Lab'/>
        </Link>
        <div className='flex gap-10 border pl-5 pr-5 p-2 rounded-full border-indigo-800 text-gray-400'>
            <Link href={'/features'} className='hover:underline hover:text-indigo-50'>Features</Link>
            <Link href={'/pricing'} className='hover:underline hover:text-indigo-50'>Pricing</Link>
            <Link href={'/blogs'} className='hover:underline hover:text-indigo-50'>Blogs</Link>
        </div>
        <Button asChild>
          <Link href="/authenticate">Sign In</Link>
        </Button>
              
    </div>
  )
}

export default Navbar