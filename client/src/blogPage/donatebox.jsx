import React, { useState } from 'react';
import './donatebox.css';

const DonateBox = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleStepClick = (step) => {
        setCurrentStep(step);
    };

    return (
        <div className="donate-box">
            <div className="steps">
                <div 
                    className={`step ${currentStep === 1 ? 'active' : ''}`}
                    onClick={() => handleStepClick(1)}
                >
                    Step 1: Information
                </div>
                <div 
                    className={`step ${currentStep === 2 ? 'active' : ''}`}
                    onClick={() => handleStepClick(2)}
                >
                    Step 2: Shipping
                </div>                         
            </div>

            <div className="section">
                {currentStep === 1 && (
                    <>
                        <h2>Product Details</h2>
                        {/* Placeholder for form fields */}
                        <div className="form-field">
                            <label>Product Type:</label>
                            <select>
                                <option>Food</option>
                                <option>Cloth</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Product Name:</label>
                            <input type="text" placeholder="Enter product name" />
                        </div>
                        <div className="form-field">
                            <label>Quantity/Status:</label>
                            <input type="text" placeholder="Enter quantity or status" />
                        </div>
                        <div className="form-field">
                            <label>Organization:</label>
                            <select>
                                <option>Organization 1</option>
                                <option>Organization 2</option>
                                {/* Add more organizations as needed */}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Description:</label>
                            <input type="text" placeholder="Enter product description" />
                        </div>
                        <div className="form-field">
                            <label>Picture of Product:</label>
                            <input type="file" accept="image/*" />
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <h2>Shipping</h2>
                        {/* Placeholder for shipping information */}
                        <div className="form-field">
                            <label>Name:</label>
                            <input type="text" placeholder="Enter your name" />
                        </div>
                        <div className="form-field">
                            <label>Address:</label>
                            <input type="text" placeholder="Enter your address" />
                        </div>
                        <div className="form-field">
                            <label>City:</label>
                            <input type="text" placeholder="Enter your city" />
                        </div>
                        <div className="form-field">
                            <label>State:</label>
                            <input type="text" placeholder="Enter your state" />
                        </div>
                        <div className="form-field">
                            <label>Postal Code:</label>
                            <input type="text" placeholder="Enter your postal code" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default DonateBox;
