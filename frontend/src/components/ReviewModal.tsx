import React, { useState } from 'react';
import { Star, X, Send, MessageSquare } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  peerName: string;
  peerAvatar: string;
  skillName: string;
  onSubmit: (review: { rating: number; comment: string; sessionId: string }) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen, onClose, sessionId, peerName, peerAvatar, skillName, onSubmit
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, comment, sessionId });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
      setComment('');
    }, 1500);
  };

  const ratingLabels = ['', 'Needs Improvement', 'Fair', 'Good', 'Very Good', 'Excellent!'];

  return (
    <div className="review-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass-panel review-modal cyan-glow">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h3 className="font-mono" style={{ color: 'var(--color-cyan)', fontSize: '0.75rem', marginBottom: '8px' }}>
              [ SESSION_REVIEW ]
            </h3>
            <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700 }}>Rate Your Session</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✨</div>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Review Submitted!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Thanks for your feedback.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Peer Info */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '16px',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '10px', marginBottom: '24px'
            }}>
              <span style={{ fontSize: '2rem' }}>{peerAvatar}</span>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{peerName}</div>
                <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                  SKILL: {skillName.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div style={{ marginBottom: '24px' }}>
              <label className="hud-label" style={{ marginBottom: '10px', display: 'block' }}>How was the session?</label>
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    size={32}
                    className={`review-star ${i <= (hoverRating || rating) ? 'active' : ''}`}
                    fill={i <= (hoverRating || rating) ? '#ffc107' : 'transparent'}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(i)}
                  />
                ))}
              </div>
              {(hoverRating || rating) > 0 && (
                <span className="font-mono" style={{ color: 'var(--color-cyan)', fontSize: '0.75rem' }}>
                  {ratingLabels[hoverRating || rating]}
                </span>
              )}
            </div>

            {/* Comment */}
            <div className="auth-field" style={{ marginBottom: '24px' }}>
              <label className="hud-label">
                <MessageSquare size={12} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Comments (optional)
              </label>
              <textarea
                className="hud-input"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                style={{ resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.5' }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="cyber-button font-mono"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.85rem' }}
              disabled={rating === 0}
            >
              <Send size={16} /> SUBMIT REVIEW
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default ReviewModal;
