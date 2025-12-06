import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import type { Props } from '@theme/Footer';

function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }

  const { links, logo, copyright } = footer;

  return (
    <footer className="footer" style={{
      backgroundColor: '#0a2c47',
      color: 'white',
      padding: '2rem 0',
      borderTop: '2px solid #1061e8'
    }}>
      <div className="container container-fluid">
        {links && links.length > 0 && <FooterLinks links={links} />}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <FooterLogo logo={logo} />}
            {copyright && <FooterCopyright copyright={copyright} />}
          </div>
        )}
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          color: '#ccc',
          fontSize: '0.9rem'
        }}>
          <p>
            <strong>Physical AI & Humanoid Robotics Textbook</strong><br />
            Bridging the gap between artificial intelligence and physical systems
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Designed for students and researchers in embodied intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);