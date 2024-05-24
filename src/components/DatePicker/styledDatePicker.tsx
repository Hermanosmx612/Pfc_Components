import styled from 'styled-components';

export const InputContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  display: inline-block;
`;

export const InputStyled: any = styled.div`
  border: none !important;
  border-radius: ${({ isOpen }: any) => (isOpen ? `7px 7px 0 0` : '7px')} !important;

  border-bottom: ${({ isOpen }: any) => (isOpen ? `1px solid rgba(0, 0, 0, 0)` : '1px solid transparent')} !important;

  ${({ theme }) => {
    return `
            font-size: ${theme.fontSize} !important;
            color: ${theme.TextColor} !important;
        `;
  }}

  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  cursor: ${({ disabled }: any) => (disabled ? 'not-allowed' : 'pointer')} !important;
  margin: 0 0.5rem;

  span {
    user-select: none !important;
    color: rgba(0, 0, 0, 0.4) !important;
  }
`;

export const LabelStyled: any = styled.label`
  color: ${({ disabled, theme }: any) => (disabled ? '#a0a0a0' : theme.TextColor)};

  ${({ required }: any) =>
    required &&
    `
        &:after {
            content: "*";
            color: red;
    `}
`;

export const ContianerInputDate: any = styled.div`
  height: 30px;
  position: relative !important;
  ${({ theme }) => {
    return `
            background-color: ${theme.BackgroundField} !important;
        `;
  }}
  border-radius: ${({ isOpen }: any) => (isOpen ? `7px 7px 0 0` : '7px')} !important;

  ${({ istyle }: any) => istyle};
`;

export const OverflowText: any = styled.div`
  ${({ theme }) => {
    return `
            color: ${theme.TextColor} !important;
            font-size: ${theme.fontSize} !important;
        `;
  }}

  font-weight: 400 !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  // width: 100% !important;
`;

export const ContainerCalendar = styled.table`
  border-collapse: collapse !important;
  width: 100% !important;
  ${({ theme }) => {
    return `
            color: ${theme.TextColor} !important;
        `;
  }}

  margin: 0 0.5rem 0.5rem 0.5rem !important;

  span {
    margin: 0 !important;
    padding: 0 !important;
  }
`;

export const TrStyled = styled.tr`
  width: auto !important;
  height: auto !important;
`;

export const Separaciones = styled.div``;

export const THeadStyled = styled.thead``;

export const TBodyStyled = styled.tbody``;

export const ThStyled = styled.th`
  padding: 5px !important;
  text-align: center !important;

  width: auto !important;
  height: auto !important;
`;

export const MainContainerCalendar: any = styled.div`
  * {
    box-sizing: border-box;
  }

  ${({ isOpen }: any) => (!isOpen ? `display: none;` : 'display: block;')} !important;

  position: absolute !important;
  width: 280px;

  // top: 100% !important;
  // left: 0 !important;
  // right: 0 !important;
  z-index: 100 !important;

  // width: 100% !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  ${({ theme }) => {
    return `
            background-color: ${theme.BackgroundField} !important;
        `;
  }}
  user-select: none !important;
  border-radius: ${({ isOpen }: any) => (isOpen ? `0 0 7px 7px` : '7px')} !important;
`;

export const TdSytled: any = styled.td`
    text-align: center !important;
    width: 35px !important;
    padding: 2px 5px !important;

    span {

        ${({ theme, isSelected }: any) => {
          return `
                background-color: ${isSelected ? theme.LeadingColor : theme.BackgroundField} !important;
                color: ${isSelected ? theme.TextButtons : theme.TextColor} !important;

                &:hover {
                    background-color: ${theme.LeadingColor} !important;
                    color: ${theme.TextButtons} !important;
                }
            `;
        }}

        

        width: 25px !important;
        height: 25px !important;

        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 50% !important;

    }


}`;

export const DisabledTd = styled.td`
  color: rgba(0, 0, 0, 0.4) !important;
  text-align: center !important;
  // width: 25px !important;
  // height: 25px !important;
  padding: 5px !important;

  span {
    ${({ isSelected, theme }: any) =>
      isSelected && `background-color: ${theme.LeadingColor} !important; color: white !important;`}

    width: 25px !important;
    height: 25px !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50% !important;
  }
`;

export const ContainerFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  // align-items: center;
  margin-top: 0.5rem;
`;

export const ContainerMonthChange = styled.div`
  display: flex;
  align-items: center;
  justify-content: scpace-between;
`;

export const InputDateStyled = styled.input`
  padding: 0.5rem !important;
  border: none !important;
  border-radius: 7px !important;
  ${({ theme }: any) => {
    return `
            background-color: ${theme.BackgroundField} !important;
            color: ${theme.TextColor} !important;
            font-size: ${theme.fontSize} !important;
            
            &:focus {
                outline: 1px solid ${theme.LeadingColor} !important;
            }
        `;
  }}
  height: 1rem !important;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }
`;

export const SpanStyled = styled.span`
  cursor: pointer;
`;

export const ContainerIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px;
  gap: 7px;
  width: 100%;
`;
