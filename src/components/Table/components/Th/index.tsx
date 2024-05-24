import { ThProps } from '../../Table.types';
import React from 'react';
import styled from 'styled-components';

const StyledSpan: any = styled.span``;

const StyledTh: any = styled.th`
  padding: 10px 15px;
  border-bottom: 2px solid #f5f5f5;

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

const Th = (props: ThProps) => {
  return (
    <StyledTh {...props} maxWidth={props.maxWidth || 0} minWidth={props.minWidth || 0}>
      <StyledSpan>{props.children}</StyledSpan>
    </StyledTh>
  );
};

export default Th;
