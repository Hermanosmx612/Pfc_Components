import { TableFootProps } from '../../Table.types';
import React from 'react';
import styled from 'styled-components';

const StyledTfoot = styled.tfoot`
  box-sizing: border-box;
`;
const Tfoot = (props: TableFootProps) => {
  return <StyledTfoot>{props.children}</StyledTfoot>;
};

export default Tfoot;
