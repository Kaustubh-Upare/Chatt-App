import {keyframes, Skeleton, styled} from "@mui/material"
import { Link as LinkComponent } from "react-router-dom";

export const VisuallyHiddenInput = styled("input")({
    border:0,
    clipPath:"Inset(0)",
    height:1,
    margin:-1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    whiteSpace:"nowrap",
    width:1,
});

// it is use basically for an input tag this property should follow like this
// e.g <VisuallyHiddenInput type='file'>

export const Link=styled(LinkComponent)`
    text-decoration:none;
    margin:1rem 0 0 0;
    color:#A879F8;
    &:hover {
        background-color: #0A364E;
    }
`;

export const InputBox=styled("input")`
width:100%;
height:100%;
border:none;
background-color:white;
outline:none;

`

export const SearchField=styled("input")`
padding:0.5rem 1rem ;
width:70%;
border:none;
outline:2px solid #38BDF8;
border-radius:1.5rem;
background-color:#1C1C1C;
color:white
`

export const BaseBtn=styled('button')`
padding:0.8rem ;
border-radius:1rem;
border:none;
outline:2px solid #38BDF8;
cursor:pointer;
background-color:#1C1C1C;
color:white;
font-size:1rem;
font-weight:550;
&:hover{
background-color:grey;
}
`   
const bounceAnimation=keyframes`
0%{transform:scale(1);}
50%{transform:scale(1.5);}
100%{transform:scale(1);}
`


export const BouncingSkeleton=styled(Skeleton)(()=>({
    animation:`${bounceAnimation} 1s infinite`,
}))