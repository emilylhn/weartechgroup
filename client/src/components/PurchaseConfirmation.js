import styled from "styled-components";

// component for the confirmation page after a purchase is made

const PurchaseConfirmation = () => {
    return (
        <Wrapper>
        <ConfirmationBox>
            <Confirmed>Your purchase is confirmed!</Confirmed>
            <Thanks>Thank you for shopping with WearTech.</Thanks>
        </ConfirmationBox>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    max-width:50%;
    min-height: 100%;
    max-height: 100%;   
    margin:auto;
    margin-bottom: 50px;
    margin-top: 50px;
    border: 2px solid #F5F5F5;
    padding: 40px; 
    border-radius: 5px;
    background-color: #F5F5F5;
`;

const ConfirmationBox = styled.div`
    margin-top: 100px;
    margin-bottom: 300px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    align-items: center;
`;

const Confirmed = styled.h2`
    margin-bottom: 20px;
    font-size: 40px;
    padding: 40px;
`;

const Thanks = styled.p`
    margin-bottom: 20px;
    font-size: 20px;
`;


export default PurchaseConfirmation;