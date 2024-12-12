"use client";
import { signinFormSchema } from "@/types/zodSchemas/authSchemas";
import React from "react";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import logoGoogle from "@/public/images/google_logo.svg";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParms = useSearchParams();
  const prevUrl = searchParms.get("prevUrl");
  console.log("prevUrl==>", prevUrl);
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
    try {
      console.log(values);
      const signInData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (signInData?.error) {
        console.log("error");
        toast({
          variant: "destructive",
          title: "Bad news!",
          description: "Invalid credentials.",
        });
      }
      if (!signInData?.error) {
        const pathToRedirect = prevUrl ? `/${prevUrl}` : "/dashboard";
        router.push(pathToRedirect);
      }
    } catch (error) {
      console.error("error==>", error);
      toast({
        variant: "destructive",
        title: "Bad news!",
        description:
          "Oups! Something went wrong! Sorry for that. Pleas, try again...",
      });
    }
  };
  return (
    <div className="p-8 w-2/3 rounded-lg bg-black/40">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center mx-auto flex-col gap-8 w-2/3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-white text-xl flex gap-3 items-center">
                    Email <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="meail here" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-white text-xl flex gap-3 items-center">
                    Password <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password here"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button size="lg" variant="custom" className="self-center">
            Sign In
          </Button>
          <Button
            type="button"
            className="w-fit my-1 self-center"
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            size="lg"
            variant="outline"
          >
            <img
              src={logoGoogle.src}
              alt="Google logo"
              // className="mr-2"
              height={30}
              width={30}
            />
          </Button>
          <hr></hr>
          <div className="text-center flex gap-2 items-center justify-center">
            <span className="text-center text-white italic">
              You do not have an account yet?
            </span>
            <Link
              className="text-blue-200 font-bold hover:text-white duration-500"
              href={"/signup"}
            >
              Signup
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
