import React, { useState } from 'react';
import Head from 'next/head';
import { ShieldCheck, Unlock, Terminal, AlertOctagon, Key } from 'lucide-react';

export default function ArvoAdmin() {
    const [pass, setPass] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [targetId, setTargetId] = useState("");

    // VAIN SINÄ TIEDÄT TÄMÄN
    const MASTER_PASSWORD = "ARVO_V91_SUPREME"; 

    const checkLogin = () => {
        if (pass === MASTER_PASSWORD) setIsAuth(true);
        else alert("PÄÄSY EVÄTTY - VÄÄRÄ KOODI");
    };

    const generateMasterRelease = () => {
        const id = targetId || "GLOBAL-EMERGENCY";
        const profileXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key><string>com.apple.managedsettings.restriction</string>
            <key>PayloadUUID</key><string>RELEASE-${id}</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadIdentifier</key><string>com.v91.restrictions</string>
            <key>ratingApps</key><integer>1000</integer> 
        </dict>
    </array>
    <key>PayloadDisplayName</key><string>V91_TOTAL_RELEASE_KEY</string>
    <key>PayloadIdentifier</key><string>com.v91.titan.main</string>
    <key>PayloadRemovalDisallowed</key><false/>
    <key>PayloadType</key><string>Configuration</string>
    <key>PayloadUUID</key><string>MASTER-RELEASE-KEY</string>
    <key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>`;

        const blob = new Blob([profileXML], { type: 'application/x-apple-aspen-config' });
        window.location.href = window.URL.createObjectURL(blob);
    };

    if (!isAuth) {
        return (
            <div style={{backgroundColor:'#000',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'monospace',color:'#ff2d55'}}>
                <AlertOctagon size={80} />
                <h1>V91_RESTRICTED_AREA</h1>
                <input type="password" placeholder="SYÖTÄ MASTER-KOODI" onChange={(e)=>setPass(e.target.value)} style={{background:'#111',border:'1px solid #ff2d55',color:'#fff',padding:'15px',marginTop:'20px',textAlign:'center'}} />
                <button onClick={checkLogin} style={{background:'#ff2d55',color:'#fff',border:'none',padding:'15px 30px',marginTop:'20px',fontWeight:'bold'}}>LOG_IN</button>
            </div>
        );
    }

    return (
        <div style={{backgroundColor:'#000',minHeight:'100vh',color:'#fff',fontFamily:'monospace',padding:'40px'}}>
            <header style={{borderBottom:'1px solid #222',paddingBottom:'20px',display:'flex',alignItems:'center',gap:'20px'}}>
                <ShieldCheck size={40} color="#00ff88" />
                <h1>V91_YLI_PÄÄLLIKKÖ_HALLINTA</h1>
            </header>
            
            <div style={{marginTop:'50px',maxWidth:'500px'}}>
                <h3>HÄTÄVAPAUTUS (RECOVERY)</h3>
                <p style={{color:'#666',fontSize:'12px'}}>Tämä generoi profiilin, joka kumoaa minkä tahansa V91-lukon välittömästi.</p>
                
                <input 
                    placeholder="KÄYTTÄJÄN ID (JOS TIEDOSSA)" 
                    value={targetId}
                    onChange={(e)=>setTargetId(e.target.value)}
                    style={{width:'100%',padding:'15px',background:'#050505',border:'1px solid #333',color:'#fff',marginBottom:'20px'}}
                />

                <button onClick={generateMasterRelease} style={{width:'100%',background:'#00ff88',color:'#000',padding:'20px',fontWeight:'bold',border:'none',cursor:'pointer'}}>
                    GENERATER_MASTER_RELEASE_KEY
                </button>

                <div style={{marginTop:'50px',padding:'20px',border:'1px dashed #222'}}>
                    <h4 style={{margin:'0 0 10px 0'}}>OHJEET:</h4>
                    <ol style={{fontSize:'12px',color:'#888',lineHeight:'1.8'}}>
                        <li>Jos joku on "lukossa" ja haluaa pois:</li>
                        <li>Avaa tälle henkilölle tämä sivu HÄNEN puhelimellaan.</li>
                        <li>Kirjaudu sisään salasanallasi.</li>
                        <li>Paina vihreää nappia.</li>
                        <li>Puhelin asentaa "Release Keyn", joka ylikirjoittaa lukon.</li>
                        <li>Nyt hän voi poistaa profiilin asetuksista tai se poistuu automaattisesti.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
