import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { X } from "lucide-react";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.js";
import { Button } from "@/components/ui/button.js";
import { DialogClose } from "@/components/ui/dialog.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.js";

import { provinces } from "./data/provinces.js";
import { citiesMap } from "./data/cities.js";

import {
  addressSchema,
  type AddressSchemaType,
} from "./schema/addressSchema.js";
import { useCreateAddress } from "./useCreateAddress.js";

type Props = {
  position: { lat: number; lng: number } | null;
  onBack: () => void;
};
export default function AddressForm({ position, onBack }: Props) {
  const { createAddress, isCreateing } = useCreateAddress();
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullAddress: "",
      province: "",
      city: "",
      plate: "",
      unit: "",
      postalCode: "",
      recipientName: "",
      recipientPhone: "",
    },
  });

  const { handleSubmit, setValue, watch, control } = form;

  useEffect(() => {
    if (!position) return;
    const fetchAddress = async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: { lat: position.lat, lon: position.lng, format: "json" },
          },
        );

        const str: string = res.data?.display_name;
        setValue("fullAddress", str.substring(0, 100));
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddress();
  }, [position, setValue]);

  const onSubmit = (values: AddressSchemaType) => {
    if (!position) return;
    createAddress({ ...values, lat: position?.lat, lng: position?.lng });
  };

  const selectedProvince = watch("province") || "";

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <div className="flex items-center justify-between">
          <p className="text-300 font-medium">جزییات آدرس شما </p>
          <DialogClose>
            <Button variant="ghost" size="icon-sm">
              <X />
            </Button>
          </DialogClose>
        </div>

        <FormField
          control={control}
          name="fullAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>آدرس شما:</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="text-200 w-full rounded-md border p-2"
                />
              </FormControl>
              <p
                onClick={onBack}
                className="text-100 cursor-pointer font-medium text-red-500"
              >
                تغییر موقعیت مکانی روی نقشه
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-1">
          <h3 className="text-200 text-grey-600">آدرس خود را تکمیل کنید:</h3>
          <div className="border-grey-200 rounded-md border p-3">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>استان</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="انتخاب استان" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شهر</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="انتخاب شهر" />
                        </SelectTrigger>
                        <SelectContent>
                          {(citiesMap[selectedProvince as string] || []).map(
                            (c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>پلاک</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="پلاک" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>واحد</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="واحد" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کدپستی</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="کدپستی" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-200 text-grey-600">
            به چه کسی تحویل داده شود :{" "}
          </h3>
          <div className="border-grey-200 space-y-4 rounded-md border p-3">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">نام</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="نام" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="recipientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تلفن</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="شماره تلفن" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="mr-auto">
          ثبت آدرس
        </Button>
      </form>
    </Form>
  );
}
