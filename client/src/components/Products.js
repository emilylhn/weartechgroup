import styled from "styled-components";
import prodcutBanner from "../assets/ProductBanner.jpg"
import test from "../assets/test.jpg"
import ProductCard from "./ProductCard";
import DropdownBrands from "./DropdownBrands";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const [brands, setBrands] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(null)
    const { category } = useParams();
    const handleNextPage =(direction) => {  
        //**Add later on to  be able to go back to all products without refreshing page */
        if(pageIndex + 1 < (Math.ceil(productCount / 25)) && direction === 'next'){
            setPageIndex(pageIndex + 1)
            setProducts([]);}
        else if(pageIndex > 0 && direction === 'back')
            setPageIndex(pageIndex - 1)
    }   
    //Turn into custom hooks
    useEffect(() => {
        let fetchURL = `http://localhost:3000/products/page/${pageIndex}`;

        if (category) {
            fetchURL = `http://localhost:3000/products/category/${category}`;
        }else if(selectedBrand){
            fetchURL =`http://localhost:3000/products/companies/${selectedBrand}`;
        }
        fetch(fetchURL)
        .then(response => response.json())
        .then(data =>{ 
            setProducts(data.data)
            setProductCount(data.count)
        })
        .catch(error => console.log(error))
    },[category, pageIndex, selectedBrand])

    useEffect(() => {
        fetch("http://localhost:3000/companies/")
        .then(response => response.json())
        .then(data => {setBrands(data.data)})
        .catch(error => console.log(error))
    },[])
    return (

        <Wrapper>
            <PageHeader id="top">
                <Banner>
                    <Title>{!category? 'All Products' : category}</Title>
                </Banner>
                
            </PageHeader>
            <PageContent>
                {
                    !category
                    ?<ContentLeft>
                        <DropdownBrands brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}/>
                    </ContentLeft>
                    :null
                }
                <ContentRight>
                    
                    <ContentRightInner>
                        { 
                        products.length <= 0
                            ?<h1>Loading...</h1> 
                            :products.map((product) => {
                                test++;
                                return(<ProductCard key={product._id} product={product}/>)
                            })    
                        }
                    </ContentRightInner>
                    
                    {
                        products.length <= 0
                        ?null
                        :<PageNav>
                            <NextButton onClick={() => {handleNextPage('back')}}>{'<<'}</NextButton>
                            <PageNumber>{pageIndex + 1}</PageNumber>
                            <NextButton onClick={() => {handleNextPage('next')}}>{'>>'}</NextButton>   
                        </PageNav>
                    }
                </ContentRight>
            </PageContent>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    height:auto;
    padding:0;
    display:flex;
    flex-direction:column;
`

const PageHeader = styled.div`
    background-image: url(${prodcutBanner});
    background-size:100%;
    background-repeat:no-repeat;
    width:100%;
    height:20vh;
    align-items:center;   
    display:flex;
    justify-content:center;
    align-items:center;
`
const Banner = styled.div`
    width:100%;
    
`

//Fix to be responsive
const Title = styled.h1`
    position:absolute;
    color:white;
    height:auto;
    width:100%;
    text-align:center;
    font-size:50px;
    letter-spacing:10px;
`
const PageContent = styled.div`
    display:flex;
    flex-direction:row;
    margin-top: 20px;

    @media (max-width:1500px){
        display:flex;
        flex-direction:column;
        margin-top: 20px;
    }
`

const ContentLeft = styled.div`
    border-right:1px solid black;
    min-width: 10vw;
`
const ContentRight = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    min-height:1000px;
    margin-left:6vw;
`
const ContentRightInner = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    align-items:center;
    flex-wrap:wrap;
    width:100%;
    gap: 50px;

    @media (max-width:750px){
        padding:0;
        justify-content:center;
        margin-top:50px;
    }
`

const PageNav = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`
const NextButton = styled.button`

`
const PageNumber = styled.p`
    margin:0px 10px 0px 10px;
`

export default Products;