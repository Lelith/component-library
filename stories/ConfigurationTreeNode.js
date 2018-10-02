import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  ActionDiamond,
  ConfigurationTreeNode,
  NodeCard,
  NodeDiamond,
  NodeParamsFormWrapper,
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
  marginBottom: '10px',
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
            <ConfigurationTreeNode
              type="Area"
              name="Example area"
              width="120px"
              upLine={{ show: true, active: true }}
              downLine={{ show: true, active: true }}
            />
            <ConfigurationTreeNode
              type="CellTower"
              name="Example cell tower"
              width="120px"
              leftLine={{ show: true, active: true }}
              upLine={{ show: true, active: true }}
              downLine={{ show: true, active: true }}
            />
            <ConfigurationTreeNode
              type="Storage"
              width="120px"
              name="Storage"
              rightLine={{ show: true, active: true }}
              downLine={{ show: true, active: true }}
              upLine={{ show: true, active: true }}
            />
          </div>

          <div style={rowStyle}>
            <ConfigurationTreeNode
              type="Area"
              name="Example area"
              width="120px"
              upLine={{ show: true, active: true }}
              downLine={{ show: true, active: true }}
              rightLine={{ show: true, active: false }}
              leftLine={{ show: true, active: false }}
              clicked
            />
            <ConfigurationTreeNode
              type="CellTower"
              name="Example cell tower"
              width="120px"
              leftLine={{ show: true, active: true }}
              upLine={{ show: true, active: false }}
              rightLine={{ show: true, active: true }}
              clicked
            />
            <ConfigurationTreeNode
              type="Add"
              width="120px"
              rightLine={{ show: false }}
              leftLine={{ show: false }}
              upLine={{ show: false }}
              downLine={{ show: false }}
            />
          </div>
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'NodeCard',
    withInfo(`
      Node Card
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <div style={{ width: '300px' }}>
            <NodeCard type="Area" name="Area" />
            <NodeCard type="CellTower" name="Cell Tower" />
            <NodeCard type="FiniteDieselGenerator" name="Finite Generator" />
            <NodeCard type="InfiniteDieselGenerator" name="Infinite Generator" />
          </div>
        </div>
      </ThemeProvider>
    )),
  )
  .add(
    'NodeParamsFormWrapper',
    withInfo(`
      Node Params Form Wrapper
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <div style={{ width: '300px', background: 'black' }}>
            <NodeParamsFormWrapper type="Area" name="Area" count={2}>
              <span>Form fields</span>
            </NodeParamsFormWrapper>
          </div>
        </div>
      </ThemeProvider>
    )),
  );
