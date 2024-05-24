import React, { useState } from 'react';
import { PadlockProps } from './Padlock.types';
import styled from 'styled-components';
import { DesbloquearIcon, BloquearIcon } from '../Icons';


import { useTheme } from '../../store/use-theme';
import { IconContainer } from '../Icons';

const ContainerPadlock: any = styled.div`
  * {
    box-sizing: border-box;
  }

  ${({ theme }) => {
    return `
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
        `;
  }}

  border-radius: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  width: fit-content;

  ${({ istyle }: any) => istyle};
`;

const LabelStyled: any = styled.label`
  color: ${({ disabled, theme }: any) => (disabled ? '#a0a0a0' : theme.TextColor)};
`;

const Padlock = (props: PadlockProps) => {
  const { theme } = useTheme();
  const [isLockedState, setIsLockedState] = useState(props.isLocked || false);

  const handleClick = () => {
    setIsLockedState(!isLockedState);

    if (props.onClick) props.onClick(!isLockedState);
  };

  return (
    <ContainerPadlock istyle={props?.istyle} theme={theme}>
      {props.label && (
        <LabelStyled disabled={props?.disabled} theme={theme} >
          {props.label}
        </LabelStyled>
      )}
      {isLockedState ? (
          <DesbloquearIcon onClick={handleClick} small={false} size='35px'/>
      ) : (
          <BloquearIcon onClick={handleClick} size='35px'/>
      )}
    </ContainerPadlock>
  );
};

export default Padlock;
