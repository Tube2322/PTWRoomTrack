interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}

export default function Switch({ checked, onChange, label }: Props) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-emerald-500' : 'bg-gray-200'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? 'left-5' : 'left-0.5'
          }`}
        />
      </button>
    </label>
  );
}
