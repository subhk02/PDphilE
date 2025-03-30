// app/layout.js
import './globals.css'

export const metadata = {
  title: 'PDphilE - Combine Multiple PDFs',
  description: 'Easily merge multiple PDF files into one document',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}