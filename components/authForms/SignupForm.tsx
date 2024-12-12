"use client";
import { signupFormSchema } from "@/types/zodSchemas/authSchemas";
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
import { registerUser } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupForm = () => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      const response = await registerUser(values);
      if (response?.success) {
        const signInData = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (signInData?.error) {
          toast({
            variant: "destructive",
            title: "Bad news!",
            description: response.error,
          });
        } else {
          toast({
            variant: "default",
            title: "Welcome!",
            description: response.success,
          });
          router.push("/dashboard");
        }
      }
      if (response?.error) {
        toast({
          variant: "destructive",
          title: "Bad news!",
          description: response.error,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-8 flex-1 bg-gradient-to-b from-blue-950 via-blue-800 to-indigo-800 h-screen flex flex-col gap-8 justify-center items-center">
      <h2 className="text-4xl text-white">Create your account</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center mx-auto flex-col gap-8 w-2/3 "
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-white text-xl flex gap-3 items-center">
                    Firstname
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your firstname"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-white text-xl flex gap-3 items-center">
                    Lastname <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your lastname" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
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
            Sign up
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
              You have already an account?{" "}
            </span>
            <Link
              className="text-blue-200 font-bold hover:text-white duration-500"
              href={"/signin"}
            >
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
