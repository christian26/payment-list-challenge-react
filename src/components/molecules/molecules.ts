import styled from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const PaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #374151;
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const TableHeaderRow = styled.tr`
  border-bottom: 2px solid #e5e7eb;
`;
