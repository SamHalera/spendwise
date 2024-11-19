"use client";

import { Checkbox } from "@/components/ui/checkbox";

import React, { SetStateAction } from "react";

const FiltersTransactions = ({
  showPast,
  showUpcoming,
  setShowPast,
  setShowUpcoming,
}: {
  setShowPast: React.Dispatch<SetStateAction<boolean>>;
  setShowUpcoming: React.Dispatch<SetStateAction<boolean>>;
  showPast: boolean;
  showUpcoming: boolean;
}) => {
  return (
    <div className="flex flex-col items-center space-x-2 gap-3 self-end mb-6">
      <span>Show transactions :</span>
      <div className="flex gap-3">
        <div className="flex gap-2 items-center">
          <Checkbox
            onCheckedChange={() => {
              setShowPast(!showPast);
            }}
            id="past"
            checked={showPast}
          />
          <label
            htmlFor="past"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Past
          </label>
        </div>
        <div className="flex gap-2 items-center ">
          <Checkbox
            onCheckedChange={() => {
              setShowUpcoming(!showUpcoming);
            }}
            id="upcoming"
          />
          <label
            htmlFor="upcoming"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Upcoming
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltersTransactions;
