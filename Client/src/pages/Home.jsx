import AppLayout from "../components/layout/AppLayout";

const Home=()=>{
    return(
        <div style={{height:"100%",display:"flex",justifyContent:"center",
            alignItems:"center",backgroundColor:"#16181c",color:"#a30aab",
            fontSize:"large",flexDirection:"column",textAlign:"center"
        }}>
           <h1>Homeee!</h1>
        
            <h1>Check Out THe Chats From Left Side</h1>
            
        </div>
    )
}

export default AppLayout()(Home);