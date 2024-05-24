import { TrProps } from '../../Table.types';
import React from 'react';
import styled from 'styled-components';

const StyledTr = styled.tr`
  border-bottom: 2px solid #f5f5f5;
  white-space: nowrap;
`;

const Tr = (props: TrProps) => {
  return <StyledTr {...props}>{props.children}</StyledTr>;
};

export default Tr;
