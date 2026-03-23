import { useState } from "react";
import axios from "axios";
import { I18N } from "../../../constants/i18n";
import { formatDate, formatAmount } from "../../../utils";
import {
  Container,
  Title,
  SearchInput,
  SearchButton,
  ClearButton,
  Select,
  StatusBadge,
  Spinner,
  ErrorBox,
  TableHeader,
  TableCell,
} from "../../../components/atoms";
import {
  FlexRow,
  TableRow,
  TableHeaderRow,
} from "../../../components/molecules";
import {
  TableWrapper,
  Table,
  TableHeaderWrapper,
  TableBodyWrapper,
} from "../../../components/organisms";
import { usePayments } from "../hooks";
import { Payment } from "../../../types/payment";
import { CURRENCIES } from "../../../constants";

export const PaymentsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("");

  const { data, isLoading, error } = usePayments({ search, currency });
  const payments = data?.payments ?? [];

  const errorMessage = (() => {
    if (!error) return null;
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) return I18N.PAYMENT_NOT_FOUND;
      if (status === 500) return I18N.INTERNAL_SERVER_ERROR;
    }
    return I18N.SOMETHING_WENT_WRONG;
  })();

  const hasActiveFilters = search !== "" || currency !== "";

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    setSearch("");
    setCurrency("");
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <FlexRow>
        <SearchInput
          type="search"
          aria-label={I18N.SEARCH_LABEL}
          placeholder={I18N.SEARCH_PLACEHOLDER}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Select
          aria-label={I18N.CURRENCY_FILTER_LABEL}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="">{I18N.CURRENCIES_OPTION}</option>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <SearchButton onClick={handleSearch}>{I18N.SEARCH_BUTTON}</SearchButton>
        {hasActiveFilters && (
          <ClearButton onClick={handleClear}>{I18N.CLEAR_FILTERS}</ClearButton>
        )}
      </FlexRow>

      {isLoading && <Spinner />}

      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

      {!isLoading && !errorMessage && payments.length > 0 && (
        <TableWrapper>
          <Table>
            <TableHeaderWrapper>
              <TableHeaderRow>
                <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
              </TableHeaderRow>
            </TableHeaderWrapper>
            <TableBodyWrapper>
              {payments.map((payment: Payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>{formatAmount(payment.amount)}</TableCell>
                  <TableCell>
                    {payment.customerName || I18N.EMPTY_CUSTOMER}
                  </TableCell>
                  <TableCell>
                    {payment.currency || I18N.EMPTY_CURRENCY}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status}>
                      {payment.status}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBodyWrapper>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};
