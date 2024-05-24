import React from 'react';
import { TableProps } from '../../Table.types';
import styled from 'styled-components';
import { useTheme } from '../../../../store/use-theme';

const StyledTable: any = styled.table`
  width: 100%;
  overflow-y: auto;
  border-collapse: separate;
  border-spacing: 0;
  max-height: 100%;
  padding: 0;
  margin: 0;

  thead {
    ${({ sty }: any) => {
      if (sty) {
        return `
          position: sticky;
          top: 0;
          position: -webkit-sticky;
          z-index: 6;
        `;
      }
      return ``;
    }}
  }
`;

const TableContainer = styled.div`
  * {
    box-sizing: border-box;
  }

  max-width: 100%;
`;

const Table = ({ stickyHead = true, children }: TableProps) => {
  const theme = useTheme();
  return (
    <TableContainer theme={theme}>
      <StyledTable sty={stickyHead}>{children}</StyledTable>
    </TableContainer>
  );
};

export default Table;
