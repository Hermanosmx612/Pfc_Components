import React from 'react';
import { TheadProps } from '../../Table.types';
import styled from 'styled-components';

const StyledThead = styled.thead`
  z-index: 1;
  background-color: white;
  width: 100%;
`;

const Thead = (props: TheadProps) => {
  return <StyledThead>{props.children}</StyledThead>;
};

export default Thead;
