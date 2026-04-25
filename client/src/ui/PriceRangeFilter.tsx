import * as React from "react";

import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
import { Slider } from "@/components/ui/slider.js";

import useProductFilter from "@/hooks/useFiltersProducts.js";

import { formatPrice } from "@/utils/helper.js";

const MIN_PRICE = 0;
const MAX_PRICE = 100_000_000;
const STEP = 1000;

export default function PriceRangeFilter({
  className,
}: {
  className?: string;
}) {
  const { filters, setFilters } = useProductFilter();

  const currentMin = filters.minPrice ?? MIN_PRICE;
  const currentMax = filters.maxPrice ?? MAX_PRICE;

  const handleSliderChange = (newValue: number[]) => {
    setFilters({
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, "");
    if (!cleaned) {
      setFilters({ minPrice: MIN_PRICE });
      return;
    }

    const num = Number(cleaned);
    const newMin = Math.max(MIN_PRICE, Math.min(num, currentMax));
    setFilters({ minPrice: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, "");
    if (!cleaned) {
      setFilters({ maxPrice: MAX_PRICE });
      return;
    }

    const num = Number(cleaned);
    const newMax = Math.min(MAX_PRICE, Math.max(num, currentMin));
    setFilters({ maxPrice: newMax });
  };

  return (
    <div className="space-y-4">
      <Slider
        value={[currentMin, currentMax]}
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={STEP}
        onValueChange={handleSliderChange}
        className="py-4"
      />

      <div className="text-muted-foreground flex justify-between px-1 text-xs">
        <span>{formatPrice(currentMax)} تومان</span>
        <span>{formatPrice(currentMin)} تومان</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="max-price" className="text-muted-foreground text-xs">
            حداکثر
          </Label>
          <Input
            id="max-price"
            type="text"
            inputMode="numeric"
            value={currentMax === MAX_PRICE ? "" : formatPrice(currentMax)}
            onChange={handleMaxChange}
            placeholder={formatPrice(MAX_PRICE)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="min-price" className="text-muted-foreground text-xs">
            حداقل
          </Label>
          <Input
            id="min-price"
            type="text"
            inputMode="numeric"
            value={currentMin === MIN_PRICE ? "" : formatPrice(currentMin)}
            onChange={handleMinChange}
            placeholder={formatPrice(MIN_PRICE)}
            className="h-9 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
