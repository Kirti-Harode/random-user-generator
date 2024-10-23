import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './randomUserGenerator.css';
 
const UserGenerator = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true)
        try{
            const response = await axios.get('https://randomuser.me/api/');
            const userData = response.data.results[0];
            setCurrentUser(userData);
        }catch(error){
            console.log('Error fetching user :', error );
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <div className='user-generator-outer-div'>

                <header className='header-div'>
                    <h2>RANDOM USER GENERATOR</h2>
                    <h6>Lorem Ipsum, but for people</h6>
                </header>
                <div className='user-info-outer-div'>
                    <div className='user-info-background'></div>
                    {/* Conditionally render spinner or user info */}
                    {loading ? (
                        <div className='spinner'></div>
                    ) : (
                        <>
                            <div className='user-image'>
                                {currentUser && 
                                    <img 
                                        src={currentUser["picture"]["large"]} 
                                        alt='profilePhoto' 
                                        className='profile-photo'
                                    />   
                                }
                            </div>
                            {/* User Details */}
                            <div className='user-details'>
                                <div className='user-name-div'>
                                    <span className='greeting'>Hi, My name is</span>
                                    {currentUser && 
                                        <span className='name'>{currentUser["name"]["first"] + " " + currentUser["name"]["last"]}</span>
                                    }
                                </div>
                            </div>
                        </>
                    )}
                    <button className='next-button' onClick={fetchUsers} disabled={loading}>
                        {loading ? 'Fetching....' : 'Next'}
                    </button>
                </div>
        </div>
    )
}

export default UserGenerator;