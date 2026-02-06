import {
  matchFirstStoredPermission,
  matchRouteToPermission,
} from "@/utils/routeMatcher";
import { NextRequest, NextResponse } from "next/server";
import { routePermissionMap } from "./data/route-permissions";

function getPermissionsFromCookies(req: NextRequest) {
  const raw = req.cookies.get("permissions")?.value;
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 🔍 Only apply logic if route matches a module route
  const match = matchRouteToPermission(pathname, routePermissionMap);
  if (!match) return NextResponse.next(); // no permission rule = allow

  const token = req.cookies.get("token")?.value;

  // 🚫 If no token, redirect to /login
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Token exists, check permissions
  const permissions = getPermissionsFromCookies(req);
  const { module, action } = match;
  const allowed = permissions?.[module]?.includes(action);

  if (!allowed) {
    const firstMatch = matchFirstStoredPermission(routePermissionMap);
    const url = req.nextUrl.clone();
    url.pathname = firstMatch?.path || "/forbidden";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ Exclude all static/public assets and login route
export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico|login|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|json|js|css)).*)",
  ],
};
