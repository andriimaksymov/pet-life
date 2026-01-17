import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isOnAuth = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')

  // Redirect to dashboard if logged in and trying to access auth pages
  if (isLoggedIn && isOnAuth) {
    return Response.redirect(new URL('/dashboard', req.nextUrl))
  }

  // Redirect to login if not logged in and trying to access dashboard
  if (!isLoggedIn && isOnDashboard) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }

  return undefined
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)'],
}
