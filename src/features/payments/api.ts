import axios from "axios";
import { API_URL } from "../../constants";
import { PaymentSearchResponse } from "../../types/payment";

export interface FetchPaymentsParams {
  page: number;
  pageSize: number;
  search?: string;
  currency?: string;
}

export async function fetchPayments({
  page,
  pageSize,
  search,
  currency,
}: FetchPaymentsParams): Promise<PaymentSearchResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    params.set("search", search);
  }

  if (currency) {
    params.set("currency", currency);
  }

  const response = await axios.get<PaymentSearchResponse>(
    `${API_URL}?${params.toString()}`,
  );
  return response.data;
}
