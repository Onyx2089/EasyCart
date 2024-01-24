'use client'
import React from 'react';
import Image from 'next/image';
import { shoppingCart } from '../../app/service/shoppingCartService'; 
import { price } from '@/app/service/price';
import { useEffect, useState } from 'react';
import { ShoppingCart } from '../../app/types/shoppingCart';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    async function loadShopping() {
      try {
          const data = await shoppingCart();
          setShoppings(data);

          const dataPrice = await price();
          setTotalPrice(dataPrice)
      } catch (error) {
          router.push('/');
      }
    }
    const [shoppings, setShoppings] = useState<ShoppingCart[]>([]);
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
      loadShopping();
    }, []);


    return (
      <main className="relative bg-slate-200">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>


          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <header className="text-center">
                  <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                </header>

                <div className="mt-8">
                  <ul className="space-y-4">

                    {shoppings.map(shopping => (

                    <li key={shopping.id} className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{shopping.name}</h3>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line3Qty" className="sr-only"> Quantity </label>

                          {shopping.number} X {shopping.price} €
                        </form>

                        <button className="text-gray-600 transition hover:text-red-600">
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>

                    ))}   

                  </ul>

                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-700">
                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>{totalPrice} €</dd>
                        </div>
                      </dl>

                 

                      <div className="flex justify-end">
                        <a
                          href="#"
                          className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                        >
                          Buy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
      </main>
    );

    return (
      <main className="relative bg-slate-200">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <header className="text-center">
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Shopping cart</h2>

                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  Discover our brand new collection, a perfect fusion of style and innovation. 
                  Unique pieces designed to make you stand out, each item embodies contemporary elegance. 
                </p>
              </header>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {products.map(product => (
                  <li key={product.id}>
                    <a href="#" className="group block overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        alt=""
                        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                      />

                      <div className="relative bg-white pt-3">
                        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                          {product.name}
                        </h3>

                        <p className="mt-2">
                          <span className="sr-only"> Regular Price </span>

                          <span className="tracking-wider text-gray-900"> {product.price} € </span>
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        
      </main>
    );

  }