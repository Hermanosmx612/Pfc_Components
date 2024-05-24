import styled from 'styled-components';
import { DataGridProps } from './DataGrid.types';

export const ContainerCheckButton = styled.div`
  position: sticky;
  right: 0;
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 5px;
  border-top: 2px solid #f5f5f5;
  box-shadow: 0px -25px 20px -20px rgba(0, 0, 0, 0.45);
  z-index: 99;
  background-color: white;
`;

export const DataGridContainer: any = styled.div`
  * {
    box-sizing: border-box;
  }

  ${({ theme }) => {
    return `
        font-size: ${theme.fontSize};
        font-family: ${theme.FontFamily};
        color: ${theme.TextColor};
    `;
  }}

  display: grid;
  grid-template-rows: 1fr 60px;
  height: 100%;
  background-color: white;
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  ${(props: DataGridProps) => {
    if (props.position === 'flex-start') return `justify-content: flex-start;`;
    else if (props.position === 'flex-end') return `justify-content: flex-end;`;
  }}
  overflow: auto;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
`;

export const ContainerRegisterData = styled.div`
  white-space: nowrap;
`;

export const ContainerIconsSort = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 20px);
  margin-bottom: 10px;
`;

export const ContainerThHeader = styled.div`
  display: grid;
  //grid-template-rows: repeat(2,1fr);
`;

export const ContainerLabelTh = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 5px;
  height: 50px;
`;

export const StickyTd = styled.td`
  position: sticky;
  z-index: 4;
  right: 0;
  background-color: #fff;
`;

export const ContainerGlobalIcons = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: space-beetwen;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const ContainerWhiteHeader = styled.th`
  position: sticky;
  background-color: #fff;
  right: 0;
  z-index: 4;
`;

export const ButtonsFooterContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 40px;
  align-items: center;
`;

export const ContainerDatePicker = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
