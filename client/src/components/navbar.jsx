import React from 'react'
import { Link } from 'react-router-dom'

export default function navbar() {
    return (
        <div>
            <div className="bg-blue-200">
                <div className="flex justify-between items-center pl-3 p-4 pr-5">
                    <h1 className='font-bold'>Diet Recomm. System</h1>
                    <ul className='flex gap-7'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/about'}>About</Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
