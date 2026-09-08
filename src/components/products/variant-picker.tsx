"use client";

import { motion } from "framer-motion";
import type { ProductOption, ProductVariant } from "@/lib/data";
import { cn } from "@/lib/utils";

type VariantPickerProps = {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedOptions: Record<string, string>;
  onSelect: (optionName: string, value: string) => void;
};

function isOptionValueAvailable(
  variants: ProductVariant[],
  selectedOptions: Record<string, string>,
  optionName: string,
  value: string
): boolean {
  return variants.some((variant) => {
    const matchesValue = variant.selectedOptions.some(
      (option) => option.name === optionName && option.value === value
    );
    if (!matchesValue) {
      return false;
    }

    return variant.selectedOptions.every((option) => {
      if (option.name === optionName) {
        return true;
      }
      const selected = selectedOptions[option.name];
      return !selected || selected === option.value;
    });
  });
}

function isOptionValueInStock(
  variants: ProductVariant[],
  selectedOptions: Record<string, string>,
  optionName: string,
  value: string
): boolean {
  return variants.some((variant) => {
    if (!variant.availableForSale) {
      return false;
    }

    const matchesValue = variant.selectedOptions.some(
      (option) => option.name === optionName && option.value === value
    );
    if (!matchesValue) {
      return false;
    }

    return variant.selectedOptions.every((option) => {
      if (option.name === optionName) {
        return true;
      }
      const selected = selectedOptions[option.name];
      return !selected || selected === option.value;
    });
  });
}

export function VariantPicker({
  options,
  variants,
  selectedOptions,
  onSelect,
}: VariantPickerProps) {
  if (options.length === 0 || variants.length <= 1) {
    return null;
  }

  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.name}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-graphite">
            {option.name}
            {selectedOptions[option.name] ? (
              <span className="ml-2 font-medium normal-case tracking-normal text-brand-charcoal">
                {selectedOptions[option.name]}
              </span>
            ) : null}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const exists = isOptionValueAvailable(
                variants,
                selectedOptions,
                option.name,
                value
              );
              const inStock = isOptionValueInStock(
                variants,
                selectedOptions,
                option.name,
                value
              );
              const unavailable = !exists || !inStock;

              return (
                <motion.button
                  key={`${option.name}-${value}`}
                  type="button"
                  whileTap={exists ? { scale: 0.97 } : undefined}
                  disabled={!exists}
                  onClick={() => onSelect(option.name, value)}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative min-w-[3rem] rounded-sm border px-3.5 py-2 text-sm transition-colors",
                    isSelected
                      ? "border-brand-charcoal bg-brand-charcoal text-white"
                      : "border-brand-silver/50 bg-white text-brand-charcoal hover:border-brand-charcoal/60",
                    unavailable && !isSelected && "text-brand-silver",
                    !exists && "cursor-not-allowed opacity-40"
                  )}
                >
                  <span className={cn(unavailable && exists && "line-through")}>
                    {value}
                  </span>
                  {unavailable && exists ? (
                    <span className="sr-only"> (sold out)</span>
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
