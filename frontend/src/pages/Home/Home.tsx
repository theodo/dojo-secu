import * as React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

import { Link } from './Home.style';

const Home: React.FunctionComponent = () => (
  <React.Fragment>
    <Typography variant="subtitle1" gutterBottom>
      <FormattedMessage id="home.get-started" defaultMessage="To get started, edit" />
    </Typography>
    <Typography variant="caption">
      <code>src/App.js</code>
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      <FormattedMessage id="home.save-to-reload" />
    </Typography>
    <Typography variant="body1">
      <FormattedMessage id="home.create-route" />
    </Typography>
    <Typography variant="body1">
      <FormattedMessage id="home.generate-component" />
    </Typography>
    <Typography variant="caption">
      <code>yarn generate</code>
    </Typography>
    <Typography variant="body1">
      <FormattedMessage id="home.generate-module" />
    </Typography>
    <Typography variant="body1">
      <FormattedMessage id="home.readme" />
    </Typography>
    <Link to="/avatar" href="/avatar">
      <Button variant="contained" color="primary">
        <FormattedMessage id="home.use-a-link" />
      </Button>
    </Link>
  </React.Fragment>
);

export default Home;
