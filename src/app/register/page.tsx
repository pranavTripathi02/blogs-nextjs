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
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty" }).trim(),
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(2, { message: "Enter a username between 2-12 characters" })
      .max(12, { message: "Enter a username between 2-12 characters" })
      .trim(),
    email: z
      .string({ required_error: "Enter your email" })
      .email({ message: "Please enter a valid email." })
      .trim(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password should be at least 8 characters" })
      .max(16, { message: "Password cannot exceed 16 characters" })
      .trim(),
  })
  .strict({ message: "Invalid fields" });

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });
  const mutation = api.users.register.useMutation();
  const router = useRouter();
  const { toast } = useToast();

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password, name, username } = values;
    mutation.mutate(
      { email, password, username, name },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        },
        onSuccess: () => {
          toast({
            title: "Your account has been registered.",
            description: "Navigating back...",
          });
          // todo: login and navigate to homepage
          setTimeout(() => {
            router.back();
          }, 5000);
        },
      },
    );
    form.reset();
  };

  return (
    <div className="container my-2 h-fit min-w-[20rem] max-w-[30rem] space-y-8 rounded-md bg-background p-8">
      <h1 className="text-xl">
        Create your
        <span className="bg-gradient-24 rounded-lg from-primary from-50% bg-clip-text px-1 tracking-tighter text-transparent">
          nlogX
        </span>
        account
      </h1>
      <div>
        {mutation.isLoading ? (
          <p>Creating your account...</p>
        ) : mutation.isError ? (
          <p className="text-destructive">
            Oops! An error occurred. Please try again
          </p>
        ) : null}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name
                  <span className="ms-1 text-destructive">*</span>
                </FormLabel>
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
                <FormLabel>
                  Email
                  <span className="ms-1 text-destructive">*</span>
                </FormLabel>
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
          <Button type="submit" size="lg" disabled={mutation.isLoading}>
            Register
          </Button>
          <div className="text-sm">
            Already have an account?
            <Link href="/login" className="ms-2 underline">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Register;
