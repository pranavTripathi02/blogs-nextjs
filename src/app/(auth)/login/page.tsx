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
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";

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

  const mutation = api.users.login.useMutation();
  const router = useRouter();
  const { toast } = useToast();

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    // console.log(values);
    // const loginQuery = api.users.login.useQuery({ username, password });
    const post = await mutation.mutateAsync(
      { username, password },
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
            title: "Success! You are now logged in.",
            description: "Navigating back...",
          });
          // todo: login and navigate to homepage
          // setTimeout(() => {
          //   router.back();
          // }, 5000);
        },
      },
    );
    // form.reset();
  };

  return (
    <div className="container my-2 h-fit min-w-[20rem] max-w-[30rem] space-y-8 rounded-md bg-background p-8">
      <h1 className="text-xl">
        Sign into your
        <span className="bg-gradient-24 rounded-lg from-primary from-50% bg-clip-text px-1 tracking-tighter text-transparent">
          nlogX
        </span>
        account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Button type="submit" size="lg" disabled={mutation.isLoading}>
              Log in
            </Button>
            <Link className="block text-sm underline" href="#">
              Forgot password?
            </Link>
          </div>
          <div>
            {mutation.isLoading ? (
              <p>Logging into your account...</p>
            ) : mutation.isError ? (
              <p className="text-destructive">
                Oops! An error occurred. Please try again
              </p>
            ) : null}
          </div>
        </form>
      </Form>
      <div className="text-sm">
        <div>
          <span>Don&apos;t have an account?</span>
          <Link href="/register" className="ms-2 underline hover:text-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
