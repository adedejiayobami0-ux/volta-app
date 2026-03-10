import { useState, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');`;

const css = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#0E0B1A;
  --s1:#16122A;
  --s2:#1C1733;
  --s3:#231E3D;
  --s4:#2A2449;
  --border:rgba(255,255,255,0.07);
  --text:#F0EDFF;
  --sub:#8B88A8;
  --violet:#7C5CFC;
  --purple:#A855F7;
  --pink:#F472B6;
  --green:#34D399;
  --yellow:#FBBF24;
  --sky:#38BDF8;
  --red:#F87171;
  --orange:#FB923C;
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;min-height:100vh;}

.app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);position:relative;}
.scroll{overflow-y:auto;padding-bottom:88px;min-height:100vh;}
.scroll::-webkit-scrollbar{display:none;}

/* NAV */
.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;padding:0 20px 18px;z-index:200;}
.nav-inner{background:rgba(22,18,42,0.97);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.1);border-radius:26px;display:flex;justify-content:space-around;padding:6px 0;}
.nib{display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 16px;border-radius:18px;cursor:pointer;transition:all 0.25s cubic-bezier(.34,1.56,.64,1);}
.nib.on{background:linear-gradient(135deg,var(--violet),var(--purple));}
.nib.on .niico{filter:none;opacity:1;}
.nib.on .nilbl{color:#fff;font-weight:700;}
.niico{font-size:21px;opacity:0.45;transition:all 0.2s;}
.nib:hover .niico{opacity:1;transform:scale(1.15);}
.nilbl{font-size:9px;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.05em;}

/* PAGE ANIM */
.pg{animation:pgi .28s cubic-bezier(.34,1.56,.64,1);}
@keyframes pgi{from{opacity:0;transform:translateY(16px) scale(.97);}to{opacity:1;transform:none;}}

/* ══ HOME ══════════════════════════════════════════════════════════ */
.home-hero{background:linear-gradient(160deg,#1A1040 0%,#120D2E 50%,var(--bg) 100%);padding:28px 20px 0;position:relative;overflow:hidden;}
.hero-glow{position:absolute;top:-80px;right:-80px;width:300px;height:300px;background:radial-gradient(circle,rgba(124,92,252,0.25) 0%,transparent 70%);pointer-events:none;}
.hero-glow2{position:absolute;bottom:-40px;left:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%);pointer-events:none;}

.hero-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px;position:relative;z-index:1;}
.hero-left{}
.hero-hi{font-size:13px;font-weight:600;color:var(--sub);letter-spacing:.04em;text-transform:uppercase;margin-bottom:4px;}
.hero-name{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:var(--text);letter-spacing:-.5px;}
.hero-av{width:46px;height:46px;border-radius:15px;background:linear-gradient(135deg,#7C5CFC,#A855F7,#F472B6);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:19px;color:#fff;cursor:pointer;box-shadow:0 4px 20px rgba(124,92,252,.5);transition:transform .25s cubic-bezier(.34,1.56,.64,1);}
.hero-av:hover{transform:scale(1.12) rotate(-6deg);}

/* SPENDING RING */
.ring-wrap{display:flex;gap:20px;align-items:center;padding:0 0 28px;position:relative;z-index:1;}
.ring-chart{width:110px;height:110px;flex-shrink:0;position:relative;}
.ring-svg{width:100%;height:100%;transform:rotate(-90deg);}
.ring-track{fill:none;stroke:rgba(255,255,255,.07);stroke-width:10;}
.ring-fill{fill:none;stroke:url(#rg);stroke-width:10;stroke-linecap:round;stroke-dasharray:283;stroke-dashoffset:110;animation:ringanim 1.4s cubic-bezier(.34,1.56,.64,1) forwards;}
@keyframes ringanim{from{stroke-dashoffset:283;}to{stroke-dashoffset:110;}}
.ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.ring-pct{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;color:var(--text);line-height:1;}
.ring-lbl{font-size:9px;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}
.ring-info{flex:1;}
.ring-big{font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:700;color:var(--text);letter-spacing:-1px;line-height:1;margin-bottom:4px;}
.ring-big span{background:linear-gradient(135deg,var(--violet),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.ring-desc{font-size:13px;color:var(--sub);font-weight:500;margin-bottom:14px;line-height:1.5;}
.ring-pills{display:flex;gap:7px;}
.rpill{padding:5px 12px;border-radius:100px;font-size:11px;font-weight:700;border:1px solid;}
.rpill-g{background:rgba(52,211,153,.1);border-color:rgba(52,211,153,.2);color:var(--green);}
.rpill-r{background:rgba(248,113,113,.1);border-color:rgba(248,113,113,.2);color:var(--red);}

/* AI BAR */
.ai-bar{background:linear-gradient(90deg,rgba(124,92,252,.15),rgba(168,85,247,.1));border-top:1px solid rgba(124,92,252,.2);border-bottom:1px solid rgba(124,92,252,.15);padding:13px 20px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all .2s;}
.ai-bar:hover{background:linear-gradient(90deg,rgba(124,92,252,.22),rgba(168,85,247,.16));}
.ai-dot-wrap{width:36px;height:36px;background:linear-gradient(135deg,var(--violet),var(--purple));border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;box-shadow:0 4px 14px rgba(124,92,252,.4);}
.ai-bar-t{font-size:14px;font-weight:700;color:var(--text);}
.ai-bar-s{font-size:12px;color:var(--sub);font-weight:500;}
.ai-bar-arrow{margin-left:auto;font-size:20px;color:var(--sub);transition:transform .2s;}
.ai-bar:hover .ai-bar-arrow{transform:translateX(4px);color:var(--violet);}
.ai-pulse{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:plz 2s infinite;margin-right:4px;}
@keyframes plz{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.8);}}

/* INNER CONTENT */
.pad{padding:0 16px;}

/* STORY SCROLL */
.stories{display:flex;gap:10px;overflow-x:auto;padding:18px 16px 0;margin-bottom:20px;}
.stories::-webkit-scrollbar{display:none;}
.story{flex-shrink:0;width:76px;display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer;}
.story-ring{width:64px;height:64px;border-radius:50%;padding:2.5px;transition:transform .2s cubic-bezier(.34,1.56,.64,1);}
.story-ring:hover{transform:scale(1.08);}
.story-ring.active{background:linear-gradient(135deg,var(--violet),var(--pink),var(--yellow));}
.story-ring.inactive{background:rgba(255,255,255,.1);}
.story-inner{width:100%;height:100%;border-radius:50%;background:var(--s2);border:2px solid var(--bg);display:flex;align-items:center;justify-content:center;font-size:26px;}
.story-lbl{font-size:10px;font-weight:600;color:var(--sub);text-align:center;line-height:1.3;}
.story.has-update .story-lbl{color:var(--text);}

/* SECTION HEADING */
.sec{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;letter-spacing:-.3px;color:var(--text);}
.secrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.seeall{font-size:12px;font-weight:700;color:var(--violet);cursor:pointer;letter-spacing:.02em;}
.seeall:hover{color:var(--purple);}

/* HORIZONTAL CARD SCROLL */
.hscroll{display:flex;gap:12px;overflow-x:auto;padding:0 16px 4px;margin-bottom:22px;}
.hscroll::-webkit-scrollbar{display:none;}

/* WIDE FEATURE CARD */
.wfc{flex-shrink:0;width:240px;border-radius:22px;padding:18px;cursor:pointer;position:relative;overflow:hidden;transition:all .22s cubic-bezier(.34,1.56,.64,1);}
.wfc:hover{transform:translateY(-4px) scale(1.02);}
.wfc:active{transform:scale(.96);}
.wfc-violet{background:linear-gradient(140deg,#2D1B69,#1A103E);border:1px solid rgba(124,92,252,.25);}
.wfc-pink{background:linear-gradient(140deg,#3D1050,#1E0B2E);border:1px solid rgba(244,114,182,.2);}
.wfc-teal{background:linear-gradient(140deg,#0D3530,#081E1C);border:1px solid rgba(52,211,153,.2);}
.wfc-sky{background:linear-gradient(140deg,#0C2545,#071428);border:1px solid rgba(56,189,248,.2);}
.wfc-glow{position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;pointer-events:none;opacity:.6;}
.wfc-label{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;display:flex;align-items:center;gap:5px;}
.wfc-num{font-family:'Space Grotesk',sans-serif;font-size:38px;font-weight:700;letter-spacing:-1.5px;line-height:1;margin-bottom:5px;}
.wfc-desc{font-size:12px;color:rgba(255,255,255,.5);font-weight:500;line-height:1.6;margin-bottom:14px;}
.wfc-bar{height:4px;background:rgba(255,255,255,.08);border-radius:100px;overflow:hidden;}
.wfc-bfill{height:100%;border-radius:100px;animation:wfba 1.2s cubic-bezier(.34,1.56,.64,1) forwards;}
@keyframes wfba{from{width:0%!important;}}
.wfc-tags{display:flex;gap:6px;flex-wrap:wrap;}
.wfc-tag{padding:4px 9px;border-radius:100px;font-size:10px;font-weight:700;background:rgba(255,255,255,.08);color:rgba(255,255,255,.55);}
.wfc-arrow{position:absolute;bottom:16px;right:16px;width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .2s;}
.wfc:hover .wfc-arrow{background:rgba(255,255,255,.15);transform:translate(2px,-2px);}

/* BUDGET CATS */
.bcat{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:22px;}
.bc{background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:14px;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.bc:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.12);}
.bc-ico{font-size:22px;margin-bottom:8px;}
.bc-name{font-size:12px;font-weight:600;color:var(--sub);margin-bottom:2px;}
.bc-val{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px;}
.bc-track{height:4px;background:rgba(255,255,255,.06);border-radius:100px;overflow:hidden;}
.bc-fill{height:100%;border-radius:100px;animation:bcf 1.2s cubic-bezier(.34,1.56,.64,1) forwards;}
@keyframes bcf{from{width:0%!important;}}

/* ACTIVITY */
.act-list{display:flex;flex-direction:column;gap:1px;background:var(--s1);border:1px solid var(--border);border-radius:22px;overflow:hidden;margin-bottom:14px;}
.act{display:flex;align-items:center;gap:13px;padding:14px 16px;background:var(--s1);cursor:pointer;transition:background .15s;}
.act:hover{background:var(--s2);}
.act+.act{border-top:1px solid var(--border);}
.a-ico{width:42px;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.a-name{font-size:14px;font-weight:700;color:var(--text);}
.a-sub{font-size:12px;color:var(--sub);font-weight:500;margin-top:1px;}
.a-val{font-size:14px;font-weight:800;color:var(--red);text-align:right;}
.a-time{font-size:11px;color:var(--sub);text-align:right;margin-top:1px;}

/* GENERIC CARD */
.card{background:var(--s1);border:1px solid var(--border);border-radius:22px;padding:20px;margin-bottom:14px;}
.card-sm{padding:16px;}

/* ROW */
.row{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid var(--border);}
.row:last-child{border-bottom:none;padding-bottom:0;}
.r-ico{width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
.r-name{font-size:14px;font-weight:700;color:var(--text);}
.r-sub{font-size:12px;color:var(--sub);font-weight:500;margin-top:1px;}
.r-val{font-size:15px;font-weight:800;}

/* TAG */
.tag{display:inline-flex;align-items:center;gap:3px;padding:4px 10px;border-radius:100px;font-size:11px;font-weight:700;}
.tg{background:rgba(52,211,153,.1);color:var(--green);}
.tp{background:rgba(168,85,247,.1);color:var(--purple);}
.ts{background:rgba(56,189,248,.1);color:var(--sky);}
.tr{background:rgba(248,113,113,.1);color:var(--red);}
.ty{background:rgba(251,191,36,.1);color:var(--yellow);}
.to{background:rgba(251,146,60,.1);color:var(--orange);}
.tc{background:rgba(244,114,182,.1);color:var(--pink);}
.tm{background:rgba(255,255,255,.07);color:var(--sub);}

/* PROGRESS */
.prog{margin-bottom:16px;}
.proghead{display:flex;justify-content:space-between;margin-bottom:8px;}
.progname{font-size:13px;font-weight:700;color:var(--text);}
.progval{font-size:12px;color:var(--sub);font-weight:600;}
.progtrack{height:5px;background:rgba(255,255,255,.06);border-radius:100px;overflow:hidden;}
.progfill{height:100%;border-radius:100px;animation:pfa 1.2s cubic-bezier(.34,1.56,.64,1) forwards;}
@keyframes pfa{from{width:0%!important;}}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:15px 24px;border-radius:16px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:800;cursor:pointer;border:none;width:100%;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.btn:active{transform:scale(.96);}
.btn-violet{background:linear-gradient(135deg,var(--violet),var(--purple));color:#fff;box-shadow:0 6px 22px rgba(124,92,252,.4);}
.btn-violet:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(124,92,252,.5);}
.btn-ghost{background:var(--s2);color:var(--text);border:1px solid var(--border);}
.btn-ghost:hover{border-color:var(--violet);}
.btn-green{background:linear-gradient(135deg,#059669,var(--green));color:#fff;box-shadow:0 4px 16px rgba(52,211,153,.3);}
.btn-sm{padding:10px 18px;font-size:13px;width:auto;border-radius:12px;}

/* FORM */
.field{margin-bottom:16px;}
.field label{display:block;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--sub);margin-bottom:7px;}
.field input,.field select,.field textarea{width:100%;padding:13px 16px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:var(--text);background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:14px;outline:none;transition:all .2s;}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--violet);background:rgba(124,92,252,.06);box-shadow:0 0 0 3px rgba(124,92,252,.12);}
.field textarea{resize:none;line-height:1.6;}
.field select option{background:var(--s2);}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* BOTTOM SHEET */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:400;display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(10px);animation:ovl .2s ease;}
@keyframes ovl{from{opacity:0;}to{opacity:1;}}
.sheet{background:#1C1733;border:1px solid rgba(255,255,255,.08);border-radius:28px 28px 0 0;padding:8px 22px 44px;width:100%;max-width:430px;animation:shi .35s cubic-bezier(.34,1.56,.64,1);max-height:90vh;overflow-y:auto;}
.sheet::-webkit-scrollbar{display:none;}
@keyframes shi{from{transform:translateY(100%);}to{transform:translateY(0);}}
.shandle{width:40px;height:4px;background:rgba(255,255,255,.1);border-radius:2px;margin:14px auto 22px;}
.stitle{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;margin-bottom:18px;letter-spacing:-.3px;}
.sact{display:flex;gap:10px;margin-top:18px;}

/* PAGE HEAD */
.phead{display:flex;align-items:center;gap:12px;padding:22px 16px 0;margin-bottom:20px;}
.hbtn{width:42px;height:42px;border-radius:14px;background:var(--s2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:19px;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);flex-shrink:0;}
.hbtn:hover{transform:scale(1.1);border-color:var(--violet);box-shadow:0 0 0 3px rgba(124,92,252,.15);}
.ptitle{font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;letter-spacing:-.4px;color:var(--text);}
.psub{font-size:12px;color:var(--sub);font-weight:500;margin-top:1px;}

/* INSIGHT */
.insight{background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.15);border-radius:16px;padding:14px 16px;margin-bottom:14px;display:flex;gap:10px;}
.insight-t{font-size:13px;font-weight:800;color:var(--green);margin-bottom:2px;}
.insight-b{font-size:13px;color:rgba(52,211,153,.65);font-weight:500;line-height:1.6;}

/* GROCERY */
.glist{display:flex;flex-direction:column;gap:1px;background:var(--s1);border:1px solid var(--border);border-radius:22px;overflow:hidden;margin-bottom:14px;}
.gi{display:flex;align-items:center;gap:12px;padding:13px 16px;background:var(--s1);transition:background .15s;}
.gi:hover{background:var(--s2);}
.gi+.gi{border-top:1px solid var(--border);}
.gck{width:24px;height:24px;border-radius:8px;border:2px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:12px;color:transparent;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.gck.on{background:var(--green);border-color:var(--green);color:#0a2016;transform:scale(1.1);}
.gn{flex:1;font-size:14px;font-weight:600;color:var(--text);}
.gi.done .gn{text-decoration:line-through;color:var(--sub);}
.gp{font-size:13px;font-weight:800;color:var(--green);}
.gs{font-size:10px;color:var(--sub);}
.gd-head{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--sub);padding:12px 16px 8px;}

/* RIDES */
.ropt{background:var(--s1);border:2px solid var(--border);border-radius:18px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:10px;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.ropt:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.12);}
.ropt.sel{border-color:var(--violet);background:rgba(124,92,252,.07);transform:scale(1.02);}
.remo{width:52px;height:44px;background:rgba(255,255,255,.05);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:27px;flex-shrink:0;}
.rname{font-size:15px;font-weight:700;color:var(--text);}
.rmeta{font-size:12px;color:var(--sub);font-weight:500;margin-top:2px;display:flex;gap:8px;}
.rprice{font-size:19px;font-weight:800;color:var(--green);margin-left:auto;}
.reta{font-size:11px;color:var(--sub);text-align:right;margin-top:2px;}

/* FOOD */
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
.fd{background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:14px;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.fd:hover{transform:translateY(-4px);border-color:var(--violet);}
.fd:active{transform:scale(.93);}
.fdemo{font-size:38px;display:block;margin-bottom:10px;}
.fdname{font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px;}
.fdmeta{font-size:11px;color:var(--sub);display:flex;justify-content:space-between;}
.fdrat{color:var(--yellow);font-weight:700;}

/* EVENTS */
.evcard{background:var(--s1);border:1px solid var(--border);border-radius:22px;overflow:hidden;margin-bottom:14px;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.evcard:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.12);}
.ev-head{background:linear-gradient(135deg,rgba(124,92,252,.15),rgba(168,85,247,.08));padding:18px 18px 14px;border-bottom:1px solid var(--border);}
.ev-top{display:flex;gap:14px;align-items:flex-start;margin-bottom:12px;}
.ev-date{background:rgba(124,92,252,.15);border:1px solid rgba(124,92,252,.25);border-radius:14px;padding:10px 13px;text-align:center;min-width:56px;flex-shrink:0;}
.ev-mon{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--violet);}
.ev-day{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700;color:var(--text);line-height:1.1;}
.ev-name{font-size:17px;font-weight:800;color:var(--text);margin-bottom:4px;}
.ev-loc{font-size:12px;color:var(--sub);font-weight:500;margin-bottom:10px;}
.ev-pills{display:flex;gap:7px;flex-wrap:wrap;}
.ev-guests{padding:14px 18px;border-bottom:1px solid var(--border);}
.ev-gt{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--sub);margin-bottom:10px;}
.ev-guest{display:flex;align-items:center;gap:9px;margin-bottom:8px;}
.ev-guest:last-child{margin-bottom:0;}
.ev-g-av{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--s3),var(--s4));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--sub);flex-shrink:0;}
.ev-g-name{font-size:13px;font-weight:700;color:var(--text);min-width:68px;}
.ev-g-tags{display:flex;gap:5px;flex-wrap:wrap;}
.atag{padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;background:rgba(248,113,113,.12);color:var(--red);}
.no-allergy{font-size:11px;color:var(--sub);}
.ev-actions{display:flex;border-top:1px solid var(--border);}
.ev-btn{flex:1;padding:13px;text-align:center;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;color:var(--sub);border-right:1px solid var(--border);}
.ev-btn:last-child{border-right:none;}
.ev-btn:hover{background:rgba(255,255,255,.04);color:var(--text);}

/* NOTES */
.ngrid{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
.nc{background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:15px;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.nc:hover{transform:translateY(-3px) rotate(-.5deg);border-color:rgba(255,255,255,.12);}
.nc-title{font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px;}
.nc-body{font-size:12px;color:var(--sub);line-height:1.65;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:11px;font-weight:500;}
.nc-foot{display:flex;align-items:center;justify-content:space-between;}
.nc-date{font-size:10px;color:var(--sub);}

/* WEATHER */
.wx-hero{background:linear-gradient(160deg,#0C1E35,#071428);border:1px solid rgba(56,189,248,.15);border-radius:24px;padding:24px;margin-bottom:14px;position:relative;overflow:hidden;}
.wx-hero::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(56,189,248,.12),transparent 70%);}
.wx-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;position:relative;z-index:1;}
.wx-temp-main{font-family:'Space Grotesk',sans-serif;font-size:80px;font-weight:700;letter-spacing:-4px;line-height:1;color:var(--text);}
.wx-right{text-align:right;}
.wx-icon-big{font-size:56px;display:block;margin-bottom:4px;animation:wxfl 3s ease-in-out infinite;}
@keyframes wxfl{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
.wx-desc{font-size:14px;color:var(--sub);font-weight:600;}
.wx-feels{font-size:12px;color:rgba(56,189,248,.6);font-weight:600;margin-top:2px;}
.wx-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;position:relative;z-index:1;}
.wxs{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;text-align:center;}
.wxsv{font-size:17px;font-weight:800;color:var(--text);margin-bottom:2px;}
.wxsl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--sub);}

/* HOURLY */
.hourly{display:flex;gap:10px;overflow-x:auto;padding:0 0 4px;margin-bottom:14px;}
.hourly::-webkit-scrollbar{display:none;}
.hr{flex-shrink:0;background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:12px 14px;text-align:center;min-width:64px;transition:all .2s;}
.hr:hover{border-color:var(--sky);transform:translateY(-2px);}
.hr-time{font-size:10px;font-weight:700;color:var(--sub);text-transform:uppercase;margin-bottom:7px;}
.hr-ico{font-size:24px;display:block;margin-bottom:7px;}
.hr-t{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--text);}

.route{background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:16px;margin-bottom:10px;display:flex;gap:13px;align-items:center;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.route:hover{transform:translateX(5px);border-color:var(--green);}
.rt-dot{width:44px;height:44px;border-radius:13px;background:rgba(52,211,153,.1);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
.rt-name{font-size:14px;font-weight:700;color:var(--text);margin-bottom:5px;}
.rt-tags{display:flex;gap:5px;flex-wrap:wrap;}
.rt-rat{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:var(--yellow);}

/* AI CHAT */
.chatbox{display:flex;flex-direction:column;height:calc(100vh - 175px);min-height:420px;padding:0 16px;}
.chatmsgs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:13px;padding-bottom:14px;}
.chatmsgs::-webkit-scrollbar{display:none;}
.cm{display:flex;gap:9px;animation:cmpop .28s cubic-bezier(.34,1.56,.64,1);}
@keyframes cmpop{from{opacity:0;transform:translateY(10px) scale(.9);}to{opacity:1;transform:none;}}
.cm.user{flex-direction:row-reverse;}
.cav{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0;}
.cav.ai{background:linear-gradient(135deg,var(--violet),var(--purple));color:#fff;}
.cav.user{background:linear-gradient(135deg,var(--violet),var(--pink));color:#fff;}
.cbub{max-width:78%;padding:12px 15px;border-radius:18px;font-size:14px;line-height:1.62;font-weight:500;}
.cm.ai .cbub{background:var(--s2);border:1px solid var(--border);border-top-left-radius:4px;color:var(--text);}
.cm.user .cbub{background:linear-gradient(135deg,var(--violet),var(--purple));color:#fff;border-top-right-radius:4px;}
.chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;}
.chip{background:var(--s2);border:1px solid var(--border);border-radius:100px;padding:8px 14px;font-size:12px;font-weight:700;color:var(--sub);cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
.chip:hover{border-color:var(--violet);color:var(--violet);transform:translateY(-2px);}
.chatbar{display:flex;gap:8px;background:var(--s2);border:1px solid var(--border);border-radius:18px;padding:5px 5px 5px 15px;transition:border-color .2s;}
.chatbar:focus-within{border-color:var(--violet);}
.chatin{flex:1;background:none;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:var(--text);outline:none;}
.chatin::placeholder{color:var(--sub);}
.chatsend{width:40px;height:40px;background:linear-gradient(135deg,var(--violet),var(--purple));border:none;border-radius:13px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:#fff;transition:all .2s cubic-bezier(.34,1.56,.64,1);flex-shrink:0;}
.chatsend:hover{transform:scale(1.1) rotate(-6deg);}
.typing{display:flex;gap:4px;padding:2px 0;}
.typing span{width:7px;height:7px;background:var(--sub);border-radius:50%;animation:bl 1.2s ease-in-out infinite;}
.typing span:nth-child(2){animation-delay:.2s;}
.typing span:nth-child(3){animation-delay:.4s;}
@keyframes bl{0%,80%,100%{transform:scale(.7);opacity:.4;}40%{transform:scale(1.1);opacity:1;}}

/* TOAST */
.toast{position:fixed;bottom:106px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--violet),var(--purple));color:#fff;padding:12px 24px;border-radius:100px;font-size:13px;font-weight:700;z-index:500;box-shadow:0 8px 26px rgba(124,92,252,.5);animation:tion .3s cubic-bezier(.34,1.56,.64,1);white-space:nowrap;}
@keyframes tion{from{opacity:0;transform:translateX(-50%) scale(.7);}to{opacity:1;transform:translateX(-50%) scale(1);}}

/* SUCCESS */
.succ{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 24px;min-height:65vh;}
.succ-ico{font-size:80px;margin-bottom:20px;animation:spop .5s cubic-bezier(.34,1.56,.64,1);}
@keyframes spop{from{transform:scale(0) rotate(-15deg);}to{transform:scale(1) rotate(0);}}
.succ-t{font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;letter-spacing:-.5px;margin-bottom:8px;}
.succ-s{font-size:15px;color:var(--sub);font-weight:500;margin-bottom:28px;line-height:1.6;}

/* DIV */
.divider{height:1px;background:var(--border);margin:18px 0;}
`;

const MOCK={
  budget:{total:3500,spent:2140,cats:[
    {name:"Groceries",spent:480,limit:600,color:"var(--green)",ico:"🛒"},
    {name:"Subscriptions",spent:127,limit:150,color:"var(--purple)",ico:"📦"},
    {name:"Dining",spent:310,limit:400,color:"var(--pink)",ico:"🍽️"},
    {name:"Transport",spent:95,limit:200,color:"var(--sky)",ico:"🚗"},
    {name:"Entertainment",spent:68,limit:100,color:"var(--yellow)",ico:"🎬"},
  ]},
  subs:[
    {name:"Netflix",cost:15.99,cat:"Entertainment",icon:"🎬",used:true},
    {name:"Spotify",cost:9.99,cat:"Music",icon:"🎵",used:true},
    {name:"Adobe CC",cost:54.99,cat:"Work",icon:"🎨",used:true},
    {name:"NYT",cost:4.99,cat:"News",icon:"📰",used:false},
    {name:"Gym",cost:29.99,cat:"Health",icon:"💪",used:true},
    {name:"Hulu",cost:12.99,cat:"Streaming",icon:"📺",used:false},
  ],
  groceries:[
    {id:1,name:"Organic Milk (1 gal)",price:5.49,store:"Whole Foods",checked:false},
    {id:2,name:"Sourdough Bread",price:6.99,store:"Trader Joe's",checked:false},
    {id:3,name:"Chicken Breast (2lb)",price:9.99,store:"Walmart",checked:true},
    {id:4,name:"Baby Spinach",price:3.99,store:"Whole Foods",checked:false},
    {id:5,name:"Greek Yogurt",price:4.49,store:"Trader Joe's",checked:true},
    {id:6,name:"Olive Oil",price:8.99,store:"Costco",checked:false},
    {id:7,name:"Eggs (dozen)",price:4.29,store:"Walmart",checked:false},
    {id:8,name:"Cherry Tomatoes",price:3.49,store:"Trader Joe's",checked:false},
  ],
  events:[
    {id:1,name:"Dinner at My Place",month:"MAR",day:"22",time:"7:00 PM",location:"123 Oak Street",emoji:"🍽️",
     guests:[{name:"Sarah K.",allergies:["Gluten","Dairy"],av:"SK"},{name:"Marcus T.",allergies:["Nuts"],av:"MT"},{name:"Priya S.",allergies:[],av:"PS"},{name:"James L.",allergies:["Shellfish"],av:"JL"}]},
    {id:2,name:"Birthday Brunch",month:"APR",day:"5",time:"11:00 AM",location:"The Garden Cafe",emoji:"🎂",
     guests:[{name:"Mom",allergies:[],av:"M"},{name:"Dad",allergies:["Lactose"],av:"D"},{name:"Sis",allergies:[],av:"S"}]},
  ],
  notes:[
    {id:1,title:"Weekly goals",body:"Finish Volta prototype, go for a run Tuesday, call dentist, prep groceries Sunday",tag:"Personal",date:"Today"},
    {id:2,title:"Dinner party ideas",body:"Mushroom risotto, roasted veggies — check Sarah's gluten allergy before shopping",tag:"Food",date:"Yesterday"},
    {id:3,title:"Volta next steps",body:"Add Supabase backend, AI improvements, mobile responsive, push notifications, real APIs",tag:"Work",date:"Mar 8"},
    {id:4,title:"Running playlist",body:"Update Spotify — add tempo tracks for 5K training block starting next week",tag:"Health",date:"Mar 7"},
    {id:5,title:"Book recommendations",body:"The Design of Everyday Things, Stolen Focus, Project Hail Mary — check library first",tag:"Personal",date:"Mar 5"},
    {id:6,title:"Budget audit",body:"Review subscriptions monthly — NYT and Hulu unused, consider pausing until needed",tag:"Finance",date:"Mar 3"},
  ],
  weather:{temp:62,feels:58,desc:"Partly Cloudy",icon:"⛅",humidity:65,wind:12,uv:4,high:67,low:54},
  hourly:[
    {t:"Now",i:"⛅",temp:62},{t:"2pm",i:"🌤",temp:64},{t:"4pm",i:"☀️",temp:67},{t:"6pm",i:"🌤",temp:65},{t:"8pm",i:"🌙",temp:60},{t:"10pm",i:"🌙",temp:57},{t:"12am",i:"🌑",temp:54},
  ],
  routes:[
    {name:"Riverside Loop",distance:"4.2 mi",time:"42 min",elev:"+180ft",rating:4.8,tags:["Paved","Scenic"],traffic:"Low"},
    {name:"Park Trail North",distance:"3.1 mi",time:"31 min",elev:"+60ft",rating:4.5,tags:["Flat","Popular"],traffic:"Moderate"},
    {name:"Harbor Run",distance:"5.5 mi",time:"55 min",elev:"+240ft",rating:4.9,tags:["Challenging","Views"],traffic:"Low"},
  ],
};

const AI_R={
  default:"Hey Alex! I'm Volta AI ✦\n\nI know your **full picture** — budget, subs, groceries, events, rides, weather. What do you need?",
  budget:"You've spent **$2,140 of $3,500** this month — that's 61%. **Dining is close** at 78% used. Cook in 2 more nights and you'll easily finish under budget!",
  subs:"**Hulu and NYT** haven't been touched this month — that's **$17.98 wasted**. Cancel both and save **$215 a year**. Want me to remind you?",
  grocery:"For your list this week, **Walmart wins at ~$38.20** vs $51.80 at Whole Foods. That's **$13.60 saved** — more than a Spotify month.",
  ride:"Right now: **UberX ~$12–16** arrives in 4 min. **Lyft Standard ~$11–14** in 5 min. Lyft is cheaper if time isn't tight!",
  event:"For your **Mar 22 dinner** — 3 of 4 guests have dietary restrictions. I'd suggest **herb-crusted salmon with roasted potatoes** — covers Gluten, Nut, and Shellfish-free!",
  weather:"**62°F and partly cloudy** — perfect for a run! Best window is **5–7 PM**. The **Riverside Loop** has low traffic right now and a 4.8 rating.",
  savings:"You could save **$231 this month**: cancel 2 unused subs ($18), shop at Walmart ($52), cook at home 2 more nights ($40), and batch your grocery trip ($16). Small changes!",
};
function getReply(m){
  const l=m.toLowerCase();
  if(l.includes("budget")||l.includes("spend")) return AI_R.budget;
  if(l.includes("sub")||l.includes("cancel")) return AI_R.subs;
  if(l.includes("grocer")||l.includes("shop")) return AI_R.grocery;
  if(l.includes("uber")||l.includes("lyft")||l.includes("ride")) return AI_R.ride;
  if(l.includes("event")||l.includes("dinner")||l.includes("allerg")) return AI_R.event;
  if(l.includes("weather")||l.includes("run")) return AI_R.weather;
  if(l.includes("save")||l.includes("tip")) return AI_R.savings;
  return AI_R.default;
}

// ──────────────────────────────────────────────────────────────────────────────

function Home({go}){
  const left=MOCK.budget.total-MOCK.budget.spent;
  const pct=Math.round((MOCK.budget.spent/MOCK.budget.total)*100);
  const grocLeft=MOCK.groceries.filter(g=>!g.checked).length;

  const circumference=2*Math.PI*45; // r=45 for 110px circle


  return(
    <div className="pg">
      {/* HERO */}
      <div className="home-hero">
        <div className="hero-glow"/><div className="hero-glow2"/>
        <div className="hero-row">
          <div>
            <div className="hero-hi">Tuesday, March 10</div>
            <div className="hero-name">Alex's Dashboard 👋</div>
          </div>
          <div className="hero-av">A</div>
        </div>
        {/* SPENDING RING */}
        <div className="ring-wrap">
          <div className="ring-chart">
            <svg className="ring-svg" viewBox="0 0 110 110">
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C5CFC"/>
                  <stop offset="100%" stopColor="#F472B6"/>
                </linearGradient>
              </defs>
              <circle className="ring-track" cx="55" cy="55" r="45"/>
              <circle className="ring-fill" cx="55" cy="55" r="45"
                style={{strokeDashoffset:circumference*(1-pct/100)}}/>
            </svg>
            <div className="ring-center">
              <div className="ring-pct">{pct}%</div>
              <div className="ring-lbl">used</div>
            </div>
          </div>
          <div className="ring-info">
            <div className="ring-big">$<span>{left.toLocaleString()}</span></div>
            <div className="ring-desc">left this month<br/>${MOCK.budget.spent.toLocaleString()} spent of ${MOCK.budget.total.toLocaleString()}</div>
            <div className="ring-pills">
              <div className="rpill rpill-g">↓ On track</div>
              <div className="rpill rpill-r">⚠ Dining 78%</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI BAR */}
      <div className="ai-bar" onClick={()=>go("ai")}>
        <div className="ai-dot-wrap">✦</div>
        <div className="ai-bar-t" style={{display:"flex",alignItems:"center",gap:6}}><span className="ai-pulse"/>Volta AI spotted 3 ways to save $231</div>
        <div className="ai-bar-arrow">›</div>
      </div>

      {/* STORY QUICK ACCESS */}
      <div className="stories">
        {[
          {ico:"💰",lbl:"Budget",p:"budget",active:true},
          {ico:"🛒",lbl:`${grocLeft} items`,p:"grocery",active:true},
          {ico:"🎉",lbl:"Events",p:"events",active:true},
          {ico:"🚗",lbl:"Rides",p:"rides",active:false},
          {ico:"📦",lbl:"Subs",p:"subs",active:false},
          {ico:"📝",lbl:"Notes",p:"notes",active:false},
          {ico:"🌤",lbl:"Weather",p:"weather",active:false},
        ].map((s,i)=>(
          <div key={i} className={`story ${s.active?"has-update":""}`} onClick={()=>go(s.p)}>
            <div className={`story-ring ${s.active?"active":"inactive"}`}>
              <div className="story-inner">{s.ico}</div>
            </div>
            <div className="story-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* FEATURE CARD SCROLL */}
      <div className="secrow" style={{padding:"0 16px",marginBottom:12}}>
        <div className="sec">Your Life</div>
        <div className="seeall">Scroll →</div>
      </div>
      <div className="hscroll">
        <div className="wfc wfc-violet" onClick={()=>go("rides")} style={{width:220}}>
          <div className="wfc-glow" style={{background:"radial-gradient(circle,rgba(124,92,252,.35),transparent 70%)"}}/>
          <div className="wfc-label" style={{color:"var(--violet)"}}>🚗 Rides</div>
          <div className="wfc-num" style={{color:"var(--violet)"}}>4 min</div>
          <div className="wfc-desc">UberX nearby · Lyft in 5 min</div>
          <div className="wfc-tags"><span className="wfc-tag">$12–16</span><span className="wfc-tag">4 options</span></div>
          <div className="wfc-arrow">→</div>
        </div>
        <div className="wfc wfc-pink" onClick={()=>go("food")} style={{width:200}}>
          <div className="wfc-glow" style={{background:"radial-gradient(circle,rgba(244,114,182,.3),transparent 70%)"}}/>
          <div className="wfc-label" style={{color:"var(--pink)"}}>🍔 Food</div>
          <div className="wfc-num" style={{color:"var(--pink)"}}>6</div>
          <div className="wfc-desc">Restaurants delivering now</div>
          <div className="wfc-tags"><span className="wfc-tag">25–45 min</span><span className="wfc-tag">2 free delivery</span></div>
          <div className="wfc-arrow">→</div>
        </div>
        <div className="wfc wfc-teal" onClick={()=>go("grocery")} style={{width:200}}>
          <div className="wfc-glow" style={{background:"radial-gradient(circle,rgba(52,211,153,.25),transparent 70%)"}}/>
          <div className="wfc-label" style={{color:"var(--green)"}}>🛒 Groceries</div>
          <div className="wfc-num" style={{color:"var(--green)"}}>{grocLeft}</div>
          <div className="wfc-desc">Items left on your list</div>
          <div className="wfc-tags"><span className="wfc-tag">Walmart best</span><span className="wfc-tag">Save $13.60</span></div>
          <div className="wfc-arrow">→</div>
        </div>
        <div className="wfc wfc-sky" onClick={()=>go("events")} style={{width:200}}>
          <div className="wfc-glow" style={{background:"radial-gradient(circle,rgba(56,189,248,.25),transparent 70%)"}}/>
          <div className="wfc-label" style={{color:"var(--sky)"}}>🎉 Events</div>
          <div className="wfc-num" style={{color:"var(--sky)"}}>{MOCK.events.length}</div>
          <div className="wfc-desc">Upcoming events</div>
          <div className="wfc-tags"><span className="wfc-tag">Next Mar 22</span><span className="wfc-tag">3 allergies ⚠</span></div>
          <div className="wfc-arrow">→</div>
        </div>
        <div className="wfc" style={{width:200,background:"linear-gradient(140deg,#1A200D,#101408)",border:"1px solid rgba(251,191,36,.2)"}} onClick={()=>go("weather")}>
          <div className="wfc-glow" style={{background:"radial-gradient(circle,rgba(251,191,36,.2),transparent 70%)"}}/>
          <div className="wfc-label" style={{color:"var(--yellow)"}}>🌤 Weather</div>
          <div className="wfc-num" style={{color:"var(--yellow)"}}>62°F</div>
          <div className="wfc-desc">Partly cloudy · Good for runs</div>
          <div className="wfc-tags"><span className="wfc-tag">Riverside Loop</span><span className="wfc-tag">Low traffic</span></div>
          <div className="wfc-arrow">→</div>
        </div>
      </div>

      {/* BUDGET BREAKDOWN */}
      <div className="pad">
        <div className="secrow"><div className="sec">Spending</div><div className="seeall" onClick={()=>go("budget")}>Full breakdown</div></div>
        <div className="bcat">
          {MOCK.budget.cats.map((c,i)=>{
            const p=Math.round((c.spent/c.limit)*100);
            return(
              <div key={i} className="bc" onClick={()=>go("budget")}>
                <div className="bc-ico">{c.ico}</div>
                <div className="bc-name">{c.name}</div>
                <div className="bc-val">${c.spent}</div>
                <div className="bc-track"><div className="bc-fill" style={{width:`${Math.min(p,100)}%`,background:c.color}}/></div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                  <span className={`tag ${p>=80?"tr":p>=60?"to":"tg"}`} style={{fontSize:10,padding:"2px 8px"}}>{p}%</span>
                  <span style={{fontSize:10,color:"var(--sub)",fontWeight:600}}>of ${c.limit}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="secrow"><div className="sec">Recent Activity</div><div className="seeall" onClick={()=>go("budget")}>All</div></div>
        <div className="act-list" style={{marginBottom:22}}>
          {[
            {ico:"🛒",bg:"rgba(52,211,153,.1)",name:"Trader Joe's",sub:"Groceries · Today",val:"-$42.30",t:"Today"},
            {ico:"🚗",bg:"rgba(56,189,248,.1)",name:"Lyft Standard",sub:"Ride to Downtown",val:"-$13.50",t:"Yesterday"},
            {ico:"🍔",bg:"rgba(244,114,182,.1)",name:"Chipotle via Uber Eats",sub:"Food delivery · Mar 8",val:"-$18.90",t:"Mar 8"},
            {ico:"🎵",bg:"rgba(168,85,247,.1)",name:"Spotify Premium",sub:"Monthly · Mar 1",val:"-$9.99",t:"Mar 1"},
            {ico:"🏪",bg:"rgba(251,191,36,.1)",name:"Target",sub:"Household · Feb 28",val:"-$67.40",t:"Feb 28"},
          ].map((a,i)=>(
            <div key={i} className="act">
              <div className="a-ico" style={{background:a.bg}}>{a.ico}</div>
              <div style={{flex:1}}><div className="a-name">{a.name}</div><div className="a-sub">{a.sub}</div></div>
              <div><div className="a-val">{a.val}</div><div className="a-time">{a.t}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Budget({go}){
  const {total,spent,cats}=MOCK.budget;
  return(
    <div className="pg">
      <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Budget</div><div className="psub">March 2025</div></div></div>
      <div className="pad">
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          {[{l:"Budget",v:`$${total.toLocaleString()}`,c:"var(--text)"},{l:"Spent",v:`$${spent.toLocaleString()}`,c:"var(--red)"},{l:"Left",v:`$${(total-spent).toLocaleString()}`,c:"var(--green)"}].map((s,i)=>(
            <div key={i} style={{flex:1,background:"var(--s1)",border:"1px solid var(--border)",borderRadius:18,padding:16,textAlign:"center"}}>
              <div style={{fontFamily:"'Space Grotesk'",fontSize:22,fontWeight:700,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:"var(--sub)",marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{fontFamily:"'Space Grotesk'",fontSize:17,fontWeight:700,marginBottom:18}}>Spending by Category</div>
          {cats.map((c,i)=>{
            const p=Math.round((c.spent/c.limit)*100);
            return(<div className="prog" key={i}>
              <div className="proghead"><span className="progname">{c.ico} {c.name}</span><div style={{display:"flex",gap:8,alignItems:"center"}}><span className="progval">${c.spent}/${c.limit}</span><span className={`tag ${p>=90?"tr":p>=70?"to":"tg"}`}>{p}%</span></div></div>
              <div className="progtrack"><div className="progfill" style={{width:`${Math.min(p,100)}%`,background:c.color}}/></div>
            </div>);
          })}
        </div>
        <button className="btn btn-violet">+ Add Expense</button>
      </div>
    </div>
  );
}

function Subs({go}){
  const total=MOCK.subs.reduce((s,x)=>s+x.cost,0).toFixed(2);
  const unused=MOCK.subs.filter(s=>!s.used);
  return(
    <div className="pg">
      <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Subscriptions</div><div className="psub">${total}/mo · {MOCK.subs.length} active</div></div></div>
      <div className="pad">
        {unused.length>0&&(<div className="insight"><span style={{fontSize:20}}>💡</span><div><div className="insight-t">You're wasting ${unused.reduce((s,u)=>s+u.cost,0).toFixed(2)}/month</div><div className="insight-b"><strong>{unused.map(u=>u.name).join(" & ")}</strong> unused this month — that's ${(unused.reduce((s,u)=>s+u.cost,0)*12).toFixed(0)}/year.</div></div></div>)}
        <div className="card">
          {MOCK.subs.map((s,i)=>(
            <div className="row" key={i}>
              <div className="r-ico" style={{fontSize:20}}>{s.icon}</div>
              <div style={{flex:1}}><div className="r-name">{s.name}</div><div className="r-sub">{s.cat}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {!s.used&&<span className="tag tr">Unused</span>}
                <div className="r-val" style={{color:"var(--green)"}}>${s.cost}</div>
              </div>
            </div>
          ))}
          <div className="divider"/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:14,fontWeight:700}}>Total / month</div>
            <div style={{fontFamily:"'Space Grotesk'",fontSize:24,fontWeight:700,color:"var(--green)"}}>${total}</div>
          </div>
        </div>
        <button className="btn btn-violet">+ Add Subscription</button>
      </div>
    </div>
  );
}

function Grocery({go}){
  const [items,setItems]=useState(MOCK.groceries);
  const [show,setShow]=useState(false);
  const [n,setN]=useState({name:"",price:"",store:""});
  const toggle=id=>setItems(items.map(i=>i.id===id?{...i,checked:!i.checked}:i));
  const left=items.filter(i=>!i.checked),done=items.filter(i=>i.checked);
  function add(){if(!n.name)return;setItems([...items,{id:Date.now(),name:n.name,price:parseFloat(n.price)||0,store:n.store,checked:false}]);setN({name:"",price:"",store:""});setShow(false);}
  return(
    <div className="pg">
      <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Groceries</div><div className="psub">{left.length} left · ${items.reduce((s,i)=>s+i.price,0).toFixed(2)} total</div></div></div>
      <div className="pad">
        <div className="insight"><span style={{fontSize:20}}>🛒</span><div><div className="insight-t">Best store this week: Walmart</div><div className="insight-b">Saves you <strong>$13.60</strong> vs Whole Foods for your current list.</div></div></div>
        <div className="glist">
          {left.length>0&&<div className="gd-head">To get ({left.length})</div>}
          {left.map(g=>(<div key={g.id} className="gi">
            <div className={`gck ${g.checked?"on":""}`} onClick={()=>toggle(g.id)}>{g.checked&&"✓"}</div>
            <div className="gn">{g.name}</div>
            <div style={{textAlign:"right"}}><div className="gp">${g.price}</div><div className="gs">{g.store}</div></div>
          </div>))}
          {done.length>0&&<div className="gd-head" style={{borderTop:"1px solid var(--border)"}}>Done ({done.length}) ✓</div>}
          {done.map(g=>(<div key={g.id} className="gi done">
            <div className="gck on" onClick={()=>toggle(g.id)}>✓</div>
            <div className="gn">{g.name}</div>
            <div style={{textAlign:"right"}}><div className="gp" style={{color:"var(--sub)"}}>${g.price}</div><div className="gs">{g.store}</div></div>
          </div>))}
        </div>
        <button className="btn btn-violet" onClick={()=>setShow(true)}>+ Add Item</button>
      </div>
      {show&&(<div className="overlay" onClick={()=>setShow(false)}><div className="sheet" onClick={e=>e.stopPropagation()}><div className="shandle"/><div className="stitle">Add to list</div><div className="field"><label>Item name</label><input value={n.name} onChange={e=>setN({...n,name:e.target.value})} placeholder="e.g. Organic Milk"/></div><div className="frow"><div className="field"><label>Price ($)</label><input type="number" value={n.price} onChange={e=>setN({...n,price:e.target.value})} placeholder="0.00"/></div><div className="field"><label>Store</label><input value={n.store} onChange={e=>setN({...n,store:e.target.value})} placeholder="Walmart"/></div></div><div className="sact"><button className="btn btn-ghost btn-sm" onClick={()=>setShow(false)}>Cancel</button><button className="btn btn-violet btn-sm" onClick={add}>Add!</button></div></div></div>)}
    </div>
  );
}

function Rides({go,initTab="rides"}){
  const [tab,setTab]=useState(initTab);
  const [sel,setSel]=useState(null);
  const [selF,setSelF]=useState(null);
  const [booked,setBooked]=useState(false);
  const [ordered,setOrdered]=useState(false);
  const RIDES=[
    {id:"ux",name:"UberX",icon:"🚗",eta:"4 min",price:"$12–16",provider:"Uber",seats:4},
    {id:"uc",name:"Uber Comfort",icon:"🚙",eta:"7 min",price:"$18–22",provider:"Uber",seats:4},
    {id:"ls",name:"Lyft Standard",icon:"🚕",eta:"5 min",price:"$11–14",provider:"Lyft",seats:4},
    {id:"lx",name:"Lyft XL",icon:"🚐",eta:"9 min",price:"$22–28",provider:"Lyft",seats:6},
  ];
  const FOODS=[
    {id:1,name:"Chipotle",icon:"🌯",time:"25–35 min",rating:4.7,delivery:"$2.99"},
    {id:2,name:"Sweetgreen",icon:"🥗",time:"20–30 min",rating:4.5,delivery:"Free"},
    {id:3,name:"Five Guys",icon:"🍔",time:"30–40 min",rating:4.8,delivery:"$1.99"},
    {id:4,name:"Sushi Spot",icon:"🍣",time:"35–45 min",rating:4.6,delivery:"$3.99"},
    {id:5,name:"Pizza Palace",icon:"🍕",time:"25–35 min",rating:4.4,delivery:"Free"},
    {id:6,name:"Thai Garden",icon:"🍜",time:"30–40 min",rating:4.7,delivery:"$2.49"},
  ];
  if(booked) return(<div className="pg"><div className="succ"><div className="succ-ico">🚗</div><div className="succ-t">Ride Confirmed!</div><div className="succ-s">{sel?.name} is on its way<br/><strong style={{color:"var(--green)"}}>{sel?.eta} · {sel?.price}</strong></div><button className="btn btn-ghost btn-sm" onClick={()=>{setBooked(false);setSel(null);}}>← Back</button></div></div>);
  if(ordered) return(<div className="pg"><div className="succ"><div className="succ-ico">🎉</div><div className="succ-t">Order Placed!</div><div className="succ-s">{selF?.name} is being prepared<br/><strong style={{color:"var(--green)"}}>Arriving in {selF?.time}</strong></div><button className="btn btn-ghost btn-sm" onClick={()=>{setOrdered(false);setSelF(null);}}>← Back</button></div></div>);
  return(
    <div className="pg">
      <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Rides & Food</div></div></div>
      <div className="pad">
        <div style={{display:"flex",gap:8,background:"var(--s2)",borderRadius:16,padding:5,marginBottom:20,border:"1px solid var(--border)"}}>
          {[{id:"rides",l:"🚗 Rides"},{id:"food",l:"🍔 Food"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"11px",border:"none",borderRadius:12,fontFamily:"'DM Sans'",fontSize:14,fontWeight:800,cursor:"pointer",background:tab===t.id?"linear-gradient(135deg,var(--violet),var(--purple))":"transparent",color:tab===t.id?"#fff":"var(--sub)",transition:"all .2s"}}>{t.l}</button>
          ))}
        </div>
        {tab==="rides"&&(<>
          <div className="card card-sm" style={{marginBottom:14}}>
            <div className="field" style={{marginBottom:12}}><label>📍 Pickup</label><input placeholder="Use current location"/></div>
            <div className="field" style={{marginBottom:0}}><label>🏁 Drop-off</label><input placeholder="Where are you going?"/></div>
          </div>
          {RIDES.map(r=>(<div key={r.id} className={`ropt ${sel?.id===r.id?"sel":""}`} onClick={()=>setSel(r)}>
            <div className="remo">{r.icon}</div>
            <div style={{flex:1}}><div className="rname">{r.name} <span style={{fontSize:11,color:"var(--sub)",fontWeight:600}}>{r.provider}</span></div><div className="rmeta"><span>👤 {r.seats}</span><span>⏱ {r.eta}</span></div></div>
            <div style={{textAlign:"right"}}><div className="rprice">{r.price}</div><div className="reta">{r.eta}</div></div>
          </div>))}
          <button className="btn btn-violet" style={{marginTop:8}} onClick={()=>sel&&setBooked(true)}>{sel?`Book ${sel.name} →`:"Select a ride first"}</button>
        </>)}
        {tab==="food"&&(<>
          <div className="fgrid">
            {FOODS.map(f=>(<div key={f.id} className="fd" onClick={()=>setSelF(f)}>
              <span className="fdemo">{f.icon}</span>
              <div className="fdname">{f.name}</div>
              <div className="fdmeta"><span className="fdrat">★ {f.rating}</span><span>⏱ {f.time}</span></div>
              <div style={{fontSize:11,color:f.delivery==="Free"?"var(--green)":"var(--sub)",fontWeight:700,marginTop:6}}>{f.delivery} delivery</div>
            </div>))}
          </div>
          {selF&&(<div className="overlay" onClick={()=>setSelF(null)}><div className="sheet" onClick={e=>e.stopPropagation()}><div className="shandle"/><div style={{textAlign:"center",fontSize:48,marginBottom:10}}>{selF.icon}</div><div className="stitle" style={{textAlign:"center"}}>{selF.name}</div><div style={{textAlign:"center",color:"var(--sub)",fontSize:13,fontWeight:600,marginBottom:20}}>⏱ {selF.time} · ★ {selF.rating}</div><div className="field"><label>Address</label><input placeholder="Your delivery address"/></div><div className="field"><label>Special instructions</label><textarea rows={2} placeholder="Allergies, no onions..."/></div><div className="sact"><button className="btn btn-ghost btn-sm" onClick={()=>setSelF(null)}>Cancel</button><button className="btn btn-violet btn-sm" onClick={()=>{setOrdered(true);setSelF(null);}}>Order now →</button></div></div></div>)}
        </>)}
      </div>
    </div>
  );
}

function Events({go,setRsvp}){
  const [show,setShow]=useState(false);
  const [toast,setToast]=useState(false);
  function copy(){setToast(true);setTimeout(()=>setToast(false),2200);}
  return(
    <div className="pg">
      <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Events</div><div className="psub">{MOCK.events.length} upcoming</div></div></div>
      <div className="pad">
        {MOCK.events.map(e=>(
          <div key={e.id} className="evcard">
            <div className="ev-head">
              <div className="ev-top">
                <div className="ev-date"><div className="ev-mon">{e.month}</div><div className="ev-day">{e.day}</div></div>
                <div style={{flex:1}}>
                  <div className="ev-name">{e.emoji} {e.name}</div>
                  <div className="ev-loc">🕐 {e.time} · 📍 {e.location}</div>
                  <div className="ev-pills">
                    <span className="tag ts">👥 {e.guests.length} guests</span>
                    {e.guests.filter(g=>g.allergies.length>0).length>0&&<span className="tag tr">⚠️ {e.guests.filter(g=>g.allergies.length>0).length} allergies</span>}
                    <span className="tag tm">🔗 RSVP open</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ev-guests">
              <div className="ev-gt">Guest List · Dietary Info</div>
              {e.guests.map((g,gi)=>(
                <div key={gi} className="ev-guest">
                  <div className="ev-g-av">{g.av}</div>
                  <div className="ev-g-name">{g.name}</div>
                  {g.allergies.length>0
                    ?<div className="ev-g-tags">{g.allergies.map((a,ai)=><span key={ai} className="atag">⚠ {a}</span>)}</div>
                    :<div className="no-allergy">✓ No restrictions</div>}
                </div>
              ))}
            </div>
            <div className="ev-actions">
              <div className="ev-btn" onClick={copy}>🔗 Copy RSVP</div>
              <div className="ev-btn" onClick={()=>setRsvp(e)}>👁 Preview</div>
              <div className="ev-btn">✏️ Edit</div>
            </div>
          </div>
        ))}
        {toast&&<div className="toast">✓ RSVP link copied!</div>}
        <button className="btn btn-violet" onClick={()=>setShow(true)}>+ Create Event</button>
        <div style={{height:8}}/>
      </div>
      {show&&(<div className="overlay" onClick={()=>setShow(false)}><div className="sheet" onClick={e=>e.stopPropagation()}><div className="shandle"/><div className="stitle">Create Event 🎉</div><div className="field"><label>Event name</label><input placeholder="e.g. Dinner at my place"/></div><div className="frow"><div className="field"><label>Date</label><input type="date"/></div><div className="field"><label>Time</label><input type="time"/></div></div><div className="field"><label>Location</label><input placeholder="Address or venue"/></div><div className="field"><label>Note for guests</label><textarea rows={2} placeholder="Anything they should know..."/></div><div className="sact"><button className="btn btn-ghost btn-sm" onClick={()=>setShow(false)}>Cancel</button><button className="btn btn-violet btn-sm" onClick={()=>setShow(false)}>Create & Get Link →</button></div></div></div>)}
    </div>
  );
}

function RsvpView({event,onBack}){
  const [done,setDone]=useState(false);
  const [form,setForm]=useState({name:"",dietary:"none",allergies:"",note:""});
  if(done) return(<div className="pg"><div className="succ"><div className="succ-ico">🎊</div><div className="succ-t">You're In!</div><div className="succ-s">Host has been notified<br/>about your dietary info.</div><button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Volta</button></div></div>);
  return(<div className="pg"><div className="phead"><div className="hbtn" onClick={onBack}>🏠</div><div><div className="ptitle">RSVP</div></div></div>
  <div className="pad"><div style={{textAlign:"center",marginBottom:22}}><div style={{fontSize:52,marginBottom:10}}>{event.emoji}</div><div style={{fontFamily:"'Space Grotesk'",fontSize:22,fontWeight:700,marginBottom:4}}>{event.name}</div><div style={{fontSize:13,color:"var(--sub)",fontWeight:500}}>{event.month} {event.day} · {event.time} · {event.location}</div></div>
  <div className="card"><div style={{fontFamily:"'Space Grotesk'",fontSize:18,fontWeight:700,marginBottom:16}}>Your details</div><div className="field"><label>Your name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="First and last name"/></div><div className="field"><label>Dietary preference</label><select value={form.dietary} onChange={e=>setForm({...form,dietary:e.target.value})}><option value="none">No restrictions</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="gluten-free">Gluten-free</option><option value="halal">Halal</option><option value="kosher">Kosher</option></select></div><div className="field"><label>Allergies</label><input value={form.allergies} onChange={e=>setForm({...form,allergies:e.target.value})} placeholder="nuts, shellfish, dairy..."/></div><div className="field"><label>Note to host</label><textarea rows={2} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Anything else?"/></div><button className="btn btn-violet" onClick={()=>setDone(true)}>Confirm RSVP ✓</button></div></div></div>);
}

function Notes({go}){
  const [notes,setNotes]=useState(MOCK.notes);
  const [show,setShow]=useState(false);
  const [n,setN]=useState({title:"",body:"",tag:"Personal"});
  function add(){if(!n.title)return;setNotes([{id:Date.now(),...n,date:"Just now"},...notes]);setN({title:"",body:"",tag:"Personal"});setShow(false);}
  const tc={Personal:"ts",Food:"tc",Work:"tp",Health:"tg",Finance:"ty"};
  return(<div className="pg">
    <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Notes</div><div className="psub">{notes.length} notes</div></div></div>
    <div className="pad">
      <div className="ngrid">
        {notes.map(n=>(<div key={n.id} className="nc"><div className="nc-title">{n.title}</div><div className="nc-body">{n.body}</div><div className="nc-foot"><span className={`tag ${tc[n.tag]||"tm"}`}>{n.tag}</span><span className="nc-date">{n.date}</span></div></div>))}
      </div>
      <div style={{height:14}}/>
      <button className="btn btn-violet" onClick={()=>setShow(true)}>+ New Note</button>
    </div>
    {show&&(<div className="overlay" onClick={()=>setShow(false)}><div className="sheet" onClick={e=>e.stopPropagation()}><div className="shandle"/><div className="stitle">New Note</div><div className="field"><label>Title</label><input value={n.title} onChange={e=>setN({...n,title:e.target.value})} placeholder="What's this about?"/></div><div className="field"><label>Content</label><textarea rows={4} value={n.body} onChange={e=>setN({...n,body:e.target.value})} placeholder="Write your note..."/></div><div className="field"><label>Tag</label><select value={n.tag} onChange={e=>setN({...n,tag:e.target.value})}>{["Personal","Work","Food","Health","Finance"].map(t=><option key={t}>{t}</option>)}</select></div><div className="sact"><button className="btn btn-ghost btn-sm" onClick={()=>setShow(false)}>Cancel</button><button className="btn btn-violet btn-sm" onClick={add}>Save</button></div></div></div>)}
  </div>);
}

function Weather({go}){
  const w=MOCK.weather;
  return(<div className="pg">
    <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Weather</div><div className="psub">San Francisco, CA</div></div></div>
    <div className="pad">
      <div className="wx-hero">
        <div className="wx-top">
          <div className="wx-temp-main">{w.temp}°</div>
          <div className="wx-right"><span className="wx-icon-big">{w.icon}</span><div className="wx-desc">{w.desc}</div><div className="wx-feels">Feels like {w.feels}°</div></div>
        </div>
        <div className="wx-stats">
          {[["💧",`${w.humidity}%`,"Humidity"],["💨",`${w.wind}mph`,"Wind"],["☀️",w.uv,"UV"],["⬆",`${w.high}°`,"High"],["⬇",`${w.low}°`,"Low"],["🌅","6:32am","Sunrise"]].map(([ic,vl,lb],i)=>(
            <div key={i} className="wxs"><div className="wxsv">{ic} {vl}</div><div className="wxsl">{lb}</div></div>
          ))}
        </div>
      </div>
      <div className="sec" style={{marginBottom:12}}>Hourly Forecast</div>
      <div className="hourly">
        {MOCK.hourly.map((h,i)=>(
          <div key={i} className="hr"><div className="hr-time">{h.t}</div><span className="hr-ico">{h.i}</span><div className="hr-t">{h.temp}°</div></div>
        ))}
      </div>
      <div className="sec" style={{marginBottom:12}}>🏃 Running Routes</div>
      {MOCK.routes.map((r,i)=>(
        <div key={i} className="route">
          <div className="rt-dot">🗺️</div>
          <div style={{flex:1}}>
            <div className="rt-name">{r.name}</div>
            <div className="rt-tags"><span className="tag tm">📏 {r.distance}</span><span className="tag tm">⏱ {r.time}</span><span className={`tag ${r.traffic==="Low"?"tg":"to"}`}>🚦 {r.traffic}</span>{r.tags.map((t,ti)=><span key={ti} className="tag ts">{t}</span>)}</div>
          </div>
          <div style={{textAlign:"right"}}><div className="rt-rat">★{r.rating}</div><button className="btn btn-green btn-sm" style={{marginTop:6,padding:"7px 14px",fontSize:12}}>Start</button></div>
        </div>
      ))}
    </div>
  </div>);
}

function AI({go}){
  const [msgs,setMsgs]=useState([{role:"ai",text:"Hey Alex! I'm Volta AI ✦\n\nI know your **full picture** — budget, subs, groceries, events, rides. What do you need?"}]);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const ref=useRef(null);
  const CHIPS=["How's my budget?","Cancel any subs?","Best grocery store?","Book me a ride","Dinner party menu?","Good day to run?","How to save $231?"];
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs,typing]);
  function send(txt){const msg=txt||input.trim();if(!msg)return;setMsgs(m=>[...m,{role:"user",text:msg}]);setInput("");setTyping(true);setTimeout(()=>{setTyping(false);setMsgs(m=>[...m,{role:"ai",text:getReply(msg)}]);},1100+Math.random()*600);}
  function render(t){return t.split("**").map((p,i)=>i%2===0?p:<strong key={i} style={{color:"var(--green)"}}>{p}</strong>);}
  return(<div className="pg">
    <div className="phead"><div className="hbtn" onClick={()=>go("home")}>🏠</div><div><div className="ptitle">Volta AI ✦</div><div className="psub">Your personal assistant</div></div></div>
    <div className="chatbox">
      <div className="chatmsgs">
        {msgs.map((m,i)=>(<div key={i} className={`cm ${m.role}`}><div className={`cav ${m.role}`}>{m.role==="ai"?"✦":"A"}</div><div className="cbub">{render(m.text)}</div></div>))}
        {typing&&(<div className="cm ai"><div className="cav ai">✦</div><div className="cbub"><div className="typing"><span/><span/><span/></div></div></div>)}
        <div ref={ref}/>
      </div>
      <div>
        <div className="chips">{CHIPS.map((c,i)=><div key={i} className="chip" onClick={()=>send(c)}>{c}</div>)}</div>
        <div className="chatbar"><input className="chatin" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything about your life..."/><button className="chatsend" onClick={()=>send()}>↑</button></div>
      </div>
    </div>
  </div>);
}

const NAV=[
  {id:"home",  icon:"🏠",lbl:"Home"},
  {id:"grocery",icon:"🛒",lbl:"Shop"},
  {id:"rides", icon:"🚗",lbl:"Rides"},
  {id:"events",icon:"🎉",lbl:"Events"},
  {id:"ai",    icon:"✦", lbl:"AI"},
];

export default function App(){
  const [page,setPage]=useState("home");
  const [rsvp,setRsvp]=useState(null);
  function go(p){setRsvp(null);setPage(p);}
  if(rsvp) return(<><style>{css}</style><div className="app"><div className="scroll"><RsvpView event={rsvp} onBack={()=>setRsvp(null)}/></div></div></>);
  return(<>
    <style>{css}</style>
    <div className="app">
      <div className="scroll">
        {page==="home"    &&<Home go={go}/>}
        {page==="budget"  &&<Budget go={go}/>}
        {page==="subs"    &&<Subs go={go}/>}
        {page==="grocery" &&<Grocery go={go}/>}
        {page==="rides"   &&<Rides go={go} initTab="rides"/>}
        {page==="food"    &&<Rides go={go} initTab="food"/>}
        {page==="events"  &&<Events go={go} setRsvp={setRsvp}/>}
        {page==="notes"   &&<Notes go={go}/>}
        {page==="weather" &&<Weather go={go}/>}
        {page==="ai"      &&<AI go={go}/>}
      </div>
      <div className="nav">
        <div className="nav-inner">
          {NAV.map(n=>(
            <div key={n.id} className={`nib ${page===n.id?"on":""}`} onClick={()=>go(n.id)}>
              <div className="niico">{n.icon}</div>
              <div className="nilbl">{n.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>);
}