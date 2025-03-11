import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser') || '');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            setLoggedInUser(localStorage.getItem('loggedInUser'));
        }
    }, [loggedInUser]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged Out');
        setTimeout(() => navigate('/login'), 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:5000/products"; // Updated to local backend
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setProducts(result);
        } catch (error) {
            handleError(`Failed to fetch products: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome {loggedInUser || 'Guest'}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
