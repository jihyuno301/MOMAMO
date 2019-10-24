import React, { Component } from 'react';
import styled from 'styled-components';
import Router from './Routes/Router';

class App extends Component {
  render() {
    return (
      <Layout>
        <Router />
      </Layout>
    );
  }
}

const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-flow: row wrap;
`

export default App;