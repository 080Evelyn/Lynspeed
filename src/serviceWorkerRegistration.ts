// const isLocalhost = Boolean(
//     window.location.hostname === "localhost" ||
//     window.location.hostname === "[::1]" ||
//     window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
// );

// interface ServiceWorkerConfig {
//     onUpdate?: (registration: ServiceWorkerRegistration) => void;
//     onSuccess?: (registration: ServiceWorkerRegistration) => void;
// }

// export function register(config?: ServiceWorkerConfig): void {
//     if (import.meta.env.MODE === "production" && "serviceWorker" in navigator) {
//         const publicUrl = new URL(import.meta.env.VITE_PUBLIC_URL || "", window.location.href);
//         if (publicUrl.origin !== window.location.origin) {
//             return;
//         }

//         window.addEventListener("load", () => {
//             const swUrl = `${import.meta.env.VITE_PUBLIC_URL}/service-worker.js`;

//             if (isLocalhost) {
//                 checkValidServiceWorker(swUrl, config);
//                 navigator.serviceWorker.ready.then(() => {
//                     console.log("This web app is served cache-first. Learn more at https://cra.link/PWA.");
//                 });
//             } else {
//                 registerValidSW(swUrl, config);
//             }
//         });
//     }
// }

// function registerValidSW(swUrl: string, config?: ServiceWorkerConfig): void {
//     navigator.serviceWorker
//         .register(swUrl)
//         .then((registration) => {
//             registration.onupdatefound = () => {
//                 const installingWorker = registration.installing;
//                 if (!installingWorker) return;

//                 installingWorker.onstatechange = () => {
//                     if (installingWorker.state === "installed") {
//                         if (navigator.serviceWorker.controller) {
//                             console.log("New content is available. See https://cra.link/PWA.");
//                             config?.onUpdate?.(registration);
//                         } else {
//                             console.log("Content is cached for offline use.");
//                             config?.onSuccess?.(registration);
//                         }
//                     }
//                 };
//             };
//         })
//         .catch((error) => {
//             console.error("Error during service worker registration:", error);
//         });
// }

// function checkValidServiceWorker(swUrl: string, config?: ServiceWorkerConfig): void {
//     fetch(swUrl, { headers: { "Service-Worker": "script" } })
//         .then((response) => {
//             const contentType = response.headers.get("content-type");

//             if (response.status === 404 || (contentType && !contentType.includes("javascript"))) {
//                 navigator.serviceWorker.ready.then((registration) => {
//                     registration.unregister().then(() => window.location.reload());
//                 });
//             } else {
//                 registerValidSW(swUrl, config);
//             }
//         })
//         .catch(() => {
//             console.log("No internet connection. App is running in offline mode.");
//         });
// }

// export function unregister(): void {
//     if ("serviceWorker" in navigator) {
//         navigator.serviceWorker.ready
//             .then((registration) => registration.unregister())
//             .catch((error) => console.error("Service worker unregistration error:", error));
//     }
// }

/* eslint-disable no-restricted-globals */
// / <reference lib="webworker" />

interface ServiceWorkerConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

// This flag checks if you're on localhost
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(
      window.location.hostname
    )
);

export function register(config?: ServiceWorkerConfig): void {
  if ("serviceWorker" in navigator && import.meta.env.MODE === "production") {
    // Always use the root-relative service worker URL in Vite
    const swUrl = `/service-worker.js`;

    window.addEventListener("load", () => {
      if (isLocalhost) {
        // Check if service worker can be found. If it can't reload the page.
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log("This web app is being served cache-first.");
        });
      } else {
        // Register the service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: ServiceWorkerConfig): void {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // New content is available
              console.log("New content is available.");
              config?.onUpdate?.(registration);
            } else {
              // Content is cached
              console.log("Content is cached for offline use.");
              config?.onSuccess?.(registration);
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(
  swUrl: string,
  config?: ServiceWorkerConfig
): void {
  fetch(swUrl, { headers: { "Service-Worker": "script" } })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType && !contentType.includes("javascript"))
      ) {
        // No service worker found
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found, proceed as normal
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log("No internet connection. App is running in offline mode.");
    });
}

export function unregister(): void {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error("Error during service worker unregistration:", error);
      });
  }
}
