import Portal from "./Portal";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Settings } from "../../hooks/useSettings";

type SettingsModalProps = {
	defaultSettings: Settings;
	onClose: () => void;
	onSave: (_settings: Settings) => void;
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

const SettingsModal = ({
	defaultSettings,
	onClose,
	onSave,
}: SettingsModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			size: defaultSettings.size,
			timer: defaultSettings.timer,
		},
	});

	const submit = (data: FormData) => {
		onSave({ size: data.size, timer: data.timer });
		onClose();
	};

	return (
		<Portal>
			<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
				<div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
					<h2 className="text-xl font-bold mb-4">Settings</h2>
					<form onSubmit={handleSubmit(submit)} className="space-y-4">
						<label className="flex flex-col">
							Grid size
							<select
								{...register("size", { valueAsNumber: true })}
								className={`mt-2 p-2 border rounded ${
									errors.size ? "border-red-500" : ""
								}`}
							>
								{[4, 5, 6, 7, 8].map((s) => (
									<option key={s} value={s}>
										{s} x {s}
									</option>
								))}
							</select>
							{errors.size && (
								<span className="text-red-500 text-sm mt-1">
									{errors.size.message}
								</span>
							)}
						</label>

						<label className="flex flex-col">
							Timer (seconds, 0 = no limit)
							<input
								type="number"
								min={0}
								{...register("timer", { valueAsNumber: true })}
								className={`mt-2 p-2 border rounded ${
									errors.timer ? "border-red-500" : ""
								}`}
							/>
							{errors.timer && (
								<span className="text-red-500 text-sm mt-1">
									{errors.timer.message}
								</span>
							)}
						</label>

						<div className="flex gap-3 justify-end mt-2">
							<Button
								type="button"
								variant="secondary"
								onClick={onClose}
							>
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
