import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

function Hero() {
  return (
    <div className='flex justify-between pt-16 gap-16 pl-10 bg-gray-950'>
      <div className='w-[40vw]'>
        <p className='text-7xl font-extrabold p-5 space-y-5'>Let&#39;s Work Together to Create Wonder with us</p>
        <p className='p-5'>A visionary creative, crafting captivating wonders through art adn design. Adapt at turning imagination into extraordinary reality.</p>
        <div className='p-5 pr-10 flex justify-center gap-10'>
          <Button className='w-[15vw] rounded-full'>Know more</Button>
          <Button className='w-[15vw] rounded-full'>Go to Dashboard</Button>
        </div>
      </div>
      <div className='pr-10'>
        <Image src={'/images/hero.png'} width={800} height={800} alt='Logo' className='rounded-2xl border border-indigo-400 shadow-lg hover:shadow-indigo-500/50'/>
      </div>
    </div>
  )
}

export default Hero