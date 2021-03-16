import React from 'react';
import { 
  ChakraProvider 
  ,Box
  ,extendTheme} from "@chakra-ui/react"
import Main from './pages/Main';
import Upload from './pages/Upload';
import About from './pages/About';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from './component/Nav';
import { withCookies } from 'react-cookie';

const theme = extendTheme({
  styles : {
    global : { 
      body :{ 
        borderRadius : 0,
      },
      box :{ 
        borderRadius : 0,
      },
      
    }
  }
})


function App() {
  return (
      <Router>
        <ChakraProvider  theme={theme}>
          <Box 
            overflow="hidden"
            className="App">
            {/* <Nav/> */}
            <Switch>
              <Route path="/about">
                <About/>
              </Route>
              <Route exact path="/">
                <Main/>
              </Route>
            </Switch>
          </Box>
        </ChakraProvider>
      </Router>
  );
}

export default App;
