import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IconButtonProps {
  children: React.ReactNode
  props?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  onClick?: ()=>void
}

const IconButton = ({children, props, onClick}:IconButtonProps) => {
  return <button
    {...props}
    className={`md:w-10 w-7 md:h-10 h-7 flex justify-center items-center rounded-full hover:bg-blue-1 hover:bg-opacity-30 transition-all ${props?.className}`}
    onClick={onClick}
  >
    <div className="dark:invert flex">
      {children}
    </div>
  </button>
}

export default IconButton;