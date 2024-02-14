interface IconWrapperProps {
  children: React.ReactNode
  className?: string
}

const IconWrapper = ({ children, className = '' }: IconWrapperProps) => {
  return <div className={`inline-flex justify-center items-center ${className}`}>{children}</div>
}

export default IconWrapper
