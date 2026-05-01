import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Contact, Phone } from "lucide-react";

const BabySitterCard = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center flex-col gap-2 mb-4">
          General Informations
        </CardTitle>
        <CardDescription className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Contact /> <span>Diana Barbosa Pinto</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone /> <span>0000000000</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button className="">Edit</Button>
      </CardFooter>
    </Card>
  );
};

export default BabySitterCard;
