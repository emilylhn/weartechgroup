import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
    const navigate = useNavigate();

// navigate to the product page when the product card is clicked
    const goToItemPage = () => {
        navigate(`/products/${product._id}`)
    };

    return (
        <Card onClick={goToItemPage}>
            <ImgContainer>
            <ProductImg src={product.imageSrc}/>
            </ImgContainer>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
            
        </Card>
    )
}

const Card = styled.div`
    display:flex;
    flex-direction: column;
    min-width: 250px;
    max-width:300px;
    cursor: pointer;
    /* border:1px solid black; */
`

const ImgContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    max-width:100%;
`
const ProductImg = styled.img`
    min-width: 100%;
    min-height: 250px;
    max-width: 100%;
    max-height: 250px;
    object-fit:contain;
`
const ProductName = styled.p`
    color:#1c1c1c;
    font-size:0.9vw;

    @media (max-width:900px) {
        font-size:1.5vw;
    }

    @media (max-width:700px) {
        font-size:2vw;
    }

    @media (max-width:500px) {
        font-size:4vw;
    }
`

const ProductPrice = styled.p`
    font-size:1.2vw;

    @media (max-width:700px) {
        font-size:3vw;
    }

    @media (max-width:500px) {
        font-size:5vw;
    }
`

export default ProductCard;