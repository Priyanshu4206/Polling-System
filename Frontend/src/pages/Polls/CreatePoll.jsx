import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePollManagement from '../../hooks/usePollManagement';
import './style.css';

const CreatePoll = () => {
    const navigate = useNavigate();
    const { createPoll } = usePollManagement();
    const [question, setQuestion] = useState('');
    const [targetRole, setTargetRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPoll({ question, targetRole });
            toast.success('Poll created successfully!', { autoClose: 4000 });
            setTimeout(() => {
                navigate('/polls');
            }, 4000);
        } catch (error) {
            console.error('Error creating poll:', error);
            toast.error('Failed to create poll. Please try again.');
        }
    };

    return (
        <div className="create-poll-container">
            <ToastContainer />
            <h2>Create Poll</h2>
            <form className="create-poll-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="question">Question:</label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="targetRole">Target Role:</label>
                    <select
                        id="targetRole"
                        name="targetRole"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Institute">Institute</option>
                    </select>
                </div>
                <button type="submit">Create Poll</button>
            </form>
        </div>
    );
};

export default CreatePoll;
