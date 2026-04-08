var APP = (window as any).APP;

function OnboardingModal({ onComplete }: { onComplete: (username: string) => void }) {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    onComplete(username.trim() || 'Learner');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="onboarding-step">
          <div className="step-icon">🚀</div>
          <h2>Welcome to {APP.CONFIG.appName}!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Your interactive platform for learning technical concepts with gamification.
            Track your progress, earn XP, unlock achievements!
          </p>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your username..."
            autoFocus
          />
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '20px' }}>
            You can change this later in Settings.
          </p>
          <button className="btn btn-primary" onClick={handleSubmit} style={{ width: '100%' }}>
            Start Learning! 🎯
          </button>
        </div>
      </div>
    </div>
  );
}

APP.OnboardingModal = OnboardingModal;
