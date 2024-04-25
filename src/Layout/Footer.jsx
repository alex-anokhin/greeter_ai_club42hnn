import { FooterContainer, Logo, LinkContainer } from "./footer-styled";
import IconLogo from "../img/icons/logo.jpg";

function Footer() {
  return (
    <FooterContainer>
      <Logo src={IconLogo} />
      <LinkContainer>
        <a href="#">Faq's</a>
        <a href="#">Terms and conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="#">42 AI CLUB</a>
        <a>&copy; All rights reserved</a>
      </LinkContainer>
    </FooterContainer>
  );
}

export default Footer;
