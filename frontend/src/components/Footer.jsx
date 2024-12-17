import React from 'react'

const Footer = () => {
  return (
    <footer className='py-8 md:px-16 md:py-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white border-t border-gray-800'>
    <div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
      <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
        Built by{" "}
        <a
          href='https://github.com/riyal-rj'
          target='_blank'
          className='font-medium underline underline-offset-4 hover:text-gray-400'
        >
          riyalRJ
        </a>
        . The source code is available on{" "}
        <a
          href='https://github.com/riyal-rj'
          target='_blank'
          rel='noreferrer'
          className='font-medium underline underline-offset-4 hover:text-gray-400'
        >
          GitHub
        </a>
        .
      </p>
      <div className='text-sm text-muted-foreground'>
        <p>&copy; {new Date().getFullYear()} riyalRJ. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer