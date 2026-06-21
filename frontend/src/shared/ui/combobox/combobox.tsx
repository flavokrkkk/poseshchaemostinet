"use client";

import * as React from "react";
import { CheckIcon, Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shared/ui/command/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/popover/popover";
import { Button } from "../button";
import { cn } from "@/shared/lib";
import { Image } from "../image";
import { useResize } from "@/shared/hooks/useResize";

export interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Array<Option>;
  onChangeValue: (value: string) => void;
  onChangeSearchValue: (value: string) => void;
}

export function Combobox({
  options,
  onChangeValue,
  onChangeSearchValue,
}: ComboboxProps) {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [popoverWidth, setPopoverWidth] = React.useState(0);

  useResize<HTMLButtonElement>(
    buttonRef,
    () => {
      if (buttonRef.current) {
        setPopoverWidth(buttonRef.current.offsetWidth);
      }
    },
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start py-5 rounded-2xl overflow-hidden text-ellipsis whitespace-nowrap bg-white border-2 text-blue-500 border-blue-500"
        >
          <Search className="h-4 w-4 opacity-50" />
          {value
            ? options.find((framework) => framework.value === value)?.label
            : "Полное название ВУЗА"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-0 rounded-xl border-0"
        style={{ minWidth: popoverWidth }}
      >
        <Command className="rounded-2xl shadow-2xl border-2 border-blue-500">
          <CommandInput
            placeholder="Искать ВУЗ..."
            className="placeholder:text-blue-500 text-blue-500"
            onValueChange={onChangeSearchValue}
          />
          <CommandList className="">
            <CommandEmpty className="flex justify-center items-center flex-col p-3">
              <Image
                width={123}
                height={123}
                src="/images/We-Got-A-Problem--Streamline-Manila.png"
                alt="search-empties"
              />
              <p className="text-center text-[13px] text-blue-500">
                Мы не смогли найти ВУЗ с таким названием Обратись в нашу
                поддержку, мы поможем!
              </p>
            </CommandEmpty>
            <CommandGroup>
              {options.map((framework, index) => (
                <CommandItem
                  key={`${framework.value}-${index}`}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onChangeValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="text-blue-500"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 group-focus:text-black text-blue-700",
                      value === framework.value ? "opacity-100 " : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
