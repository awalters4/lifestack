// components/Button.tsx

type ButtonProps = { label: string; onClick?: () => void; type?: "button" | "submit" | "reset" };
export default function Button({ label, onClick, type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="px-4 py-2 rounded bg-blue-600 text-white">
      {label}
    </button>
  );
}
