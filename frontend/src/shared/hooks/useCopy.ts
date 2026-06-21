import { useState, useTransition } from "react";

export const useCopied = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCopyClick = async (text: string) => {
    startTransition(async () => {
      try {
        const textToCopy = text;
        if (!textToCopy) throw new Error("Is empty copy value!");

        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Ошибка при копировании текста:", err);
        setIsCopied(false);
      }
    });
  };

  const handleCopyImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      return true;
    } catch (error) {
      console.error("Failed to copy image:", error);
      return false;
    }
  };

  return {
    isCopied,
    isPending,
    handleCopyImage,
    handleCopyClick,
  };
};
