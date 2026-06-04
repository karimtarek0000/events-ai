export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="h-[80vh] flex flex-col justify-center items-center">{children}</div>
}
