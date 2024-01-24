'use client'
import React , {useContext, useState} from 'react';
import Image from 'next/image';
import logo from '../../../public/svg/round.svg'
import { useRouter } from 'next/navigation';
import { getAndStoreToken } from '@/app/auth/Auth';
import { AuthContext } from '@/app/auth/AuthContext';


export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage]= useState('');
    const router = useRouter();
    const { login } = useContext(AuthContext);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (username === '' || password === '') {
        setErrorMessage('username et mot de passe sont requis.');
        return;
      }
      try {
        await getAndStoreToken(username, password);
        login();
        router.push('/');
      } catch (e) {
        console.log("Connexion échouée", e);
        setErrorMessage('Erreur lors de la connexion.');
      }
    }
    return (
      <div className="hero min-h-screen bg-base-200 bg-[url(https://images.pexels.com/photos/7375091/pexels-photo-7375091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-slate-200 font-bold">Login now!</h1>
            <p className="py-6 text-slate-400">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input 
                  type="text" 
                  value={username}
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)} 
                  className="input input-bordered" 
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="password" 
                  className="input input-bordered" 
                  required 
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>

            <div>
              {errorMessage}
            </div>
          </div>
        </div>
    </div>
    );
  }