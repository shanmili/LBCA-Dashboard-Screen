import React, { useRef, useState } from 'react';
import useAccountSettingsState from '../../hooks/useAccountSettingsState';
import '../../styles/AccountSettings.css';


const AccountSettings = ({ onNavigate, onAdminPhotoUpdate }) => {
  const { 
    fname, setFname, 
    lname, setLname, 
    email, setEmail, 
    toast, showToast, 
    displayName, initials 
  } = useAccountSettingsState();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfilePhoto(url);
    if (onAdminPhotoUpdate) onAdminPhotoUpdate(url);
  };

  return (
      <div className="page">
        <div className="as-container">

          {/* Back Button */}
          <button className="backBtn" onClick={() => onNavigate('dashboard')}>
            ← Back
          </button>

          <h1 className="as-title">Account Settings</h1>
          <p className="as-subtitle">Manage your personal profile information.</p>

          {/* Profile Card */}
          <div className="as-card">
            <div className="cardLabel">Profile</div>
            <div className="avatarSection">
              <div className="as-avatar" style={{ overflow: 'hidden', padding: 0 }}>
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : initials}
              </div>
              <div className="avatarInfo">
                <h3 className="avatarName">{displayName}</h3>
                <p className="avatarEmail">{email}</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
                <button className="btnUpload" onClick={() => fileInputRef.current.click()}>
                  Change photo
                </button>
              </div>
            </div>
            <div className="fieldGrid">
              <div className="as-field">
                <label className="as-label">First Name</label>
                <input className="as-input" type="text" value={fname} onChange={e => setFname(e.target.value)} />
              </div>
              <div className="as-field">
                <label className="as-label">Last Name</label>
                <input className="as-input" type="text" value={lname} onChange={e => setLname(e.target.value)} />
              </div>
              <div className="as-field as-field-full">
                <label className="as-label">Username</label>
                <input className="as-input" type="text" defaultValue="admin" />
              </div>
              <div className="as-field as-field-full">
                <label className="as-label">Bio</label>
                <textarea className="as-textarea" placeholder="A short bio about yourself…" />
              </div>
            </div>
            <div className="cardActions">
              <button className="btnSecondary" onClick={() => { setFname('Admin'); setLname('User'); }}>Cancel</button>
              <button className="btnPrimary" onClick={() => showToast('Profile updated successfully.')}>Save Changes</button>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="as-card">
            <div className="cardLabel">Contact Information</div>
            <div className="fieldGrid">
              <div className="as-field as-field-full">
                <label className="as-label">Email Address</label>
                <input className="as-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="as-field as-field-full">
                <label className="as-label">Phone Number</label>
                <input className="as-input" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="as-field as-field-full">
                <label className="as-label">Website</label>
                <input className="as-input" type="url" placeholder="https://yourwebsite.com" />
              </div>
              <div className="as-field">
                <label className="as-label">Country</label>
                <select className="as-input">
                  <option>Philippines</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Singapore</option>
                </select>
              </div>
              <div className="as-field">
                <label className="as-label">City</label>
                <input className="as-input" type="text" placeholder="Davao City" />
              </div>
            </div>
            <div className="cardActions">
              <button className="btnSecondary">Cancel</button>
              <button className="btnPrimary" onClick={() => showToast('Contact info updated.')}>Save Changes</button>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="as-card">
            <div className="cardLabel">Account Details</div>
            <div className="infoRow">
              <span className="infoKey">Account Status</span>
              <span className="badge badgeGreen">● Active</span>
            </div>
            <div className="infoRow">
              <span className="infoKey">Member Since</span>
              <span className="infoVal">January 12, 2024</span>
            </div>
            <div className="infoRow infoRow-last">
              <span className="infoKey">Last Login</span>
              <span className="infoVal">Today at 9:41 AM</span>
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="as-card">
            <div className="cardLabel">Danger Zone</div>
            <div className="dangerHeader">
              <div>
                <p className="dangerTitle">Delete Account</p>
                <p className="dangerDesc">Permanently remove your account and all associated data.</p>
              </div>
              <button className="btnDanger" onClick={() => showToast('Contact support to delete your account.')}>
                Delete
              </button>
            </div>
          </div>

        </div>

        {/* Toast */}
        {toast && <div className="as-toast">{toast}</div>}
      </div>
  );
};

export default AccountSettings;

