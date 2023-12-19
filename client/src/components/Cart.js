import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        fetch("http://localhost:3000/cart/",{
            method: 'DELETE',
            headers:{
                'Accept' : 'application/json',
                "Content-Type": "application/json"               
            },
            body: JSON.stringify({product_id: id})
        })
        .then(response => response.json())
        .then(data => window.location.reload())
        .catch(error => console.log(error))
    }
    useEffect(() => {
        fetch("http://localhost:3000/cart/",{
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                "Content-Type": "application/json"               
            },
        })
        .then(response => response.json())
        .then(data => setItems(data.data))
        .catch(error => console.log(error))
    },[])

// clears the cart (clears the items state and issues a DELETE fetch request) upon purchase 
// then navigates users to the confirmation page    
    const handlePurchase = () => {
        fetch("http://localhost:3000/confirmation/",{
            method: 'DELETE',
            headers:{
                'Accept' : 'application/json',
                "Content-Type": "application/json"               
            },
        })
        .then(response => response.json())
        .then(data => {
            setItems([]);
        })
        .catch(error => console.log(error));

        navigate("/confirmation");
    }

    return (
        <Wrapper>
            <CartContent>
            <CartTitle>Cart</CartTitle>
            <CartItems>
                {
                    items.map((item) => {
                        return (
                        <Item>
                            <ItemImg src={item.imageSrc}/>
                            <ItemInfo>
                                <h3>{item.name}</h3>
                                <p>{item.category}</p>
                                <h2>{item.price}</h2>
                                <Delete onClick={() => {handleDelete(item.id)}}>Remove</Delete>
                            </ItemInfo>                        
                        </Item>
                        )
                    })
                }
            </CartItems>
            <PurchaseButton onClick={handlePurchase}>Purchase</PurchaseButton>
            </CartContent>     
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    max-width:50%;
    min-height: 100%;
    max-height: 100%;   
    margin:auto;
    margin-bottom: 200px;
    margin-top: 50px;
    border: 2px solid #F5F5F5;
    padding: 40px; 
    border-radius: 5px;
`

const CartContent = styled.div`
    margin-top:100px;
    width:100%;
    @media (max-width:780px) {
        margin-top:200px;
    }
`

const CartTitle = styled.h1`
    text-align:left;
    width:100%;
    border-bottom:1px solid black;
    font-size: 40px;
    font-weight: bold;
    padding-bottom: 10px;

`

const CartItems = styled.div`
    
`
const Item = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:flex-start;
    gap:50px;
    padding-top:40px;
    padding-bottom: 60px;
    border-bottom: 1px solid black;
`
const ItemImg = styled.img`
    max-width:150px;
`

const ItemInfo = styled.div`
    display:flex;
    flex-direction:column;
`
const Delete = styled.button`
    width:100px;
    height:40px;
    background-color:#FF6961;
    color:white;
    border-radius: 5px;
    margin-top: 20px;

    &:hover {
        background-color: #E05252;
        transform: scale(1.05);
        transition: background-color 0.3s ease, transform 0.3s ease;
    }
`

const PurchaseButton = styled.button`
    background-color: purple;
    width:120px;
    height:50px;
    border-radius: 5px;
    color:white;
    margin-top: 80px;
    padding: 10px;

    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #6a006a;
        transform: scale(1.05);
        transition: background-color 0.3s ease, transform 0.3s ease;
    }
`
export default Cart;