export default function ActionButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  disabled = false,
  type = "button",
  fullWidth = false,
  className = "",
}) {
  const base = `
    inline-flex items-center justify-center gap-1.5 font-body font-medium
    rounded-lg border transition-all duration-150 select-none
    focus:outline-none focus:ring-2 focus:ring-offset-1
    active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none
    ${fullWidth ? "w-full" : ""}
  `;
  const variants = {
    primary:
      "bg-navy text-offwhite border-navy hover:bg-navy-light focus:ring-navy/40",
    secondary:
      "bg-transparent text-teal border-teal hover:bg-teal/10 focus:ring-teal/30",
    danger:
      "bg-transparent text-alert border-alert/60 hover:bg-alert/10 focus:ring-alert/30",
    ghost:
      "bg-transparent text-teal border-transparent hover:bg-teal/10 focus:ring-teal/20",
  };
  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="shrink-0 w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}
