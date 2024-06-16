import React, { useEffect, useState } from 'react';
import usePollManagement from '../../hooks/usePollManagement';
import { Loader } from '../../components';
import './style.css';
import { useAuth } from '../../context/AuthContext';

const Polls = () => {
    const { getPolls, getAllPolls } = usePollManagement();
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                let pollsData = null;
                if (user.role === "Institute") {
                    pollsData = await getAllPolls();
                }
                else {
                    pollsData = await getPolls(user.role);

                }
                setPolls(pollsData);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch polls. Please try again.');
                setLoading(false);
            }
        };

        fetchPolls();
    }, [user]);

    return (
        <div className="polls-container">
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="polls-grid">
                    {polls.map((poll) => (
                        <div key={poll.id} className="poll-card">
                            <div className="poll-header">
                                <h3>{poll.question}</h3>
                            </div>
                            <div className="poll-body">
                                <p className="poll-created-by">
                                    Creater's ID: {poll.createdBy || 'Unknown'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Polls;
