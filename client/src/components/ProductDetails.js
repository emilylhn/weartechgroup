import styled from "styled-components";
import { useEffect, useState } from "react";
import defaultImage from "../assets/ProductBanner.jpg"
import entertainmentImage from "../assets/entertainment-image.jpeg";
import fitnessImage from "../assets/fitness-image.jpeg";
import medicalImage from "../assets/medical-image-3.jpeg";
import lifestyleImage from "../assets/lifestyle-image.jpeg"
import { useParams } from "react-router";
import { Link } from "react-router-dom";


// this component creates the product details pages, and displays the information that accompanies the items in the database.

const ProductDetails = () => {
    const [item, setItem] = useState(null);
    const [companies, setCompanies] = useState([])
    const [cart, setCart] = useState([]);
    const { itemId } = useParams();


//this useEffect fetches the specific item data based on the item ID captured in the URL param     
    useEffect(() => {
        fetch (`http://localhost:3000/products/${itemId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error ("Product not found");
            }
            return response.json();
        })
        .then ((itemData) => {
            setItem(itemData.data);
            console.log(itemData.data)
        })
        .catch ((error) => {
            console.log("There was an error retrieving product details", error);
            return <NotFoundMessage>Product Not Found.</NotFoundMessage>
        })
    }, [itemId]);

// this useEffect fetches the company data 

    useEffect(() => {
        fetch("http://localhost:3000/companies/")
        .then(response => response.json())
        .then(companiesData => setCompanies(companiesData.data))
        .catch(error => console.log(error))
    }, [])

// create an object that stores different banner images that correspond to their respective product categories
    const getPageBanner = (category) => {
        const categoryImageMap = {
            Lifestyle: lifestyleImage,
            Medical: medicalImage, 
            Entertainment: entertainmentImage,
            Fitness: fitnessImage,
        }

        return categoryImageMap[category] || defaultImage;
    };

//function that adds item(s) to the cart collection via a POST method, and updates the useCart state with the newly added item(s)
    const addToCart = () => {
        setCart([...cart, item]);

        fetch("http://localhost:3000/cart/",{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                "Content-Type": "application/json"               
            },
            body: JSON.stringify({product_id: item._id, name: item.name, price:item.price, category:item.category, imageSrc:item.imageSrc})
        })
        .then(response => response.json())
        .then(data => alert("Added to Cart!"))
        .catch(error => console.log(error))
        
    }

// if no item found, return a "Product not found" message.
    if (!item) {
        return <NotFoundMessage>Product Not Found.</NotFoundMessage>
    }
// return item information, image and appropriate styling
    return (
        <>
            <BannerBox>
                <BannerImage src={getPageBanner(item.category)} alt={`${item.category} Banner`}/>
                <BannerCategory>{item.category}</BannerCategory>
            </BannerBox>
            
            <ReturnLink to="/products">
                <ReturnButton> Return to Search Results</ReturnButton>
            </ReturnLink>
            <ProductContainer>
                <ProductImage src={item.imageSrc} alt={item.name}/>
                <ProductInfoBox>
                    <ProductName>{item.name}</ProductName>
                    {companies.map((company) => 
                        company._id === item.companyId ? (
                            <ProductCompany key={item.companyId}>{company.name}</ProductCompany>
                        ) : null
                    )}
                    <ProductCategory>{item.category}</ProductCategory>
                    <ProductBodyLocation>Worn on: {item.body_location}</ProductBodyLocation>
                    <PurchaseBox>
                    {item.numInStock > 0 ? (
                        <>
                            <PurchasePrice>{item.price}</PurchasePrice>
                            <PurchaseButton onClick={addToCart}>Add to Cart</PurchaseButton>
                        </>
                        ) : (
                            <OutofStock>Out of Stock</OutofStock>
                        )
                        }
                    </PurchaseBox>
                </ProductInfoBox>
            </ProductContainer>
        </>
    )
}

const NotFoundMessage = styled.p`
    color: purple;
    margin-top: 100px;
    padding-left: 20px;
    padding-bottom: 500px;
`;

const BannerBox = styled.div`
    display: flex;
    height: 40vh;
    overflow: hidden;
`;

const BannerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const BannerCategory = styled.h1`
    height: 100px;
    font-size: 4em;
    position: absolute;
    top: 26%; 
    left: 17%; 
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(255, 255, 255, 0);
    padding: 10px;
    border-radius: 5px;
`;

const ReturnLink = styled(Link)`

`;

const ReturnButton = styled.button`
    text-decoration: underline;
    padding: 10px;
    padding-top: 15px;
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    flex-wrap: wrap; 
    padding: 80px;
`;

const ProductInfoBox = styled.div`
    margin-bottom: 20px;
`;

const ProductName = styled.div`
    font-size: 1.5em;
    padding-bottom: 5px;
    
`;

const ProductCategory = styled.div`
        padding-bottom: 5px;
`;

const ProductBodyLocation = styled.div`
    font-style: italic;
`;

const ProductImage = styled.img`    
    height: 100%;
    width: 300px;
    padding: 20px;
`;

const ProductCompany = styled.div`
    padding-bottom: 5px;
`;

const PurchaseBox = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 40px;
`;

const PurchasePrice = styled.div`
    padding-bottom: 10px;
    font-size: 1.3em;
    font-weight: bold;
`;

const PurchaseButton = styled.button`
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
    border: 2px solid black;
    width: 120px;
    height: 50px;
    border-radius: 10%;
`;

const OutofStock = styled.p`
    color: purple;
    font-weight: bold;
`;

export default ProductDetails;