var APP = (window as any).APP;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-copyright">
          Licensed under <a href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank" rel="noopener noreferrer">AGPL-3.0</a> © {currentYear} Forgeon Academy. Source code available on <a href="https://github.com/albr21/forgeon-academy" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </div>
    </footer>
  );
}

APP.Footer = Footer;
