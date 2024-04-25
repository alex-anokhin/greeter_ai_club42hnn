import { FooterContainer, Logo, LinkContainer, Link } from "./footer-styled";
import IconLogo from "../img/icons/logo.png";

function Footer() {
  return (
    <FooterContainer>
      <Logo src={IconLogo} />
      <LinkContainer>
        <a href="#">Faq's</a>
        <a href="#">Terms and conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="https://ap-global.net/">42 AI CLUB</a>
        <a>&copy; All rights reserved</a>
      </LinkContainer>
    </FooterContainer>
  );
}

export default Footer;
