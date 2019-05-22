import Typography from '@material-ui/core/Typography';
import React, { Component, ReactNode } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import LogoutButton from 'components/LogoutButton';
import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import logo from './empire-logo.svg';
import deathstar from './deathstar.png';

import { Header, Logo, MainContainer } from './Root.style';

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

interface Props {
  children: ReactNode;
}

class Root extends Component<Props> {

    render () {
       return <IntlProvider locale="fr" messages={locales.fr}>
            <MainContainer>
                <Header>
                    <Logo src={logo} alt="logo" />
                    <Typography variant="h2" color="inherit">
                        Welcome
                    </Typography>
                    <LogoutButton />
                    <Logo src={deathstar} alt="deathstar" />
                </Header>
                {this.props.children}
            </MainContainer>
        </IntlProvider>
    }
}


export default Root;
