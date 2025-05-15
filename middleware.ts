import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs' 
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si hay sesión
  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', session.user.id)
      .single()

    // Si no tiene perfil, forzamos onboarding
    if (!profile?.full_name && req.nextUrl.pathname !== '/onboarding') {
      const onboardingUrl = req.nextUrl.clone()
      onboardingUrl.pathname = '/onboarding'
      return NextResponse.redirect(onboardingUrl)
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
