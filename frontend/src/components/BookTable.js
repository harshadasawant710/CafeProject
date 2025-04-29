import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookTable = () => {
    const [persons, setPersons] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const rawToken = localStorage.getItem('token');
        const token = rawToken && rawToken !== 'undefined' ? rawToken : null;
    
        if (!token) {
            toast.error('You need to be logged in to book a table.');
            return;
        }
    
        const formData = {
            persons,
            date,
            time,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/booktable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // 💡 Send token in the header
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (data.status === 201) {
                toast.success(data.message);
            } else {
                toast.error(data.message || 'Booking failed.');
            }
        } catch (error) {
            console.error('Error booking table:', error);
            toast.error('Something went wrong.');
        }
    };
    
    return (
        <div>
            <div className="p-4" style={{ backgroundColor: 'whitesmoke', width: '90%', justifyContent: 'center', margin: '10px auto',}}>
                <div className="row" style={{ width: '90%', justifyContent: 'center', margin: '10px auto' }}>
                    <div className="col-md">
                        <div className="input-group flex-nowrap">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Person(s)"
                                aria-label="person"
                                value={persons}
                                onChange={(e) => setPersons(e.target.value)}
                                maxLength={2}
                            />
                            <span className="input-group-text bg-dark text-white" id="addon-wrapping">
                                <i className="bi bi-person-add"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-1 mt-1 fw-bold text-center">For</div>
                    <div className="col-md">
                        <div className="input-group flex-nowrap">
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Date"
                                aria-label="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <span className="input-group-text bg-dark text-white" id="addon-wrapping">
                                <i className="bi bi-calendar3"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-1 mt-1 fw-bold text-center">at</div>
                    <div className="col-md mb-3">
                        <div className="input-group flex-nowrap">
                            <input
                                type="time"
                                className="form-control"
                                placeholder="Time"
                                aria-label="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                            <span className="input-group-text bg-dark text-white" id="addon-wrapping">
                                <i className="bi bi-alarm"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="input-group flex-nowrap">
                            <button className="form-control btn text-black btn-warning" onClick={handleSubmit}>
                                <i className="bi bi-arrow-right-circle-fill"></i> Book a table
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookTable;
