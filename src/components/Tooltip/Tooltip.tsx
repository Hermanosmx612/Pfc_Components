import React from 'react';
import { TooltipProps } from './Tooltip.types';
import styled from 'styled-components';

const TooltipText: any = styled.span`
  * {
    box-sizing: border-box;
  }

  visibility: hidden;
  width: max-content;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 7px;
  position: absolute;
  z-index: 1000;
  font-size: 12px;

  ${(props: TooltipProps) => {
    switch (props.position) {
      case 'top':
        return `
                    bottom: 125%;
                    left: 50%;
                    transform: translateX(-50%);
                `;
      case 'bottom':
        return `
                    top: 125%;
                    left: 50%;
                    transform: translateX(-50%);
                `;
      case 'left':
        return `
                    top: 50%;
                    transform: translateY(-50%);
                    right: 100%;
                `;
      case 'right':
        return `
                    top: 50%;
                    transform: translateY(-50%);
                    left: 125%;
                `;
    }
  }}
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${TooltipText} {
    visibility: visible;
  }
`;

const Tooltip = (props: TooltipProps) => {
  return (
    <TooltipContainer>
      {props.children}
      <TooltipText {...props}>{props.title}</TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
