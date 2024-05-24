import React from 'react';
import { TableBodyProps } from '../../Table.types';
import styled from 'styled-components';

const StyledTbody = styled.tbody`
  // background-color: white;
`;

const Tbody = (props: TableBodyProps) => {
  return <StyledTbody>{props.children}</StyledTbody>;
};

export default Tbody;
