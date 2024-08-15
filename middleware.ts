import { clerkMiddleware, ClerkMiddlewareAuth, createRouteMatcher } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isPublicRoute = createRouteMatcher(['/(.*)', '/login(.*)'])

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
  // if (isProtectedRoute(req))
  //   auth().protect()

  // if (isPublicRoute(req))
  //   auth().redirectToSignIn()

  if (isProtectedRoute(req) && !auth().userId) {
    redirect('/login')
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};