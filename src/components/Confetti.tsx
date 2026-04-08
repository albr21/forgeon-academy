// ============================================
// Component — Confetti Effect
// ============================================

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;

  const colors = ['#4f8fff', '#7c5cff', '#00d4aa', '#ffd700', '#ff8a3d', '#ff4d6a'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

var APP = (window as any).APP;
APP.Confetti = Confetti;
