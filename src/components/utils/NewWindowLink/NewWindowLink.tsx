import Link from 'next/link'

interface NewWindowLinkProps {
  href: string
  noStyle?: boolean
  children: React.ReactNode
}

const NewWindowLink = ({ href, children, noStyle = false }: NewWindowLinkProps) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={noStyle ? '' : 'hover:underline text-accent-blue'}
    >
      {children}
    </Link>
  )
}

export default NewWindowLink
