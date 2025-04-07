import React, { useState, useEffect } from 'react';
import { getAdoptions, getPets, getUsers, updateAdoptionStatus, getPaymentsByUser, getSchedulePickupsByUser } from '../api';
import './ManageAdoptions.css';

const ManageAdoptions = () => {
    const [adoptions, setAdoptions] = useState([]);
    const [pets, setPets] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState({});
    const [schedules, setSchedules] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [adoptionsRes, petsRes, usersRes] = await Promise.all([
                    getAdoptions(),
                    getPets(),
                    getUsers(),
                ]);
                setAdoptions(adoptionsRes.data);
                setPets(petsRes.data);
                setUsers(usersRes.data);

                // Fetch payments and schedules for each user
                const paymentPromises = usersRes.data.map(user => getPaymentsByUser(user.id));
                const schedulePromises = usersRes.data.map(user => getSchedulePickupsByUser(user.id));
                const [paymentResponses, scheduleResponses] = await Promise.all([
                    Promise.all(paymentPromises),
                    Promise.all(schedulePromises),
                ]);

                const paymentsData = {};
                paymentResponses.forEach((res, index) => {
                    paymentsData[usersRes.data[index].id] = res.data;
                });

                const schedulesData = {};
                scheduleResponses.forEach((res, index) => {
                    schedulesData[usersRes.data[index].id] = res.data;
                });

                setPayments(paymentsData);
                setSchedules(schedulesData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load adoption data. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getPetName = (petId) => {
        const pet = pets.find((p) => p.id === petId);
        return pet ? pet.name : 'Unknown Pet';
    };

    const getUserName = (userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const handleStatusUpdate = async (adoptionId, newStatus) => {
        try {
            await updateAdoptionStatus(adoptionId, { status: newStatus });
            setAdoptions(adoptions.map(adoption =>
                adoption.id === adoptionId ? { ...adoption, status: newStatus } : adoption
            ));
            alert(`Adoption ${newStatus} successfully!`);
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update adoption status.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="manage-adoptions">
            <h1>Manage Adoptions</h1>
            {adoptions.length === 0 ? (
                <p>No adoptions to manage at this time.</p>
            ) : (
                <table className="adoptions-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Pet</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Payment</th>
                            <th>Pickup</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptions.map((adoption) => (
                            <tr key={adoption.id}>
                                <td>{getUserName(adoption.user_id)}</td>
                                <td>{getPetName(adoption.pet_id)}</td>
                                <td>{adoption.email}</td>
                                <td>{adoption.phone_number}</td>
                                <td>{`${adoption.address}, ${adoption.city}, ${adoption.province} ${adoption.postal_code}`}</td>
                                <td>
                                    {payments[adoption.user_id]?.length > 0
                                        ? `${payments[adoption.user_id][0].payment_type}: ****${payments[adoption.user_id][0].method.slice(-4)}`
                                        : 'No Payment'}
                                </td>
                                <td>
                                    {schedules[adoption.user_id]?.length > 0
                                        ? `${schedules[adoption.user_id][0].date} ${schedules[adoption.user_id][0].time}`
                                        : 'Not Scheduled'}
                                </td>
                                <td>{adoption.status || 'Pending'}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => handleStatusUpdate(adoption.id, 'Approved')}
                                            className="approve-btn"
                                            disabled={adoption.status === 'Approved'}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(adoption.id, 'Rejected')}
                                            className="reject-btn"
                                            disabled={adoption.status === 'Rejected'}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageAdoptions;