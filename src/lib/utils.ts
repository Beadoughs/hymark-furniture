import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMoney(money: {
  amount: string;
  currencyCode: string;
}): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: money.currencyCode || "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(money.amount));
}
