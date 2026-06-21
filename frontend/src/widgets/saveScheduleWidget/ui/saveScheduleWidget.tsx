import { ELessonTypes } from "@/entities/lesson/types/types";
import { CreateRegularScheduleTypeSchema } from "@/entities/schedule/lib/schemes/createRegularScheduleForm";
import { CreateRegularScheduleForm } from "@/entities/schedule/ui/createRegularScheduleForm";
import { CalendarCell } from "@/entities/templateLesson/types/types";
import { Button } from "@/shared";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";

interface SaveScheduleWidgetProps {
  selectCells: CalendarCell[];
  isOpenPanel: boolean;
  togglePanel: () => void;
  onSaveSchedule: (setting: CreateRegularScheduleTypeSchema) => void;
}

export const SaveScheduleWidget = ({
  isOpenPanel,
  selectCells,
  togglePanel,
  onSaveSchedule,
}: SaveScheduleWidgetProps) => {
  const [step, setStep] = useState<"info" | "save">("info");
  const [scheduleSettings, setScheduleSettings] =
    useState<CreateRegularScheduleTypeSchema | null>(null);

  const handleSaveStep = (setting: CreateRegularScheduleTypeSchema) => {
    setStep("save");
    setScheduleSettings(setting);
  };

  const handleFinishStep = () => {
    if (!scheduleSettings) return;
    setStep("info");
    onSaveSchedule(scheduleSettings);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full border-2 border-blue-400 rounded-t-3xl p-4 bg-white shadow-lg">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <button
          onClick={togglePanel}
          className="w-full flex justify-between items-center px-2 transition-colors"
        >
          <span>
            {step === "save" && `Выбранное расписание -  ${selectCells.length}`}
            {step === "info" && "Добавьте настройки расписания"}
          </span>
          {isOpenPanel ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        <AnimatePresence>
          {isOpenPanel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {step === "save" && (
                <div className="space-y-2">
                  <div>
                    {selectCells.map((slot, index) => (
                      <div
                        key={index}
                        className="p-2 flex items-center space-x-2 "
                      >
                        <span>
                          {slot.slotType === null && (
                            <X className="text-red-700 h-7 w-7" />
                          )}

                          {(slot.slotType === "select" ||
                            slot.slotType === "active") && (
                            <Check className="text-green-700 h-7 w-7" />
                          )}
                        </span>
                        <p>
                          Пн {slot.timeStart} - {slot.timeEnd}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Button
                    // disabled={selectCells.length === 0}
                    className="w-full rounded-xl py-4"
                    onClick={handleFinishStep}
                  >
                    Сохранить
                  </Button>
                </div>
              )}
              {step === "info" && (
                <CreateRegularScheduleForm
                  onEventSubmit={handleSaveStep}
                  defaultValues={{
                    periodEnd: new Date().toISOString(),
                    periodStart: new Date().toISOString(),
                    type: ELessonTypes.LECTURE,
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
