import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IconButtonProps {
  children: React.ReactNode
  props?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  onClick?: ()=>void
}

const IconButton = ({children, props, onClick}:IconButtonProps) => {
  return <button
    {...props}
    className={`w-10 h-10 p-2 rounded-full hover:bg-blue-1 hover:bg-opacity-30 transition-all ${props?.className}`}
    onClick={onClick}
  >
    <div className="dark:invert">
      {children}
    </div>
  </button>
}

export default IconButton;