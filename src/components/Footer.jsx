import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Brand from './Brand';

const careLinks = [
  'FAQs',
  'Shipping & delivery',
  'Returns & refunds',
  'Privacy policy',
  'Terms & conditions',
];

export default function Footer({ onCategory, onInfo }) {
  return (
    <footer className="footer">
      <div className="page-container footer-grid">
        <div className="footer-about">
          <Brand />
          <p>
            Thoughtfully chosen. Fairly priced.
            <br />
            Your one-stop shop for a life well lived.
          </p>
          <span className="footer-signoff">
            A little better, every day. <ArrowUpRight size={15} />
          </span>
        </div>
        <div>
          <h3>Explore</h3>
          <button onClick={() => onCategory('all')}>New arrivals</button>
          <button onClick={() => onCategory('women')}>Women’s collection</button>
          <button onClick={() => onCategory('men')}>Men’s collection</button>
          <button onClick={() => onCategory('home')}>Home & living</button>
          <a href="#deal">Deals & offers</a>
        </div>
        <div>
          <h3>Here to help</h3>
          {careLinks.map((label) => (
            <button key={label} onClick={() => onInfo(label)}>
              {label}
            </button>
          ))}
        </div>
        <div className="footer-contact">
          <h3>Say hello</h3>
          <a href="mailto:hello@shopeveryday.example">
            <Mail size={15} />
            hello@shopeveryday.example
          </a>
          <span>
            <Phone size={15} />
            +1 (555) 012-3456
          </span>
          <span>
            <MapPin size={15} />
            123 Commerce Street
            <br />
            New York, NY 10001
          </span>
          <button onClick={() => onInfo('Follow Shop everyday')}>
            <Instagram size={16} /> Find a little daily inspiration
          </button>
        </div>
      </div>
      <div className="page-container footer-bottom">
        <p>© {new Date().getFullYear()} Shop everyday. All rights reserved.</p>
        <span>Made for your everyday.</span>
        <div className="payment-methods" aria-label="Illustrative payment methods">
          <b>VISA</b>
          <span className="mastercard">
            <i />
            <i />
          </span>
          <b>PayPal</b>
          <b> Pay</b>
        </div>
      </div>
    </footer>
  );
}
