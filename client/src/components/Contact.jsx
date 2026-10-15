import React, { useState } from 'react';
import { sendMessage } from '../services/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(null); // { type: 'success' | 'error', text: string }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please write a message.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters long.';
    }
    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatusFeedback(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      const res = await sendMessage(formData);

      if (res.success) {
        setStatusFeedback({
          type: 'success',
          text: res.message || 'Thank you! Your message was sent successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
        setFieldErrors({});
      } else {
        setStatusFeedback({
          type: 'error',
          text: res.message || 'Failed to send message. Please try again.'
        });
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatusFeedback({
        type: 'error',
        text: 'An unexpected error occurred. Please try reaching out directly via email.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="contact-heading" className="section-title">Contact</h2>
          <p className="section-description">
            Have an opportunity, a project to collaborate on, or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Contact Info Panel */}
          <div className="contact-info-panel">
            <h3 className="contact-info-title">Contact Information</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              I’m currently based in the Philippines and open to local or remote junior developer opportunities, contract work, or frontend UI engineering.
            </p>

            <div className="contact-links-list">
              {/* Email Link */}
              <a
                href="mailto:cruzroswell98@gmail.com"
                className="contact-link-item"
                aria-label="Send email to Roswell Cruz"
              >
                <div className="contact-item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-val">cruzroswell98@gmail.com</span>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href="https://github.com/roswell23"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
                aria-label="Visit Roswell Cruz on GitHub"
              >
                <div className="contact-item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">GitHub</span>
                  <span className="contact-item-val">github.com/roswell23</span>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://linkedin.com/in/roswell-cruz"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
                aria-label="Visit Roswell Cruz on LinkedIn"
              >
                <div className="contact-item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">LinkedIn</span>
                  <span className="contact-item-val">linkedin.com/in/roswell-cruz</span>
                </div>
              </a>
            </div>
          </div>

          {/* Controlled Contact Form */}
          <div className="contact-form-card">
            {statusFeedback && (
              <div
                className={`form-alert ${
                  statusFeedback.type === 'success' ? 'form-alert-success' : 'form-alert-error'
                }`}
                role="alert"
              >
                {statusFeedback.text}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Maria Santos"
                  className={`form-input ${fieldErrors.name ? 'input-error' : ''}`}
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  disabled={submitting}
                />
                {fieldErrors.name && (
                  <p id="name-error" className="form-error-msg">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. maria@example.com"
                  className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  disabled={submitting}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="form-error-msg">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your team or project..."
                  className={`form-textarea ${fieldErrors.message ? 'input-error' : ''}`}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  disabled={submitting}
                ></textarea>
                {fieldErrors.message && (
                  <p id="message-error" className="form-error-msg">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={submitting}
              >
                {submitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
