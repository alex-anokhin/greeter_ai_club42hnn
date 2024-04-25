import { useState } from "react";

import {
  HeaderContainer,
  LeftContainer,
  Logo,
  Title,
} from "./header-styled";
import IconLogo from "../img/icons/logo.jpg";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  function handeDropdownDisplay(e) {
    e.preventDefault();
    return setOpen(!open);
  }

  return (
    <HeaderContainer>
      <LeftContainer>
        <Link to="/">
          <Logo src={IconLogo} />
        </Link>
        <Title>GREETER AI</Title>
      </LeftContainer>
    </HeaderContainer>
  );
}

export default Header;
