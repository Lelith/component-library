import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ThemeProvider, ConfigurationTreeAction } from '../lib';

const wrapperStyle = {
  minHeight: '300px',
  padding: '25px',
  display: 'flex',
  justifyContent: 'space-between',
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
      <ConfigurationTreeAction
        clicked={clicked}
        onClick={() => this.setState({ clicked: !clicked })}
      />
    );
  }
}

storiesOf('D3A/ConfigurationTree', module)
  .add(
    'ConfigurationTreeAction',
    withInfo(`
      Configuration Tree Action Diamond

      ~~~js
        <ConfigurationTreeAction></ConfigurationTreeAction>
      ~~~
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <Container />
        </div>
      </ThemeProvider>
    )),
  );
