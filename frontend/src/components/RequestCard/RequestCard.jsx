import React, { useState, useEffect } from 'react';
import styles from './RequestCard.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function RequestCard({ prescriptionId, patientName, symptoms, age, onAccept, access }) {
  const navigate = useNavigate();



  const handleAcceptClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/request/${prescriptionId}`, {withCredentials:true});
      const { _id, patientName, symptoms, age } = response.data.pendingRequest;
      
      navigate(`/request/${prescriptionId}`, { state: {prescriptionID: _id, patientName, symptoms, age } });
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDetailsClick = () => {
    navigate(`/request/${prescriptionId}`);
  };

  return (
    <div className={styles.customCard}>
      <div className={styles.cardContent}>
        <h5 className={styles.cardTitle}>
          Presciption ID: {prescriptionId} 
        </h5>
        <p className={styles.cardText}>
        <strong>Patient Name:</strong> {patientName} 
        </p>
        <p className={styles.cardText}>
          <strong>Symptoms:</strong> {symptoms} 
        </p>
        <p className={styles.cardText}>
          <strong>Age:</strong> {age} 
        </p>

        {/* Chat Button */}
        <button className={styles.chatButton} onClick={() => navigate(`/chat/${prescriptionId}`)}>
          P2P Chat
        </button>

        {access === 'op-accepted' ? (
          <button className={styles.stateButton} onClick={handleDetailsClick}>
            Details
          </button>
        ) : access === 'op-pending' ? (
          <button className={styles.pendingButton} disabled>
            Pending...
          </button>
        ) : (
          <button className={styles.stateButton} onClick={handleAcceptClick}>
            Accept
          </button>
        )}
      </div>
    </div>
  );
}