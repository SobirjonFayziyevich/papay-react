import {Box, Button, Container, Stack, Typography} from '@mui/material';
import React from 'react';
import '../css/App.css';
import {RippleBadge} from "./MaterialTheme/styled";

function App() {
  return (
      <Container maxWidth="sm">
        <Stack flexDirection={"column"}>               {/*stack bu flex-box*/}
          <Box sx={{my:4}}>
              <Typography variant="h4" component={"h1"} gutterBottom>
                  Create React App on TypeScript with REDUX
              </Typography>
          </Box>{/* sx bu styleni urniga ishlatamiz, my=> margin x va y uqiga nisbatan deg.*/}
            <Box>
                <RippleBadge badgeContent={4}>
                    <Button variant="contained">Contained</Button>
                </RippleBadge>
            </Box>

        </Stack>
      </Container>
  );
}

export default App;
