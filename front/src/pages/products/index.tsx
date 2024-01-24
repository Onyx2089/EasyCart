'use client'
import React from 'react';
import Image from 'next/image';
import { productList } from '../../app/service/productService'; 
import { useEffect, useState } from 'react';
import { Product } from '../../app/types/product';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    async function loadUsers() {
      try {
          const data = await productList();
          setProducts(data);
      } catch (error) {
          router.push('/');
      }
    }
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
      loadUsers();
    }, []);


    return (
      <main className="relative bg-slate-200">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <header className="text-center">
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

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