import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/app/types/users';
import { getUser } from '@/app/service/profilUser';

interface MyJwtPayload {
    user_id : number
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    console.log('useEffect triggered with userId:');
    const fetchUser = async () => {
      if (token) {
        const payload: MyJwtPayload = jwtDecode<MyJwtPayload>(token);
        const userId = payload.user_id;
        console.log('Token:', token);
        console.log('User ID:', userId);

        if (typeof userId === 'number') {
          try {
            const userData = await getUser(userId);
            console.log('User Data:', userData);
            setUser(userData[0]);
          } catch (error) {
            console.error(error);
            router.push('/');
          }
        }
      }
    };
    fetchUser();
    }, [token]);

    if (!user) {
      return <div className="loading">Chargement...</div>;
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
            </ul>
          </div>
        </section>
      
    </main>
    );
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <header className="header">
            <h1>Profil de {user.username}</h1>
          </header>
          <div className="profile-content">
            <div className="profile-sidebar">
              {/* Ici, vous pouvez ajouter des éléments de navigation ou des informations supplémentaires */}
            </div>
            <div>
            <div className="user-info">
              <div className="info-row">
                <span className="info-title">Nom :</span>
                <span className="info-value">{user.last_name}</span>
              </div>
              <div className="info-row">
                <span className="info-title">Prénom :</span>
                <span className="info-value">{user.first_name}</span>
              </div>
              <div className="info-row">
                <span className="info-title">Adress e-mail :</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-title">Nom d'utilisateur :</span>
                <span className="info-value">{user.username}</span>
              </div>
            </div>
              <div className="user-actions">
                <button className="btn-edit">Modifier</button>
                <button className="btn-delete">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

