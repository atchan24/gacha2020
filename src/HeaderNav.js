import React from 'react';
import {Navbar} from 'react-bootstrap';
import './App.css';

export class HeaderNav extends React.Component {
    render() {
      return (
        <Navbar bg="light">
          <Navbar.Brand><b> Esports Tycoon </b> | An Esports Gacha Game</Navbar.Brand>
        </Navbar>
      );
    }
  }

  export default HeaderNav;