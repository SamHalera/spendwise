"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FiltersDate from "./FiltersDate";
import FiltersStatus from "./FiltersStatus";
import FiltersPeymentMethod from "./FiltersPeymentMethod";

const FiltersTransactions = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" title="Filtres">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <FiltersDate />
          <FiltersStatus />
          <FiltersPeymentMethod />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersTransactions;
