import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import {
  Header,
  Headline,
  Button,
  Wrapper,
  Footer,
  Icon, Icons,
  PageCard, PageCards, PageCardBox, PageCardItem,
  DonutChart, BarLineChart,
} from '../../lib';
import { ThemeDecorator } from '../Utils';

import { BarLineChartData } from './__mocks__/BarLineChartData';

storiesOf('VERBUND/Pages', module)
  .addDecorator(ThemeDecorator('verbund'))
  .add(
    '2. Dashboard',
    withInfo(`
      description or documentation about my component, supports markdown

      ~~~js
      <Wrapper layout>
        <Header logoUrl={Icons.verbundLogo} logoAlt="Verbund">
          <Headline type="verbund-subtitle">Mieter Strom Modell</Headline>
        </Header>
        <Button
          className="settings"
          label="EInstellungen"
          type="verbund-secondary"
          icon={Icons.settings}
          onClick={action('clicked')}
        />
        <Headline type="page-title">
          Übersicht Ihrer Aktivitäten in den letzten 30 Tagen
          <div className="info">01.01.2017 - 31.01.2017</div>
        </Headline>
        <PageCards>
          <PageCards>
            <PageCard>
              <Headline type="card-title">
                Verbrauch
                <div className="info">Anteil PV gegenüber Lieferanten</div>
              </Headline>
              <DonutChart data={[
                { name: 'Lieferant', value: 75 },
                { name: 'Photovoltaik', value: 25 },
              ]} />
            </PageCard>
            <PageCard>
              <Headline type="card-title">
                Ersparnis
                <div className="info">Ersparnis gegenüber Lieferanten</div>
              </Headline>
              <DonutChart data={[{
                name: 'Einsparung', value: 45
              }]} />
            </PageCard>
          </PageCards>
          <PageCard>
            <PageCardItem value={'1.900'}>
              <Headline type="card-title">
                IhrPV-Anteil<img src={Icons.infoCircle} />
                <div className="info">Ohne Handel verfügbare Menge an PV Energie</div>
              </Headline>
            </PageCardItem>
            <PageCardItem value={450}>
              <Headline type="card-title">
                Ihr Verbrauch<img src={Icons.infoCircle} />
                <div className="info">Ihr tatsächlicher PV-Energie Konsum</div>
              </Headline>
            </PageCardItem>
            <PageCardItem value={'1.200'}>
              <Headline type="card-title">
                Ihr Kontigent<img src={Icons.infoCircle} />
                <div className="info">Ihr aktuell verbleibendes Kontingent</div>
              </Headline>
            </PageCardItem>
            <div style={{ textAlign: 'center', paddingTop: 30, paddingBottom: 16 }}>
              <Button
                label="Strom anbieten"
                type="verbund-primary"
                onClick={action('clicked')}
              />
            </div>
          </PageCard>
        </PageCards>
        <PageCards>
          <PageCard>
            <Headline type="card-title">
              Wochen-Übersicht
              <div className="info">Maecenas faucibus mollis interdum.</div>
            </Headline>
            <BarLineChart data={BarLineChartData.hour} keys={{ line: 'preis' }} />
          </PageCard>
          <PageCard>
            <Headline type="card-title">
              Tages-Übersicht
              <div className="info">Maecenas faucibus mollis interdum.</div>
            </Headline>
            <BarLineChart data={BarLineChartData.date} />
          </PageCard>
        </PageCards>
        <Footer>
          <div>© VERBUND AG 2018</div>
        </Footer>
      </Wrapper>
      ~~~

    `)(() => (
        <Wrapper layout>
          <Header logoUrl={Icons.verbundLogo} logoAlt="Verbund">
            <Headline type="verbund-subtitle">Mieter Strom Modell</Headline>
          </Header>
          <Button
            className="settings"
            label="EInstellungen"
            type="verbund-secondary"
            icon={Icons.settings}
            onClick={action('clicked')}
          />
          <Headline type="page-title">
            Übersicht Ihrer Aktivitäten in den letzten 30 Tagen
            <div className="info">01.01.2017 - 31.01.2017</div>
          </Headline>
          <PageCards>
            <PageCards>
              <PageCard>
                <Headline type="card-title">
                  Verbrauch
                  <div className="info">Anteil PV gegenüber Lieferanten</div>
                </Headline>
                <DonutChart data={[
                  { name: 'Lieferant', value: 75 },
                  { name: 'Photovoltaik', value: 25 },
                ]} />
              </PageCard>
              <PageCard>
                <Headline type="card-title">
                  Ersparnis
                  <div className="info">Ersparnis gegenüber Lieferanten</div>
                </Headline>
                <DonutChart data={[{
                  name: 'Einsparung', value: 45
                }]} />
              </PageCard>
            </PageCards>
            <PageCard>
              <PageCardItem value={'1.900'}>
                <Headline type="card-title">
                  IhrPV-Anteil<img src={Icons.infoCircle} />
                  <div className="info">Ohne Handel verfügbare Menge an PV Energie</div>
                </Headline>
              </PageCardItem>
              <PageCardItem value={450}>
                <Headline type="card-title">
                  Ihr Verbrauch<img src={Icons.infoCircle} />
                  <div className="info">Ihr tatsächlicher PV-Energie Konsum</div>
                </Headline>
              </PageCardItem>
              <PageCardItem value={'1.200'}>
                <Headline type="card-title">
                  Ihr Kontigent<img src={Icons.infoCircle} />
                  <div className="info">Ihr aktuell verbleibendes Kontingent</div>
                </Headline>
              </PageCardItem>
              <div style={{ textAlign: 'center', paddingTop: 30, paddingBottom: 16 }}>
                <Button
                  label="Strom anbieten"
                  type="verbund-primary"
                  onClick={action('clicked')}
                />
              </div>
            </PageCard>
          </PageCards>
          <PageCards>
            <PageCard>
              <Headline type="card-title">
                Wochen-Übersicht
                <div className="info">Maecenas faucibus mollis interdum.</div>
              </Headline>
              <BarLineChart data={BarLineChartData.hour} keys={{ line: 'preis' }} />
            </PageCard>
            <PageCard>
              <Headline type="card-title">
                Tages-Übersicht
                <div className="info">Maecenas faucibus mollis interdum.</div>
              </Headline>
              <BarLineChart data={BarLineChartData.date} />
            </PageCard>
          </PageCards>
          <Footer>
            <div>© VERBUND AG 2018</div>
          </Footer>
        </Wrapper>
      )),
);
