import { ReactNode } from "react";

interface ControlButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "success";
  disabled?: boolean;
  className?: string;
}

export function ControlButton({
  children,
  onClick,
  variant = "secondary",
  disabled = false,
  className = ""
}: ControlButtonProps) {
  const baseClasses = "px-3 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center text-xs md:text-sm min-w-[100px] md:min-w-[120px]";
  
  const variantClasses = {
    primary: "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600",
    secondary: "bg-teal-600 hover:bg-teal-500 text-white border border-teal-500",
    success: "bg-green-600 hover:bg-green-500 text-white border border-green-500"
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed border-gray-400 text-gray-400"
    : "hover:scale-105 active:scale-95";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}

interface ControlButtonsProps {
  onSceneChange?: () => void;
  onToggleMovement?: () => void;
  onAddSprite?: () => void;
  onStart?: () => void;
  showStartButton?: boolean;
  className?: string;
}

export default function ControlButtons({
  onSceneChange,
  onToggleMovement,
  onAddSprite,
  onStart,
  showStartButton = true,
  className = ""
}: ControlButtonsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 p-2 md:p-4 z-30 ${className}`}>
      {onSceneChange && (
        <ControlButton onClick={onSceneChange} variant="primary">
          Change Scene
        </ControlButton>
      )}
      
      {onToggleMovement && (
        <ControlButton onClick={onToggleMovement} variant="primary">
          Toggle Movement
        </ControlButton>
      )}
      
      {onAddSprite && (
        <ControlButton onClick={onAddSprite} variant="primary">
          Add Sprite
        </ControlButton>
      )}
      
      {showStartButton && onStart && (
        <ControlButton onClick={onStart} variant="success">
          Start
        </ControlButton>
      )}
    </div>
  );
}