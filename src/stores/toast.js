// stores/toast.js
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const useToastStore = defineStore("toast", () => {

    const base = {
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        position: "top-right",
    };

    const show = (message, type = "default", duration = 3000) => {
        const options = { ...base, autoClose: duration };

        if (type === "success") return toast.success(message, options);
        if (type === "error") return toast.error(message, options);
        if (type === "warning") return toast.warn(message, options);
        if (type === "info") return toast.info(message, options);

        return toast(message, options);
    };

    const success = (msg, duration) => show(msg, "success", duration);
    const error = (msg, duration) => show(msg, "error", duration);
    const warning = (msg, duration) => show(msg, "warning", duration);
    const info = (msg, duration) => show(msg, "info", duration);

    return {
        show,
        success,
        error,
        warning,
        info,
    };
});