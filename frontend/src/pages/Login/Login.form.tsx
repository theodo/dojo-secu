import Button from '@material-ui/core/Button';
import {
  Field,
  Form,
  InjectedFormikProps,
} from 'formik';
import React, { Fragment } from 'react';
import { Redirect } from 'react-router';

import Input from 'components/Input';

import { FormValues } from './service';

import { LoginContainer, FieldContainer } from './Login.form.style'

interface InnerLoginFormProps {
  errors: {
    email?: string;
    password?: string;
  };
  isSubmitting: boolean;
  touched: {
    email?: boolean;
    password?: boolean;
  };
  login: (values: FormValues) => void;
  token?: string;
}

const InnerLoginForm: React.FunctionComponent<InjectedFormikProps<InnerLoginFormProps, FormValues>> = props => {
  const { errors, touched, isSubmitting, token } = props;

  return (
    <LoginContainer>
      {token && <Redirect to='/profile' />}
      <Form>
        <FieldContainer>
          <Field
            type="text"
            name="email"
            label="Email"
            component={Input}
            error={touched.email && errors.email}
          />
        </FieldContainer>
        <FieldContainer>
          <Field
            type="password"
            name="password"
            label="Password"
            component={Input}
            error={touched.password && errors.password}
          />
        </FieldContainer>
        <Button
          type="submit"
          color="primary"
          size="medium"
          disabled={isSubmitting}
          variant="outlined"
        >
          Connect
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default InnerLoginForm;
