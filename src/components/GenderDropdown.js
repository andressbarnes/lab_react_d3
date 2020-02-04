import React from 'react';
import { Dropdown } from 'react-bootstrap';

function GenderDropdown({ func }) {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Please select gender
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => func('men')}>Men</Dropdown.Item>
          <Dropdown.Item onSelect={() => func('women')}>Women</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default GenderDropdown;
