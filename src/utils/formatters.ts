import { format } from "date-fns";

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), "dd/MM/yyyy, HH:mm:ss");
}

export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}
