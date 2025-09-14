import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

interface AdsenseProps {
    slot: string; // Ad slot ID from AdSense dashboard
    style?: React.CSSProperties; // Optional custom styles
}

const Adsense = ({ slot, style }: AdsenseProps) => {
    useEffect(() => {
        // Load Google AdSense script if not already loaded
        const scriptId = "adsense-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.async = true;
            script.src =
                "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9409979021281893";
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);
        }

        // Push ad config
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("Adsense error", e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={style || { display: "block" }}
            data-ad-client="ca-pub-9409979021281893"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
};

export default Adsense;
