import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSignInSlice'
import { useSelector, useDispatch } from 'react-redux'


export default function signIn() {

    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await fetch('/api/signIn', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (!res.ok) {
                dispatch(signInFailure({ message: data.message || 'Sign-in failed' }))
                return;
            }
            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            dispatch(signInFailure({ message: 'Network error' }))
        }
    }

    return (
        <>
            <div className='p-4 max-w-lg mx-auto'>
                <h1 className='text-center font-semibold text-3xl my-7'>Sign In</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder='Email'
                        id='email'
                        className='bg-slate-200 p-3 rounded-lg'
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        placeholder='Password'
                        id='password'
                        className='bg-slate-200 p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <button
                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>

                </form>
                <div className="flex gap-2 mt-5">
                    <p>Dont Have a account?</p>
                    <Link to={'/signUp'}>
                        <span className='text-blue-500'>
                            Sign Up
                        </span>
                    </Link>
                </div>
                <div className="text-red-700 mt-3">{error ? error.message || 'Something went wrong!' : ''}</div>
            </div>
        </>
    )
}
