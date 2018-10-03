import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ThemeProvider, InputField } from '../lib';

const wrapperStyle = {
  padding: '15px',
  width: '300px',
  background: '#0f3a4d',
  display: 'flex',
  flexDirection: 'column',
};


storiesOf('D3A/Atoms/FormFields', module)
  .add(
    'InputField',
    withInfo(`
      Input field
    `)(() => (
      <ThemeProvider theme="d3a">
        <div className="base" style={wrapperStyle}>
          <InputField name="test" label="Label" value="Value" error errorMsg="Invalid field." unit="cents / kWh" />
          <InputField name="test" value="Value" error />
          <InputField name="test" label="Number" value="15" type="number" unit="cents / kWh" />
        </div>
      </ThemeProvider>
    )),
  );
