import styled from "styled-components";
import "@fontsource/roboto-condensed";

const HeaderContainer = styled.header`
  margin-top: 20px;
  justify-content: space-between;
  display: inline;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-top: 10px;
  margin-left: 10%;
`;

const Title = styled.p`
  font-family: Roboto Condensed;
  margin-top: 50px;
  margin-left: 25px;
  color: #222222;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  display: inline;
  letter-spacing: 0px;
`;

const Container = styled.div`
  margin-top: 0;
  margin-right: 10%;
  float: right;
`;

export {
  HeaderContainer,
  Container,
  Logo,
  Title,
};
