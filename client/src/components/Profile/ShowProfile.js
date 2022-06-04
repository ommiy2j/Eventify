import styled from "styled-components"

const  ShowProfile=({picture})=>{
    return (
        <>
            <Profile>
                <Img></Img>
            </Profile>
        </>
    )
}

export default ShowProfile

const Profile=styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:2px solid;

`
const Img=styled.img``