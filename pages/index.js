import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Skull, ShieldAlert, Lock, Ghost, 
  Terminal, ZapOff, Activity, ChevronRight,
  ShieldCheck, AlertTriangle
} from 'lucide-react';

export default function V91TitanFinal() {
    const [step, setStep] = useState('DASHBOARD'); 
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [logs, setLogs] = useState(["BOOTING_V91_TITAN_OS...", "SYSTEM_SECURE"]);

    const addLog = (msg) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
    };

    const openSnapchat = () => {
        addLog("REDIRECTING_TO_AUTHORITY...");
        window.location.href = "https://www.snapchat.com/add/arvoooooooo?share_id=ybWZ9JvtkHA&locale=fi-FI";
    };

    const installProfile = () => {
        if (!acceptedTerms) return;
        addLog("COMPILING_HARD_LOCK_PAYLOAD...");
        
        const profileUUID = `V91-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        
        const profileXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key>
            <string>com.apple.managedsettings.restriction</string>
            <key>PayloadUUID</key>
            <string>${profileUUID}-1</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadIdentifier</key>
            <string>com.v91.restrictions</string>
            <key>ratingApps</key>
            <integer>4</integer> 
            <key>allowAppInstallation</key>
            <false/>
        </dict>
        <dict>
            <key>PayloadType</key>
            <string>com.apple.webcontent-filter</string>
            <key>PayloadUUID</key>
            <string>${profileUUID}-2</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadIdentifier</key>
            <string>com.v91.webfilter</string>
            <key>FilterType</key>
            <string>BuiltIn</string>
            <key>AutoFilterEnabled</key>
            <true/>
            <key>BlacklistedURLs</key>
            <array>
                <string>youtube.com/shorts</string>
                <string>m.youtube.com/shorts</string>
                <string>tiktok.com</string>
            </array>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>V91_TITAN_SHIELD</string>
    <key>PayloadIdentifier</key>
    <string>com.v91.titan.main</string>
    <key>PayloadRemovalDisallowed</key>
    <true/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${profileUUID}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

        const blob = new Blob([profileXML], { type: 'application/x-apple-aspen-config' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "V91_TITAN_SHIELD.mobileconfig";
        link.click();
        addLog("DOWNLOAD_COMPLETE:_INSTALL_IN_SETTINGS");
    };

    return (
        <div className="titan-root">
            <Head>
                <title>V91 TITAN | ARVO CONTROL</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
            </Head>

            <header className="t-header">
                <div className="t-logo"><Skull size={18} /> V91_TITAN_OS</div>
                <div className="t-status">ENCRYPTION: AES-256</div>
            </header>

            <main className="t-content">
                {step === 'DASHBOARD' && (
                    <div className="v-fade">
                        <div className="v-hero">
                            <ZapOff size={64} className="glow-red pulse" />
                            <h1>TITAN_PROTOCOL</h1>
                            <p>Täydellinen dopamiini-eristys. YouTube-sovellus piilotetaan ja Shorts-videot blokataan.</p>
                        </div>
                        <div className="v-btn-stack">
                            <button className="btn-v-primary" onClick={() => setStep('TERMS')}>
                                <Lock size={18} /> AKTIVOI_JÄRJESTELMÄLUKKO
                            </button>
                            <button className="btn-v-outline" onClick={() => setStep('REQUEST')}>
                                <Ghost size={18} /> ANOP_VAPAUTUSTA (SNAP)
                            </button>
                        </div>
                    </div>
                )}

                {step === 'TERMS' && (
                    <div className="v-fade t-card">
                        <h3>KÄYTTÖEHDOT</h3>
                        <div className="t-scroll">
                            <p>Hyväksymällä tämän, annat V91-järjestelmälle oikeuden hallita laitteesi sovelluksia. Lukitus on suunniteltu murtamattomaksi ilman ylipäällikön (Arvo) myöntämää lupaa.</p>
                            <p><b>Vastuunrajoitus:</b> Kehittäjä ei ole vastuussa mistään laitteelle aiheutuneista vahingoista.</p>
                        </div>
                        <label className="t-check">
                            <input type="checkbox" onChange={() => setAcceptedTerms(!acceptedTerms)} />
                            <span>HYVÄKSYN_EHDOT_JA_LUKITUKSEN</span>
                        </label>
                        <button className="btn-v-primary" disabled={!acceptedTerms} onClick={installProfile}>LATAA_PROFIILI</button>
                        <button className="btn-ghost" onClick={() => setStep('DASHBOARD')}>PERUUTA</button>
                    </div>
                )}

                {step === 'REQUEST' && (
                    <div className="v-fade t-center">
                        <Ghost size={80} color="#FFFC00" className="snap-pulse" />
                        <h2>SYSTEM_BYPASS_REQUEST</h2>
                        <p>Lukituksen poistaminen vaatii manuaalisen auditoinnin Snapchatissa.</p>
                        <button className="btn-v-snap" onClick={openSnapchat}>
                            AVAA SNAPCHAT: @ARVOOOOOOOO
                        </button>
                        <div className="t-info-box">CODE: #V91_ARVO_RECOVERY</div>
                        <button className="btn-ghost" onClick={() => setStep('DASHBOARD')}>TAKAISIN</button>
                    </div>
                )}
            </main>

            <footer className="t-footer">
                <div className="t-log-box">
                    {logs.map((log, i) => <div key={i} className="t-log-item">> {log}</div>)}
                </div>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
                
                :root { --red: #ff2d55; --bg: #000; --yellow: #FFFC00; }
                
                body { margin: 0; background: var(--bg); color: #fff; font-family: 'JetBrains Mono', monospace; overflow: hidden; }
                
                .t-header { display: flex; justify-content: space-between; padding: 25px; border-bottom: 1px solid #111; font-size: 12px; }
                .t-logo { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--red); }
                .t-status { color: #333; }

                .t-content { height: 70vh; display: flex; align-items: center; justify-content: center; padding: 20px; text-align: center; }
                
                .v-hero h1 { font-size: 3rem; letter-spacing: -3px; margin: 15px 0; }
                .v-hero p { color: #555; font-size: 13px; max-width: 350px; margin: 0 auto 40px; }

                .v-btn-stack { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 380px; }
                .btn-v-primary { background: var(--red); border: none; color: #fff; padding: 22px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-family: inherit; }
                .btn-v-primary:disabled { opacity: 0.2; cursor: not-allowed; }
                .btn-v-outline { background: transparent; border: 1px solid #222; color: #fff; padding: 20px; font-family: inherit; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
                .btn-v-snap { background: var(--yellow); color: #000; border: none; padding: 22px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 20px; font-family: inherit; }
                .btn-ghost { background: none; border: none; color: #444; font-family: inherit; cursor: pointer; margin-top: 15px; }

                .t-card { background: #080808; border: 1px solid #111; padding: 35px; max-width: 450px; width: 100%; }
                .t-scroll { height: 120px; overflow-y: auto; font-size: 11px; color: #444; text-align: left; margin-bottom: 25px; }
                .t-check { display: flex; align-items: center; gap: 10px; font-size: 11px; margin-bottom: 25px; color: #888; text-align: left; }

                .t-info-box { background: #050505; border: 1px dashed #222; padding: 15px; margin-top: 20px; color: var(--red); font-size: 12px; }

                .t-footer { position: fixed; bottom: 0; width: 100%; padding: 20px; background: #000; border-top: 1px solid #111; }
                .t-log-item { font-size: 9px; color: #222; margin-bottom: 2px; }

                .glow-red { filter: drop-shadow(0 0 10px var(--red)); }
                .pulse { animation: pulse 2s infinite; }
                .snap-pulse { animation: snap 2s infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
                @keyframes snap { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
                .v-fade { animation: fin 0.5s ease; width: 100%; display: flex; flex-direction: column; align-items: center; }
                @keyframes fin { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
