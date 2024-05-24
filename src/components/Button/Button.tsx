import React, { useEffect } from 'react';
import { ButtonProps } from './Button.types';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../store/use-theme';
import { CargandoIcon } from '../Icons';

const getVariantStyles = ({ variant = 'default', theme }: any) => {
  switch (variant) {
    case 'reject':
      return css`
        background-color: ${theme.RejectBackgroundButton};
      `;
    case 'confirm':
    default:
      return css`
        background-color: ${theme.LeadingColor};
      `;
  }
};

const StyledButton: any = styled.button`
  border: none;
  padding: 0 10px;
  ${({ theme }) => {
    return `
            font-size: ${theme.fontSize};
            font-family: ${theme.FontFamily};
            color: ${theme.TextButtons};
        `;
  }}
  height: 38px;
  border-radius: 7px;
  // cursor: pointer;
  overflow: hidden;
  position: relative;

  ${(props: ButtonProps) => getVariantStyles(props)}

  &:disabled {
    // cursor: not-allowed;
    background-color: #bcbcbc;
    color: #3d4d55;
  }

  ${({ istyle }: any) => {
    if (istyle) {
      return css`
        ${{ ...istyle }}
      `;
    }
  }}
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const ContainerButton = styled.div`
  * {
    box-sizing: border-box;
  }
  position: relative;
  display: inline-block;
`;

const WaitingStyled: any = styled.div`
  position: absolute;
  ${(props: any) => {
    const { theme } = props;
    return `
            background-color: ${theme.BackgroundField};
        `;
  }}

  border-radius: 50%;
  width: 26px;
  height: 26px;
  top: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 2s linear infinite;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

const ripple = keyframes`
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(10);
        opacity: 0.375;
    }
    100% {
        transform: scale(35);
        opacity: 0;
    }
`;

const StyledRipple = styled.span`
  width: 20px;
  height: 20px;
  position: absolute;
  background: #ffffff94;
  display: block;
  content: '';
  border-radius: 9999px;
  opacity: 1;
  animation: 0.9s ease 1 forwards ${ripple};
`;

const StyledSpan = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  // color: white;
`;

const Button = (props: ButtonProps) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  const { theme } = useTheme();

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    props.onClick && props.onClick(e);
  };

  return (
    <ContainerButton>
      <StyledButton {...props} onClick={handleClick} theme={theme}>
        {isRippling ? (
          <StyledRipple
            className="ripple"
            style={{
              left: coords.x,
              top: coords.y,
            }}
          />
        ) : (
          ''
        )}
        <StyledSpan>
          {props.label && props.label} {props.children && props.children}
        </StyledSpan>
      </StyledButton>
      {props.isWaiting && (
        <WaitingStyled theme={theme}>
          <CargandoIcon size="17px" />
        </WaitingStyled>
      )}
    </ContainerButton>
  );
};

export default Button;
