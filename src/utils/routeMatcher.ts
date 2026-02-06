import { getStoredPermissions } from "./getStoredPermissions";

export function matchRouteToPermission(
  pathname: string,
  routeMap: Record<string, { module: string; action: string }>
) {
  for (const pattern in routeMap) {
    const regex = new RegExp(
      "^" + pattern.replace(/\*/g, "[^/]+").replace(/\//g, "\\/") + "$"
    );

    if (regex.test(pathname)) {
      return routeMap[pattern];
    }
  }

  return null;
}

export function matchRouteToStoredPermission(
  pathname: string,
  routeMap: Record<string, { module: string; action: string }>
) {
  const routes = getStoredPermissions();
  for (const pattern in routeMap) {
    const regex = new RegExp(
      "^" + pattern.replace(/\*/g, "[^/]+").replace(/\//g, "\\/") + "$"
    );

    if (regex.test(pathname)) {
      const route = routeMap[pattern];
      if (routes[route.module]?.includes(route.action))
        return routes[route.module];
    }
  }

  return null;
}

export function matchFirstStoredPermission(
  routeMap: Record<string, { module: string; action: string }>
): { path: string; module: string; action: string } | null {
  const routes = getStoredPermissions();

  for (const pattern in routeMap) {
    const { module, action } = routeMap[pattern];
    if (routes[module]?.includes(action)) {
      return { path: pattern, module, action };
    }
  }

  return null;
}
