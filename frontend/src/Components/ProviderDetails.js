import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./providerDetails.css";

const ProviderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:5000/api/user/spInfo/${id}`);
                console.log(response.data)
                setProvider(response.data);
            } catch (error) {
                console.error("Error fetching provider details", error);
            }
        };
        fetchProvider();
    }, [id]);

    if (!provider) return <div className="provider-details-container">Loading...</div>;

    return (
        <div className="provider-details-container">
            <div className="back-btn" onClick={() => navigate(-1)}>← Back to Dashboard</div>
            <div className="provider-card">
                <h1 className="provider-name">{provider.name}</h1>
                <div className="provider-info"><label>Business:</label> {provider.business_name}</div>
                <div className="provider-info"><label>Service Area:</label> {provider.service_area}</div>
                <div className="provider-info"><label>Phone:</label> {provider.contact}</div>
                <div className="provider-info"><label>Email:</label> {provider.email}</div>
                <div className="provider-info"><label>Experience:</label> {provider.experience}2 years</div>
                <div className="provider-info"><label>Rating:</label> {provider.rating} ⭐</div>
                <button className="connect-btn">Send Request</button>
            </div>
        </div>
    );
};

export default ProviderDetails;
