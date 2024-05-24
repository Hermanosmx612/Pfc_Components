import styled from 'styled-components';

export const ContainerCustomSelect: any = styled.div`
  * {
    box-sizing: border-box;
  }
  display: inline-block;
  text-align: left;
`;

export const CustomLabel = styled.label`
  ${({ theme }: any) => {
    return `
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
        `;
  }}
  font-weight: 500;
`;

export const CustomSelect: any = styled.div`
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: ${({ isOpen }: any) => (isOpen ? `7px 7px 0 0` : '7px')};

  ${({ theme }: any) => {
    return `
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
            border: 1px solid ${theme.BackgroundField};
            background-color: ${theme.BackgroundField};
        `;
  }}

  ${({ isOpen }: any) => (isOpen ? `box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);` : '')}
    ${({ istyle }: any) => istyle};
`;

export const CustomPlaceholder: any = styled.div`
  // margin-right: 10px;
  color: ${({ isSelected, disabled, theme }: any) =>
    !isSelected && !disabled ? `${theme.TextColor};` : 'rgba(0, 0, 0, 0.4)'};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export const SelectSelected: any = styled.div`
  // margin: 7px;
  padding: 0 5px 0 10px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid transparent;
  border-color: transparent transparent ${({ isOpen }: any) => (isOpen ? `rgba(0, 0, 0, 0.1)` : 'transparent')}
    transparent;
  cursor: pointer;
  // user-select: none;
`;

export const CustomSelectArrow: any = styled.div``;

export const SelectItemsContainer: any = styled.div`
  ${({ isOpen }: any) => (!isOpen ? `display: none;` : '')};
  ${({ isOpen }: any) => (isOpen ? `box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);` : '')}

  ${({ theme }: any) => {
    return `
            background-color: ${theme.BackgroundField};
        `;
  }}

    ${({ referencia }: any) =>
    referencia.current && referencia.current.offsetWidth ? `width: ${referencia.current.offsetWidth}px;` : ''}

    position: absolute;
  z-index: 9999;
  max-height: 310px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 8px;
  }
`;

export const SelectItem: any = styled.div`
  ${({ theme, isSelected }: any) => {
    return `
            background-color: ${isSelected ? theme.LeadingColor : 'transparent'};
            color: ${isSelected ? theme.TextButtons : theme.TextColor};

            &:hover {
                background-color: ${theme.LeadingColor};
                color: white;
            }
        `;
  }}

  padding: 4px 16px;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  border-radius: 6px;
  margin: 7px;
  min-height: 25px;
  display: flex;
  align-items: center;

  ${({ isWhithSection }: any) => (isWhithSection ? `padding-left: 35px;` : '')}
`;

export const SelectSection: any = styled.div`
  margin: 7px;
  padding: 4px 16px;
  font-weight: 700;

  ${({ theme }: any) => {
    return `
            border-bottom: 1px solid ${theme.LeadingColor};
            color: ${theme.LeadingColor};
        `;
  }}
`;

export const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

interface CSProps {
  coords: DOMRect | null;
  altura: number;
}

export const ContainetSelectors: any = styled.div`
  ${({ coords, altura }: CSProps) => {
    if (!coords) return 'display: none;';

    const height = altura < 310 ? altura : 310;

    const globalHeight = window.innerHeight;
    const globalWidth = window.innerWidth;
    const { left, width, bottom } = coords;
    const calculatedTop = () => {
      if (!(globalHeight - bottom > height)) return globalHeight - height - 15;
      return bottom;
    };
    const calculatedLeft = () => {
      if (!(globalWidth - left > width)) return globalWidth - width - 15;
      if (left < 10) return 10;
      return left;
    };

    const topValue = calculatedTop();
    const leftValue = calculatedLeft();

    return `
            top: ${topValue}px;
            left: ${leftValue}px;
        `;
  }}
  position: relative;
`;
