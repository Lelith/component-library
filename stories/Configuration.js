import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import { Diamond, Hero, Button, ThemeProvider, Layout, Header, TreeView, UserStatus, Card, StepButton, Form, TextInputField, Label, NumberPicker, Select } from '../lib';
import logo from './img/Logo.png';

import IconConfiguration from './img/icon_configuration.svg';
import IconGenerator from './img/icon_generator.svg';
import IconCelltower from './img/icon_celltower.svg';
import IconHouse from './img/icon_house.svg';
import IconLight from './img/icon_light.svg';
import IconBattery from './img/icon_battery.svg';
import IconLoad from './img/icon_load.svg';
import IconSolar from './img/icon_solar.svg';
import IconTV from './img/icon_tv.svg';

const selectOptions = [
  {
    option: 'Sunny',
    value: 'house_1',
  },
  {
    option: 'Partly cloudy',
    value: 'house_2',
  },
  {
    option: 'Cloudy',
    value: 'generator_1',
  },
];

const devices = [
  {
    type: 'light',
    callback: action('onClick'),
    iconUrl: IconLight,
  },
  {
    type: 'battery',
    callback: action('onClick'),
    iconUrl: IconBattery,
  },
  {
    type: 'solar',
    callback: action('onClick'),
    iconUrl: IconSolar,
  },
  {
    type: 'tv',
    callback: action('onClick'),
    iconUrl: IconTV,
  },
  {
    type: 'load',
    callback: action('onClick'),
    iconUrl: IconLoad,
  },
];
const entities = [
  {
    type: 'house',
    callback: action('onClick'),
    iconUrl: IconHouse,
  },
  {
    type: 'celltower',
    callback: action('onClick'),
    iconUrl: IconCelltower,
  },
  {
    type: 'generator',
    callback: action('onClick'),
    iconUrl: IconGenerator,
  },
];

let myRef = React.createRef();

storiesOf('D3A/Layouts/Configuration', module)
  .addDecorator(StoryRouter())
  .add(
    'Configuration Page 1',
    withInfo()(() => (
      <ThemeProvider theme="d3a">
        <Layout layout="wrapper">
          <Header
            logoUrl={logo}
            logoLink="/"
            logoAlt="D3ASIM"
          >
            <UserStatus />
          </Header>

          <Layout layout="configurationPage" className="content">
            <Hero
              titleText="Start your configuration"
              subtitleText="global settings and foo"
            />
            <Layout layout="configurationPage--1">
              <nav className="stepNavigation">
                <StepButton />
              </nav>
              <section className="settingsForm">
                <Diamond
                  className="settingsForm__diamond"
                  kind="large"
                  type="configuration"
                  iconUrl={IconConfiguration}
                />
                <Form className="settingsForm__form">
                  <Form.Element>
                    <TextInputField
                      label="Name of your Simulation:"
                      placeholder="My Simulation #1"
                      kind="medium"
                    />
                  </Form.Element>
                  <Form.Element>
                    <Label
                      label="Duration:"
                    />
                    <NumberPicker
                      kind="medium"
                      label="Days"
                    />
                  </Form.Element>
                  <Form.Element>
                    <Select
                      options={selectOptions}
                      onChange={action('onChange')}
                      className="myFancyClass"
                      label="Solar Profile:"
                      kind="medium"
                    />
                  </Form.Element>
                </Form>
              </section>
            </Layout>
          </Layout>
        </Layout>
      </ThemeProvider>
    )),
  )
  .add(
    'Configuration Page 2',
    withInfo(`
      Just the layout of the Configuration with a dummy configuration tree

      ~~~js
      <Layout layout="configurationPage--2">Children</Layout>
      ~~~

    `)(() => (
      <ThemeProvider theme="d3a">
        <Layout layout="wrapper">
          <Header
            logoUrl={logo}
            logoLink="/"
            logoAlt="D3ASIM"
          >
            <UserStatus />
          </Header>

          <Layout layout="configurationPage" className="content">
            <Hero
              titleText="Start your configuration"
              subtitleText="global settings and foo"
            />
            <Layout layout="configurationPage--2">
              <div className="stepNavigation">
                <StepButton />
              </div>
              <section className="configurationTree">
                <TreeView className="treeView--left">
                  <TreeView.Branch>
                    <TreeView.Leaf
                      className="entryPoint"
                      kind="large"
                      type="configuration"
                      iconUrl={IconConfiguration}
                      title="My Simulation 1"
                      editable={false}
                    />
                  </TreeView.Branch>
                  <TreeView.Branch className="treeView__branch--level1">
                    <TreeView.Leaf
                      className="entryPoint"
                      kind="medium"
                      type="plus"
                      title="Market #1"
                      editable={false}
                      popOutMenu
                      menuItems={entities}
                    />
                    <TreeView.Leaf
                      key="entity-0"
                      kind="medium"
                      type="house"
                      iconUrl={IconHouse}
                      numberPicker
                      title="My House"
                      onTitleChange={action('onChange')}
                      refHook={myRef}
                    >
                      <TreeView.Branch
                        className="treeView__branch--level3"
                      >
                        <TreeView.Leaf
                          className="entryPoint"
                          kind="small"
                          type="plus"
                          title="Add"
                          editable={false}
                          menuItems={devices}
                          popOutMenu
                          ref={myRef}
                        />
                        <TreeView.Leaf
                          key="device-0"
                          kind="small"
                          type="load"
                          iconUrl={IconLoad}
                          numberPicker
                          title="Load"
                          onTitleChange={action('onChange')}
                        />
                        <TreeView.Leaf
                          key="device-1"
                          kind="small"
                          type="light"
                          iconUrl={IconLight}
                          numberPicker
                          title="Lights"
                        />
                        <TreeView.Leaf
                          key="device-2"
                          kind="small"
                          type="battery"
                          title="Battery Storage"
                          iconUrl={IconBattery}
                          numberPicker
                        />
                        <TreeView.Leaf
                          key="device-3"
                          kind="small"
                          type="solar"
                          iconUrl={IconSolar}
                          numberPicker
                          title="solar"
                        />
                        <TreeView.Leaf
                          key="device-4"
                          kind="small"
                          type="tv"
                          iconUrl={IconTV}
                          numberPicker
                          title="TV Set"
                        />
                      </TreeView.Branch>
                    </TreeView.Leaf>
                    <TreeView.Leaf
                      key="entity-1"
                      kind="medium"
                      type="house"
                      title="house"
                      iconUrl={IconHouse}
                      numberPicker
                    />
                    <TreeView.Leaf
                      key="entity-2"
                      kind="medium"
                      type="celltower"
                      iconUrl={IconCelltower}
                      title="Cell Towers"
                      numberPicker
                    />
                    <TreeView.Leaf
                      key="entity-3"
                      kind="medium"
                      type="generator"
                      iconUrl={IconGenerator}
                      numberPicker
                      title="Generators"
                    />
                  </TreeView.Branch>
                </TreeView>
              </section>
              <section className="configurationPanel">
                <Card className="interactions">
                  <Button label="start" />
                  <Button label="save" />
                </Card>
              </section>
            </Layout>
          </Layout>
          <div className="footer">
            <a href="foo">About</a>
          </div>
        </Layout>
      </ThemeProvider>
    )),
  );
