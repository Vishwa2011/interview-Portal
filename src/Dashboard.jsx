import React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Drawerspage from './Drawerspage';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
  }));
const Dashboard = () => {
  return (
    <Drawerspage>
        <Box sx={{ flexGrow: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid xs={2} sm={4} md={4} >
              <Item>
                <h2>Total Category</h2>
                <Box sx={{fontSize:'3rem',fontWeight:'600'}}>3</Box>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
              <Item>
                <h2>Total Sub Category</h2>
                <Box  sx={{fontSize:'3rem',fontWeight:'600'}}>3</Box>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
              <Item>
                <h2>Total Q / A</h2>
                <Box  sx={{fontSize:'3rem',fontWeight:'600'}}>2</Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
    </Drawerspage>
  )
}

export default Dashboard
