import { Skeleton, Grid, Stack } from "@mui/material";
import Header from "./Header";

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
