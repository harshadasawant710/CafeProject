import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({});

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/mybookings', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setBookings(res.data.bookings);
            })
            .catch((err) => {
                console.error("Error fetching bookings:", err);
            });
    }, []);

    const handleStatusChange = (id, value) => {
        setStatusUpdates((prev) => ({ ...prev, [id]: value }));
    };

    const updateVisitStatus = async (id) => {
        const status = statusUpdates[id];
        if (!status) return;

        try {
            await axios.put(`http://localhost:5000/api/booktable/${id}/visit-status`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Refresh the booking list
            const res = await axios.get('http://localhost:5000/api/mybookings', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(res.data.bookings);
        } catch (err) {
            console.error("Error updating visit status:", err);
        }
    };

    return (
        <div className='container mt-5'>
            <h3>Your Bookings</h3>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className='table table-striped mt-3'>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Persons</th>
                            <th>Visit Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.Username}</td>
                                <td>{booking.Date}</td>
                                <td>{booking.Time}</td>
                                <td>{booking.Persons}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={statusUpdates[booking._id] || booking.Visited || ''}
                                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                    >
                                        <option value="">-- Select --</option>
                                        <option value="visited">Visited</option>
                                        <option value="no-show">No Show</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => updateVisitStatus(booking._id)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyBookings;
