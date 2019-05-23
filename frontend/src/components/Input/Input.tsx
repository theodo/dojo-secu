import { TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import styled from "styled-components";

interface Props {
  label?: string | null;
  error?: string | null;
  type: string;
  disabled?: boolean;
  field: {
    name?: string;
    onBlur?: () => any;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
}

export default styled(props => {
const { error, field, ...otherProps } = props;

return (
    <TextField
        variant="outlined"
        margin="normal"
        error={!!error}
        helperText={error || null}
        InputProps={{
            classes: {
                notchedOutline: 'outlineStyle',
                input: 'inputStyle'
            }
        }}
        InputLabelProps={{
            classes: {
                root: 'labelStyle',
                focused: 'labelStyle'
            }
        }}
        {...field}
        {...otherProps}
    />
)})`
  background-color: #222;
  && .labelStyle {
    color: white;
  }
  &&&&&& .outlineStyle {
    border-color: white;
  }

  & .inputStyle {
    color: white;
  }
`;
