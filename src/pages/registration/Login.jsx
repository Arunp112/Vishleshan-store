import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/FirebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Loader from '../../components/loader/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const context = useContext(myContext)
  const { loading, setLoading } = context

  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('user', JSON.stringify(result));
      toast.success('Signin Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/')
      setLoading(false);
    } catch (error) {
      toast.error('Signin Failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  }

  // Google SignIn Function
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Google Signin Successful');
      navigate('/');
    } catch (error) {
      toast.error('Google Signin Failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        {loading && <Loader />}
        <div className='bg-gray-800 px-10 py-10 rounded-xl '>
          <div className="">
            <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Email'
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Password'
            />
          </div>
          <div className='flex justify-center mb-3'>
            <button
              onClick={signin}
              className='bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
              Login
            </button>
          </div>

          {/* Google SignIn Button */}
          <div className='flex justify-center mb-3'>
            <button
              onClick={googleSignIn}
              className='bg-blue-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
              Login with Google
            </button>
          </div>

          <div>
            <h2 className='text-white'>Don't have an account <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
