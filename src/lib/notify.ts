import { ReactNode } from "react";
import { toast } from "react-toastify";

export default function notify(component: ReactNode) {
  toast(() => component, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    theme: "light",
  });
}