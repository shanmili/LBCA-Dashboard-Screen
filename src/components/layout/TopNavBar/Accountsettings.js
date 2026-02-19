import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState('Jane');
  const [lname, setLname] = useState('Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [toast, setToast] = useState('');
  const [toastTimer, setToastTimer] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer) clearTimeout(toastTimer);
    const t = setTimeout(() => setToast(''), 2800);
    setToastTimer(t);
  };

  const displayName = [fname, lname].filter(Boolean).join(' ') || 'Your Name';
  const initials = ((fname[0] || '') + (lname[0] || '')).toUpperCase() || '?';

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Back Button */}
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 style={styles.title}>Account Settings</h1>
        <p style={styles.subtitle}>Manage your personal profile information.</p>

        {/* Profile Card */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>Profile</div>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>{initials}</div>
            <div style={styles.avatarInfo}>
              <h3 style={styles.avatarName}>{displayName}</h3>
              <p style={styles.avatarEmail}>{email}</p>
              <button style={styles.btnUpload} onClick={() => showToast('Photo upload coming soon')}>
                Change photo
              </button>
            </div>
          </div>
          <div style={styles.fieldGrid}>
            <div style={styles.field}>
              <label style={styles.label}>First Name</label>
              <input style={styles.input} type="text" value={fname} onChange={e => setFname(e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Last Name</label>
              <input style={styles.input} type="text" value={lname} onChange={e => setLname(e.target.value)} />
            </div>
            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Username</label>
              <input style={styles.input} type="text" defaultValue="janedoe" />
            </div>
            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Bio</label>
              <textarea style={styles.textarea} placeholder="A short bio about yourself…" />
            </div>
          </div>
          <div style={styles.cardActions}>
            <button style={styles.btnSecondary} onClick={() => { setFname('Jane'); setLname('Doe'); }}>Cancel</button>
            <button style={styles.btnPrimary} onClick={() => showToast('Profile updated successfully.')}>Save Changes</button>
          </div>
        </div>

        {/* Contact Info Card */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>Contact Information</div>
          <div style={styles.fieldGrid}>
            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Phone Number</label>
              <input style={styles.input} type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Website</label>
              <input style={styles.input} type="url" placeholder="https://yourwebsite.com" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Country</label>
              <select style={styles.input}>
                <option>Philippines</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Singapore</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>City</label>
              <input style={styles.input} type="text" placeholder="Davao City" />
            </div>
          </div>
          <div style={styles.cardActions}>
            <button style={styles.btnSecondary}>Cancel</button>
            <button style={styles.btnPrimary} onClick={() => showToast('Contact info updated.')}>Save Changes</button>
          </div>
        </div>

        {/* Account Details Card */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>Account Details</div>
          <div style={styles.infoRow}>
            <span style={styles.infoKey}>Account Status</span>
            <span style={{ ...styles.badge, ...styles.badgeGreen }}>● Active</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoKey}>Plan</span>
            <span style={{ ...styles.badge, ...styles.badgeBlue }}>● Pro</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoKey}>Member Since</span>
            <span style={styles.infoVal}>January 12, 2024</span>
          </div>
          <div style={{ ...styles.infoRow, borderBottom: 'none', paddingBottom: 0 }}>
            <span style={styles.infoKey}>Last Login</span>
            <span style={styles.infoVal}>Today at 9:41 AM</span>
          </div>
        </div>

        {/* Danger Zone Card */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>Danger Zone</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: 3, color: '#1a1d23' }}>Delete Account</p>
              <p style={{ fontSize: '0.82rem', color: '#6b7280' }}>Permanently remove your account and all associated data.</p>
            </div>
            <button style={styles.btnDanger} onClick={() => showToast('Contact support to delete your account.')}>
              Delete
            </button>
          </div>
        </div>

      </div>

      {/* Toast */}
      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f5f7',
    padding: '48px 20px',
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    width: '100%',
    maxWidth: 640,
    margin: '0 auto',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
    marginBottom: 24,
    fontFamily: 'inherit',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    marginBottom: 4,
    color: '#1a1d23',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6b7280',
    marginBottom: 32,
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e2e4e9',
    borderRadius: 12,
    padding: 28,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#6b7280',
    marginBottom: 20,
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 24,
    marginBottom: 24,
    borderBottom: '1px solid #e2e4e9',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#fff',
    flexShrink: 0,
  },
  avatarInfo: { display: 'flex', flexDirection: 'column' },
  avatarName: { fontSize: '1rem', fontWeight: 600, marginBottom: 2, color: '#1a1d23' },
  avatarEmail: { fontSize: '0.83rem', color: '#6b7280', marginBottom: 10 },
  btnUpload: {
    fontSize: '0.82rem',
    fontWeight: 500,
    color: '#2563eb',
    background: 'none',
    border: '1px solid #e2e4e9',
    borderRadius: 7,
    padding: '6px 14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: '0.82rem', fontWeight: 500, color: '#6b7280' },
  input: {
    fontFamily: 'inherit',
    fontSize: '0.92rem',
    color: '#1a1d23',
    background: '#f4f5f7',
    border: '1px solid #e2e4e9',
    borderRadius: 8,
    padding: '10px 13px',
    outline: 'none',
    width: '100%',
  },
  textarea: {
    fontFamily: 'inherit',
    fontSize: '0.92rem',
    color: '#1a1d23',
    background: '#f4f5f7',
    border: '1px solid #e2e4e9',
    borderRadius: 8,
    padding: '10px 13px',
    outline: 'none',
    width: '100%',
    minHeight: 80,
    lineHeight: 1.5,
    resize: 'vertical',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 24,
    paddingTop: 20,
    borderTop: '1px solid #e2e4e9',
  },
  btnPrimary: {
    fontFamily: 'inherit',
    fontSize: '0.88rem',
    fontWeight: 500,
    padding: '9px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    background: '#2563eb',
    color: '#fff',
  },
  btnSecondary: {
    fontFamily: 'inherit',
    fontSize: '0.88rem',
    fontWeight: 500,
    padding: '9px 20px',
    borderRadius: 8,
    border: '1px solid #e2e4e9',
    cursor: 'pointer',
    background: '#ffffff',
    color: '#1a1d23',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '13px 0',
    borderBottom: '1px solid #e2e4e9',
  },
  infoKey: { fontSize: '0.88rem', fontWeight: 500, color: '#1a1d23' },
  infoVal: { fontSize: '0.88rem', color: '#6b7280' },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '3px 9px',
    borderRadius: 20,
    fontSize: '0.75rem',
    fontWeight: 500,
  },
  badgeGreen: { background: '#dcfce7', color: '#16a34a' },
  badgeBlue: { background: '#dbeafe', color: '#2563eb' },
  btnDanger: {
    background: 'none',
    color: '#dc2626',
    border: '1px solid #fecaca',
    fontFamily: 'inherit',
    fontSize: '0.88rem',
    fontWeight: 500,
    padding: '9px 20px',
    borderRadius: 8,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  toast: {
    position: 'fixed',
    bottom: 28,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1a1d23',
    color: '#fff',
    padding: '11px 22px',
    borderRadius: 9,
    fontSize: '0.87rem',
    fontWeight: 500,
    zIndex: 999,
    whiteSpace: 'nowrap',
  },
};

export default AccountSettings;