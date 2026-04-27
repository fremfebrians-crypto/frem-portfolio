'use client';

import { useState } from 'react';

export default function CommentForm() {
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('saving');
    setError('');
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const json = await res.json();
    if (!res.ok) {
      setState('error');
      setError(json.error || 'Unable to submit comment.');
      return;
    }
    setMessage('');
    setState('done');
  }

  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <textarea
        placeholder="Write your comment here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        minLength={10}
        required
      />
      <div className="comment-form-actions">
        <button className="btn btn-primary" type="submit" disabled={state === 'saving'}>
          {state === 'saving' ? 'Submitting...' : 'Submit Comment'}
        </button>
        {state === 'done' ? <span className="status-text success">Comment submitted for review.</span> : null}
        {state === 'error' ? <span className="status-text error">{error}</span> : null}
      </div>
    </form>
  );
}
