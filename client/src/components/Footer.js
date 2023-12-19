import {Link} from "react-scroll"; //import react-scroll library for "Scroll to Top" button
import styled from "styled-components";

const Footer = () => {
// create a function that will enable the user to navigate to the top of the page by clicking the "Back to Top" button    
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <FooterContainer>
            <AboutText>
            At WearTech, we're not just tech enthusiasts; we're trendsetters merging our love for innovation with a flair for style. 
            Every member of our team is dedicated to curating the best selection of wearable tech that mirrors your personality, making technology an effortless part of your unique story. 
            Join us in embracing sophistication and innovation intertwined at WearTech.
            </AboutText>
            <BackToTopLink to="top" smooth={true} duration={100}>
                <BackToTopButton onClick={scrollToTop}>Back to Top</BackToTopButton>
            </BackToTopLink>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 98%;
    padding: 10px;
`;

const AboutText = styled.p`
    flex-grow: 1;
    margin-right: 10px;
    margin-left: 10px;
    padding: 15px;
    text-align: center; 
    font-size: 0.7em;
`;

const BackToTopLink = styled(Link)`
    text-decoration: none; 
`;

const BackToTopButton = styled.button`
    background-color: white;
    border: none;
    width: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9em;
    
    &:hover{
        font-weight: bold;
    }
`;

export default Footer;