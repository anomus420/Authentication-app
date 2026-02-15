import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    icon: "✨",
    className: "!bg-gradient-to-r !from-green-400 !to-emerald-500 !text-white !rounded-xl !shadow-lg",
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    icon: "⚠️",
    className: "!bg-gradient-to-r !from-rose-500 !to-red-600 !text-white !rounded-xl !shadow-lg",
  });
};
