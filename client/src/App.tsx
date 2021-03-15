import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import Main from './pages/Main';


function App() {
  return (
    <div className="App">
        <ChakraProvider>
          <Main/>
        </ChakraProvider>
    </div>
  );
}

export default App;
