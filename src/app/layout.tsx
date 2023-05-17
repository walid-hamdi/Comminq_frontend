import './globals.css'


export const metadata = {
  title: 'Comminq',
  description: 'Web Communication Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
