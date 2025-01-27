import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './LeadForm.css';

const LeadForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [error, setError] = useState(null); 
  const [showThankYouModal, setShowThankYouModal] = useState(false); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message);
    
    setIsSubmitted(true);
    setShowRocket(true); // Show the rocket when the form is submitted
    setError(null); // Reset any previous error

    // Send WhatsApp message via API
    if (phoneNumber) {
      try {
        const response = await sendWhatsappMessage(phoneNumber);
        if (response.error) {
          setError(response.error.error_data.details);
          console.log(response.error.error_data.details);
          
          setTimeout(() => setError(null), 7000); // Close the error modal after 3 seconds
        } else {
          setShowThankYouModal(true); 
          setTimeout(() => setShowThankYouModal(false), 6000); // Close the thank you modal after 3 seconds
          resetForm(); // Reset the form after submission
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
        setTimeout(() => setError(null), 6000); // Close the error modal after 3 seconds
      }
    }
  };

  // Function to send WhatsApp message using API
  const sendWhatsappMessage = (phoneNumber) => {
    const url = 'https://graph.facebook.com/v21.0/500395246498712/messages';
    const messagePayload = {
      messaging_product: 'whatsapp',
      to: "+91" + phoneNumber,
      text: {
        body: 'Hello ' + name + ', thank you for reaching out! 🚀', // Your custom message
      },
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer EAAQKVaZCZBvLIBO7Ub8WaKtYQyWxT906NvwiXRF7hP8E0ZCXVTBv53WD2VGW7vQ6tzbSbgbCCTgOjQ064SMDHLGlY4VhULgRxF2iQnqIfYOeY86a8dOVfkTR8gpHH4H1Qa8ZCJggvNCAPayZAqdJuEMJDtIpNDJyvAiV8vyX7Jl8dSkvfhv50DWBFX0sNFYvVmoD8vqjztrr8bNWXjLKBk4OHuWN2FYivmtkZD', // Replace with your actual access token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messagePayload),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  };

  // Function to reset the form after submission
  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setPhoneNumber('');
    setIsSubmitted(false);
    setShowRocket(false);
  };

  return (
    <div className="lead-form-container">
      {/* Background Text */}
      {isSubmitted && <div className="background-text">ESROMAGICA</div>}

      {/* Form */}
      <motion.div
        className="lead-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <h2>Join the Space Mission</h2>
        <p>Embark on a journey to explore the universe with our educational programs!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="form-field">
            <label htmlFor="phoneNumber">Your Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <motion.button
            className="submit-button"
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitted ? 'Thank You!' : 'Blast Off!'}
          </motion.button>
        </form>
      </motion.div>

      {/* Error Modal */}
      {error && (
        <motion.div
          className="dramatic-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="modal-content">
            <h3>{error}</h3>
          </div>
        </motion.div>
      )}

      {/* Rocket Animation */}
      {showRocket && (
        <motion.div
          className="rocket-animation"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -150 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          {/* Rocket Image or Animation */}
        </motion.div>
      )}

      {/* Thank You Modal */}
      {showThankYouModal && (
        <motion.div
          className="thank-you-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="modal-content">
            <h3>Thank you for signing up! 🚀</h3>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LeadForm;
