export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('/grid.svg')] bg-cover relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md">
            {children}
        </div>
    </div>
  )
}
