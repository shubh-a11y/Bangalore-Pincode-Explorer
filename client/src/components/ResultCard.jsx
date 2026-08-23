import React, { useState } from 'react';

/**
 * ResultCard component to display retrieved pincode and area information.
 */
export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const { pincode, area, city, state } = result;

  const handleCopy = () => {
    const textToCopy = `${area}, Bangalore - ${pincode}, ${state}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="result-card-container animate-fade-in">
      <div className="result-card">
        <div className="card-header">
          <div className="badge-pincode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-icon">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            PIN: {pincode}
          </div>

          <button
            type="button"
            className="copy-btn"
            onClick={handleCopy}
            title="Copy address details"
            aria-label="Copy area details to clipboard"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon text-success">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="card-body">
          <div className="area-title-group">
            <span className="field-label">Area / Locality</span>
            <h2 className="area-name">{area}</h2>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">City</span>
              <span className="detail-value">{city}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">State</span>
              <span className="detail-value">{state}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
