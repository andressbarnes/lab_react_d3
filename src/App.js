import React, { Component } from 'react';
import ChartWarapper from './components/ChartWrapper';
import GenderDropdown from './components/GenderDropdown';
import { Navbar, NavbarBrand, Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  state = {
    gender: 'men'
  };

  updateGender = gender => this.setState({ gender });

  render() {
    return (
      <div className="App">
        <Navbar bg="light" variant="light">
          <NavbarBrand>Barchartly</NavbarBrand>
        </Navbar>
        <Container>
          <Row>
            <Col xs={12}>
              <GenderDropdown func={this.updateGender} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ChartWarapper gender={this.state.gender} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
