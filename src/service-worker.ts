/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// Ensure `self` is typed correctly as a Service Worker
declare let self: ServiceWorkerGlobalScope;

// Enable immediate control of new clients
clientsClaim();

// Precache assets generated during the build process
precacheAndRoute(self.__WB_MANIFEST || []);

// Handle navigation requests (App Shell-style routing)
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");

registerRoute(
    ({ request, url }) => {
        if (request.mode !== "navigate") return false;
        if (url.pathname.startsWith("/_")) return false;
        if (url.pathname.match(fileExtensionRegexp)) return false;
        return true;
    },
    createHandlerBoundToURL((import.meta.env.VITE_PUBLIC_URL || "") + "/index.html") // Fixed here
);

// Runtime caching for images (same-origin requests)
registerRoute(
    ({ url }) => url.origin === self.location.origin && url.pathname.endsWith(".png"),
    new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [
            new ExpirationPlugin({ maxEntries: 50 }), // Limits cache size
        ],
    })
);

// Allow the service worker to update immediately when a new version is available
self.addEventListener("message", (event: ExtendableMessageEvent) => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

// Handle background sync or push notifications here if needed.
