import styled from "styled-components"
import dropdown from "../assets/icons8-expand-arrow-30.png"
const DropdownBrands = ({brands,selectedBrand,setSelectedBrand}) => {
    
    const handleFilter = (id) => {
        if(selectedBrand === id){
            setSelectedBrand(null);
        }else{
            setSelectedBrand(id);
        }
    }
    return (
        <Dropdown>
            <DropdownBtn><DropdownName>Brands</DropdownName></DropdownBtn>
            <DropdownList id='dropdown-list' className="dropdown-list">
                {
                    brands.map((brand) => {
                        return(  
                        selectedBrand !== brand._id
                            ?<Brand key={brand._id}><span onClick={() => handleFilter(brand._id)} >{brand.name}</span></Brand>
                            :<SelectedBrand key={brand._id}><span onClick={() => handleFilter(brand._id)} >{brand.name}</span></SelectedBrand>
                        )
                    })
                }
            </DropdownList>
        </Dropdown>
    )
}
const Dropdown = styled.div`
    &:hover .dropdown-list {
    display: block;
    }

`
const DropdownName = styled.span`
    padding-right: 70%;
`

const DropdownBtn = styled.div`
    display:flex;
    align-items:center;
    margin-left:15px;
    margin-right:15px;
    border-bottom: 1px solid black;
`

const DropdownList = styled.ul`
    display: none;
    background-color: transparent;
    min-width: 160px;
    padding-left:15px;
    color:#4f4f4f;
`
const Brand = styled.li`
    cursor: pointer;
`
const SelectedBrand = styled.li`
    cursor: pointer;
    background-color:gray;
`
export default DropdownBrands;