import React, { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import ResultCard from './components/ResultCard.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import { searchPincode } from './services/pincodeApi.js';

const QUICK_SEARCH_PINCODES = [
  { code: '560001', name: 'Bangalore GPO' },
  { code: '560034', name: 'Koramangala' },
  { code: '560038', name: 'Indiranagar' },
  { code: '560066', name: 'Whitefield' },
  { code: '560100', name: 'Electronic City' }
];

export default function App() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = (input) => {
    if (!input) {
      return 'Please enter a 6-digit PIN code.';
    }
    if (!/^[1-9][0-9]{5}$/.test(input)) {
      return 'PIN code must be exactly 6 digits starting with 1-9.';
    }
    return '';
  };

  const handleSearch = async (targetCode) => {
    const codeToSearch = targetCode || pincode;
    
    // Clear previous results & errors
    setResult(null);
    setError(null);

    const valErr = validateInput(codeToSearch);
    if (valErr) {
      setValidationError(valErr);
      return;
    }
    setValidationError('');
    setIsLoading(true);

    try {
      const res = await searchPincode(codeToSearch);

      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError(res.message || 'No area found for this PIN code.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickChipClick = (code) => {
    setPincode(code);
    setValidationError('');
    handleSearch(code);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-badge">
          <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Namma Bengaluru</span>
        </div>
        <h1 className="app-title">Bangalore Pincode Explorer</h1>
        <p className="app-subtitle">
          Find the corresponding area or locality for any 6-digit Bangalore PIN code.
        </p>
      </header>

      <main className="app-main">
        <div className="explorer-card">
          <SearchBar
            pincode={pincode}
            setPincode={(val) => {
              setPincode(val);
              if (validationError) setValidationError('');
              if (error) setError(null);
            }}
            onSearch={() => handleSearch()}
            isLoading={isLoading}
            validationError={validationError}
          />

          <div className="quick-suggestions">
            <span className="suggestions-label">Try popular areas:</span>
            <div className="chips-wrapper">
              {QUICK_SEARCH_PINCODES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`chip-btn ${pincode === item.code ? 'active' : ''}`}
                  onClick={() => handleQuickChipClick(item.code)}
                  disabled={isLoading}
                >
                  <span className="chip-code">{item.code}</span>
                  <span className="chip-name">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Spinner / Skeleton */}
        {isLoading && (
          <div className="loading-container animate-pulse" role="status">
            <div className="skeleton-card">
              <div className="skeleton-line skeleton-badge"></div>
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-subtitle"></div>
            </div>
            <span className="sr-only">Fetching area details...</span>
          </div>
        )}

        {/* Error Message */}
        {!isLoading && error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        {/* Result Card */}
        {!isLoading && result && (
          <ResultCard result={result} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Bangalore Pincode Explorer • Built with React, Express & MongoDB
        </p>
      </footer>
    </div>
  );
}
