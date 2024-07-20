import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [err, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await fetch("/api/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            console.log(data)
            setLoading(false)

            if (!res.ok) {
                setError(true)
                return;
            }
            else {
                navigate('/');
            }

        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <div>
            <div className='p-4 max-w-lg mx-auto'>
                <h1 className='text-center font-semibold text-3xl my-7'>Sign Up</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder='Username'
                        id='username'
                        className='bg-slate-200 p-3 rounded-lg'
                        onChange={handleChange}
                    />

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

                    <input
                        type="number"
                        placeholder='Age'
                        id='age'
                        className='bg-slate-200 p-3 rounded-lg'
                        onChange={handleChange}
                    />

                    <div className='flex gap-5 justify-between p-2'>
                        <label className="flex gap-4">
                            <span>Male:</span>
                            <input
                                type="radio"
                                id="gender"
                                name='gender'
                                value='M'
                                onChange={handleChange}
                            />
                        </label>
                        <label className="flex gap-4">
                            <span>Female:</span>
                            <input
                                type="radio"
                                id="gender"
                                name='gender'
                                value='F'
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <button
                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>
                <div className="flex gap-2 mt-5">
                    <p>Already have an account?</p>
                    <Link to={'/signIn'}>
                        <span className='text-blue-500'>
                            Sign In
                        </span>
                    </Link>
                </div>
                <div className="text-red-700 mt-3">{err && 'Something went wronge!!!'}</div>
            </div>
        </div>
    )
}
