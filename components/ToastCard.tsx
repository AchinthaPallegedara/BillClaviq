"use client";
import { useToast } from "@/components/ui/use-toast";

const ToastCard = ({
  toastTitle,
  toastDescription,
}: {
  toastTitle: String;
  toastDescription: String;
}) => {
  const { toast } = useToast();
  return toast({
    title: `${toastTitle}`,
    description: `${toastDescription}`,
  });
};

export default ToastCard;
