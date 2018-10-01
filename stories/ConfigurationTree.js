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
    { type: 'Area', name: 'Area' },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
    { type: 'PV', name: 'PV' },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
    {
      type: 'InfiniteDieselGenerator',
      name: 'Diesel',
    },
    {
      type: 'Load',
      name: 'Load',
      active: true,
      nodes: [{ type: 'Area', name: 'Area' }, {
        type: 'Storage', name: 'Storage',
      },
      { type: 'PV', name: 'PV' },
      { type: 'Storage', name: 'Storage' },
      { type: 'PV', name: 'PV' },
      { type: 'Storage', name: 'Storage' },
      {
        type: 'Area',
        name: 'Area',
        active: true,
        nodes: [{ type: 'Area', name: 'Area', test: true }, { type: 'Area', name: 'Area', active: true }, { type: 'action' }],
      },
      { type: 'PV', name: 'PV' },
      { type: 'PV', name: 'PV' },
      { type: 'action' },
      ],
    },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
    { type: 'PV', name: 'PV' },
    { type: 'Storage', name: 'Storage' },
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
