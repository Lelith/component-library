import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  ActionDiamond,
  ConfigurationTreeNode,
  NodeDiamond,
  ThemeProvider,
} from '../lib';

const wrapperStyle = {
  minHeight: '300px',
  padding: '25px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-around',
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  render() {
    const {
      clicked,
    } = this.state;

    return (
      <ActionDiamond
        clicked={clicked}
        onClick={() => this.setState({ clicked: !clicked })}
      />
    );
  }
}

storiesOf('D3A/ConfigurationTree', module)
  .add(
    'ActionDiamond',
    withInfo(`
      Action Diamond

      ~~~js
        <ActionDiamond></ActionDiamond>
      ~~~
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <Container />
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'NodeDiamond',
    withInfo(`
      Node Diamond

      ~~~js
        <NodeDiamond type="TYPE"></NodeDiamond>
      ~~~
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <div style={rowStyle}>
            <NodeDiamond type="Area" />
            <NodeDiamond type="CellTower" />
            <NodeDiamond type="FiniteDieselGenerator" />
            <NodeDiamond type="InfiniteDieselGenerator" />
          </div>

          <div style={rowStyle}>
            <NodeDiamond type="Load" />
            <NodeDiamond type="PV" />
            <NodeDiamond type="Storage" />
          </div>
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'ConfigurationTreeNode',
    withInfo(`
      ConfigurationTreeNode
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <div style={rowStyle}>
            <ConfigurationTreeNode type="Area" upLine={{ show: true, active: true }} downLine={{ show: true, active: true }} />
            <ConfigurationTreeNode type="Area" leftLine={{ show: true, active: true }} upLine={{ show: true, active: true }} />
            <ConfigurationTreeNode type="Area" rightLine={{ show: true, active: true }} upLine={{ show: true, active: true }} />
            <NodeDiamond type="InfiniteDieselGenerator" />
          </div>

          <div style={rowStyle}>
            <NodeDiamond type="Load" />
            <NodeDiamond type="PV" />
            <NodeDiamond type="Storage" />
          </div>
        </div>
      </ThemeProvider>
    )),
  );
