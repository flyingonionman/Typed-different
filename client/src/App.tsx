import React from 'react';
import Content from './component/Content';
import { ChakraProvider } from "@chakra-ui/react"


function App() {
  return (
    <div className="App">
        <ChakraProvider>
          <Content/>
        </ChakraProvider>
    </div>
  );
}

export default App;
