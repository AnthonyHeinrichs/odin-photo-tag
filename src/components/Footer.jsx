
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer__copy_container">
        <p>Copyright © {year} Anthony Heinrichs</p>
          <a href="https://github.com/AnthonyHeinrichs" target="_blank">
          <img className="footer__github" src="/github.svg" alt="github"></img>
        </a>
      </div>
    </div>
  );
};

export default Footer;