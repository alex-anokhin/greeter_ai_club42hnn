import styled from "styled-components";
import "@fontsource/montserrat";

const FooterContainer = styled.footer`
  padding-left: 10%;
  padding-right: 10%;
  background-color: #efefef;
  width: 100%;
  margin-top: 30px;
  display: inline-block;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-top: 10px;
  @media (max-width: 960px) {
    width: 90px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

const LinkContainer = styled.div`
  display: inline-block;
  margin: 30px auto 20px auto;
  @media (max-width: 800px) {
    width: 100%;
    margin-top: 10px;
  }
  @media (min-width: 970px) {
    margin-top: 30px;
    margin-bottom: 20px;
    float: right;
    display: flex;
    justify-content: center;
  }
`;

const Link = styled.a`
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

export { FooterContainer, Logo, LinkContainer, Link };
