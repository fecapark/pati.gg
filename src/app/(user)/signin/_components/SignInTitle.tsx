interface SignInTitleProps {
  children: React.ReactNode
}

const SignInTitle = ({ children }: SignInTitleProps) => {
  return <h1 className="font-bold text-4xl text-center leading-[1.3] mb-10">{children}</h1>
}

export default SignInTitle
