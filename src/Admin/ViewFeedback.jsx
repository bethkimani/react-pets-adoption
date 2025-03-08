import React, { useEffect, useState } from 'react';
import './ViewFeedback.css'; // Import CSS for styling

const ViewFeedback = () => {
    const [feedback, setFeedback] = useState([]);

    // Dummy feedback data
    useEffect(() => {
        const mockFeedback = [
            { _id: 1, user: "Jane Doe", message: "Great service! I am very satisfied." },
            { _id: 2, user: "John Smith", message: "I love this platform. It's user-friendly!" },
            { _id: 3, user: "Alice Johnson", message: "Could use more features, but overall good." },
            { _id: 4, user: "Tom Brown", message: "Excellent support, quick responses!" },
            { _id: 5, user: "Emily White", message: "The layout is very appealing. Keep it up!" },
        ];
        setFeedback(mockFeedback);
    }, []);

    return (
        <div className="view-feedback">
            <h2>User Feedback</h2>
            {feedback.length === 0 ? (
                <p>No feedback available.</p>
            ) : (
                <ul className="feedback-list">
                    {feedback.map(item => (
                        <li key={item._id} className="feedback-item">
                            <strong>{item.user}:</strong> {item.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewFeedback;