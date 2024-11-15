"use client";
import { signinFormSchema } from "@/types/zodSchemas/authSchemas";
import React from "react";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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

const LoginForm = () => {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
    console.log(values);
  };
  return (
    <div className="p-8 ">
      <h1>Sign In</h1>
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="meail here" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="self-center">Sign In</Button>
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
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
