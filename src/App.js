import React, { Component } from 'react';
import BasicCircles from './components/BasicCircles';
import LineChart from './components/LineChart';
import { Navbar, NavbarBrand, Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  state = {
    gender: 'male',
    data: [
      { age: '10', name: 'Tony' },
      { age: '12', name: 'Jessica' },
      { age: '9', name: 'Andrew' },
      { age: '10', name: 'Emily' },
      { age: '11', name: 'Richard' }
    ]
  };

  updateGender = gender => {
    if (gender === 'women') {
      this.setState({ data: [{ age: '20', name: 'Andy' }] });
    } else {
      this.setState({
        data: [
          { age: '10', name: 'Tony' },
          { age: '12', name: 'Jessica' },
          { age: '9', name: 'Andrew' },
          { age: '10', name: 'Emily' },
          { age: '11', name: 'Richard' }
        ]
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="light" variant="light">
          <NavbarBrand>D3 + ReactJS </NavbarBrand>
        </Navbar>
        <Container>
          <Row>
            <Col xs={12}>
              <h1>Basic Circles</h1>
              <BasicCircles />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Basic Lines</h1>
              <LineChart />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
