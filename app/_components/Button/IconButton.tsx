import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IconButtonProps {
  children: React.ReactNode
  props?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}

const IconButton = ({children, props}:IconButtonProps) => {
  return <button
    {...props}
    className={`w-[38px] h-[38px] p-1 rounded-full hover:bg-blue-1 hover:bg-opacity-30 transition-all ${props?.className}`}
  >
    <div className="dark:invert">
      {children}
    </div>
  </button>
}

export default IconButton;