import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
import { Slider } from "@/components/ui/slider.js";

export function PriceFilter() {
  const handleSliderChange = (value: number[]) => {
    console.log(value);
  };

  return (
    <div>
      <Label className="text-base font-medium">محدوده قیمت (تومان)</Label>

      <Slider
        min={0}
        max={1000000}
        step={1000}
        onValueChange={handleSliderChange}
        className="py-4"
      />

      <div className="text-muted-foreground flex justify-between px-1 text-sm">
        <span>{1000} تومان</span>
        <span>{100000} تومان</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="min-price" className="text-sm">
            حداقل
          </Label>
          <Input id="min-price" type="number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-price" className="text-sm">
            حداکثر
          </Label>
          <Input id="max-price" type="number" />
        </div>
      </div>
    </div>
  );
}
