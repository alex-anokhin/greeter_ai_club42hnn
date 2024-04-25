import {
  HeaderContainer,
  Container,
  Logo,
  Title,
} from "./header-styled";
import IconLogo from "../img/icons/logo.jpg";

function Header() {
  return (
    <HeaderContainer>
      <Container>
        <a to="/">
          <Logo src={IconLogo} />
        </a>
        <Title>GREETER AI</Title>
      </Container>
    </HeaderContainer>
  );
}

export default Header;
