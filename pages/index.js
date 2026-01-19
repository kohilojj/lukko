import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Skull, Lock, Ghost, Smartphone, ShieldAlert, Cpu, Download, ZapOff, Activity, Terminal, ShieldCheck } from 'lucide-react';

export default function V91UniversalApp() {
    const [userId, setUserId] = useState("");
    const [device, setDevice] = useState("detecting...");
    const [isAppMode, setIsAppMode] = useState(false);
    const [bootLogs, setBootLogs] = useState([]);

    useEffect(() => {
        const id = Math.random().toString(36).substr(2, 10).toUpperCase();
        setUserId(id);

        const ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) setDevice("ios");
        else if (/android/.test(ua)) setDevice("android");
        else setDevice("desktop");

        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsAppMode(true);
        }

        const logs = [
            "INITIALIZING_V91_KERNEL",
            "SCANNING_HARDWARE_INTERFACE...",
            `DEVICE_DETECTED: ${ua.slice(0, 20)}...`,
            "ENCRYPTION_LAYERS_READY",
            "ESTABLISHING_ARVO_AUTHORITY_LINK"
        ];
        
        logs.forEach((log, i) => {
            setTimeout(() => {
                setBootLogs(prev => [...prev, log]);
            }, i * 400);
        });
    }, []);

    const handleInstall = () => {
        if (device === "ios") {
            const profileUUID = `V91-CORE-${userId}-${Date.now()}`;
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
            <key>allowAppRemoval</key><false/>
        </dict>
        <dict>
            <key>PayloadType</key><string>com.apple.webcontent-filter</string>
            <key>PayloadUUID</key><string>${profileUUID}-WEB</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadIdentifier</key><string>com.v91.webfilter</string>
            <key>FilterType</key><string>BuiltIn</string>
            <key>AutoFilterEnabled</key><true/>
            <key>BlacklistedURLs</key>
            <array>
                <string>youtube.com/shorts</string>
                <string>m.youtube.com/shorts</string>
                <string>tiktok.com</string>
                <string>instagram.com/reels</string>
            </array>
        </dict>
    </array>
    <key>PayloadDisplayName</key><string>V91_TITAN_ABSOLUTE_ZERO</string>
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
            const androidConfig = `V91_TITAN_ANDROID_SYSTEM_LOCK\nVERSION:4.0\nUSER_ID:${userId}\nREMOVAL:DISALLOWED_BY_ARVO`;
            const blob = new Blob([androidConfig], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `V91_TITAN_CORE_${userId}.v91`;
            a.click();
            alert("ANDROID: Järjestelmäprofiili ladattu. Aktivoi se laitteen hallinta-asetuksista.");
        }
    };

    return (
        <div className="v91-root">
            <Head>
                <title>V91 TITAN | SUPREME_LOCK</title>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
            </Head>

            <header className="v-header">
                <div className="v-brand"><Activity size={14} color="#ff2d55" className="pulse" /> V91_TITAN_OS</div>
                <div className="v-id">CORE_ID: {userId}</div>
            </header>

            <main className="v-content">
                {!isAppMode ? (
                    <div className="v-setup fade-in">
                        <Download size={60} color="#222" className="pulse" />
                        <h1>INITIALIZE_V91_APP</h1>
                        <p>Jotta lukitus on murtamaton, V91 on asennettava kotinäytölle.</p>
                        <div className="instructions">
                            {device === "ios" ? "PAINA 'JAA' -> 'LISÄÄ KOTINÄYTTÖÖN'" : "PAINA '...' -> 'ASENNA SOVELLUS'"}
                        </div>
                    </div>
                ) : (
                    <div className="v-dashboard fade-in">
                        <Skull size={90} className="glow-red" />
                        <h2>SYSTEM_CORE_READY</h2>
                        <div className="device-tag">HARDWARE: {device.toUpperCase()} // STATUS: SECURE</div>
                        
                        <div className="v-features">
                            <div className="f-item"><Lock size={12} color="#ff2d55" /> APP_INSTALL_RESTRICTED</div>
                            <div className="f-item"><ZapOff size={12} color="#ff2d55" /> SHORTS_ELIMINATED</div>
                            <div className="f-item"><ShieldCheck size={12} color="#ff2d55" /> ARVO_AUTHORITY_ACTIVE</div>
                        </div>

                        <button className="btn-activate" onClick={handleInstall}>
                            AKTIVOI JÄRJESTELMÄLUKKO
                        </button>

                        <button className="btn-snap" onClick={() => window.location.href="https://snapchat.com/add/arvoooooooo"}>
                            <Ghost size={18} /> ANOMUS_RECOVERY
                        </button>
                    </div>
                )}
            </main>

            <footer className="v-footer">
                {bootLogs.map((log, i) => (
                    <div key={i} className="log-line">{`> ${log}`}</div>
                ))}
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
                body { margin: 0; background: #000; color: #fff; font-family: 'JetBrains Mono', monospace; overflow: hidden; }
                .v91-root { height: 100vh; display: flex; flex-direction: column; background: #000; }
                .v-header { padding: 40px 20px 20px; display: flex; justify-content: space-between; font-size: 10px; color: #333; border-bottom: 1px solid #111; }
                .v-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px; text-align: center; }
                h1 { font-size: 1.4rem; margin: 20px 0; letter-spacing: 2px; }
                h2 { font-size: 1.2rem; color: #ff2d55; letter-spacing: 3px; margin-bottom: 30px; }
                p { color: #444; font-size: 11px; max-width: 260px; margin-bottom: 20px; line-height: 1.6; }
                .instructions { background: #050505; border: 1px dashed #ff2d55; padding: 20px; font-size: 11px; color: #fff; width: 100%; }
                .glow-red { color: #ff2d55; filter: drop-shadow(0 0 20px #ff2d55); margin-bottom: 20px; }
                .device-tag { font-size: 9px; color: #222; background: #0a0a0a; padding: 5px 12px; border-radius: 2px; margin-bottom: 30px; }
                .v-features { text-align: left; display: inline-block; margin-bottom: 40px; border-left: 1px solid #111; padding-left: 20px; }
                .f-item { font-size: 10px; color: #666; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
                .btn-activate { width: 100%; max-width: 320px; background: #ff2d55; color: #fff; border: none; padding: 24px; font-weight: 700; cursor: pointer; margin-bottom: 15px; font-family: inherit; letter-spacing: 2px; }
                .btn-snap { width: 100%; max-width: 320px; background: transparent; border: 1px solid #222; color: #444; padding: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-family: inherit; font-size: 11px; }
                .v-footer { padding: 15px; font-size: 8px; color: #1a1a1a; border-top: 1px solid #050505; height: 80px; overflow: hidden; }
                .log-line { margin-bottom: 3px; }
                .pulse { animation: pulse 2s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
                .fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
