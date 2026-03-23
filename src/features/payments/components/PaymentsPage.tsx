import { I18N } from "../../../constants/i18n";
import { formatDate, formatAmount } from "../../../utils";
import {
  Container,
  Title,
  StatusBadge,
  Spinner,
  TableHeader,
  TableCell,
} from "../../../components/atoms";
import { TableRow, TableHeaderRow } from "../../../components/molecules";
import {
  TableWrapper,
  Table,
  TableHeaderWrapper,
  TableBodyWrapper,
} from "../../../components/organisms";
import { usePayments } from "../hooks";
import { Payment } from "../../../types/payment";

export const PaymentsPage = () => {
  const { data, isLoading } = usePayments();
  const payments = data?.payments ?? [];

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      {isLoading && <Spinner />}

      {!isLoading && payments.length > 0 && (
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
