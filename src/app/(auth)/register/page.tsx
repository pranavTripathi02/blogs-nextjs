"use client";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

function Register() {
  // const router = useRouter();
  // const { toast } = useToast();

  // mutation.mutate(
  //   { email, password, username, name },
  //   {
  //     onError: () => {
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description: "There was a problem with your request.",
  //       });
  //     },
  //     onSuccess: () => {
  //       toast({
  //         title: "Your account has been registered.",
  //         description: "Navigating back...",
  //       });
  //       // todo: login and navigate to homepage
  //       setTimeout(() => {
  //         router.back();
  //       }, 5000);
  //     },
  //   },
  // );

  return (
    <div className="container my-2 h-fit min-w-[20rem] max-w-[30rem] space-y-8 rounded-md bg-background p-8">
      <h1 className="text-xl">
        Create your
        <span className="bg-gradient-24 from-primary-custom rounded-lg from-50% bg-clip-text px-1 tracking-tighter text-transparent">
          nlogX
        </span>
        account
      </h1>
      <div className="flex flex-col space-y-4">
        <Link href="/api/auth/signin/google">
          <Button className="flex w-full justify-center gap-4">
            <GitHubLogoIcon />
            <span>Google</span>
          </Button>
        </Link>
        <Link href="/api/auth/signin/github">
          <Button className="flex w-full justify-center gap-4">
            <GitHubLogoIcon />
            <span>Github</span>
          </Button>
        </Link>
        <Link href="/register/email">
          <Button className="flex justify-center gap-4">
            <EnvelopeClosedIcon />
            <span>Use email</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
