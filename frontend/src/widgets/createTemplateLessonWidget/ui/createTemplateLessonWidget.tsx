import { Button, Image } from "@/shared";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

interface CreateTemplateLessonWidgetProps {
  onClick: () => void;
}

export const CreateTemplateLessonWidget = ({
  onClick,
}: CreateTemplateLessonWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-blue-400/65 backdrop-blur-md shadow-lg ring-1 ring-white/10">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute -right-4 -top-6 h-40 w-40 select-none opacity-70 sm:h-44 sm:w-44"
              aria-hidden
            >
              <Image
                src="/Metallic White (79).png"
                alt="banner-selection"
                className="h-full w-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <section className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-white sm:text-xl">
              Досупно создание шаблонов
            </p>

            <Button
              variant="secondary"
              size="icon"
              aria-label={isOpen ? "Свернуть" : "Развернуть"}
              onClick={() => setIsOpen((v) => !v)}
              className="h-9 w-9 rounded-full bg-white text-gray-700 shadow-sm transition-transform hover:bg-white/90"
            >
              <motion.span
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex"
              >
                <ChevronUp />
              </motion.span>
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <p className="max-w-[34rem] text-sm leading-5 text-white/80">
                  Ты можешь создавать шаблонные пары, которые позже задействуешь
                  для регулярного расписания
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="p-4 pt-2">
          <Button
            variant="secondary"
            className="w-full rounded-2xl py-5 bg-white text-gray-900 hover:bg-white/90"
            onClick={onClick}
          >
            Создать шаблон
          </Button>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
      </div>
    </div>
  );
};
