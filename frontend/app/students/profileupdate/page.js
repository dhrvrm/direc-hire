// components/StudentProfile.js
'use client';

import { useState } from 'react';

const StudentProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gpa: '',
        degree: '',
        batch: '',
        resumeLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to your API)
        console.log('Submitted Data:', formData);
    };

    return (
        <div className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Student Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Phone</label>
                    <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>GPA</label>
                    <input
                        type='number'
                        name='gpa'
                        value={formData.gpa}
                        onChange={handleChange}
                        required
                        min='0.0' // Minimum value for GPA
                        max='10.0' // Maximum value for GPA
                        step='0.01' // Allows decimal input
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Degree</label>
                    <input
                        type='text'
                        name='degree'
                        value={formData.degree}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Graduation Year</label>
                    <input
                        type='text'
                        name='batch'
                        value={formData.batch}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Resume Link</label>
                    <input
                        type='url'
                        name='resumeLink'
                        value={formData.resumeLink}
                        onChange={handleChange}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200'
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default StudentProfile;
