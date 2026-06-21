"use client";

import * as React from "react";
import { Calendar1 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { cn } from "@/shared/lib";

interface DatePickerProps {
  date: Date | undefined;
  className?: string;
  onChangeDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, className, onChangeDate }: DatePickerProps) {
  const [isVisiblePicker, setVisiblePicker] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Popover open={isVisiblePicker} onOpenChange={setVisiblePicker}>
        <PopoverTrigger asChild>
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              id="date"
              className={cn(
                "w-full py-6 rounded-xl bg-zinc-200 justify-between font-normal",
                className
              )}
            >
              {date ? date.toLocaleDateString() : "Выберите дату"}
              <Calendar1 />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-full overflow-hidden p-0 rounded-xl"
          align="center"
        >
          <Calendar
            className="w-[250px] [--cell-size:24px]"
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChangeDate(date);
              setVisiblePicker(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
