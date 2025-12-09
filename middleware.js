// Authentication middleware removed - all routes are now public
// This file is kept to prevent build errors but does nothing

import { NextResponse } from "next/server";

export function middleware(request) {
  // No authentication required - allow all requests through
  return NextResponse.next();
}

// Empty config - no routes protected
export const config = {
  matcher: [],
};
