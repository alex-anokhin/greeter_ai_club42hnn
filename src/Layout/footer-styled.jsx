import styled from "styled-components";
import "@fontsource/montserrat";

const FooterContainer = styled.footer`
  padding-left: 10%;
  padding-right: 10%;
  background-color: #efefef;
  width: 100%;
  margin-top: 30px;
  display: block;
  text-align: center;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
  display: block;
  margin: 20px auto;
  padding-top: 20px;
`;

const LinkContainer = styled.div`
  display: inline-block;
  margin: 30px auto 20px auto;
  justify-content: center;
`;

const Content = styled.a`
  font-family: Montserrat;
  font-size: 13px;
  text-transform: uppercase;
  text-decoration: none;
  color: #1f1f1f;
  font-weight: bold;
  padding-left: 25px;
  @media (max-width: 800px) {
    width: 100%;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    padding-left: 0;
  }
  @media (min-width: 970px) {
    padding-left: 40px;
  }
`;

export { FooterContainer, Logo, LinkContainer, Content };
