import { SlotType } from "@/entities/templateLesson/types/types";

export function getSlotClass(slotType: SlotType) {
  switch (slotType) {
    case "active":
      return "bg-[#D3F4DD]";
    case "select":
      return "bg-[#D3F4DD] border-2 border-green-500";
    case "conflict":
      return "bg-red-600 text-white";
    default:
      return "bg-[#E8E1FD]";
  }
}
