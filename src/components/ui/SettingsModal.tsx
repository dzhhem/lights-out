import { useEffect } from "react";
import Portal from "./Portal";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingsStore } from "../../store/settings";

type SettingsModalProps = {
  onClose: () => void;
};

const schema = z.object({
  size: z
    .number({ invalid_type_error: "Size must be a number" })
    .min(4, "Minimum size is 4")
    .max(8, "Maximum size is 8"),
  timer: z
    .number({ invalid_type_error: "Timer must be a number" })
    .min(0, "Timer cannot be negative"),
});

type FormData = z.infer<typeof schema>;

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const settings = useSettingsStore((state) => state.settings);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      size: settings.size,
      timer: settings.timer,
    },
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const submit = (data: FormData) => {
    updateSettings({ size: data.size, timer: data.timer });
    onClose();
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-slate-800 dark:text-slate-100 p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <label className="flex flex-col gap-2 font-medium">
              Grid size
              <select
                {...register("size", { valueAsNumber: true })}
                className={`p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                  errors.size ? "border-red-500" : "border-gray-200"
                }`}
              >
                {[4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    {s} x {s}
                  </option>
                ))}
              </select>
              {errors.size && (
                <span className="text-red-500 text-sm">
                  {errors.size.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2 font-medium">
              Timer (seconds, 0 = no limit)
              <input
                type="number"
                min={0}
                {...register("timer", { valueAsNumber: true })}
                className={`p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                  errors.timer ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.timer && (
                <span className="text-red-500 text-sm">
                  {errors.timer.message}
                </span>
              )}
            </label>

            <div className="flex gap-3 justify-end pt-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default SettingsModal;
