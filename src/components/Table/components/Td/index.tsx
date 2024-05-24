import React from 'react';
import styled from 'styled-components';
import { TdProps } from '../../Table.types';

const StyledTd = styled.td`
  border-bottom: 2px solid #f5f5f5;
  padding: 10px 15px;
  // Si esta la popiedad maxWidth
  ${(props: any) => {
    if (props?.maxWidth) {
      let [sizeNumber, sizeUnit] = props?.maxWidth.match(/\d+|\D+/g) || [];
      return `
        max-width: ${sizeUnit ? `${sizeNumber}${sizeUnit}` : `${props.maxWidth}px`};
      `;
    }
  }}

  // Si esta la popiedad minWidth
  ${(props: any) => {
    if (props?.minWidth) {
      let [sizeNumber, sizeUnit] = props?.minWidth.match(/\d+|\D+/g) || [];
      return `
        min-width: ${sizeUnit ? `${sizeNumber}${sizeUnit}` : `${props.maxWidth}px`};
      `;
    }
  }}
`;
const StyledSpan = styled.span``;

const Td = (props: TdProps) => {
  return (
    <StyledTd {...props}>
      <StyledSpan>{props.children}</StyledSpan>
    </StyledTd>
  );
};

export default Td;
