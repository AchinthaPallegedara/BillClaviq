"use client";
import { userAddformSchema } from "@/lib/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/phone-input";
import { createUser } from "@/lib/models/user.model";
import { redirect } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface Props {
  clerkId: string;
}

const UserSettings = ({ clerkId }: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof userAddformSchema>>({
    resolver: zodResolver(userAddformSchema),

    defaultValues: {
      cName: "",
      cEmail: "",
      cPhone: "",
      cAddress: "",
      cCity: "",
      cProvince: "",
      cPostalCode: "",
      cCountry: "Sri Lanka",
      cWebsite: "",
      cLogo: "https://claviq.com/logo.png",
    },
  });
  async function onSubmit(values: z.infer<typeof userAddformSchema>) {
    try {
      await createUser(clerkId, values);
      toast({
        title: "Account created.",
        description: "sucessfully created your business account for you.",
      });
      redirect("/dashboard");
    } catch (error) {
      toast({
        title: "Account create failed.",
        description: "Failed to update your business account ",
      });
      console.error("Error creating user:", error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Claviq" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:grid grid-cols-2 sm:space-x-10 max-sm:space-y-4">
            <div className="grid">
              <FormField
                control={form.control}
                name="cEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <Input placeholder="hello@claviq.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid">
              <FormField
                control={form.control}
                name="cPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="sm:grid grid-cols-2 sm:space-x-10 max-sm:space-y-4">
            <div className="grid">
              <FormField
                control={form.control}
                name="cAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid">
              <FormField
                control={form.control}
                name="cCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="sm:grid grid-cols-3 sm:space-x-10 max-sm:space-y-4">
            <div className="grid">
              <FormField
                control={form.control}
                name="cProvince"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid">
              <FormField
                control={form.control}
                name="cPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid">
              <FormField
                control={form.control}
                name="cCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contry</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="cWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Website</FormLabel>
                <FormControl>
                  <Input placeholder="www.claviq.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex">
            <Button type="submit" className="ml-auto my-5 px-10">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserSettings;
