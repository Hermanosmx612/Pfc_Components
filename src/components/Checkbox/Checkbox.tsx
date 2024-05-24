import React from 'react';
import { CheckboxProps } from './Checkbox.types';
import styled from 'styled-components';
import { useTheme } from '../../store/use-theme';

const CheckBoxContainer: any = styled.div`
  * {
    box-sizing: border-box;
  }
`;

const Text = styled.label`
  display: inline-block;
  vertical-align: middle;
`;

const CheckBoxInput: any = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  margin: 0;
  width: 0;
  height: 20px;
  width: 20px;
`;

const CheckBoxSpan: any = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border: 2px solid ${({ disabled, theme }: any) => (disabled ? `${theme.IconOff}` : `${theme.IconOn}`)};
  border-radius: 5px;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

const CheckBoxLabel: any = styled.label`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  height: 20px;
  width: 20px;
  ${({ disabled }: any) => (disabled ? `cursor: not-allowed;` : `cursor: pointer;`)}
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input:checked ~ ${CheckBoxSpan} {
    background-color: transparent;
  }

  input:checked ~ ${CheckBoxSpan}:after {
    display: block;
  }

  ${CheckBoxSpan}:after {
    left: 5px;
    top: 1px;
    width: 4px;
    height: 10px;
    border: solid ${({ disabled, theme }: any) => (disabled ? `${theme.IconOff}` : `${theme.IconOn}`)};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Checkbox = ({ rightLabel = false,...props }: CheckboxProps) => {
  const { theme } = useTheme();
  return (
    <CheckBoxContainer>
      {props.label && !rightLabel ? <Text style={{ marginRight: '10px' }}>{props.label}</Text> : ' '}
      <CheckBoxLabel disabled={props.disabled} theme={theme}>
        <CheckBoxInput {...props} />
        <CheckBoxSpan theme={theme} className={props.className} disabled={props.disabled}></CheckBoxSpan>
      </CheckBoxLabel>
      {props.label && rightLabel ? <Text style={{ marginLeft: '10px' }}>{props.label}</Text> : ' '}
    </CheckBoxContainer>
  );
};

export default Checkbox;
