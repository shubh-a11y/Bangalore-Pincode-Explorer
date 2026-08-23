import React from 'react';

/**
 * SearchBar component for entering and validating 6-digit Indian PIN codes.
 */
export default function SearchBar({ pincode, setPincode, onSearch, isLoading, validationError }) {
  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numeric digits and max 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    setPincode('');
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <label htmlFor="pincode-input" className="sr-only">
          Enter 6-digit Bangalore PIN Code
        </label>
        
        <div className="input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          
          <input
            id="pincode-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={pincode}
            onChange={handleChange}
            placeholder="e.g. 560034, 560001"
            className={`pincode-input ${validationError ? 'input-error' : ''}`}
            disabled={isLoading}
            autoComplete="off"
            aria-invalid={!!validationError}
            aria-describedby={validationError ? "input-validation-msg" : undefined}
          />

          {pincode && !isLoading && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
              aria-label="Clear pincode input"
              title="Clear"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          className="search-btn"
          disabled={isLoading || pincode.length !== 6}
          aria-label="Search Pincode"
        >
          {isLoading ? (
            <span className="btn-spinner-container">
              <span className="spinner" aria-hidden="true"></span>
              <span>Searching...</span>
            </span>
          ) : (
            <span>Search Area</span>
          )}
        </button>
      </div>

      {validationError && (
        <p id="input-validation-msg" className="validation-hint" role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
}
