import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ThemeProvider, SideModal, Button } from '../lib';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  toggleDialog = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div className="base">
        <div style={{ height: '500px' }}>
          <Button
            label="Show modal"
            onClick={this.toggleDialog}
          />
          <SideModal
            show={this.state.show}
            onClose={this.toggleDialog}
          >
            <span style={{ width: '300px', display: 'inline-block' }}>Test text</span>
          </SideModal>
        </div>
      </div>
    );
  }
}

storiesOf('D3A/Organisms/SideModal', module)
  .add(
    'SideModal',
    withInfo(`
      Side modal
    `)(() => (
      <ThemeProvider theme="d3a">
        <Container />
      </ThemeProvider>
    )),
  );
