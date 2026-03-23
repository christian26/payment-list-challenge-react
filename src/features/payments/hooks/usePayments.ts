import { useQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api";
import { PaymentSearchResponse } from "../../../types/payment";

const PAGE_SIZE = 5;

export function usePayments(page: number = 1) {
  return useQuery<PaymentSearchResponse, Error>({
    queryKey: ["payments", page],
    queryFn: () => fetchPayments({ page, pageSize: PAGE_SIZE }),
  });
}
