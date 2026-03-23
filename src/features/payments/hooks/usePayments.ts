import { useQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api";
import { PaymentSearchResponse } from "../../../types/payment";

const PAGE_SIZE = 5;

interface UsePaymentsParams {
  page?: number;
  search?: string;
  currency?: string;
}

export function usePayments({ page = 1, search, currency }: UsePaymentsParams = {}) {
  return useQuery<PaymentSearchResponse, Error>({
    queryKey: ["payments", search, currency, page],
    queryFn: () => fetchPayments({ page, pageSize: PAGE_SIZE, search, currency }),
  });
}
