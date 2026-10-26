import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <span className="newsletter-icon">
        <Mail size={32} strokeWidth={1.4} />
      </span>
      <div className="newsletter-copy">
        <span className="eyebrow">LET’S STAY IN THE LOOP</span>
        <h2 id="newsletter-title">Good things in your inbox.</h2>
        <p>Fresh arrivals, exclusive offers, and a little inspiration.</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="newsletter-input">
          <input
            aria-label="Your email address"
            type="email"
            required
            maxLength={254}
            placeholder="Your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSubmitted(false);
            }}
          />
          <button type="submit" aria-label="Join the newsletter">
            {submitted ? <Check size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
        <p className="newsletter-disclaimer" role="status">
          {submitted
            ? 'Thanks! This is a preview — no email was submitted.'
            : 'A little joy, zero spam. Unsubscribe anytime.'}
        </p>
      </form>
    </section>
  );
}
