import { Container, Paper, Typography } from "@mui/material";
import {DataGrid} from "@mui/x-data-grid"

const Table=({heading,rows,columns,rowHeight=200})=>{
    return(
        <Container
          sx={{
            height:"100vh"
          }}
        >
            <Paper
              sx={{
                padding:"1rem 4rem",
                borderRadius:"1rem",
                margin:"auto",
                overflow:"hidden",
                height:"100%",
                boxShadow:"none"
              }}
            
            >
                <Typography
                  textAlign={"center"}
                  variant="h4"
                  sx={{
                    margin:"2rem",
                    textTransform:"uppercase"
                  }}
                
                >{heading}</Typography>
                <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={rowHeight}
                style={{
                    height:"80%"
                }}
                sx={{
                    border:"none",
                    ".table-header":{
                        bgcolor:"rgb(0,0,0,0.5)",
                        color:"white"
                    }
                }}
                />
            </Paper>
        </Container>
    )
}
export default Table;