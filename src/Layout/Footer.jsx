import { FooterContainer, Logo, LinkContainer, Content } from "./footer-styled";
import IconLogo from "../img/icons/logo.jpg";

function Footer() {
  return (
    <FooterContainer>
      <Logo src={IconLogo} />
      <LinkContainer>
        <Content href="#">42 AI CLUB</Content>
        <Content>&copy; All rights reserved</Content>
      </LinkContainer>
    </FooterContainer>
  );
}

export default Footer;
