import React, { useState } from 'react';
import Head from 'next/head';
import { ShieldCheck, Unlock, Terminal, AlertOctagon, Key, Activity } from 'lucide-react';

export default function ArvoAdmin() {
    const [pass, setPass] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [targetId, setTargetId] = useState("");

    const MASTER_PASSWORD = "ARVO_V91_SUPREME"; 

    const checkLogin = () => {
        if (pass === MASTER_PASSWORD) setIsAuth(true);
        else alert("ACCESS_DENIED_BY_V91_KERNEL");
    };

    const generateMasterRelease = () => {
        const id = targetId || "GLOBAL-EMERGENCY-RECOVERY";
        const profileXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key><string>com.apple.managedsettings.restriction</string>
            <key>PayloadUUID</key><string>RELEASE-${id}-${Date.now()}</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadIdentifier</key><string>com.v91.restrictions</string>
            <key>ratingApps</key><integer>1000</integer> 
        </dict>
    </array>
    <key>PayloadDisplayName</key><string>V91_MASTER_OVERRIDE</string>
    <key>PayloadIdentifier</key><string>com.v91.titan.main</string>
    <key>PayloadRemovalDisallowed</key><false/>
    <key>PayloadType</key><string>Configuration</string>
    <key>PayloadUUID</key><string>MASTER-RECOVERY-KEY-V91</string>
    <key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>`;

        const blob = new Blob([profileXML], { type: 'application/x-apple-aspen-config' });
        window.location.href = window.URL.createObjectURL(blob);
    };

    if (!isAuth) {
        return (
            <div style={{backgroundColor:'#000',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'monospace',color:'#ff2d55'}}>
                <AlertOctagon size={80} className="pulse" />
                <h1 style={{letterSpacing:'4px'}}>ADMIN_AUTH_REQUIRED</h1>
                <input 
                    type="password" 
                    placeholder="ENTER_MASTER_KEY" 
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)} 
                    style={{background:'#050505',border:'1px solid #ff2d55',color:'#fff',padding:'20px',marginTop:'30px',textAlign:'center',width:'280px',fontSize:'16px'}} 
                />
                <button onClick={checkLogin} style={{background:'#ff2d55',color:'#fff',border:'none',padding:'20px 40px',marginTop:'20px',fontWeight:'bold',cursor:'pointer',width:'320px'}}>LOGIN_TO_KERNEL</button>
                <style jsx>{`.pulse { animation: pulse 2s infinite; } @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.2;} }`}</style>
            </div>
        );
    }

    return (
        <div style={{backgroundColor:'#000',minHeight:'100vh',color:'#fff',fontFamily:'monospace',padding:'40px'}}>
            <header style={{borderBottom:'1px solid #111',paddingBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
                    <ShieldCheck size={40} color="#00ff88" />
                    <h1 style={{fontSize:'1.2rem'}}>V91_SUPREME_COMMAND</h1>
                </div>
                <Activity size={20} color="#00ff88" />
            </header>
            
            <div style={{marginTop:'60px',maxWidth:'600px',marginRight:'auto',marginLeft:'auto'}}>
                <div style={{background:'#050505',border:'1px solid #111',padding:'40px'}}>
                    <h3 style={{color:'#00ff88',marginTop:'0'}}>EMERGENCY_OVERRIDE_PROTOCOL</h3>
                    <p style={{color:'#444',fontSize:'12px',lineHeight:'1.6'}}>Tämä työkalu generoi vasta-aineen (Recovery Key), joka ylikirjoittaa minkä tahansa V91-lukon. Käytä vain jos käyttäjä on vahvistanut anomuksen.</p>
                    
                    <div style={{marginTop:'40px'}}>
                        <label style={{fontSize:'10px',color:'#333',display:'block',marginBottom:'10px'}}>TARGET_USER_ID</label>
                        <input 
                            placeholder="OPTIONAL_ID_FOR_LOGS" 
                            value={targetId}
                            onChange={(e)=>setTargetId(e.target.value)}
                            style={{width:'100%',padding:'20px',background:'#000',border:'1px solid #222',color:'#00ff88',boxSizing:'border-box',marginBottom:'20px'}}
                        />

                        <button onClick={generateMasterRelease} style={{width:'100%',background:'#00ff88',color:'#000',padding:'25px',fontWeight:'900',border:'none',cursor:'pointer',fontSize:'16px',letterSpacing:'2px'}}>
                            GENERATE_RECOVERY_KEY
                        </button>
                    </div>
                </div>

                <div style={{marginTop:'40px',padding:'20px',color:'#222',fontSize:'10px'}}>
                    {`> LOG: MASTER_ACCESS_GRANTED`} <br/>
                    {`> LOG: SYSTEM_OVERRIDE_READY`} <br/>
                    {`> LOG: AWAITING_COMMAND...`}
                </div>
            </div>
        </div>
    );
}
