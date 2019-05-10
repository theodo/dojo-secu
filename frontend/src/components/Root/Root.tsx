import Typography from '@material-ui/core/Typography';
import React, { ReactNode } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import LogoutButton from 'components/LogoutButton';
import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import logo from './pudding.png';

import { Header, Logo, MainContainer } from './Root.style';

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

interface Props {
  children: ReactNode;
}

const Root: React.FunctionComponent<Props> = ({ children }) => (
  <IntlProvider locale="fr" messages={locales.fr}>
    <MainContainer>
      <Header>
        <Typography variant="h2" color="primary">
          Welcome
        </Typography>
        <LogoutButton />
      </Header>
      {children}
    </MainContainer>
  </IntlProvider>
);

export default Root;
