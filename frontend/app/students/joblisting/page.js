// pages/job-listings.js
'use client';

import React, { useState, useEffect } from 'react';

const getJobListings = async () => {
  // Replace with your actual API endpoint
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-listings`);
  if (!response.ok) {
    throw new Error('Failed to fetch job listings');
  }
  return response.json();
};

const JobListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch job listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const fetchedListings = await getJobListings();
        setListings(fetchedListings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Uncomment this block if you want to show a loading state
  // if (loading) {
  //   return (
  //     <div className='min-h-screen flex items-center justify-center bg-gray-100'>
  //       <h2 className='text-xl font-bold text-gray-900'>Loading job listings...</h2>
  //     </div>
  //   );
  // }

  // Filter and search logic
  const filteredListings = listings.filter((listing) => {
    const matchesType = filter === 'all' || listing.type === filter;
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>Job Openings</h2>

        <div className='mb-4 flex justify-between items-center'>
          <input
            type='text'
            placeholder='Search jobs...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg w-full'
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='ml-4 px-4 py-2 border border-gray-300 rounded-lg'
          >
            <option value='all'>All</option>
            <option value='tech'>Tech</option>
            <option value='non-tech'>Non-Tech</option>
            <option value='core'>Core</option>
          </select>
        </div>

        {/* Job Listings */}
        {filteredListings.length > 0 ? (
          <ul className='space-y-4'>
            {filteredListings.map((listing) => (
              <li key={listing.id} className='p-4 border border-gray-200 rounded-lg'>
                <h3 className='text-lg font-semibold'>{listing.title}</h3>
                <p className='text-sm text-gray-600'>Company: {listing.company}</p>
                <p className='text-sm text-gray-600'>Type: {listing.type}</p>
                <p className='mt-1'>{listing.description}</p>
                {/* Apply Button */}
                <button 
                  onClick={() => alert(`Applying for ${listing.title}`)} 
                  className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-4 text-center text-gray-600'>No job listings found.</p>
        )}
      </div>
    </div>
  );
};

export default JobListings;
