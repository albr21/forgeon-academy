var APP = (window as any).APP;
var { importProfile } = APP;

interface UserProfile {
  username: string;
  profileImage?: string;
}

function SettingsPage({
  profile,
  onUpdateProfile,
  onExport,
  onImport,
  onReset,
}: {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onExport: () => void;
  onImport: (json: string) => void;
  onReset: () => void;
}) {
  const [username, setUsername] = useState(profile.username);
  const [importStatus, setImportStatus] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSaveUsername = () => {
    if (username.trim()) {
      onUpdateProfile({ username: username.trim() });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 128;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        onUpdateProfile({ profileImage: canvas.toDataURL('image/jpeg', 0.8) });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleRemoveImage = () => {
    onUpdateProfile({ profileImage: undefined });
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result as string;
      const result = importProfile(json);
      if (result) {
        onImport(json);
        setImportStatus('✅ Data imported successfully!');
      } else {
        setImportStatus('❌ Invalid JSON file. Please check the format.');
      }
    };
    reader.onerror = () => {
      setImportStatus('❌ Failed to read file.');
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="page-content">
      <h1 className="section-title">⚙️ Settings</h1>
      <p className="section-subtitle">Manage your profile and data</p>

      {/* Username */}
      <div className="settings-section">
        <h2>✏️ Username</h2>
        <p>Change your display name.</p>
        <div className="settings-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
            maxLength={30}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleSaveUsername}>
          Save Username
        </button>
      </div>

      {/* Profile Image */}
      <div className="settings-section">
        <h2>🖼️ Profile Picture</h2>
        <p>Upload an image to personalize your avatar.</p>
        <div className="settings-image-preview">
          <div className="profile-avatar-large">
            {profile.profileImage
              ? <img src={profile.profileImage} alt="" className="avatar-img" />
              : profile.username.charAt(0).toUpperCase()}
          </div>
          <div className="settings-image-actions">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button className="btn btn-primary btn-sm" onClick={() => imageInputRef.current?.click()}>
              📷 Choose Image
            </button>
            {profile.profileImage && (
              <button className="btn btn-ghost btn-sm" onClick={handleRemoveImage}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="settings-section">
        <h2>💾 Export Data</h2>
        <p>Download your progress as a JSON file. You can use this to back up your data or transfer it to another browser.</p>
        <button className="btn btn-primary btn-sm" onClick={onExport}>
          📥 Export as JSON
        </button>
      </div>

      {/* Import */}
      <div className="settings-section">
        <h2>📤 Import Data</h2>
        <p>Select a previously exported JSON file to restore your progress.</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileImport}
          style={{ display: 'none' }}
        />
        <div className="settings-actions">
          <button className="btn btn-primary btn-sm" onClick={() => fileInputRef.current?.click()}>
            📂 Choose JSON File
          </button>
          {importStatus && (
            <span style={{ fontSize: '13px', color: importStatus.startsWith('✅') ? 'var(--accent-teal)' : 'var(--accent-red)' }}>
              {importStatus}
            </span>
          )}
        </div>
      </div>

      {/* Reset */}
      <div className="settings-section">
        <h2 style={{ color: 'var(--accent-red)' }}>🗑️ Reset All Data</h2>
        <p>This will permanently delete all your progress, XP, and achievements. This action cannot be undone.</p>
        {!showResetConfirm ? (
          <button
            className="btn btn-sm"
            style={{ background: 'rgba(255,77,106,0.1)', color: 'var(--accent-red)', border: '1px solid rgba(255,77,106,0.3)' }}
            onClick={() => setShowResetConfirm(true)}
          >
            Reset All Progress
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-red)', fontSize: '14px', fontWeight: 600 }}>
              Are you sure? This cannot be undone.
            </span>
            <button
              className="btn btn-sm"
              style={{ background: 'var(--accent-red)', color: '#fff' }}
              onClick={() => { onReset(); setShowResetConfirm(false); }}
            >
              Yes, Reset Everything
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

APP.SettingsPage = SettingsPage;
