import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Skull, Lock, Ghost, Smartphone, ShieldAlert, Cpu, Download, ZapOff } from 'lucide-react';

export default function V91UniversalApp() {
    const [userId, setUserId] = useState("");
    const [device, setDevice] = useState("detecting...");
    const [isAppMode, setIsAppMode] = useState(false);

    useEffect(() => {
        // Generoi uniikki ID
        setUserId(Math.random().toString(36).substr(2, 8).toUpperCase());

        // Tunnista laite
        const ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) setDevice("ios");
        else if (/android/.test(ua)) setDevice("android");
        else setDevice("desktop");

        // Tarkista onko sovellus asennettu kotinäytölle
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsAppMode(true);
        }
    }, []);

    const handleInstall = () => {
        if (device === "ios") {
            const profileUUID = `V91-CORE-${userId}`;
            const profileXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key><string>com.apple.managedsettings.restriction</string>
            <key>PayloadUUID</key><string>${profileUUID}-APP</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadIdentifier</key><string>com.v91.restrictions</string>
            <key>ratingApps</key><integer>4</integer> 
            <key>allowAppInstallation</key><false/>
        </dict>
        <dict>
            <key>PayloadType</key><string>com.apple.webcontent-filter</string>
            <key>PayloadUUID</key><string>${profileUUID}-WEB</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadIdentifier</key><string>com.v91.webfilter</string>
            <key>FilterType</key><string>BuiltIn</string>
            <key>AutoFilterEnabled</key><true/>
            <key>BlacklistedURLs</key><array><string>youtube.com/shorts</string><string>tiktok.com</string></array>
        </dict>
    </array>
    <key>PayloadDisplayName</key><string>V91_TITAN_ABSOLUTE</string>
    <key>PayloadIdentifier</key><string>com.v91.titan.main</string>
    <key>PayloadRemovalDisallowed</key><true/>
    <key>PayloadType</key><string>Configuration</string>
    <key>PayloadUUID</key><string>${profileUUID}</string>
    <key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>`;
            const blob = new Blob([profileXML], { type: 'application/x-apple-aspen-config' });
            window.location.href = window.URL.createObjectURL(blob);
        } else {
            // Android asennuslogiikka
            const androidConfig = `V91_TITAN_ANDROID_BLOCK\nID:${userId}\nSTATUS:HARD_LOCK_ACTIVE`;
            const blob = new Blob([androidConfig], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "V91_TITAN_ANDROID.config";
            a.click();
            alert("ANDROID: Konfiguraatio ladattu. Aktivoi järjestelmäasetuksista.");
        }
    };

    return (
        <div className="v91-root">
            <Head>
                <title>V91 TITAN | CONTROL</title>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                <link rel="manifest" href="/manifest.json" />
            </Head>

            <header className="v-header">
                <div className="v-brand"><Cpu size={14} color="#ff2d55" /> V91_TITAN_OS</div>
                <div className="v-id">ID: {userId}</div>
            </header>

            <main className="v-content">
                {!isAppMode ? (
                    <div className="v-setup fade-in">
                        <Download size={60} color="#444" className="pulse" />
                        <h1>ASENNA SOVELLUS</h1>
                        <p>Jotta lukitus on murtamaton, V91 on asennettava kotinäytölle.</p>
                        <div className="instructions">
                            {device === "ios" ? "Paina 'Jaa' -> 'Lisää kotinäyttöön'" : "Paina kolmea pistettä -> 'Asenna sovellus'"}
                        </div>
                    </div>
                ) : (
                    <div className="v-dashboard fade-in">
                        <Skull size={80} className="glow-red" />
                        <h2>SYSTEM_CORE_READY</h2>
                        <div className="device-tag">DETECTED_HARDWARE: {device.toUpperCase()}</div>
                        
                        <div className="v-features">
                            <div className="f-item"><Lock size={12} /> APP_INSTALL_DISABLED</div>
                            <div className="f-item"><ZapOff size={12} /> SHORTS_REMOVED</div>
                        </div>

                        <button className="btn-activate" onClick={handleInstall}>
                            AKTIVOI JÄRJESTELMÄLUKKO
                        </button>

                        <button className="btn-snap" onClick={() => window.location.href="https://snapchat.com/add/arvoooooooo"}>
                            <Ghost size={18} /> ANOP VAPAUTUSTA
                        </button>
                    </div>
                )}
            </main>

            <footer className="v-footer">
                <div className="log-line">> V91 AUTHORITY: ARVO</div>
                <div className="log-line">> STATUS: SECURE_ENCRYPTION_ACTIVE</div>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
                
                body { margin: 0; background: #000; color: #fff; font-family: 'JetBrains Mono', monospace; overflow: hidden; }
                .v91-root { height: 100vh; display: flex; flex-direction: column; background: #000; }
                
                .v-header { padding: 40px 20px 20px; display: flex; justify-content: space-between; font-size: 10px; color: #333; border-bottom: 1px solid #111; }
                
                .v-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px; text-align: center; }
                
                h1 { font-size: 1.5rem; margin: 20px 0; }
                h2 { font-size: 1.2rem; color: #ff2d55; letter-spacing: 2px; margin-bottom: 30px; }
                p { color: #555; font-size: 12px; max-width: 250px; margin-bottom: 20px; }
                
                .instructions { background: #0a0a0a; border: 1px dashed #222; padding: 15px; font-size: 11px; color: #ff2d55; }
                
                .glow-red { color: #ff2d55; filter: drop-shadow(0 0 15px #ff2d55); margin-bottom: 15px; }
                .device-tag { font-size: 9px; color: #222; background: #050505; padding: 4px 10px; border-radius: 4px; margin-bottom: 30px; }
                
                .v-features { text-align: left; display: inline-block; margin-bottom: 40px; }
                .f-item { font-size: 10px; color: #444; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
                
                .btn-activate { width: 100%; max-width: 320px; background: #ff2d55; color: #fff; border: none; padding: 22px; font-weight: 700; border-radius: 4px; cursor: pointer; margin-bottom: 15px; font-family: inherit; }
                .btn-snap { width: 100%; max-width: 320px; background: transparent; border: 1px solid #222; color: #444; padding: 18px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-family: inherit; font-size: 12px; }
                
                .v-footer { padding: 20px; font-size: 8px; color: #111; border-top: 1px solid #050505; }
                
                .pulse { animation: pulse 2s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
                .fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; } }
            `}</style>
        </div>
    );
}
