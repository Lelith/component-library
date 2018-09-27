import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { ThemeProvider, ConfigurationTree } from '../lib';

const wrapperStyle = {
  padding: '15px',
};

const containerStyle = {
  width: '50%',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const treeProps = {
  nodes: [
    {
      type: 'Area',
      // active: true,
      // nodes: [{ type: 'Area' }, {
      //   type: 'Storage',
      //   active: true,
      //   nodes: [{ type: 'Area' }, { type: 'Area', active: true }, { type: 'action' }],
      // }, { type: 'action' }],
    },
    { type: 'PV' },
    { type: 'Storage' },
    { type: 'InfiniteDieselGenerator' },
    {
      type: 'Load',
      active: true,
      nodes: [{ type: 'Area' }, {
        type: 'Storage',
        active: true,
        nodes: [{ type: 'Area' }, { type: 'Area', active: true }, { type: 'action' }],
      }, { type: 'action' }],
    },
    { type: 'action' },
  ],
};

storiesOf('D3A/ConfigurationTree', module)
  .add(
    'ConfigurationTree',
    withInfo(`
      ConfigurationTree

      ~~~js
      <ConfigurationTree />
      ~~~

    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <div style={containerStyle}>
            <ConfigurationTree {...treeProps} />
          </div>
        </div>
      </ThemeProvider>
    )),
  );
