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
import getRoleFromUserRoles from '../../services/levelMapper';
import level1Badge from './level1.png';
import level2Badge from './level2.png';
import level3Badge from './level3.png';
import level4Badge from './level4.png';
import level5Badge from './level5.png';
import level6Badge from './level6.png';

import { Header, Logo, MainContainer } from './Root.style';

const locales = {
    fr: flattenMessages(frMessages),
    en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

interface Props {
    children: ReactNode;
    userRoles: Array<string> | null
}

class Root extends Component<Props> {

    render() {
        let levelBadge = null;
        let welcomeText = "Welcome";

        switch (getRoleFromUserRoles(this.props.userRoles)) {
            case 'level_seven':
                levelBadge = <Logo src={level6Badge} alt="level7Badge" />;
                welcomeText = "It is too much honor my supreme leader";
                break;
            case 'level_six':
                levelBadge = <Logo src={level6Badge} alt="level6Badge" />;
                welcomeText = "Admiral ! It is an honor";
                break;
            case 'level_five':
                levelBadge = <Logo src={level5Badge} alt="level5Badge" />;
                welcomeText = "Greetings Sir Commander";
                break;
            case 'level_four':
                levelBadge = <Logo src={level4Badge} alt="level4Badge" />;
                welcomeText = "Greetings Corporal Drelosyn";
                break;
            case 'level_three':
                levelBadge = <Logo src={level3Badge} alt="level3Badge" />;
                welcomeText = "Welcome Squad Leader Td-73028";
                break;
            case 'level_two':
                levelBadge = <Logo src={level2Badge} alt="level2Badge" />;
                welcomeText = "Welcome Stormtrooper";
                break;
            case 'level_one':
                levelBadge = <Logo src={level1Badge} alt="level1Badge" />;
                welcomeText = "Welcome Clone n°42";
                break;
            default:
                break;
        }

       return <IntlProvider locale="fr" messages={locales.fr}>
            <MainContainer>
                <Header>
                    <Logo src={logo} alt="logo" />
                    <Typography variant="h4" color="inherit">
                      {welcomeText}
                    </Typography>
                    {levelBadge}
                    <LogoutButton />
                    <Logo src={deathstar} alt="deathstar" />
                </Header>
                {this.props.children}
            </MainContainer>
        </IntlProvider>
    }
}


export default Root;
