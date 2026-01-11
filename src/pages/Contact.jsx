import '../styles/pages/contact.css';

export default function Contact() {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Need Help?</h1>
                <p>
                    We are here to assist you with any questions or issues.
                </p>
            </div>

            <div className="contact-actions">
                <a href="mailto:support@shopfiy.com" className="action-btn btn-primary">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Email Support
                </a>

                <a href="tel:+15551234567" className="action-btn btn-outline">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Call Us
                </a>
            </div>
        </div>
    );
}
