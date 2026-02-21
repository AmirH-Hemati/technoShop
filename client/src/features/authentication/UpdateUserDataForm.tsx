import { User, Mail, CreditCard, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.js";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group.jsx";
import { Button } from "@/components/ui/button.js";
import { Spinner } from "@/components/ui/spinner.js";
import { Input } from "@/components/ui/input.js";

import { useUser } from "./useUser.js";
import { useUpdateUser } from "./useUpdateUser.js";
import { updateUserSchema, type UpdateUser } from "../users/schema/user.js";

export default function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      nationalCode: user?.nationalCode || "",
    },
  });

  if (isLoading) return <Spinner />;

  function onSubmit(values: UpdateUser) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    updateUser(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:border-grey-100 mx-auto max-w-3xl space-y-8 rounded-lg bg-white p-2 md:border md:p-10 md:shadow-sm"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <InputGroup dir="rtl">
                    <InputGroupInput
                      placeholder="نام خود را وارد کنید"
                      {...field}
                    />
                    <InputGroupAddon
                      className="pr-2 !pl-0"
                      align="inline-start"
                    >
                      <User />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <InputGroup dir="rtl">
                    <InputGroupInput
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                      {...field}
                    />
                    <InputGroupAddon
                      className="pr-2 !pl-0"
                      align="inline-start"
                    >
                      <Mail />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>کد ملی</FormLabel>
                <FormControl>
                  <InputGroup dir="rtl">
                    <InputGroupInput
                      type="number"
                      placeholder="کد ملی خود را وارد کنید"
                      {...field}
                    />
                    <InputGroupAddon
                      className="pr-2 !pl-0"
                      align="inline-start"
                    >
                      <CreditCard />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>شماره تلفن</FormLabel>
            <FormControl>
              <InputGroup dir="rtl">
                <InputGroupInput value={user.phone} disabled />
                <InputGroupAddon className="pr-2 !pl-0" align="inline-start">
                  <Phone className="text-grey-400" />
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عکس آواتار</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 border-t border-dashed pt-6">
          <Button type="button" variant="outline">
            لغو
          </Button>
          <Button type="submit" disabled={isUpdating}>
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </Form>
  );
}
