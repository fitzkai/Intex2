import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '800px',
    margin: '40px auto',
    padding: '0 20px',
    lineHeight: 1.6,
    color: '#333',
    textAlign: 'left',
  },
};

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> April 7th, 2025
      </p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information when you register or interact with
          our site, including:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Age and gender</li>
          <li>City, state, and ZIP code</li>
          <li>Streaming preferences (e.g., Netflix, Disney+)</li>
          <li>Username and password</li>
        </ul>
        <p>
          We may also collect technical data such as browser type, IP address,
          and pages visited.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Provide access to site features</li>
          <li>Personalize content and recommendations</li>
          <li>Improve our services and user experience</li>
          <li>Communicate updates and support</li>
        </ul>
        <p>
          We <strong>do not sell</strong> your personal information to third
          parties.
        </p>
      </section>

      <section>
        <h2>3. How We Protect Your Information</h2>
        <p>We use industry-standard security practices, including:</p>
        <ul>
          <li>Secure password storage</li>
          <li>HTTPS encryption</li>
          <li>Restricted access to user data</li>
        </ul>
        <p>
          However, no method of transmission or storage is completely secure.
        </p>
      </section>

      <section>
        <h2>4. Your Choices</h2>
        <p>You may:</p>
        <ul>
          <li>Access or update your information</li>
          <li>Delete your account by contacting us</li>
          <li>Opt out of non-essential communications</li>
        </ul>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          We may use cookies to enhance your experience. You will be asked to
          accept or reject cookies upon visiting our site. You can also control
          cookies through your browser settings.
        </p>
      </section>

      <section>
        <h2>6. Third-Party Services</h2>
        <p>
          We may use third-party tools (e.g., analytics) that follow their own
          privacy practices. Please review their policies separately.
        </p>
      </section>

      <section>
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Updates will be posted on
          this page with a new effective date.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>If you have questions or concerns, please contact us at:</p>
        <p>
          📧 <a href="mailto:your-email@example.com">your-email@example.com</a>
          <br />
          📍 Your City, State
        </p>
      </section>

      <section>
        <h2>9. Legal Basis for Processing (GDPR)</h2>
        <p>
          We collect and use your personal data based on the following legal
          grounds:
        </p>
        <ul>
          <li>
            Your consent (e.g., when you register or opt in to communications)
          </li>
          <li>
            To fulfill our contract with you (e.g., providing access to
            services)
          </li>
          <li>To comply with legal obligations</li>
          <li>
            For our legitimate business interests, provided your rights do not
            override them
          </li>
        </ul>
      </section>

      <section>
        <h2>10. Your Rights Under GDPR</h2>
        <p>
          If you are located in the European Economic Area (EEA), you have the
          right to:
        </p>
        <ul>
          <li>Access your personal data</li>
          <li>Request correction or deletion of your data</li>
          <li>Restrict or object to our processing of your data</li>
          <li>Withdraw consent at any time</li>
          <li>Request a copy of your data (data portability)</li>
          <li>File a complaint with a Data Protection Authority</li>
        </ul>
        <p>
          To exercise these rights, contact us at{' '}
          <a href="mailto:your-email@example.com">your-email@example.com</a>.
        </p>
      </section>

      <section>
        <h2>11. EU Representative</h2>
        <p>
          If required by GDPR, we have appointed a representative in the EU.
          Contact details are available upon request.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
