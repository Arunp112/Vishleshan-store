import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { toast } from 'react-toastify'
import { auth, fireDB } from '../../firebase/FirebaseConfig'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import Loader from '../../components/loader/Loader'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const context = useContext(myContext)
    const { loading, setLoading } = context
    const navigate = useNavigate()

    // Email and Password Signup
    const signupWithEmailPassword = async () => {
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now(),
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Successful")
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
            navigate("/login")
        } catch (error) {
            toast.error("Signup Failed: " + error.message)
            setLoading(false)
        }
    }

    // Google SignUp
    const googleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Create a new user document in Firestore
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                time: Timestamp.now(),
            });

            toast.success('Google SignUp Successful');
            navigate('/');
        } catch (error) {
            toast.error('Google SignUp Failed: ' + error.message);
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name='name'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Enter Name'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name='email'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Enter Email'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Enter Password'
                        />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={signupWithEmailPassword}
                            className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
                            Signup
                        </button>
                    </div>

                    {/* Google SignIn Button */}
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={googleSignUp}
                            className='bg-blue-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
                            Signup with Google
                        </button>
                    </div>

                    <div>
                        <h2 className='text-white'>Have an account? <Link className='text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
