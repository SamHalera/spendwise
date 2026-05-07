"use client";
import { signupFormSchema } from "@/types/zodSchemas/authSchemas";
import React, { useState } from "react";
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
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import { useRefreshStore } from "@/stores/refresh";

const SignupForm = () => {
  const [isShowPass, setIsShowPass] = useState<boolean>(false)
  const { triggerRefresh } = useRefreshStore()
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
            title: "Erreur !",
            description: response.error,
          });
        } else {
          toast({
            variant: "default",
            title: "Bienvenue !",
            description: response.success,
          });

          router.push("/dashboard");
        }
      }
      if (response?.error) {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: response.error,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-8 flex-1 bg-slate-900 h-auto lg:h-screen flex flex-col gap-8 justify-center items-center">
      <h2 className="text-3xl md:text-4xl text-center text-white mt-6">
        Créer votre compte
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center mx-auto flex-col gap-8 md:w-2/3 "
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-white text-xl flex gap-3 items-center">
                    Prénom
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Votre prénom"
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
                    Nom <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Votre nom" {...field} />
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
                    <Input type="email" placeholder="votre@email.com" {...field} />
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
                    Mot de passe <FormMessage />
                  </FormLabel>
                  <div className="relative">

                    <FormControl>
                      <Input
                        type={isShowPass ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        {...field}
                      />
                    </FormControl>
                    {isShowPass ?

                      <EyeClosed onClick={() => setIsShowPass(!isShowPass)} className="absolute top-2 right-2" />
                      :

                      <Eye onClick={() => setIsShowPass(!isShowPass)} className="absolute top-2 right-2" />
                    }
                  </div>
                </FormItem>
              );
            }}
          />
          <Button size="lg" variant="custom" className="self-center">
            S&apos;inscrire
          </Button>
          {/* <Button
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
          </Button> */}
          <hr></hr>
          <div className="text-center flex gap-2 items-center justify-center">
            <span className="text-center text-white italic">
              Vous avez déjà un compte ?{" "}
            </span>
            <Link
              className="text-secondary font-bold hover:text-white duration-500"
              href={"/signin"}
            >
              Se connecter
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
