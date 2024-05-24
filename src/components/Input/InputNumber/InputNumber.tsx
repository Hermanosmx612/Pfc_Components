import styled from 'styled-components';
import { InputNumberProps } from '../Input.types';
import React from 'react';
import { useTheme } from '../../../store/use-theme';

const InputContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  display: inline-block;
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

const InputStyled: any = styled.input`
  padding: 0 0.5rem;
  height: 30px;
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
  border-radius: 7px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ${({ istyle }: any) => istyle};
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

const InputNumber = (props: InputNumberProps) => {
  const { theme } = useTheme();
  const [value, setValue] = React.useState(props.value || '');
  React.useEffect(() => {
    props.value && setValue(props.value);
  }, [props.value]);
  const handleChange = (e: any) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };
  return (
    <InputContainer theme={theme}>
      {props.label && (
        <LabelStyled {...props} theme={theme}>
          {props.label}
        </LabelStyled>
      )}
      <InputStyled theme={theme} {...props} onChange={handleChange} value={value} type="number" />
      {props.error && (
        <div>
          <SpanStyled>{props.textError}</SpanStyled>
        </div>
      )}
    </InputContainer>
  );
};

export default InputNumber;
