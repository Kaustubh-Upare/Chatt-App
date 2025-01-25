import { Skeleton, Grid, Stack } from "@mui/material";
import Header from "./Header";
import { BouncingSkeleton } from "../styled/StyleComponents";

export const LayoutLoaders = () => {
  return (
    <>
      <Grid container height={"calc(100vh-4rem)"} spacing={"1rem"}>
        <Grid
          item
          sm={4}
          md={3}
          lg={3}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          height={"100%"}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={4} >
        <Stack direction={"column"} spacing={"1rem"}>
          {Array.from({length:10}).map((_,index)=>(
            
            <Skeleton key={index} variant="rectangular" height={"5rem"}  />
            
          ))}
        </Stack>
        </Grid>
        <Grid
          item
          xs={4}
          sm={7}
          md={5}
          height={"100%"}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
      </Grid>
    </>
  );
};

export const TypingLoader=()=>{
  console.log("tri")
  return(
    <Stack
    spacing={"0.5rem"}
    direction={"row"}
    padding={"0.5rem"}
    justifyContent={"center"}
    >
      <BouncingSkeleton varient="circular" width={"7rem"} height={"9rem"} color="primary.main"
      style={{
        animationDelay:"0.1s"
      }}/>
      <BouncingSkeleton varient="circular" width={"7rem"} height={"9rem"} 
      style={{
        animationDelay:"0.4s"
      }}/>
    </Stack>
  )
}