'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import logo from '../../public/svg/round.svg'
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if(token){
      setisLoggedIn(true);    
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setisLoggedIn(false);
  }

  return (
    <div>
      <div className="bg-indigo-600 px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          -50% Black Friday ! &nbsp;
          <a href="#" className="inline-block underline">Check this link</a>
        </p>
      </div>

      <section className="relative bg-[url(https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl text-yellow-500 font-extrabold sm:text-5xl">
              Find your style
              <strong className="block font-extrabold text-rose-700"> Unique. </strong>
            </h1>

            <p className="mt-4 text-yellow-700 max-w-lg sm:text-xl/relaxed">
            Discover an exclusive collection of products that combine elegance and comfort!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a href="/products" className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                See products
              </a>

            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
              <div className="mx-auto max-w-md text-center lg:text-left">
                <header>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Watches</h2>

                  <p className="mt-4 text-gray-500">
                  Embrace timeless elegance with our collection of exquisite watches, 
                  designed to add a distinctive touch to every moment of your life.
                  </p>
                </header>
              </div>
            </div>

            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <a href="#" className="group block">
                    <Image
                      src="https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Picture of the author"
                      width={500}
                      height={500}
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-slate-200 group-hover:underline group-hover:underline-offset-4">
                        Ice Watch
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">$480</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#" className="group block">
                    <Image
                      src="https://images.pexels.com/photos/9561299/pexels-photo-9561299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Picture of the author"
                      width={500}
                      height={500}
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-slate-200 group-hover:underline group-hover:underline-offset-4">
                        Swiss Watch
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">$150</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>
    
    </div>
  )
}
