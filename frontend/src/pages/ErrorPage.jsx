import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white'
			style={{ backgroundImage: `url('/sorry-oops.gif')` }}
		>
			<header className='absolute top-0 left-0 p-4 bg-black w-full '>
				<Link to={"/"}>
					<img src='/netflix-logo.png' alt='Netflix' className='h-8' />
				</Link>
			</header>
			<main className='text-center error-page--content z-10'>
				<h1 className='text-7xl font-semibold mb-4'>Oopsy, it's a blunder.</h1>
				<p className='mb-6 text-xl'>
				Looks like this scene got cut! But don’t worry, the reel is full. <br />
				 Head back to the home page and discover more blockbusters waiting for you.
				</p>
				<Link to={"/"} 
  					className="border border-white text-white py-2 px-4 rounded-sm hover:bg-white
								 hover:text-black transition duration-300">
 					 Back to Netflix Home
				</Link>
			</main>
		</div>
  )
}

export default ErrorPage