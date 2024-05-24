import styled from 'styled-components';
import { PaginationProps } from './Pagination.types';
import React, { useEffect } from 'react';
import {PlegarIcon} from '../Icons';
import { useTheme } from '../../store/use-theme';
import { IconContainer } from '../Icons';

const MainContainerStyled = styled.div`
  * {
    box-sizing: border-box;
  }
  display: inline-block;
`;

const ContainerPaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ istyle }: any) => istyle};
  ${({ theme }) => {
    return `
            font-family: ${theme.FontFamily};
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
        `;
  }}
`;

const NumPageStyled: any = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  min-width: 30px;
  height: 30px;
  border-radius: 16px;
  text-align: center;
  ${({ theme }) => {
    return `
            font-family: ${theme.FontFamily};
            color: ${theme.TextColor};
            font-size: ${theme.fontSize};
        `;
  }}

  ${({ isActive, theme }: any) =>
    isActive &&
    `
        background-color: ${theme.LeadingColor};
        color: white;
    `}
`;

const ButtonPagesContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const PrevButtonStyled = styled.button`
  transform: rotate(-90deg);
  background-color: transparent;
  border: none;
`;

const NextButtonStyled = styled.button`
  transform: rotate(90deg);
  background-color: transparent;
  border: none;
`;

const TresPutosStyled = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => {
  const [page, setPage] = React.useState<number>(1);

  useEffect(() => {
    if (currentPage === page || !currentPage) return;
    if (currentPage > totalPages) {
      setPage(totalPages);
      return;
    }
    setPage(currentPage);
  }, [currentPage]);

  const { theme } = useTheme();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    if (onChange) {
      onChange(page);
    }
    setPage(page);
  };

  return (
    <MainContainerStyled>
      <ContainerPaginationStyled theme={theme}>
        <PrevButtonStyled>
          <IconContainer size={"50px"}>
            <PlegarIcon onClick={() => handlePageChange(page - 1)} disabled={page === 1} size='27px' small={true}/>
          </IconContainer>
        </PrevButtonStyled>
        <ButtonPagesContainerStyled>
          {totalPages < 6 ? (
            Array.from(Array(totalPages).keys()).map((item, index) => {
              const numPage = index + 1;
              return (
                <NumPageStyled
                  theme={theme}
                  key={index}
                  onClick={() => handlePageChange(numPage)}
                  isActive={numPage === page}
                >
                  {numPage}
                </NumPageStyled>
              );
            })
          ) : page < 4 ? (
            <>
              {[1, 2, 3].map((item, index) => {
                return (
                  <NumPageStyled
                    theme={theme}
                    key={index}
                    onClick={() => handlePageChange(item)}
                    isActive={item === page}
                  >
                    {item}
                  </NumPageStyled>
                );
              })}
              <TresPutosStyled>{'...'}</TresPutosStyled>
              <NumPageStyled theme={theme} onClick={() => handlePageChange(totalPages)} isActive={5 === page}>
                {totalPages}
              </NumPageStyled>
            </>
          ) : totalPages - 2 > page ? (
            <>
              <NumPageStyled theme={theme} onClick={() => handlePageChange(1)} isActive={1 === page}>
                1
              </NumPageStyled>
              <TresPutosStyled>{'...'}</TresPutosStyled>
              <NumPageStyled theme={theme} onClick={() => handlePageChange(page)} isActive={page === page}>
                {page}
              </NumPageStyled>
              <TresPutosStyled>{'...'}</TresPutosStyled>
              <NumPageStyled theme={theme} onClick={() => handlePageChange(totalPages)} isActive={totalPages === page}>
                {totalPages}
              </NumPageStyled>
            </>
          ) : (
            <>
              <NumPageStyled theme={theme} onClick={() => handlePageChange(1)} isActive={1 === page}>
                1
              </NumPageStyled>
              <TresPutosStyled>{'...'}</TresPutosStyled>
              {[totalPages - 2, totalPages - 1, totalPages].map((item, index) => {
                return (
                  <NumPageStyled
                    theme={theme}
                    key={index}
                    onClick={() => handlePageChange(item)}
                    isActive={item === page}
                  >
                    {item}
                  </NumPageStyled>
                );
              })}
            </>
          )}
        </ButtonPagesContainerStyled>
        <NextButtonStyled>
          <IconContainer size={"50px"}>
            <PlegarIcon onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} size='27px' small={true}/>
          </IconContainer>
        </NextButtonStyled>
      </ContainerPaginationStyled>
    </MainContainerStyled>
  );
};

export default Pagination;
