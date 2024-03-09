"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Field cannot be empty" }),
  password: z.string({ required_error: "Password is required" }).min(1, {
    message: "Field cannot be empty",
  }),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="container my-2 h-fit min-w-[20rem] max-w-[30rem] space-y-8 rounded-md bg-background p-8">
      <h1 className="text-xl">
        Sign into your <span className="text-accent">nlogX</span> account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username
                  <span className="ms-1 text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="username"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                  <span className="ms-1 text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg">
            Log in
          </Button>
          <div>
            <span>Don&apos;t have an account?</span>
            <Link href="/register" className="ms-2 text-accent underline">
              Register
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
