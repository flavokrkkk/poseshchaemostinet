import { ArrowLeft } from "lucide-react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";

interface BackBadgeProps {
  backPath: string;
  title: string;
}

export const BackBadge = ({ title, backPath }: BackBadgeProps) => {
  const navigate = useNavigate();

  const handleBackPath = () => navigate(backPath);
  return (
    <Button
      variant={"outline"}
      className="rounded-3xl w-full flex justify-start py-7 hover:bg-white space-x-1"
      onClick={handleBackPath}
    >
      <ArrowLeft className="text-zinc-500" />
      <span className="text-base">{title}</span>
    </Button>
  );
};
