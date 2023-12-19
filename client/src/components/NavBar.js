import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logoImage from '../assets/logo.png';
import cartImage from '../assets/cart.png';
import searchImage from '../assets/search.png';
import hamburgerIcon from '../assets/menu.png';
import { Link, useNavigate } from 'react-router-dom';


// hey gang and welcome to my *~*nav bar*~* she is responsive and goes hanburger on mobile
// and the search bar pops/toggles in and out to save space as well

const NavBarContainer = styled.nav`
  background-color: white;
  color: black;
  padding: 5px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 70;

  @media screen and (max-width: 768px) {
    padding: 5px;
    flex-direction: column;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;

  @media screen and (max-width: 768px) {
    margin-top: 20px; 
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-right: 40px;

  @media screen and (max-width: 768px) {
    display: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'flex' : 'none')}; /* if mobile menu is open it displays vertically */
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px 0;
    margin-right: 0;
  }
`;

const NavLink = styled.li`
  margin: 0 10px;

a {
  text-decoration: none;
  color: black; 
}

@media screen and (max-width: 768px) {
  margin: 10px 0;
}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black; 
`;

const IconImage = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  padding: 5px;

  @media screen and (max-width: 768px) {
    display: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'block' : 'none')}; /* decides if the icons are shown, makes them hidden until called on */
  }
`;

const HamburgerIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  padding: 5px;
  display: none; /* hide it on larger screens */

  @media screen and (max-width: 768px) {
    display: block; /* displays this only on smaller screens like phones to save space */
  }
`;

const SearchBox = styled.div`
  display: ${({ searchOpen }) => (searchOpen ? 'block' : 'none')}; /* same as above, hides the search box until you click the search icon and it toggles it open */ 
  margin-top: 5px;
  margin-right: 50px;

  @media screen and (max-width: 768px) {
    margin-right: 0; 
  }
`;

const SearchInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  width: 300px;
  height: 30px;
`;

const SearchDropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: calc(100% + 1px); /* position below the input box if need to change later*/
  left: auto;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-top: none;
  border-radius: 0 0 5px 5px;
  width: 40%;
  max-height: 150px;
  overflow-y: auto;
  display: ${({ searchOpen }) => (searchOpen ? 'block' : 'none')};
`;

const SuggestionItem = styled.li`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;


const NavBar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOpen(false); // this will close search when mobile menu opens
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen && searchOpen) {
      setMobileMenuOpen(false); // this will close mobile menu when search opens
    }
  };

  // handes input in the search bar
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // handles search submissions
  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(`/products/search/${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.data); 
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  // debbounce to give pause before suggestions show up
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearchSubmit();
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // navigation to the product you select in the suggestions in search
  const handleSelection = (selectedItem) => {
    navigate(`/products/${selectedItem.id}`);
  };


  return (
<NavBarContainer>
<Link to="/">
  <Logo src={logoImage} alt="Logo" />
</Link>
<NavLinks mobileMenuOpen={mobileMenuOpen}>
  <NavLink>
    <StyledLink to="/products">All Products</StyledLink>
  </NavLink>
  <NavLink>
    <StyledLink to="/products/category/Lifestyle">Lifestyle</StyledLink>
  </NavLink>
  <NavLink>
    <StyledLink to="/products/category/Fitness">Fitness</StyledLink>
  </NavLink>
  <NavLink>
    <StyledLink to="/products/category/Medical">Medical</StyledLink>
  </NavLink>
  <NavLink>
    <StyledLink to="/products/category/Entertainment">Entertainment</StyledLink>
  </NavLink>
  <Link to="/cart">
    <IconImage src={cartImage} alt="Cart" mobileMenuOpen={mobileMenuOpen} />
  </Link>
  <IconImage src={searchImage} alt="Search" onClick={toggleSearch} mobileMenuOpen={mobileMenuOpen} />
</NavLinks>
<HamburgerIcon src={hamburgerIcon} alt="Menu" onClick={toggleMobileMenu} />
    <SearchBox searchOpen={searchOpen}>
        <SearchInput
          type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
        />
        <SearchDropdown searchOpen={searchOpen}>
          {Array.isArray(searchResults) && searchResults.length > 2 && (
            searchResults.map((result) => (
              <SuggestionItem key={result.id} onClick={() => handleSelection(result)}>
                {result.name}
              </SuggestionItem>
            ))
          )}
        </SearchDropdown>
      </SearchBox>
</NavBarContainer>
  );
};



export default NavBar;
