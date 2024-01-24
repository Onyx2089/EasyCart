'use client'
import React from 'react';
import Image from 'next/image';
import { profilUser } from '../../app/service/profilService'; 
import { useEffect, useState } from 'react';
import { User } from '../../app/types/users';
import { deleteUser } from '../../app/service/deleteUser';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  async function loadUsers() {
    try {
        const data = await profilUser();
        setUsers(data);
    } catch (error) {
        router.push('/');
    }
  }
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (userId : number) => {
    try {
      await deleteUser(userId);
      loadUsers();
    } catch (e){
      console.error("Erreur lors de la suppression d'un utilisateur");
    }
  }

  return (
    <main className="relative bg-slate-200">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">User list</h2>
            </header>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {users.map(user => (
                <div key={user.id} className="max-w-xs">
                    <div className="bg-white shadow-xl rounded-lg py-3">
                        <div className="photo-wrapper p-2">
                            <img 
                              className="w-32 h-32 rounded-full mx-auto" 
                              src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" 
                              alt="John Doe"
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.username}</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>{user.role}</p>
                            </div>
                            <table className="text-xs my-3">
                                <tbody>
                                  <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Lastname / Firstname</td>
                                    <td className="px-2 py-2">{user.first_name} {user.last_name}</td>
                                  </tr>
                                  <tr>
                                      <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                      <td className="px-2 py-2">+977 9955221114</td>
                                  </tr>
                                  <tr>
                                      <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                      <td className="px-2 py-2">{user.email}</td>
                                  </tr>
                                </tbody>
                              </table>

                        </div>
                    </div>
                </div>
              ))}
            </ul>
          </div>
        </section>
      
    </main>
  );

}