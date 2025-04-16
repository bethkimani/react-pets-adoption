import React, { useState, useEffect, useCallback } from 'react';
import { getAdoptions, getPets } from '../api';
import './AdoptionHistory.css';

const AdoptionHistory = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch adoption history and pet data
  const fetchAdoptionHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('user_id');
      console.log('User ID from localStorage:', userId); // Debug log
      if (!userId) {
        setError('Please log in to view your adoption history.');
        setLoading(false);
        return;
      }

      const [adoptionsRes, petsRes] = await Promise.all([
        getAdoptions().catch((err) => {
          console.warn('Failed to fetch adoptions:', err);
          return { data: [] };
        }),
        getPets().catch((err) => {
          console.warn('Failed to fetch pets:', err);
          return { data: [] };
        }),
      ]);

      // Log the raw API response for debugging
      console.log('Adoptions API Response:', adoptionsRes.data);
      console.log('Pets API Response:', petsRes.data);

      // Validate response data
      const userIdNum = parseInt(userId); // Ensure userId is a number
      const userAdoptions = Array.isArray(adoptionsRes.data)
        ? adoptionsRes.data.filter((adoption) => {
            // Handle potential string user_id in backend response
            const adoptionUserId = typeof adoption.user_id === 'string' ? parseInt(adoption.user_id) : adoption.user_id;
            const matchesUserId = adoptionUserId === userIdNum;
            console.log(
              `Adoption ID ${adoption.id}: user_id=${adoption.user_id}, parsed=${adoptionUserId}, matches=${matchesUserId}`
            );
            return matchesUserId;
          })
        : [];
      const petList = Array.isArray(petsRes.data) ? petsRes.data : [];

      if (!userAdoptions.length && adoptionsRes.data.length) {
        setError('No adoption applications found for your account.');
      } else if (!petList.length) {
        setError('Unable to load pet details at this time.');
      }

      setAdoptions(userAdoptions);
      setPets(petList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching adoption history:', err);
      if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else {
        setError('Failed to load adoption history. Please try again later.');
      }
      setLoading(false);
    }
  }, []);

  // Fetch on mount and set up polling
  useEffect(() => {
    fetchAdoptionHistory();

    // Poll every 30 seconds to check for status updates
    const intervalId = setInterval(fetchAdoptionHistory, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchAdoptionHistory]);

  // Get pet name by pet_id
  const getPetName = (petId) => {
    const pet = pets.find((p) => p.id === petId);
    return pet ? pet.name : 'Unknown Pet';
  };

  // Handle table sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setAdoptions((prev) =>
      [...prev].sort((a, b) => {
        let aValue, bValue;
        switch (key) {
          case 'pet':
            aValue = getPetName(a.pet_id).toLowerCase();
            bValue = getPetName(b.pet_id).toLowerCase();
            break;
          case 'date':
            aValue = new Date(a.created_at || 0).getTime();
            bValue = new Date(b.created_at || 0).getTime();
            break;
          case 'status':
            aValue = (a.status || 'Pending').toLowerCase();
            bValue = (b.status || 'Pending').toLowerCase();
            break;
          default:
            return 0;
        }
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      })
    );
  };

  // Render address safely
  const renderAddress = (adoption) => {
    const parts = [
      adoption.address || '',
      adoption.city || '',
      adoption.province || '',
      adoption.postal_code || '',
    ].filter(Boolean);
    return parts.length ? parts.join(', ') : 'N/A';
  };

  // Conditional rendering
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={fetchAdoptionHistory} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="adoption-history">
      <h1>Adoption History</h1>
      <button onClick={fetchAdoptionHistory} className="refresh-button">
        Refresh
      </button>
      {adoptions.length === 0 ? (
        <p>You have not submitted any adoption applications yet.</p>
      ) : (
        <table className="adoption-history-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('pet')}>
                Pet Name{' '}
                {sortConfig.key === 'pet' &&
                  (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('date')}>
                Application Date{' '}
                {sortConfig.key === 'date' &&
                  (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('status')}>
                Status{' '}
                {sortConfig.key === 'status' &&
                  (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((adoption) => (
              <tr key={adoption.id}>
                <td>{getPetName(adoption.pet_id)}</td>
                <td>
                  {adoption.created_at
                    ? new Date(adoption.created_at).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td
                  className={`status-${
                    (adoption.status || 'Pending').toLowerCase().replace(/\s/g, '-')
                  }`}
                >
                  {adoption.status || 'Pending'}
                </td>
                <td>{adoption.email || 'N/A'}</td>
                <td>{adoption.phone_number || 'N/A'}</td>
                <td>{renderAddress(adoption)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdoptionHistory;