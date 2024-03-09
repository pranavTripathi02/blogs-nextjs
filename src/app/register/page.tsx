"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().optional(),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(2, { message: "Enter a username between 2-12 characters" })
    .max(12, { message: "Enter a username between 2-12 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters" })
    .max(16, { message: "Password cannot exceed 16 characters" }),
});
// .strict({ message: "Invalid fields" });
// .required({ username: true, password: true });

function Register() {
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
        Create your <span className="text-accent">nlogX</span> account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
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
                <FormDescription>
                  Enter a password between 8-16 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg">
            Register
          </Button>
          <div>
            Already have an account?
            <Link href="/login" className="ms-2 text-accent underline">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Register;
