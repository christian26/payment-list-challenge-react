import axios from "axios";
import { API_URL } from "../../constants";
import { PaymentSearchResponse } from "../../types/payment";

export interface FetchPaymentsParams {
  page: number;
  pageSize: number;
}

export async function fetchPayments({
  page,
  pageSize,
}: FetchPaymentsParams): Promise<PaymentSearchResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  const response = await axios.get<PaymentSearchResponse>(
    `${API_URL}?${params.toString()}`,
  );
  return response.data;
}
