import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { ThemeProvider, ConfigurationTree } from '../lib';

const wrapperStyle = {
  padding: '15px',
};

const containerStyle = {
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const treeProps = {
  nodes: [
    {
      type: 'Area',
    },
    { type: 'PV' },
    { type: 'Storage' },
    { type: 'PV' },
    { type: 'Storage' },
    { type: 'PV' },
    { type: 'PV' },
    { type: 'Storage' },
    {
      type: 'InfiniteDieselGenerator',
    },
    {
      type: 'Load',
      active: true,
      nodes: [{ type: 'Area' }, {
        type: 'Storage',
      },
      { type: 'PV' },
      { type: 'Storage' },
      { type: 'PV' },
      { type: 'Storage' },
      {
        active: true,
        nodes: [{ type: 'Area', test: true }, { type: 'Area', active: true }, { type: 'action' }],
      },
      { type: 'PV' },
      { type: 'PV' },
      { type: 'action' },
      ],
    },
    { type: 'PV' },
    { type: 'Storage' },
    { type: 'PV' },
    { type: 'Storage' },
    { type: 'PV' },
    { type: 'Storage' },
    { type: 'PV' },
    { type: 'Storage' },
    { type: 'PV' },
    { type: 'Storage' },
    {
      type: 'action',
    },
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
