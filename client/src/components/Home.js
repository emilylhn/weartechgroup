import React from 'react';
import homeimage from '../assets/homeimage.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  overflow-x: hidden; 
`;

const LandingImage = styled.img`
  width: 100%;
  max-width: 1400px;
  height: auto;
  display: block;
  margin: 0 auto;
  position: sticky;
  top: 60px; 
  z-index: -1; 

  @media screen and (max-width: 768px) {
    height: 100vh; 
    width: auto; 
    z-index: -1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  margin-bottom: 50px; 
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 40px;
  }
`;

const StyledLinkButton = styled(Link)`
  border: 2px solid white;
  background-color: transparent;
  color: white;
  padding: 30px 70px;
  margin: 0 10px; 
  font-size: 26px;
  text-decoration: none;
  font-family: 'Marcellus', serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 40px;
    font-size: 18px;
    margin: 10px; 
    }
`;

const Title = styled.h1`
  color: white;
  font-size:48px;
  text-align: center;
  margin-bottom: 40px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 30px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const OverlayContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    max-width: 80%;
    padding: 0 20px;
  }
`;


const Home = () => {
  return (
    <HomeContainer>
    <div className="home">
      <ContentWrapper>
        <LandingImage src={homeimage} alt="Main" />
        <OverlayContent>
        <Title>Redefine how you connect, track, and thrive.</Title>
        <Description>Explore our curated selection of wearable tech, tailored to elevate every facet of your lifestyle.</Description>
        <ButtonWrapper>
        <StyledLinkButton to="/products/category/Fitness">FITNESS</StyledLinkButton>
        <StyledLinkButton to="/products/category/Lifestyle">LIFESTYLE</StyledLinkButton>
        <StyledLinkButton to="/products/category/Medical">MEDICAL</StyledLinkButton>
        <StyledLinkButton to="/products/category/Entertainment">ENTERTAINMENT</StyledLinkButton>
        </ButtonWrapper>
        </OverlayContent>
      </ContentWrapper>
    </div>
    </HomeContainer>
  );
};

export default Home;
