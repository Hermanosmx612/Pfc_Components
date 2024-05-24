import React from 'react';
import styled from 'styled-components';
import { InputTextProps } from '../Input.types';
import { useTheme } from '../../../store/use-theme';
import { useDebouncedCallback } from 'use-debounce';

const InputContainer: any = styled.div`
  display: inline-block;
  * {
    box-sizing: border-box;
  }

  ${({ theme }) => {
    return `
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
        `;
  }}
  label {
    font-weight: 500;
    display: block;
  }
`;

const InputStyled = styled.input`
  padding: 0 0.5rem;
  height: 30px;
  border: none;
  border-radius: 7px;
  ${({ theme, error }: any) => {
    return `
            background-color: ${theme.BackgroundField};
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
            border: 1px solid ${error ? 'red' : 'transparent'};

            &:focus {
                border: 1px solid transparent;
                outline: 1px solid ${theme.LeadingColor};
            }
        `;
  }}

  ${({ istyle }: any) => istyle}
`;

const LabelStyled: any = styled.label`
  color: ${({ disabled, theme }: any) => (disabled ? '#a0a0a0' : theme.TextColor)};

  ${({ required }: any) =>
    required &&
    `
        &:after {
            content: "*";
            color: red;
    `}
`;

const SpanStyled: any = styled.span`
  color: red;
`;

const InputText = (props: InputTextProps) => {
  const { theme } = useTheme();
  const [value, setValue] = React.useState(props.value || '');
  React.useEffect(() => {
    props.value && setValue(props.value);
  }, [props.value]);
  const debounceTime = props.debounceTime || 500;
  const handleChangeUseDebouncedCallback = useDebouncedCallback((e: any) => {
    props.onChange && props.onChange(e);
  }, debounceTime);

  const handleChange = (e: any) => {
    if (!props.debouncedCallback) {
      setValue(e.target.value);
      props.onChange && props.onChange(e);
    } else {
      setValue(e.target.value);
      handleChangeUseDebouncedCallback(e);
    }
  };

  return (
    <InputContainer theme={theme}>
      {props.label && (
        <LabelStyled theme={theme} {...props}>
          {props.label}
        </LabelStyled>
      )}
      <InputStyled type="text" {...props} theme={theme} onChange={handleChange} value={value} />
      {props.error && (
        <div>
          <SpanStyled>{props.textError}</SpanStyled>
        </div>
      )}
    </InputContainer>
  );
};

export default InputText;
