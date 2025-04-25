import { useEffect, useState } from "react";
import "./InstallPWA.css"

// Define BeforeInstallPromptEvent since it's not in TypeScript's DOM types
interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent);
            setShowPopup(true); // Show the install popup when prompt is available
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setShowPopup(false);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the install prompt");
            }
            setDeferredPrompt(null);
            setShowPopup(false); // Hide popup after user interaction
        }
    };

    if (isInstalled) return null; // Don't show anything if the app is already installed

    return (
        <>
            {showPopup && (
                <div className="install-popup">
                    <div className="install-content">
                        <h3>🚀 Install Our App</h3>
                        {/* <p>Get the best experience by installing our PWA.</p> */}
                        <div className="install-buttons">
                            <button className="install-btn" onClick={handleInstallClick}>
                                Install Now
                            </button>
                            <button className="close-btn" onClick={() => setShowPopup(false)}>
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InstallPWA;
