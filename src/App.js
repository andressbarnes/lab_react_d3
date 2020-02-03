import React from 'react';
import ChartWarapper from './components/ChartWrapper';
import { Navbar, NavbarBrand, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <NavbarBrand>Barchartly</NavbarBrand>
      </Navbar>
      <Container>
        <ChartWarapper />
      </Container>
    </div>
  );
}

export default App;
