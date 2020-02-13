import React, { Component } from 'react';
import D3Hooks from './components/D3Hooks';
import GenderDropdown from './components/GenderDropdown';
import { Navbar, NavbarBrand, Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  state = {
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
              <D3Hooks data={this.state.data} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
