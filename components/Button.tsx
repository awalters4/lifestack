// components/Button.tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit";
};

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow disabled:opacity-50"
    >
      {label}
    </button>
  );
};

export default Button;
