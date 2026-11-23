/* Shared appearance of the card games (Pilotta Pantou and the next games of the same family):
   table skins (FELTS), page backgrounds (PBGS), card backs (BACKS) and their SVG (backSvg, backCss), avatars (AVS, avSvg),
   badges (BADGES, tierBadge, badgeSvg), emotes (EMOS) and the football themes (FBV).
   Data and pure builders only: nothing here reads or saves a setting, and nothing knows a game's rules.
   Choosing, saving and locking (setFelt, setPbg, setBack, plusLocked ...) stays in each game. Loaded before the game's own script. */

/* table skins: [name, felt, felt2, text colour, optional texture] */
var FELTS={green:['Πράσινο'],white:['Άσπρο','#f0efe8','#d3d1c4','#14221b'],black:['Μαύρο','#2b2d2c','#101211','#e9f3ec'],
  navy:['Μπλε','#24406b','#142640','#e8eef7'],burg:['Μπορντό','#6b1f2a','#401018','#f6e9ea'],teal:['Τιρκουάζ','#1f6b73','#0f3f45','#e6f5f6'],
  wood:['Ξύλο','#8a5a32','#5c3a1e','#fbf1e3','repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 2px,transparent 2px 9px)'],
  /* Space (Pilotta Plus) */
  sp_deep:["Βαθύ διάστημα", "#1b2156", "#070a18", "#e9ecf7", "radial-gradient(circle at 3px 3px,rgba(255,255,255,.75) 0 .8px,transparent 1.4px) 0 0/31px 29px,radial-gradient(circle at 2px 2px,rgba(255,255,255,.45) 0 .6px,transparent 1.2px) 11px 17px/23px 37px,radial-gradient(circle at 2px 2px,rgba(255,255,255,.9) 0 1.1px,transparent 1.8px) 5px 9px/67px 59px"],
  sp_neb:["Νεφέλωμα", "#4b2a73", "#160b2a", "#f1e9fb", "radial-gradient(ellipse at 28% 35%,rgba(255,105,180,.32),transparent 55%),radial-gradient(ellipse at 75% 70%,rgba(80,170,255,.25),transparent 55%),radial-gradient(circle at 3px 3px,rgba(255,255,255,.75) 0 .8px,transparent 1.4px) 0 0/31px 29px,radial-gradient(circle at 2px 2px,rgba(255,255,255,.45) 0 .6px,transparent 1.2px) 11px 17px/23px 37px,radial-gradient(circle at 2px 2px,rgba(255,255,255,.9) 0 1.1px,transparent 1.8px) 5px 9px/67px 59px"],
  sp_gal:["Γαλαξίας", "#12304a", "#050f18", "#e6f0f7", "linear-gradient(125deg,transparent 32%,rgba(255,240,220,.13) 47%,rgba(255,255,255,.2) 50%,rgba(255,240,220,.13) 53%,transparent 68%),radial-gradient(circle at 3px 3px,rgba(255,255,255,.75) 0 .8px,transparent 1.4px) 0 0/31px 29px,radial-gradient(circle at 2px 2px,rgba(255,255,255,.45) 0 .6px,transparent 1.2px) 11px 17px/23px 37px,radial-gradient(circle at 2px 2px,rgba(255,255,255,.9) 0 1.1px,transparent 1.8px) 5px 9px/67px 59px"],
  sp_moon:["Σελήνη", "#6a6e76", "#33363b", "#f2f3f5", "radial-gradient(circle at 12px 12px,rgba(0,0,0,.1) 0 5px,rgba(255,255,255,.07) 6.5px,transparent 8px) 0 0/53px 47px,radial-gradient(circle at 7px 7px,rgba(0,0,0,.08) 0 2.5px,rgba(255,255,255,.05) 3.5px,transparent 4.5px) 23px 27px/41px 59px"],
  sp_mars:["Άρης", "#9a4422", "#4a1a0b", "#fbeee6", "radial-gradient(circle at 2px 2px,rgba(255,200,150,.25) 0 .8px,transparent 1.5px) 0 0/9px 11px,radial-gradient(ellipse at 70% 30%,rgba(255,170,90,.25),transparent 60%)"]};
/* Cypriot coffee shop (a theme sold in the Store, prefix kf_) */
(function(){
  var u=function(svg){ return "url('data:image/svg+xml,"+encodeURIComponent(svg)+"')"; };
  var tile=u('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M20 4L36 20L20 36L4 20Z" fill="none" stroke="rgba(255,244,214,.55)" stroke-width="1.6"/><path d="M20 12L28 20L20 28L12 20Z" fill="rgba(255,244,214,.18)"/><circle cx="0" cy="0" r="3" fill="rgba(255,244,214,.3)"/><circle cx="40" cy="0" r="3" fill="rgba(255,244,214,.3)"/><circle cx="0" cy="40" r="3" fill="rgba(255,244,214,.3)"/><circle cx="40" cy="40" r="3" fill="rgba(255,244,214,.3)"/></svg>')+' 0 0/40px 40px';
  FELTS.kf_wood=['Ξύλινο τραπέζι','#6b4423','#3d2410','#fbefdc','repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 1.5px,transparent 1.5px 38px),repeating-linear-gradient(0deg,rgba(255,220,170,.06) 0 2px,transparent 2px 7px),radial-gradient(ellipse at 30% 40%,rgba(0,0,0,.16) 0 14px,transparent 15px)'];
  FELTS.kf_marble=['Μάρμαρο','#e9e7e2','#c9c6bf','#23262b','linear-gradient(115deg,transparent 40%,rgba(120,120,130,.24) 41% 41.7%,transparent 42.6%),linear-gradient(62deg,transparent 55%,rgba(120,120,130,.2) 56% 56.6%,transparent 57.6%),linear-gradient(160deg,transparent 22%,rgba(150,150,160,.18) 23% 23.6%,transparent 24.6%)'];
  FELTS.kf_check=['Καρό τραπεζομάντιλο','#b8323a','#7d1a22','#fff6f0','repeating-linear-gradient(0deg,rgba(255,255,255,.28) 0 14px,transparent 14px 28px),repeating-linear-gradient(90deg,rgba(255,255,255,.28) 0 14px,transparent 14px 28px)'];
  FELTS.kf_straw=['Ψάθα','#c9a35e','#8f6a2e','#2a1d0a','repeating-linear-gradient(45deg,rgba(90,60,20,.24) 0 2px,transparent 2px 7px),repeating-linear-gradient(-45deg,rgba(255,235,180,.22) 0 2px,transparent 2px 7px)'];
  FELTS.kf_tile=['Πλακάκια','#2c5d8f','#16365a','#f2f6fb',tile];
})();
/* Neon, Mediterranean and Gold themes (sold in the Store, prefixes ne_ me_ go_) */
(function(){
  var u=function(svg){ return "url('data:image/svg+xml,"+encodeURIComponent(svg)+"')"; };
  var wave=function(c,w,h){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"><path d="M0 '+h/2+'Q'+w/4+' 2 '+w/2+' '+h/2+'T'+w+' '+h/2+'" fill="none" stroke="'+c+'" stroke-width="1.6"/></svg>')+' 0 0/'+w+'px '+h+'px'; };
  FELTS.ne_grid=['Πλέγμα νέον','#0d1330','#05081a','#d9f7ff','repeating-linear-gradient(0deg,rgba(51,230,255,.22) 0 1px,transparent 1px 24px),repeating-linear-gradient(90deg,rgba(51,230,255,.22) 0 1px,transparent 1px 24px)'];
  FELTS.ne_pink=['Ροζ νέον','#3d0f45','#16041c','#ffe6f8','repeating-linear-gradient(0deg,rgba(255,79,216,.16) 0 2px,transparent 2px 9px),radial-gradient(ellipse at 50% 0,rgba(255,79,216,.28),transparent 60%)'];
  FELTS.ne_sun=['Ηλιοβασίλεμα νέον','#2d1060','#0d0524','#f5eaff','linear-gradient(180deg,transparent 45%,rgba(255,90,160,.3) 80%,rgba(255,200,80,.25)),repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 2px,transparent 2px 10px)'];
  FELTS.ne_circ=['Κύκλωμα','#062a22','#02130f','#d2ffee','radial-gradient(circle at 4px 4px,rgba(80,255,180,.45) 0 1.6px,transparent 2.4px) 0 0/22px 22px,repeating-linear-gradient(90deg,rgba(80,255,180,.14) 0 1px,transparent 1px 22px)'];
  FELTS.ne_rain=['Βροχή νέον','#0f1f45','#060c20','#e4eeff','repeating-linear-gradient(105deg,rgba(120,170,255,.2) 0 1px,transparent 1px 15px),repeating-linear-gradient(105deg,rgba(255,255,255,.08) 0 1px,transparent 1px 37px)'];
  FELTS.me_sea=['Γαλάζια θάλασσα','#2a95b0','#0f5a73','#f3fbfd',wave('rgba(255,255,255,.3)',48,24)];
  FELTS.me_sand=['Άμμος','#ebd7a8','#c9a96c','#2a1d0a','radial-gradient(circle at 3px 3px,rgba(120,85,30,.2) 0 .8px,transparent 1.4px) 0 0/10px 9px,radial-gradient(circle at 6px 7px,rgba(255,255,255,.3) 0 .7px,transparent 1.3px) 0 0/13px 11px'];
  FELTS.me_lime=['Ασβεστωμένος τοίχος','#f6f3ec','#d9d3c3','#23262b','linear-gradient(115deg,transparent 40%,rgba(120,110,90,.14) 41% 41.6%,transparent 42.6%),radial-gradient(circle at 20% 30%,rgba(120,110,90,.1) 0 9px,transparent 10px)'];
  FELTS.me_terra=['Τερακότα','#c8693c','#8a3f1f','#fff2e8','repeating-linear-gradient(90deg,rgba(60,20,5,.25) 0 1.5px,transparent 1.5px 44px),repeating-linear-gradient(0deg,rgba(60,20,5,.25) 0 1.5px,transparent 1.5px 44px)'];
  FELTS.me_aeg=['Μπλε του Αιγαίου','#1c55a0','#0b2c5c','#eaf2fc',wave('rgba(255,255,255,.22)',56,28)];
  FELTS.go_blk=['Μαύρο βελούδο','#1d1d21','#09090b','#f6e3a8','radial-gradient(circle at 2px 2px,rgba(242,193,78,.22) 0 .9px,transparent 1.6px) 0 0/14px 14px'];
  FELTS.go_emer=['Σμαραγδί','#0f4a37','#06241b','#f6e3a8','repeating-linear-gradient(45deg,rgba(242,193,78,.16) 0 1px,transparent 1px 16px),repeating-linear-gradient(-45deg,rgba(242,193,78,.16) 0 1px,transparent 1px 16px)'];
  FELTS.go_burg=['Μπορντό βελούδο','#5e1526','#2a0710','#fbe9c2','radial-gradient(circle at 2px 2px,rgba(242,193,78,.2) 0 .9px,transparent 1.6px) 0 0/12px 12px'];
  FELTS.go_marb=['Μαύρο μάρμαρο','#2e2e34','#101013','#f6e3a8','linear-gradient(118deg,transparent 40%,rgba(242,193,78,.3) 41% 41.6%,transparent 42.6%),linear-gradient(58deg,transparent 58%,rgba(242,193,78,.24) 59% 59.5%,transparent 60.5%),linear-gradient(165deg,transparent 20%,rgba(242,193,78,.2) 21% 21.5%,transparent 22.5%)'];
  FELTS.go_navy=['Ναυτικό μπλε','#14275a','#0a1431','#f6e3a8','repeating-linear-gradient(0deg,rgba(242,193,78,.14) 0 1px,transparent 1px 12px)'];
})();
/* page background behind the game (Settings → Background): [name, light top, light bottom, dark top, dark bottom].
   Game screen (body) and the menu pages (.ov.page); dialogs over the game keep their own surface. Muted text stays at about WCAG AA (4.5:1) or better, normal text above 12:1. */
var PBGS={plain:['Απλό'],linen:['Λινό','#f5ead6','#efe1c8','#2a2116','#1a140c'],mint:['Μέντα','#e3f2e8','#d6eadc','#0f2a1f','#0a1a13'],
  sky:['Ουρανός','#e3edf9','#d6e4f5','#13233b','#0b1424'],dusk:['Σούρουπο','#f9e6dd','#f6e0d9','#2e1a1d','#1c1012'],stone:['Πέτρα','#ecece7','#e2e3dc','#23262b','#15171a']};
/* Space backgrounds (Pilotta Plus): a soft pattern over the gradient, light and dark version */
(function(){
  var u=function(svg){ return "url('data:image/svg+xml,"+encodeURIComponent(svg)+"')"; };
  var dust=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><g fill="'+c+'"><circle cx="12" cy="18" r="1.1"/><circle cx="64" cy="9" r=".7"/><circle cx="101" cy="40" r="1.3"/><circle cx="37" cy="61" r=".8"/><circle cx="83" cy="88" r="1"/><circle cx="18" cy="104" r=".7"/><circle cx="57" cy="112" r="1.2"/><path d="M95 70l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z"/><path d="M30 30l.8 1.8 1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8z"/></g></svg>')+' 0 0/120px 120px'; };
  var aurora=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><g fill="none" stroke="'+c+'" stroke-linecap="round"><path d="M-20 70C60 20 120 120 200 70S330 20 420 70" stroke-width="26" stroke-opacity=".5"/><path d="M-20 120C70 80 130 160 210 115S340 70 420 115" stroke-width="16" stroke-opacity=".35"/></g></svg>')+' top center/100% auto no-repeat'; };
  var rings=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><g fill="none" stroke="'+c+'" stroke-width="1.2"><ellipse cx="480" cy="90" rx="120" ry="45" transform="rotate(-18 480 90)"/><ellipse cx="480" cy="90" rx="200" ry="80" transform="rotate(-18 480 90)"/><ellipse cx="480" cy="90" rx="290" ry="120" transform="rotate(-18 480 90)"/></g><circle cx="480" cy="90" r="14" fill="'+c+'"/><circle cx="300" cy="150" r="4" fill="'+c+'"/></svg>')+' top right/600px 600px no-repeat'; };
  var comets=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><g stroke="'+c+'" stroke-linecap="round"><path d="M20 70L52 38" stroke-width="1.4"/><path d="M95 140L122 113" stroke-width="1.1"/></g><g fill="'+c+'"><circle cx="53" cy="37" r="2"/><circle cx="123" cy="112" r="1.6"/><circle cx="130" cy="30" r=".9"/><circle cx="30" cy="130" r=".8"/></g></svg>')+' 0 0/160px 160px'; };
  var moon=function(c,g){ return 'radial-gradient(circle at 82% 10%,'+g+' 0 34px,transparent 36px),'+u('<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><g fill="'+c+'"><circle cx="20" cy="30" r=".9"/><circle cx="90" cy="16" r="1.2"/><circle cx="118" cy="80" r=".8"/><circle cx="55" cy="100" r="1"/><circle cx="12" cy="125" r=".7"/></g></svg>')+' 0 0/140px 140px'; };
  PBGS.sp_dust=['Αστρόσκονη','#ebe7f8','#dcd6f1','#16132e','#0a0919',dust('rgba(80,60,160,.22)'),dust('rgba(255,255,255,.28)')];
  PBGS.sp_aur=['Σέλας','#e2f5ee','#dbe9f6','#0c2428','#071318',aurora('rgba(70,180,150,.35)'),aurora('rgba(90,230,170,.28)')];
  PBGS.sp_orb=['Τροχιά','#e2eaf9','#d2ddf4','#101d3a','#070f21',rings('rgba(60,90,170,.18)'),rings('rgba(170,195,255,.16)')];
  PBGS.sp_com=['Κομήτης','#f7e9de','#efdfe8','#26172b','#130b18',comets('rgba(160,80,110,.22)'),comets('rgba(255,200,230,.25)')];
  PBGS.sp_moon=['Σεληνόφως','#eceef2','#dfe2ea','#1e2128','#101217',moon('rgba(90,100,120,.25)','rgba(120,130,150,.16)'),moon('rgba(255,255,255,.3)','rgba(235,238,245,.14)')];
})();
/* Cypriot coffee shop backgrounds (a theme sold in the Store) */
(function(){
  var u=function(svg){ return "url('data:image/svg+xml,"+encodeURIComponent(svg)+"')"; };
  var stone=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><g fill="none" stroke="'+c+'" stroke-width="1.4"><rect x="1" y="1" width="58" height="38" rx="4"/><rect x="61" y="1" width="58" height="38" rx="4"/><rect x="-29" y="41" width="58" height="38" rx="4"/><rect x="31" y="41" width="58" height="38" rx="4"/><rect x="91" y="41" width="58" height="38" rx="4"/></g></svg>')+' 0 0/120px 80px'; };
  var shut=function(c,d){ return 'linear-gradient(90deg,transparent calc(50% - 1px),'+d+' calc(50% - 1px) calc(50% + 1px),transparent calc(50% + 1px)),repeating-linear-gradient(180deg,'+c+' 0 3px,transparent 3px 16px)'; };
  var vine=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="110" height="110"><g fill="'+c+'"><path d="M20 20c10-8 22-2 20 12-12 4-22-2-20-12z"/><path d="M78 62c-4-12 6-20 16-14 2 12-6 20-16 14z"/><path d="M52 94c-10-6-10-18 2-22 8 8 4 18-2 22z"/></g><path d="M5 100C30 80 45 60 70 35S100 10 108 4" fill="none" stroke="'+c+'" stroke-width="1.3" stroke-linecap="round"/><path d="M70 35c6-2 8 3 4 6" fill="none" stroke="'+c+'" stroke-width="1.1"/></svg>')+' 0 0/110px 110px'; };
  var lace=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><g fill="none" stroke="'+c+'" stroke-width="1.1"><circle cx="32" cy="32" r="12"/><circle cx="32" cy="32" r="4"/><path d="M32 6v14M32 44v14M6 32h14M44 32h14M14 14l10 10M40 40l10 10M50 14L40 24M24 40L14 50"/><circle cx="0" cy="0" r="6"/><circle cx="64" cy="0" r="6"/><circle cx="0" cy="64" r="6"/><circle cx="64" cy="64" r="6"/></g></svg>')+' 0 0/64px 64px'; };
  var roof=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="44" height="26"><path d="M0 13a22 13 0 0 1 44 0M-22 26a22 13 0 0 1 44 0M22 26a22 13 0 0 1 44 0" fill="none" stroke="'+c+'" stroke-width="1.3"/></svg>')+' 0 0/44px 26px'; };
  PBGS.kf_stone=['Πέτρινος τοίχος','#efe7d8','#e2d6bf','#2a241b','#171310',stone('rgba(120,95,60,.22)'),stone('rgba(255,235,200,.12)')];
  PBGS.kf_shut=['Παντζούρια','#dfeaf6','#cfdff0','#16283d','#0c1826',shut('rgba(40,90,150,.16)','rgba(30,70,120,.3)'),shut('rgba(120,170,230,.12)','rgba(150,190,240,.2)')];
  PBGS.kf_vine=['Κληματαριά','#e6f0dc','#d8e8cb','#14230f','#0b150a',vine('rgba(70,110,50,.2)'),vine('rgba(150,210,120,.14)')];
  PBGS.kf_lace=['Δαντέλα','#f6efe2','#efe5d2','#2a2016','#17110a',lace('rgba(150,120,80,.22)'),lace('rgba(255,235,200,.12)')];
  PBGS.kf_roof=['Κεραμίδια','#f6e3d6','#eed2c0','#2e1a12','#1a0f0a',roof('rgba(170,80,50,.22)'),roof('rgba(255,170,130,.13)')];
})();
/* Neon, Mediterranean and Gold page backgrounds (sold in the Store) */
(function(){
  var u=function(svg){ return "url('data:image/svg+xml,"+encodeURIComponent(svg)+"')"; };
  var city=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="80"><g fill="'+c+'"><rect x="0" y="38" width="20" height="42"/><rect x="24" y="18" width="16" height="62"/><rect x="44" y="46" width="22" height="34"/><rect x="70" y="8" width="14" height="72"/><rect x="88" y="30" width="24" height="50"/><rect x="116" y="50" width="16" height="30"/><rect x="136" y="22" width="18" height="58"/><rect x="158" y="40" width="22" height="40"/></g></svg>')+' 0 100%/180px 80px repeat-x'; };
  var laser=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><g stroke="'+c+'" stroke-width="1.3" stroke-linecap="round"><path d="M0 40L90 -10M0 100L140 20M30 140L140 78"/></g><circle cx="90" cy="-10" r="2" fill="'+c+'"/></svg>')+' 0 0/140px 140px'; };
  var rainD=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="90"><g stroke="'+c+'" stroke-width="2" stroke-linecap="round"><path d="M8 6v14M8 34v6M30 20v18M30 58v8M52 4v10M52 40v16M20 70v12M44 74v10"/></g></svg>')+' 0 0/64px 90px'; };
  var scan=function(c){ return 'repeating-linear-gradient(180deg,'+c+' 0 1px,transparent 1px 7px)'; };
  var lights=function(a,b,c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><circle cx="10" cy="14" r="2.4" fill="'+a+'"/><circle cx="38" cy="8" r="1.8" fill="'+b+'"/><circle cx="50" cy="34" r="2.6" fill="'+c+'"/><circle cx="22" cy="44" r="1.8" fill="'+a+'"/><circle cx="6" cy="56" r="1.4" fill="'+b+'"/></svg>')+' 0 0/60px 60px'; };
  PBGS.ne_city=['Νυχτερινή πόλη','#e8e6f8','#d9d4f0','#120a2e','#07041a',city('rgba(90,60,170,.2)'),city('rgba(255,79,216,.2)')];
  PBGS.ne_laser=['Λέιζερ','#e3f3f8','#d3e6f1','#07162a','#040a18',laser('rgba(20,120,160,.22)'),laser('rgba(51,230,255,.22)')];
  PBGS.ne_digi=['Ψηφιακή βροχή','#e1f4ea','#d2eadc','#05180f','#020b07',rainD('rgba(30,140,80,.2)'),rainD('rgba(80,255,150,.2)')];
  PBGS.ne_scan=['Σάρωση','#f1e6f6','#e6d6ef','#1a0a28','#0c0416',scan('rgba(140,60,170,.12)'),scan('rgba(255,79,216,.12)')];
  PBGS.ne_dots=['Φωτάκια','#efe9f8','#e3dbf2','#140d2c','#0a061a',lights('rgba(200,60,150,.35)','rgba(40,160,200,.35)','rgba(200,170,30,.35)'),lights('rgba(255,79,216,.45)','rgba(51,230,255,.45)','rgba(255,225,77,.4)')];
  var swave=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40"><path d="M0 20Q20 4 40 20T80 20" fill="none" stroke="'+c+'" stroke-width="1.4"/><path d="M0 36Q20 20 40 36T80 36" fill="none" stroke="'+c+'" stroke-width="1.1"/></svg>')+' 0 0/80px 40px'; };
  var dome=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="70" height="56"><path d="M15 56a20 20 0 0 1 40 0z" fill="none" stroke="'+c+'" stroke-width="1.4"/><path d="M35 36V28M32 31h6" stroke="'+c+'" stroke-width="1.3"/><path d="M0 56h70" stroke="'+c+'" stroke-width="1.2"/></svg>')+' 0 100%/70px 56px repeat-x'; };
  var bou=function(c,d){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><g fill="'+c+'"><circle cx="14" cy="16" r="5"/><circle cx="22" cy="12" r="4"/><circle cx="20" cy="22" r="4"/><circle cx="68" cy="60" r="5"/><circle cx="76" cy="56" r="4"/><circle cx="74" cy="67" r="4"/></g><g fill="'+d+'"><circle cx="50" cy="30" r="2"/><circle cx="30" cy="76" r="2.4"/><circle cx="86" cy="14" r="2"/></g></svg>')+' 0 0/96px 96px'; };
  var net=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M0 0L28 28M28 0L0 28" stroke="'+c+'" stroke-width="1"/></svg>')+' 0 0/28px 28px'; };
  var sun=function(g){ return 'radial-gradient(circle at 84% 9%,'+g+' 0 30px,transparent 32px),radial-gradient(circle at 84% 9%,'+g+' 0 56px,transparent 58px)'; };
  PBGS.me_wave=['Κύματα','#dff1f6','#cfe7ef','#0d2a36','#07171e',swave('rgba(30,120,150,.2)'),swave('rgba(120,210,235,.14)')];
  PBGS.me_dome=['Θόλοι','#f4f1ea','#e8e3d6','#14243b','#0a1422',dome('rgba(40,90,170,.24)'),dome('rgba(130,170,235,.16)')];
  PBGS.me_bou=['Βουκαμβίλια','#f8e6ee','#f1d8e4','#2a1020','#160812',bou('rgba(210,60,120,.3)','rgba(90,150,60,.3)'),bou('rgba(255,110,170,.22)','rgba(130,200,100,.2)')];
  PBGS.me_net=['Δίχτυα','#e4edf4','#d5e2ec','#0f2234','#08131f',net('rgba(40,90,140,.16)'),net('rgba(140,190,230,.11)')];
  PBGS.me_sun=['Ηλιόλουστο','#fbf0d4','#f7e4b8','#2e2410','#17110a',sun('rgba(255,200,70,.35)'),sun('rgba(255,200,70,.14)')];
  var fan=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="24"><g fill="none" stroke="'+c+'" stroke-width="1.2"><path d="M0 24a24 24 0 0 1 48 0M8 24a16 16 0 0 1 32 0M16 24a8 8 0 0 1 16 0"/><path d="M-24 24a24 24 0 0 1 48 0M24 24a24 24 0 0 1 48 0" /></g></svg>')+' 0 0/48px 24px'; };
  var gdia=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 0L28 14L14 28L0 14Z" fill="none" stroke="'+c+'" stroke-width="1.1"/></svg>')+' 0 0/28px 28px'; };
  var gdot=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><circle cx="2" cy="2" r="1" fill="'+c+'"/></svg>')+' 0 0/14px 14px'; };
  var gdust=function(c){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><g fill="'+c+'"><path d="M20 20l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/><path d="M72 60l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z"/><circle cx="50" cy="12" r="1"/><circle cx="88" cy="22" r=".8"/><circle cx="34" cy="80" r="1.1"/><circle cx="8" cy="64" r=".8"/></g></svg>')+' 0 0/100px 100px'; };
  PBGS.go_deco=['Άρ ντεκό','#f7f0dc','#efe4c4','#1c1812','#0d0b08',fan('rgba(160,120,30,.26)'),fan('rgba(242,193,78,.2)')];
  PBGS.go_dia=['Διαμάντια','#f6eed8','#ede0bc','#1a1610','#0b0906',gdia('rgba(160,120,30,.22)'),gdia('rgba(242,193,78,.15)')];
  PBGS.go_line=['Χρυσές γραμμές','#f8f1de','#f0e5c6','#1b1711','#0c0a07','repeating-linear-gradient(135deg,rgba(160,120,30,.18) 0 1px,transparent 1px 14px)','repeating-linear-gradient(135deg,rgba(242,193,78,.14) 0 1px,transparent 1px 14px)'];
  PBGS.go_vel=['Βελούδο','#f2e6e4','#e8d6d4','#240c12','#12060a',gdot('rgba(120,30,50,.18)'),gdot('rgba(242,193,78,.16)')];
  PBGS.go_dust=['Χρυσόσκονη','#f6efdc','#ece0c0','#16130d','#0a0906',gdust('rgba(160,120,30,.35)'),gdust('rgba(242,193,78,.4)')];
})();
function pbgDark(){ var t=document.documentElement.getAttribute('data-theme'); if(t) return t==='dark'; try{ return matchMedia('(prefers-color-scheme: dark)').matches; }catch(e){ return false; } }
function pbgCss(c){ var T=PBGS[c], d=pbgDark(); if(!T || !T[1]) return ''; var a=d?T[3]:T[1], b=d?T[4]:T[2], pt=d?T[6]:T[5]; return (pt?pt+',':'')+b+' linear-gradient(180deg,'+a+','+b+') no-repeat'; }
/* card-back skins (the face-down cards, the piles and the cards that fly): classic is the original green and gold */
var BACKS={classic:{n:'Κλασικό'},blue:{n:'Μπλε',c1:'#2f5f9a',c2:'#14284a',a:'#d9e2f0',p:'dia'},burg:{n:'Μπορντό',c1:'#8a2a3a',c2:'#45101b',a:'#e7c36a',p:'str'},
  night:{n:'Νύχτα',c1:'#2a2a2e',c2:'#0b0b0d',a:'#e5a823',p:'dot'},lef:{n:'Λευκαρίτικο',c1:'#f2ead8',c2:'#d9cdb0',a:'#a1262e',p:'lef'},sea:{n:'Θάλασσα',c1:'#2a8c99',c2:'#0f4a55',a:'#e8f6f7',p:'wav'},
  /* Space (Pilotta Plus): no logo, a motif in the middle */
  sp_star:{n:'Αστέρια',c1:'#26306e',c2:'#0b1030',a:'#f2d27a',p:'stars',m:'star'},sp_orb:{n:'Τροχιά',c1:'#3d2a75',c2:'#150b33',a:'#c9b8ff',p:'orbit',m:'planet'},
  sp_crat:{n:'Κρατήρες',c1:'#7a7f88',c2:'#3a3d43',a:'#eef0f4',p:'crater',m:'crater'},sp_com:{n:'Κομήτης',c1:'#0f3c5a',c2:'#061827',a:'#9fe3ff',p:'comet',m:'comet'},
  sp_gal:{n:'Γαλαξίας',c1:'#5a1f5e',c2:'#1d0822',a:'#ffb3e6',p:'specks',m:'spiral'},
  /* Cypriot coffee shop (sold in the Store) */
  kf_cup:{n:'Φλιτζάνι',c1:'#7a4a2a',c2:'#3b2214',a:'#f3dcb6',p:'weave',m:'cup'},kf_brik:{n:'Μπρίκι',c1:'#a1262e',c2:'#4d0f15',a:'#f2d27a',p:'check',m:'brik'},
  kf_beads:{n:'Κομπολόι',c1:'#1f4a73',c2:'#0d2038',a:'#f0c05a',p:'lef',m:'beads'},kf_dice:{n:'Τάβλι',c1:'#2e6b46',c2:'#143523',a:'#f6f1e6',p:'dia',m:'dice'},
  kf_olive:{n:'Ελιά',c1:'#56662b',c2:'#27300f',a:'#e6edc4',p:'dot',m:'olive'}};
/* Neon, Mediterranean and Gold card backs (sold in the Store) */
Object.assign(BACKS,{
  ne_bolt:{n:'Αστραπή',c1:'#2a1060',c2:'#0b0522',a:'#ffe14d',p:'dia',m:'bolt'},ne_disc:{n:'Δίσκος',c1:'#0e2a4a',c2:'#050f20',a:'#33e6ff',p:'dot',m:'disc'},
  ne_pad:{n:'Χειριστήριο',c1:'#4a1060',c2:'#1a0624',a:'#ff4fd8',p:'check',m:'pad'},ne_sun:{n:'Ηλιοβασίλεμα',c1:'#6a1f6e',c2:'#220a30',a:'#ffb347',p:'str',m:'sunset'},
  ne_shd:{n:'Γυαλιά',c1:'#0f3a3a',c2:'#04161a',a:'#7dffe0',p:'comet',m:'glasses'},
  me_shell:{n:'Κοχύλι',c1:'#e8c9a4',c2:'#c79a6e',a:'#7a3a22',p:'wav',m:'shell'},me_anchor:{n:'Άγκυρα',c1:'#1c55a0',c2:'#0b2c5c',a:'#f4f1ea',p:'wav',m:'anchor'},
  me_sun:{n:'Ήλιος',c1:'#e8a13a',c2:'#b3541a',a:'#fff3c8',p:'dot',m:'sun'},me_boat:{n:'Βάρκα',c1:'#2a95b0',c2:'#0f5a73',a:'#ffffff',p:'wav',m:'boat'},
  me_lemon:{n:'Λεμόνι',c1:'#f2e6a0',c2:'#c9b440',a:'#4a5a14',p:'lef',m:'lemon'},
  go_crown:{n:'Στέμμα',c1:'#1d1d21',c2:'#050507',a:'#f2c14e',p:'dia',m:'crown'},go_gem:{n:'Διαμάντι',c1:'#14275a',c2:'#070f2a',a:'#f6e3a8',p:'dia',m:'gem'},
  go_coin:{n:'Νόμισμα',c1:'#5e1526',c2:'#240610',a:'#f2c14e',p:'dot',m:'coin'},go_key:{n:'Κλειδί',c1:'#0f4a37',c2:'#05201a',a:'#f2c14e',p:'lef',m:'key'},
  go_cup:{n:'Κύπελλο',c1:'#2e2e34',c2:'#0c0c0f',a:'#f2c14e',p:'str',m:'trophy'}});
/* a football for card backs and avatars (white, black patches); used by the football themes */
function fbBall(cx,cy,r){ var pts=[],ln='',i,a,x,y; for(i=0;i<5;i++){ a=-Math.PI/2+i*2*Math.PI/5; x=(cx+Math.cos(a)*r*.4).toFixed(1); y=(cy+Math.sin(a)*r*.4).toFixed(1); pts.push(x+' '+y); ln+='M'+x+' '+y+'L'+(cx+Math.cos(a)*r*.98).toFixed(1)+' '+(cy+Math.sin(a)*r*.98).toFixed(1); } return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#f6f6f2" stroke="#1a1a1a" stroke-width="1.2"/><path d="M'+pts.join('L')+'Z" fill="#1a1a1a"/><path d="'+ln+'" stroke="#1a1a1a" stroke-width="1.1" fill="none"/>'; }
function backSvg(o){
  var P={dia:'<pattern id="d" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M4 0L8 4L4 8L0 4Z" fill="none" stroke="'+o.a+'" stroke-opacity=".35" stroke-width=".6"/></pattern>',
    str:'<pattern id="d" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="6" fill="'+o.a+'" fill-opacity=".25"/></pattern>',
    dot:'<pattern id="d" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.1" fill="'+o.a+'" fill-opacity=".4"/></pattern>',
    wav:'<pattern id="d" width="10" height="6" patternUnits="userSpaceOnUse"><path d="M0 3Q2.5 0 5 3T10 3" fill="none" stroke="'+o.a+'" stroke-opacity=".5" stroke-width=".7"/></pattern>',
    lef:'<pattern id="d" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M5 0V10M0 5H10M2 2L8 8M8 2L2 8" fill="none" stroke="'+o.a+'" stroke-opacity=".5" stroke-width=".5"/></pattern>',
    stars:'<pattern id="d" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".8" fill="'+o.a+'"/><circle cx="10" cy="10" r=".5" fill="'+o.a+'" fill-opacity=".7"/><path d="M10 1.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="'+o.a+'" fill-opacity=".8"/></pattern>',
    orbit:'<pattern id="d" width="50" height="70" patternUnits="userSpaceOnUse"><ellipse cx="25" cy="35" rx="20" ry="9" fill="none" stroke="'+o.a+'" stroke-opacity=".45" stroke-width=".6"/><ellipse cx="25" cy="35" rx="24" ry="15" fill="none" stroke="'+o.a+'" stroke-opacity=".3" stroke-width=".6"/><circle cx="6" cy="31" r="1.4" fill="'+o.a+'"/><circle cx="44" cy="44" r="1" fill="'+o.a+'"/></pattern>',
    crater:'<pattern id="d" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="2.6" fill="none" stroke="'+o.a+'" stroke-opacity=".45" stroke-width=".6"/><circle cx="12" cy="12" r="1.5" fill="none" stroke="'+o.a+'" stroke-opacity=".35" stroke-width=".5"/></pattern>',
    comet:'<pattern id="d" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M2 14L11 5" stroke="'+o.a+'" stroke-opacity=".35" stroke-width=".8" stroke-linecap="round"/><circle cx="11.5" cy="4.5" r="1.2" fill="'+o.a+'" fill-opacity=".8"/></pattern>',
    weave:'<pattern id="d" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 2h8M0 6h8M2 0v8M6 0v8" fill="none" stroke="'+o.a+'" stroke-opacity=".28" stroke-width=".7"/></pattern>',
    check:'<pattern id="d" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="'+o.a+'" fill-opacity=".22"/><rect x="5" y="5" width="5" height="5" fill="'+o.a+'" fill-opacity=".22"/></pattern>',
    vst:'<pattern id="d" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="6" height="12" fill="'+o.a+'"/></pattern>',
    specks:'<pattern id="d" width="50" height="70" patternUnits="userSpaceOnUse"><circle cx="8" cy="10" r=".7" fill="'+o.a+'"/><circle cx="42" cy="60" r=".7" fill="'+o.a+'"/><circle cx="40" cy="12" r=".5" fill="'+o.a+'"/></pattern>'}[o.p];
  var a=o.a, M={star:'<path d="M25 25l2.6 6.4 6.9.6-5.3 4.5 1.6 6.7-5.8-3.6-5.8 3.6 1.6-6.7-5.3-4.5 6.9-.6z" fill="'+a+'"/>',
    cup:'<path d="M16 30h18v6a9 9 0 0 1-18 0z" fill="none" stroke="'+a+'" stroke-width="1.6"/><path d="M34 32h2.5a3.2 3.2 0 0 1 0 6.4H33" fill="none" stroke="'+a+'" stroke-width="1.4"/><path d="M13 47h24" stroke="'+a+'" stroke-width="1.4" stroke-linecap="round"/><path d="M21 22c-2 2 2 3 0 6M27 20c-2 2 2 3 0 6" fill="none" stroke="'+a+'" stroke-width="1.2" stroke-linecap="round"/>',
    brik:'<path d="M18 32h14l2 14H16z" fill="'+a+'" fill-opacity=".9"/><path d="M18 32l-3-4h20l-3 4z" fill="'+a+'"/><path d="M35 30l9-6" stroke="'+a+'" stroke-width="2.6" stroke-linecap="round"/>',
    beads:'<circle cx="36.0" cy="33.0" r="2.1" fill="'+a+'"/><circle cx="34.3" cy="38.9" r="2.1" fill="'+a+'"/><circle cx="29.6" cy="43.0" r="2.1" fill="'+a+'"/><circle cx="23.4" cy="43.9" r="2.1" fill="'+a+'"/><circle cx="17.8" cy="41.3" r="2.1" fill="'+a+'"/><circle cx="14.4" cy="36.1" r="2.1" fill="'+a+'"/><circle cx="14.4" cy="29.9" r="2.1" fill="'+a+'"/><circle cx="17.8" cy="24.7" r="2.1" fill="'+a+'"/><circle cx="23.4" cy="22.1" r="2.1" fill="'+a+'"/><circle cx="29.6" cy="23.0" r="2.1" fill="'+a+'"/><circle cx="34.3" cy="27.1" r="2.1" fill="'+a+'"/><path d="M25 44v9" stroke="'+a+'" stroke-width="1.4"/><path d="M22 53h6l-1 7h-4z" fill="'+a+'"/>',
    dice:'<rect x="13" y="31" width="14" height="14" rx="2.4" fill="none" stroke="'+a+'" stroke-width="1.4"/><circle cx="17" cy="35" r="1.3" fill="'+a+'"/><circle cx="23" cy="41" r="1.3" fill="'+a+'"/><circle cx="20" cy="38" r="1.3" fill="'+a+'"/><g transform="rotate(18 34 30)"><rect x="27" y="23" width="12" height="12" rx="2.2" fill="none" stroke="'+a+'" stroke-width="1.4"/><circle cx="30.5" cy="26.5" r="1.2" fill="'+a+'"/><circle cx="35.5" cy="31.5" r="1.2" fill="'+a+'"/></g>',
    olive:'<path d="M14 48C24 46 32 38 38 22" fill="none" stroke="'+a+'" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="21" cy="37" rx="2.6" ry="6" transform="rotate(40 21 37)" fill="'+a+'" fill-opacity=".85"/><ellipse cx="30" cy="30" rx="2.4" ry="5.5" transform="rotate(50 30 30)" fill="'+a+'" fill-opacity=".85"/><ellipse cx="27" cy="44" rx="3" ry="4" fill="'+a+'"/><ellipse cx="36" cy="40" rx="2.6" ry="3.6" fill="'+a+'"/>',
    planet:'<circle cx="25" cy="35" r="5" fill="'+a+'"/><circle cx="45" cy="35" r="1.6" fill="'+a+'"/>',
    crater:'<circle cx="25" cy="35" r="10" fill="none" stroke="'+a+'" stroke-opacity=".7" stroke-width="1"/><circle cx="21" cy="31" r="2.6" fill="'+a+'" fill-opacity=".25"/><circle cx="28.5" cy="38" r="3.4" fill="'+a+'" fill-opacity=".2"/>',
    comet:'<path d="M14 48L28 30" stroke="'+a+'" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/><circle cx="29.5" cy="28.5" r="4" fill="'+a+'"/>',
    spiral:'<path d="M25 35c0-4 6-4 6 0s-9 6-11 0 5-10 12-6c6 3 6 12-1 15M25 35c0 4-6 4-6 0s9-6 11 0-5 10-12 6c-6-3-6-12 1-15" fill="none" stroke="'+a+'" stroke-opacity=".85" stroke-width="1.1" stroke-linecap="round"/><circle cx="25" cy="35" r="1.6" fill="'+a+'"/>',
    bolt:'<path d="M28 20L17 37h7l-3 13 12-19h-7z" fill="'+a+'"/>',
    ball:fbBall(25,35,11),
    shirt:'<path d="M17 27l8-3.4 8 3.4 6 7-5 3-3-3v17H19V34l-3 3-5-3z" fill="#f6f6f2" stroke="#1a1a1a" stroke-width="1.2" stroke-linejoin="round"/><path d="M21 23.8q4 4 8 0" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>',
    gloves:'<g fill="'+a+'"><rect x="16" y="24" width="3.4" height="13" rx="1.7"/><rect x="19.9" y="22" width="3.4" height="14" rx="1.7"/><rect x="23.8" y="22.5" width="3.4" height="14" rx="1.7"/><rect x="27.7" y="25" width="3.4" height="12" rx="1.7"/><rect x="16" y="33" width="15.1" height="13" rx="4.5"/><rect x="31" y="34" width="3.6" height="9" rx="1.8" transform="rotate(-32 32 40)"/><rect x="17" y="46" width="13" height="4.5" rx="1.2" fill-opacity=".7"/></g>',
    disc:'<circle cx="25" cy="35" r="12" fill="none" stroke="'+a+'" stroke-width="1.4"/><circle cx="25" cy="35" r="7" fill="none" stroke="'+a+'" stroke-opacity=".6" stroke-width="1"/><circle cx="25" cy="35" r="2.4" fill="'+a+'"/>',
    pad:'<rect x="12" y="28" width="26" height="14" rx="6" fill="none" stroke="'+a+'" stroke-width="1.6"/><path d="M18 32v6M15 35h6" stroke="'+a+'" stroke-width="1.6" stroke-linecap="round"/><circle cx="31" cy="34" r="1.6" fill="'+a+'"/><circle cx="35" cy="37" r="1.6" fill="'+a+'"/>',
    sunset:'<path d="M11 40a14 14 0 0 1 28 0z" fill="'+a+'" fill-opacity=".9"/><path d="M8 44h34M12 48h26M16 52h18" stroke="'+a+'" stroke-width="1.4" stroke-linecap="round"/>',
    glasses:'<path d="M10 30h30l-2 8a5 5 0 0 1-5 4h-3a5 5 0 0 1-5-4l-1-3h-4l-1 3a5 5 0 0 1-5 4h-3a5 5 0 0 1-5-4z" fill="'+a+'"/>',
    shell:'<path d="M25 47L11 33a14 14 0 0 1 28 0z" fill="none" stroke="'+a+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M25 47V22M25 47L16 25M25 47L34 25M25 47L12 32M25 47L38 32" stroke="'+a+'" stroke-width="1.1"/>',
    anchor:'<circle cx="25" cy="25" r="3.2" fill="none" stroke="'+a+'" stroke-width="1.6"/><path d="M25 28v20M19 33h12M12 40c1 7 7 9 13 9s12-2 13-9" fill="none" stroke="'+a+'" stroke-width="1.8" stroke-linecap="round"/>',
    sun:'<circle cx="25" cy="35" r="7" fill="'+a+'"/><path d="M25 21v4M25 45v4M11 35h4M35 35h4M15 25l3 3M32 42l3 3M35 25l-3 3M18 42l-3 3" stroke="'+a+'" stroke-width="1.6" stroke-linecap="round"/>',
    boat:'<path d="M25 20v22M25 22l11 17H25M23 26L14 39h9" fill="'+a+'" fill-opacity=".9" stroke="'+a+'" stroke-width="1"/><path d="M12 44h26l-4 6H16z" fill="'+a+'"/>',
    lemon:'<ellipse cx="25" cy="36" rx="12" ry="8" transform="rotate(-25 25 36)" fill="'+a+'"/><path d="M33 26c3-4 6-4 7-3-1 3-3 5-6 5" fill="none" stroke="'+a+'" stroke-width="1.4"/>',
    crown:'<path d="M13 44L10 27l9 7 6-12 6 12 9-7-3 17z" fill="'+a+'"/><rect x="13" y="46" width="24" height="3.5" rx="1" fill="'+a+'"/>',
    gem:'<path d="M15 28h20l5 7-15 15L10 35z" fill="none" stroke="'+a+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 35h30M20 28l-3 7 8 15M30 28l3 7-8 15" fill="none" stroke="'+a+'" stroke-width="1"/>',
    coin:'<circle cx="25" cy="35" r="12" fill="none" stroke="'+a+'" stroke-width="1.8"/><circle cx="25" cy="35" r="8.5" fill="none" stroke="'+a+'" stroke-opacity=".6" stroke-width="1"/><path d="M25 29v12M28 31.5c-1-1.2-5-1.5-5.5.5-.6 3 6 1.5 5.7 4.5-.3 2.2-4.5 2.2-6 .5" fill="none" stroke="'+a+'" stroke-width="1.3" stroke-linecap="round"/>',
    key:'<circle cx="20" cy="30" r="6" fill="none" stroke="'+a+'" stroke-width="1.8"/><path d="M25 34l14 14M33 42l4-4M37 46l3-3" stroke="'+a+'" stroke-width="1.8" stroke-linecap="round"/>',
    trophy:'<path d="M17 24h16v8a8 8 0 0 1-16 0z" fill="'+a+'"/><path d="M17 26h-5c0 5 3 7 6 7M33 26h5c0 5-3 7-6 7" fill="none" stroke="'+a+'" stroke-width="1.5"/><path d="M25 40v5M18 49h14M20 45h10" stroke="'+a+'" stroke-width="1.8" stroke-linecap="round"/>'};
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 70"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+o.c1+'"/><stop offset="1" stop-color="'+o.c2+'"/></linearGradient>'+P+'</defs><rect width="50" height="70" fill="url(#g)"/><rect x="4" y="4" width="42" height="62" rx="3" fill="url(#d)" stroke="'+o.a+'" stroke-width="1.2"/>'+(o.m ? M[o.m] : '<circle cx="25" cy="35" r="12" fill="'+o.c2+'" stroke="'+o.a+'" stroke-width="1.4"/><text x="25" y="41" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="17" fill="'+o.a+'">Π</text>')+'</svg>';
}
function backCss(id){ var o=BACKS[id]; return (o && o.c1) ? 'background:'+o.c2+' url(\'data:image/svg+xml,'+encodeURIComponent(backSvg(o))+'\') center/cover no-repeat' : ''; }
/* avatars: small SVG badges, chosen in Settings and shown next to the name of the human players */
var AVS={h:['#f6e4e1','<text x="20" y="28" text-anchor="middle" font-size="24" fill="#c0392b">♥</text>'],d:['#f6e4e1','<text x="20" y="28" text-anchor="middle" font-size="24" fill="#c0392b">♦</text>'],
  c:['#e2eaee','<text x="20" y="28" text-anchor="middle" font-size="24" fill="#1d2b2f">♣</text>'],s:['#e2eaee','<text x="20" y="28" text-anchor="middle" font-size="24" fill="#1d2b2f">♠</text>'],
  crown:['#1b5a45','<path d="M10 27L8 14l8 6 4-9 4 9 8-6-2 13z" fill="#e5a823" stroke="#8a5a00" stroke-width="1.2"/><rect x="10" y="28.5" width="20" height="4" rx="1" fill="#e5a823" stroke="#8a5a00" stroke-width="1.2"/>'],
  star:['#24406b','<polygon points="20,7 23.5,16 33,16.5 25.7,22.5 28,32 20,26.8 12,32 14.3,22.5 7,16.5 16.5,16" fill="#f2c14e" stroke="#8a5a00" stroke-width="1"/>'],
  cup:['#c9b08a','<path d="M11 17h16v5a8 8 0 0 1-16 0z" fill="#f6f1e6" stroke="#5b3a1e" stroke-width="1.4"/><path d="M27 19h2.5a3 3 0 0 1 0 6H26" fill="none" stroke="#5b3a1e" stroke-width="1.4"/><path d="M16 9c-2 2 2 3 0 5M21 9c-2 2 2 3 0 5" fill="none" stroke="#5b3a1e" stroke-width="1.2" stroke-linecap="round"/>'],
  fire:['#40201a','<path d="M20 6c2 6 9 8 9 17a9 9 0 0 1-18 0c0-4 3-6 4-10 1 3 2 4 4 4-1-4-1-7 1-11z" fill="#f08a24" stroke="#b34a00" stroke-width="1"/><path d="M20 22c3 3 4 5 4 7a4 4 0 0 1-8 0c0-2 2-3 4-7z" fill="#ffd36b"/>'],
  sun:['#6fa8c9','<circle cx="20" cy="17" r="7" fill="#f9d45c"/><path d="M4 34l11-14 6 8 5-6 10 12z" fill="#6b5a46"/>'],
  fish:['#1f6b73','<ellipse cx="18" cy="20" rx="11" ry="7" fill="#f2f6f6"/><path d="M27 20l9-7v14z" fill="#f2f6f6"/><circle cx="12.5" cy="18.5" r="1.4" fill="#14221b"/>'],
  olive:['#d9e3c7','<path d="M8 30c10-2 18-9 24-20" fill="none" stroke="#5a6b2f" stroke-width="2" stroke-linecap="round"/><ellipse cx="17" cy="19" rx="3.2" ry="7" transform="rotate(35 17 19)" fill="#6d8a3a"/><ellipse cx="24" cy="12" rx="3" ry="6.5" transform="rotate(50 24 12)" fill="#6d8a3a"/><ellipse cx="14" cy="27" rx="3" ry="6.5" transform="rotate(-10 14 27)" fill="#55702c"/>'],
  K:['#134436','<text x="20" y="28" text-anchor="middle" font-size="22" font-weight="700" font-family="Georgia,serif" fill="#f2c14e">K</text>'],
  Q:['#6b1f2a','<text x="20" y="28" text-anchor="middle" font-size="22" font-weight="700" font-family="Georgia,serif" fill="#f6e0e3">Q</text>'],
  J:['#24406b','<text x="20" y="28" text-anchor="middle" font-size="22" font-weight="700" font-family="Georgia,serif" fill="#dfe8f6">J</text>'],
  A:['#2a2a2e','<text x="20" y="28" text-anchor="middle" font-size="22" font-weight="700" font-family="Georgia,serif" fill="#e5a823">A</text>']};
/* Space avatars (Pilotta Plus) */
AVS.sp_rocket=["#1b2156", "<path d=\"M20 6c5 4 6 11 4 18h-8c-2-7-1-14 4-18z\" fill=\"#eef1f6\" stroke=\"#9aa4b5\" stroke-width=\"1\"/><circle cx=\"20\" cy=\"15\" r=\"2.6\" fill=\"#5ab4ff\" stroke=\"#2c5d8a\" stroke-width=\".8\"/><path d=\"M16 20l-4 6h4zM24 20l4 6h-4z\" fill=\"#e5533d\"/><path d=\"M17.5 24.5h5l-1 4h-3z\" fill=\"#f2a33a\"/><path d=\"M18.5 28.5h3l-1.5 4z\" fill=\"#ffd36b\"/>"];
AVS.sp_planet=["#2a1a4f", "<circle cx=\"20\" cy=\"20\" r=\"8\" fill=\"#e5a823\"/><path d=\"M13 17.5c4 1 10 1 14 0\" stroke=\"#c4831a\" stroke-width=\"1.2\" fill=\"none\"/><ellipse cx=\"20\" cy=\"20\" rx=\"15\" ry=\"4.5\" fill=\"none\" stroke=\"#c9b8ff\" stroke-width=\"2\" transform=\"rotate(-18 20 20)\"/><circle cx=\"8\" cy=\"9\" r=\".9\" fill=\"#fff\"/><circle cx=\"32\" cy=\"31\" r=\".7\" fill=\"#fff\"/>"];
AVS.sp_astro=["#11314a", "<circle cx=\"20\" cy=\"19\" r=\"11\" fill=\"#eef1f6\" stroke=\"#9aa4b5\" stroke-width=\"1.2\"/><rect x=\"12.5\" y=\"13\" width=\"15\" height=\"11\" rx=\"5.5\" fill=\"#1d2b4a\"/><path d=\"M15 16.5c2-1.5 4-1.5 5-1\" stroke=\"#7fd0ff\" stroke-width=\"1.2\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"14\" y=\"29\" width=\"12\" height=\"5\" rx=\"2\" fill=\"#eef1f6\" stroke=\"#9aa4b5\" stroke-width=\"1\"/>"];
AVS.sp_alien=["#123a2a", "<path d=\"M20 7c7 0 11 5 11 11 0 7-6 14-11 14S9 25 9 18c0-6 4-11 11-11z\" fill=\"#7ee08a\" stroke=\"#2f8a45\" stroke-width=\"1\"/><ellipse cx=\"15.5\" cy=\"19\" rx=\"3.5\" ry=\"2.2\" fill=\"#10261a\" transform=\"rotate(25 15.5 19)\"/><ellipse cx=\"24.5\" cy=\"19\" rx=\"3.5\" ry=\"2.2\" fill=\"#10261a\" transform=\"rotate(-25 24.5 19)\"/><path d=\"M18 27c1.2.8 2.8.8 4 0\" stroke=\"#10261a\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\"/>"];
AVS.sp_ufo=["#1d1640", "<path d=\"M14 18a6 6 0 0 1 12 0z\" fill=\"#9fe3ff\" fill-opacity=\".85\" stroke=\"#5aa9c9\" stroke-width=\".8\"/><ellipse cx=\"20\" cy=\"21\" rx=\"13\" ry=\"4\" fill=\"#c7ccd6\" stroke=\"#7d8594\" stroke-width=\"1\"/><circle cx=\"13\" cy=\"21\" r=\"1\" fill=\"#ffd36b\"/><circle cx=\"20\" cy=\"22.5\" r=\"1\" fill=\"#ffd36b\"/><circle cx=\"27\" cy=\"21\" r=\"1\" fill=\"#ffd36b\"/><path d=\"M16 25l-3 8h14l-3-8z\" fill=\"#fff6a8\" fill-opacity=\".35\"/>"];
/* Cypriot coffee shop avatars (sold in the Store) */
AVS.kf_cof=["#5a3a22","<ellipse cx=\"20\" cy=\"29\" rx=\"13\" ry=\"3.2\" fill=\"#efe6d2\"/><path d=\"M12 17h16v6a8 8 0 0 1-16 0z\" fill=\"#fbf6ea\" stroke=\"#3b2214\" stroke-width=\"1.2\"/><ellipse cx=\"20\" cy=\"17\" rx=\"8\" ry=\"2\" fill=\"#3b2214\"/><ellipse cx=\"20\" cy=\"16.6\" rx=\"5\" ry=\"1\" fill=\"#d7b98a\"/><path d=\"M28 18.5h1.6a2.6 2.6 0 0 1 0 5.2H27\" fill=\"none\" stroke=\"#3b2214\" stroke-width=\"1.2\"/><path d=\"M16 11c-1.6 1.6 1.6 2.4 0 4M21 9c-1.6 1.6 1.6 2.4 0 4\" fill=\"none\" stroke=\"#efe6d2\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>"];
AVS.kf_brik=["#7a2a1c","<path d=\"M12 17h14l2 12H10z\" fill=\"#d9a441\" stroke=\"#7a4f0e\" stroke-width=\"1.2\"/><path d=\"M12 17l-2-3h18l-2 3z\" fill=\"#e8b856\" stroke=\"#7a4f0e\" stroke-width=\"1.2\"/><path d=\"M28 14l8-5\" stroke=\"#5b3a1e\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M16 9c-1.6 1.6 1.6 2.4 0 4M21 7c-1.6 1.6 1.6 2.4 0 4\" fill=\"none\" stroke=\"#f3dcb6\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>"];
AVS.kf_beads=["#1f3b57","<circle cx=\"20.0\" cy=\"7.0\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"25.3\" cy=\"8.7\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"28.6\" cy=\"13.2\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"28.6\" cy=\"18.8\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"25.3\" cy=\"23.3\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"20.0\" cy=\"25.0\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"14.7\" cy=\"23.3\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"11.4\" cy=\"18.8\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"11.4\" cy=\"13.2\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><circle cx=\"14.7\" cy=\"8.7\" r=\"2.6\" fill=\"#f0a93a\" stroke=\"#8a5a0e\" stroke-width=\".7\"/><path d=\"M20 25v6\" stroke=\"#f0a93a\" stroke-width=\"1.6\"/><path d=\"M17 31h6l-1 7h-4z\" fill=\"#d9822b\" stroke=\"#8a5a0e\" stroke-width=\".8\"/>"];
AVS.kf_dice=["#2e5b3e","<rect x=\"7\" y=\"16\" width=\"15\" height=\"15\" rx=\"2.6\" fill=\"#f6f1e6\" stroke=\"#333\" stroke-width=\"1\"/><circle cx=\"11.5\" cy=\"20.5\" r=\"1.4\" fill=\"#222\"/><circle cx=\"17.5\" cy=\"26.5\" r=\"1.4\" fill=\"#222\"/><circle cx=\"14.5\" cy=\"23.5\" r=\"1.4\" fill=\"#222\"/><g transform=\"rotate(16 28 15)\"><rect x=\"21\" y=\"8\" width=\"14\" height=\"14\" rx=\"2.6\" fill=\"#f6f1e6\" stroke=\"#333\" stroke-width=\"1\"/><circle cx=\"25\" cy=\"12\" r=\"1.4\" fill=\"#c0392b\"/><circle cx=\"31\" cy=\"12\" r=\"1.4\" fill=\"#c0392b\"/><circle cx=\"25\" cy=\"18\" r=\"1.4\" fill=\"#c0392b\"/><circle cx=\"31\" cy=\"18\" r=\"1.4\" fill=\"#c0392b\"/></g>"];
AVS.kf_hall=["#2f5f45","<path d=\"M7 24a13 13 0 0 1 26 0z\" fill=\"#f3e6b8\" stroke=\"#a8863a\" stroke-width=\"1.2\"/><path d=\"M12 24l2-7M18 24l1.2-9M24 24l-1.2-9M29 24l-2-7\" stroke=\"#b9732a\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><rect x=\"7\" y=\"24\" width=\"26\" height=\"4\" rx=\"1.5\" fill=\"#f9f0cf\" stroke=\"#a8863a\" stroke-width=\"1.2\"/><path d=\"M30 12c4-1 6 1 6 4-3 0-5-1-6-4z\" fill=\"#4e9a52\"/>"];
/* Neon, Mediterranean and Gold avatars (sold in the Store) */
AVS.ne_bolt=["#1a1040","<path d=\"M23 5L11 22h8l-3 13 14-19h-9z\" fill=\"#ffe14d\" stroke=\"#ff8a00\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/>"];
AVS.ne_phones=["#2a0a3a","<path d=\"M9 24v-4a11 11 0 0 1 22 0v4\" fill=\"none\" stroke=\"#ff4fd8\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><rect x=\"6.5\" y=\"22\" width=\"6\" height=\"10\" rx=\"2.5\" fill=\"#33e6ff\" stroke=\"#0b6f80\" stroke-width=\"1\"/><rect x=\"27.5\" y=\"22\" width=\"6\" height=\"10\" rx=\"2.5\" fill=\"#33e6ff\" stroke=\"#0b6f80\" stroke-width=\"1\"/>"];
AVS.ne_disc=["#0b1a2e","<circle cx=\"20\" cy=\"20\" r=\"13\" fill=\"#10151f\" stroke=\"#33e6ff\" stroke-width=\"1.4\"/><circle cx=\"20\" cy=\"20\" r=\"9\" fill=\"none\" stroke=\"#33e6ff\" stroke-opacity=\".5\" stroke-width=\".8\"/><circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#ff4fd8\"/><circle cx=\"20\" cy=\"20\" r=\"1.4\" fill=\"#10151f\"/>"];
AVS.ne_pad=["#1c1236","<rect x=\"5\" y=\"14\" width=\"30\" height=\"16\" rx=\"8\" fill=\"#2d2b4a\" stroke=\"#9d7bff\" stroke-width=\"1.4\"/><path d=\"M12 19v6M9 22h6\" stroke=\"#33e6ff\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><circle cx=\"26\" cy=\"21\" r=\"1.9\" fill=\"#ff4fd8\"/><circle cx=\"30.5\" cy=\"24.5\" r=\"1.9\" fill=\"#ffe14d\"/>"];
AVS.ne_shades=["#2a0f4f","<path d=\"M5 17h30l-1.5 8a5 5 0 0 1-5 4h-2a5 5 0 0 1-5-4l-.8-3h-4.4l-.8 3a5 5 0 0 1-5 4h-2a5 5 0 0 1-5-4z\" fill=\"#111\" stroke=\"#ff4fd8\" stroke-width=\"1.4\"/><path d=\"M9 20h5M24 20h5\" stroke=\"#33e6ff\" stroke-width=\"1.2\"/>"];
AVS.me_anchor=["#1c4f8f","<circle cx=\"20\" cy=\"9\" r=\"3\" fill=\"none\" stroke=\"#f4f1ea\" stroke-width=\"1.8\"/><path d=\"M20 12v21M13 18h14M7 25c1 7 7 10 13 10s12-3 13-10\" fill=\"none\" stroke=\"#f4f1ea\" stroke-width=\"2\" stroke-linecap=\"round\"/>"];
AVS.me_boat=["#7cc5dc","<path d=\"M20 6v21M20 8l11 16H20M18 12L9 24h9\" fill=\"#fff\" stroke=\"#c9d6dc\" stroke-width=\"1\"/><path d=\"M7 28h26l-4 6H11z\" fill=\"#c4673a\"/><path d=\"M4 36c4-2 6-2 10 0s6 2 10 0 8-2 12 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>"];
AVS.me_shell=["#f1d9b4","<path d=\"M20 33L7 21a13 13 0 0 1 26 0z\" fill=\"#f6b8a6\" stroke=\"#b86a54\" stroke-width=\"1.2\"/><path d=\"M20 33V10M20 33L12 13M20 33L28 13M20 33L8 21M20 33L32 21\" stroke=\"#b86a54\" stroke-width=\"1\" fill=\"none\"/><rect x=\"15\" y=\"33\" width=\"10\" height=\"3.5\" rx=\"1.5\" fill=\"#b86a54\"/>"];
AVS.me_lemon=["#dfeec0","<ellipse cx=\"20\" cy=\"22\" rx=\"13\" ry=\"9\" transform=\"rotate(-25 20 22)\" fill=\"#f7d73a\" stroke=\"#b79a12\" stroke-width=\"1.2\"/><path d=\"M29 10c4-3 7-3 8-2-1 4-4 6-8 5z\" fill=\"#5a9a3a\" stroke=\"#3a6a24\" stroke-width=\"1\"/>"];
AVS.me_sun=["#2a8fa8","<circle cx=\"20\" cy=\"20\" r=\"8\" fill=\"#ffd34a\" stroke=\"#d99a00\" stroke-width=\"1.2\"/><path d=\"M20 5v5M20 30v5M5 20h5M30 20h5M9.5 9.5l3.5 3.5M27 27l3.5 3.5M30.5 9.5L27 13M13 27l-3.5 3.5\" stroke=\"#ffd34a\" stroke-width=\"2\" stroke-linecap=\"round\"/>"];
AVS.go_crown=["#1a1a1d","<path d=\"M9 28L6 13l8 6 6-10 6 10 8-6-3 15z\" fill=\"#f2c14e\" stroke=\"#8a5a00\" stroke-width=\"1.2\"/><rect x=\"9\" y=\"29.5\" width=\"22\" height=\"4\" rx=\"1\" fill=\"#f2c14e\" stroke=\"#8a5a00\" stroke-width=\"1.2\"/><circle cx=\"20\" cy=\"22\" r=\"1.8\" fill=\"#c0392b\"/>"];
AVS.go_gem=["#14213d","<path d=\"M11 14h18l5 7-14 15L6 21z\" fill=\"#7fe3ff\" stroke=\"#2c7a99\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><path d=\"M6 21h28M15 14l-3 7 8 15M25 14l3 7-8 15\" fill=\"none\" stroke=\"#e6faff\" stroke-width=\".9\"/>"];
AVS.go_coin=["#2a2a30","<circle cx=\"20\" cy=\"20\" r=\"13\" fill=\"#f2c14e\" stroke=\"#8a5a00\" stroke-width=\"1.4\"/><circle cx=\"20\" cy=\"20\" r=\"9.5\" fill=\"none\" stroke=\"#8a5a00\" stroke-opacity=\".6\" stroke-width=\"1\"/><text x=\"20\" y=\"26\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" font-family=\"Georgia,serif\" fill=\"#8a5a00\">\u03a0</text>"];
AVS.go_trophy=["#0f3d2e","<path d=\"M12 8h16v9a8 8 0 0 1-16 0z\" fill=\"#f2c14e\" stroke=\"#8a5a00\" stroke-width=\"1.2\"/><path d=\"M12 10H7c0 6 3 8 6 8M28 10h5c0 6-3 8-6 8\" fill=\"none\" stroke=\"#f2c14e\" stroke-width=\"2\"/><rect x=\"18\" y=\"25\" width=\"4\" height=\"5\" fill=\"#f2c14e\"/><rect x=\"13\" y=\"30\" width=\"14\" height=\"4\" rx=\"1.5\" fill=\"#f2c14e\" stroke=\"#8a5a00\" stroke-width=\"1.2\"/>"];
AVS.go_ring=["#5a1424","<circle cx=\"20\" cy=\"25\" r=\"9\" fill=\"none\" stroke=\"#f2c14e\" stroke-width=\"3\"/><path d=\"M15 12h10l3 4-8 6-8-6z\" fill=\"#e6faff\" stroke=\"#6a9bb0\" stroke-width=\"1.1\" stroke-linejoin=\"round\"/>"];
function avSvg(id,bd){ var a=AVS[id]; if(typeof bd==='number') bd=bd>=0?{b:'tier',t:bd}:null; var bi=badgeBody(bd); return a ? '<svg class="av" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="'+a[0]+'" stroke="rgba(0,0,0,.25)"/>'+a[1]+(bi?'<svg x="22" y="23" width="23" height="23" viewBox="0 0 24 24" overflow="visible">'+bi+'</svg>':'')+'</svg>' : ''; }
/* badges. A badge is {b:'tier',t:category} (the badge of the rating category) or {b:id} for a special badge.
   Special badges are given only by the server (users/UID/badges, the app cannot write there), e.g. a tournament winner:
   BADGES.tn1={n:'Νο1 τουρνουά', body:function(){ return '...svg 24x24...'; }} */
var BADGES={
  /* Pilotta Plus: every Plus account has it (gold medal, a white star and a small purple +) */
  plus:{n:'Pilotta Plus',body:function(){ var g='pbg_'+(++TBN); return '<defs><linearGradient id="'+g+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#d39a12"/></linearGradient></defs><circle cx="12" cy="12" r="11" fill="url(#'+g+')" stroke="#fff" stroke-width="1.6"/><path d="M12 4.5l2 4.6 5 .5-3.8 3.3 1.1 4.9L12 15.3l-4.3 2.5 1.1-4.9L5 9.6l5-.5z" fill="#fff" stroke="#a87400" stroke-width=".5"/><circle cx="18.5" cy="5.5" r="3.6" fill="#7b5cd6" stroke="#fff" stroke-width="1"/><path d="M18.5 3.8v3.4M16.8 5.5h3.4" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>'; }}
};
function badgeBody(d){
  if(!d) return '';
  if(d.b!=='tier'){ var B=BADGES[d.b]; return B ? B.body() : ''; }
  return d.t>=0 ? tierBadge(d.t) : '';
}
function badgeSvg(d){ var bi=badgeBody(d); return bi ? '<svg class="bdg" viewBox="-1 -1 26 26" aria-hidden="true">'+bi+'</svg>' : ''; }
/* the badge of the rating category: copper 1 card, silver 2, gold 3, emerald 3 and a star, ruby K Q (the pilotta) and a star */
var TBN=0;
function tierBadge(t){
  var card=function(x,y,r){ return '<rect x="'+x+'" y="'+y+'" width="7" height="10" rx="1.4" fill="#fff" stroke="rgba(0,0,0,.35)" stroke-width=".6" transform="rotate('+r+' 12 15)"/>'; };
  var star=function(y){ return '<path transform="translate(0 '+y+')" d="M12 2.2l1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.2-2.3 1.2.5-2.5-1.8-1.7 2.5-.3z" fill="#f3cf55" stroke="#7a5a00" stroke-width=".4"/>'; };
  var C=[['#d08a52','#8a4f22','#fff'],['#d9e0e6','#8c99a5','#fff'],['#f3cf55','#b8860b','#fff'],['#2fae7a','#0e5c3c','#f3cf55'],['#b43a6e','#5a0f33','#f3cf55']][t];
  var ins=[card(8.5,7,0), card(6.5,7.5,-14)+card(10.5,7,12), card(4.8,8,-22)+card(8.5,6.5,0)+card(12.2,8,22), card(4.8,8.5,-22)+card(8.5,7,0)+card(12.2,8.5,22)+star(0),
    '<text x="7.6" y="16.4" font-family="Georgia,serif" font-weight="700" font-size="9" fill="#f3cf55" text-anchor="middle">K</text><text x="16.4" y="16.4" font-family="Georgia,serif" font-weight="700" font-size="9" fill="#f3cf55" text-anchor="middle">Q</text>'+star(.8)][t];
  /* a new gradient id every time: a gradient inside a hidden svg does not paint, so the ids must not be shared */
  var gid='tbg'+t+'_'+(++TBN);
  return '<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+C[0]+'"/><stop offset="1" stop-color="'+C[1]+'"/></linearGradient></defs><circle cx="12" cy="12" r="11" fill="url(#'+gid+')" stroke="'+C[2]+'" stroke-width="1.6"/>'+ins;
}
/* emotes: ready-made reactions, 10 of them in the quick bar, which the player chooses from the library */
var EMOS={thumb:['👍','Μπράβο'],wow:['😮','Ωπ!'],laugh:['😂','Χα χα'],pray:['🙏','Παρακαλώ'],hurry:['⏱️','Βιάσου'],fire:['🔥','Φωτιά!'],clap:['👏','Μπράβο!'],oof:['😅','Ουφ'],cool:['😎','Εύκολο'],think:['🤔','Χμμ'],heart:['❤️','Ευχαριστώ'],go:['💪','Πάμε!']};
/* Space emotes (Pilotta Plus) */
EMOS.sp_go=["🚀", "Απογείωση!"];
EMOS.sp_pl=["🪐", "Σε άλλο πλανήτη"];
EMOS.sp_al=["👽", "Εξωγήινο!"];
EMOS.sp_wi=["🌠", "Κάνε μια ευχή"];
EMOS.sp_uf=["🛸", "Με απήγαγαν"];
/* Cypriot coffee shop emotes (sold in the Store) */
EMOS.kf_cof=["☕", "Ένα καφεδάκι!"];
EMOS.kf_eye=["🧿", "Φτου, μάτι!"];
EMOS.kf_beg=["📿", "Πόση ώρα;"];
EMOS.kf_ziv=["🃏", "Ποιος μοιράζει;"];
EMOS.kf_new=["🗞️", "Διάβασες τα νέα;"];
/* Neon, Mediterranean and Gold emotes (sold in the Store) */
EMOS.ne_bol=["⚡", "Ηλεκτρισμός!"];
EMOS.ne_sha=["🕶️", "Τα έχω όλα υπό έλεγχο"];
EMOS.ne_hea=["🎧", "Βάλε μουσική!"];
EMOS.ne_pad=["🕹️", "Πάμε ρετρό!"];
EMOS.ne_cit=["🌃", "Νυχτερινή βόλτα"];
EMOS.me_anc=["⚓", "Σηκώστε άγκυρα!"];
EMOS.me_boa=["⛵", "Ούριος άνεμος!"];
EMOS.me_she=["🐚", "Ακούω τη θάλασσα"];
EMOS.me_lem=["🍋", "Ξινό!"];
EMOS.me_sun=["🌞", "Καλοκαίρι!"];
EMOS.go_cro=["👑", "Ο βασιλιάς!"];
EMOS.go_gem=["💎", "Διαμάντι!"];
EMOS.go_tro=["🏆", "Ο νικητής!"];
EMOS.go_coi=["🪙", "Χρυσάφι!"];
EMOS.go_toa=["🥂", "Στην υγειά μας!"];
/* Football themes (sold in the Store, one per pair of colours; prefixes fa_ … ff_). The designs, avatars and emotes are the same in all of them:
   only the colours change. The grass, the pitch lines and the goal net stay green in every one, like a real pitch.
   m/d = main colour and its dark shade, s/sd = second colour and its dark shade, mr/sr = the same as r,g,b for transparent layers,
   pa/pb = light and dark page backgrounds tinted with the main / second colour, cup = [back, back dark, trophy], gl = glove colour */
var FBV={
  gw:{pre:'fa_',n:'Πράσινο & Άσπρο',m:'#1f7a3c',d:'#0f4521',s:'#ffffff',sd:'#e6e9e3',mr:'31,122,60',sr:'255,255,255',tx:'#f1f8f2',pa:['#dcefe0','#c6e3cd','#173a22','#0b2014'],pb:['#f6f6f2','#e9e9e1','#2b2f2c','#161917'],cup:['#ffffff','#e6e9e3','#1f7a3c'],gl:'#ffffff',w:'πράσινο και άσπρο'},
  yb:{pre:'fb_',n:'Κίτρινο & Μπλε',m:'#f2c80f',d:'#c79d00',s:'#1f4fa3',sd:'#12306a',mr:'242,200,15',sr:'31,79,163',tx:'#1a1a1a',pa:['#fbf1c4','#f4e39b','#3d3409','#1f1a04'],pb:['#d6e2f6','#bcd0ef','#14295a','#0a1530'],cup:['#f2c80f','#c79d00','#1f4fa3'],gl:'#f2c80f',w:'κίτρινο και μπλε'},
  bw:{pre:'fc_',n:'Μπλε & Άσπρο',m:'#1f5bb5',d:'#0f2f6b',s:'#ffffff',sd:'#e6e9e3',mr:'31,91,181',sr:'255,255,255',tx:'#eef4ff',pa:['#d6e2f6','#bcd0ef','#14295a','#0a1530'],pb:['#f6f6f2','#e9e9e1','#2b2f2c','#161917'],cup:['#ffffff','#e6e9e3','#1f5bb5'],gl:'#ffffff',w:'μπλε και άσπρο'},
  yg:{pre:'fd_',n:'Κίτρινο & Πράσινο',m:'#f2c80f',d:'#c79d00',s:'#1f8a3c',sd:'#0f4521',mr:'242,200,15',sr:'31,138,60',tx:'#1a1a1a',pa:['#fbf1c4','#f4e39b','#3d3409','#1f1a04'],pb:['#dcefe0','#c6e3cd','#173a22','#0b2014'],cup:['#f2c80f','#c79d00','#1f8a3c'],gl:'#f2c80f',w:'κίτρινο και πράσινο'},
  gk:{pre:'fe_',n:'Πράσινο & Μαύρο',m:'#1f7a3c',d:'#0f4521',s:'#17191c',sd:'#050607',mr:'31,122,60',sr:'23,25,28',tx:'#f1f8f2',pa:['#dcefe0','#c6e3cd','#173a22','#0b2014'],pb:['#e4e5e7','#cfd1d4','#232528','#0e0f10'],cup:['#17191c','#050607','#5fd187'],gl:'#9be0b0',w:'πράσινο και μαύρο'},
  rw:{pre:'ff_',n:'Κόκκινο & Άσπρο',m:'#d4262e',d:'#8a1219',s:'#ffffff',sd:'#e6e9e3',mr:'212,38,46',sr:'255,255,255',tx:'#fff3f3',pa:['#f7d9da','#efbcbe','#4a1014','#260709'],pb:['#f6f6f2','#e9e9e1','#2b2f2c','#161917'],cup:['#ffffff','#e6e9e3','#d4262e'],gl:'#ffffff',w:'κόκκινο και άσπρο'}
};
(function(){
  var u=function(svg){ return "url('data:image/svg+xml,"+encodeURIComponent(svg)+"')"; };
  var G1='#2a7d3b', G2='#16502a', LN='rgba(255,255,255,.6)';
  var mow='repeating-linear-gradient(90deg,rgba(255,255,255,.1) 0 16px,transparent 16px 32px)';
  var mowL='repeating-linear-gradient(90deg,rgba(255,255,255,.22) 0 36px,transparent 36px 72px)', mowD='repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 36px,transparent 36px 72px)';
  Object.keys(FBV).forEach(function(k){
    var v=FBV[k], p=v.pre, mr='rgba('+v.mr+',', sr='rgba('+v.sr+',';
    var srD=(v.sr.split(',').reduce(function(t,x){ return t+(+x); },0))<150 ? 'rgba(150,156,160,' : sr;   /* a black second colour is shown grey on the dark base */
    /* table surfaces */
    FELTS[p+'grass']=['Γρασίδι',G1,G2,'#f1f8f2',mow];
    FELTS[p+'lines']=['Γραμμές γηπέδου',G1,G2,'#f1f8f2','radial-gradient(circle at 50% 50%,transparent 0 24px,'+LN+' 24px 26px,transparent 26px),linear-gradient(90deg,transparent calc(50% - 1px),'+LN+' calc(50% - 1px) calc(50% + 1px),transparent calc(50% + 1px)),'+mow];
    FELTS[p+'shirt']=['Ριγέ φανέλα',v.m,v.d,v.tx,'repeating-linear-gradient(90deg,'+v.s+' 0 12px,transparent 12px 24px)'];
    FELTS[p+'stand']=['Κερκίδα',v.m,v.d,v.tx,'radial-gradient(circle at 11px 9px,'+v.s+' 0 3px,transparent 3.5px) 0 0/22px 18px,repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 2px,transparent 2px 18px)'];
    FELTS[p+'net']=['Δίχτυ τέρματος','#134d27','#0a2d17','#e6f5ea','repeating-linear-gradient(45deg,rgba(255,255,255,.3) 0 1px,transparent 1px 14px),repeating-linear-gradient(-45deg,rgba(255,255,255,.3) 0 1px,transparent 1px 14px)'];
    /* backgrounds */
    PBGS[p+'turf']=['Γρασίδι','#a6dcae','#8fd09a','#1f6a35','#14502a',mowL,mowD];
    /* the stand: fans in both colours of the team on grey concrete */
    var lt2=(v.sr.split(',').reduce(function(t,x){ return t+(+x); },0))>600;
    var fan=function(c,dk){ var d=function(col,x,y){ return 'radial-gradient(circle at '+x+'px '+y+'px,'+col+' 0 2.4px,transparent 3px) 0 0/24px 16px'; }; return d(mr+c+')',6,6)+','+d((dk?srD:sr)+c+')',18,14); };
    PBGS[p+'stand']=['Κερκίδα','#cfd3cf','#bcc1bc','#2b302c','#1c201d',fan('.55'),fan(lt2?'.9':'.5',1)];
    /* the goal net with the crossbar and the posts (green like the pitch, the same in every colour pair) */
    var fr='linear-gradient(#fff,#fff) 0 0/100% 7px no-repeat,linear-gradient(#fff,#fff) 0 0/7px 100% no-repeat,linear-gradient(#fff,#fff) 100% 0/7px 100% no-repeat,';
    PBGS[p+'net']=['Δίχτυ τέρματος','#a6dcae','#8fd09a','#1f6a35','#14502a',fr+'repeating-linear-gradient(45deg,rgba(255,255,255,.32) 0 1px,transparent 1px 16px),repeating-linear-gradient(-45deg,rgba(255,255,255,.32) 0 1px,transparent 1px 16px)',fr.replace(/#fff,#fff/g,'rgba(255,255,255,.7),rgba(255,255,255,.7)')+'repeating-linear-gradient(45deg,rgba(255,255,255,.14) 0 1px,transparent 1px 16px),repeating-linear-gradient(-45deg,rgba(255,255,255,.14) 0 1px,transparent 1px 16px)'];
    var bun=function(a,b){ return u('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="26"><path d="M0 0h16L8 13z" fill="'+a+'"/><path d="M16 0h16L24 13z" fill="'+b+'"/></svg>')+' 0 0/32px 26px'; };
    /* dark theme: neutral dark base (a dark tint of yellow looks brown), the team colours are in the flags */
    PBGS[p+'flags']=['Σημαιάκια',v.pa[0],v.pa[1],'#242927','#161a18',bun(mr+'.3)',sr+'.7)'),bun(mr+'.62)',srD+(lt2?'.9)':'.7)'))];
    PBGS[p+'lights']=['Φώτα γηπέδου','#a6dcae','#8fd09a','#1f6a35','#14502a','radial-gradient(circle at 18% 10%,rgba(255,255,255,.7),transparent 38%),radial-gradient(circle at 82% 10%,rgba(255,255,255,.7),transparent 38%)','radial-gradient(circle at 18% 10%,rgba(255,255,255,.16),transparent 38%),radial-gradient(circle at 82% 10%,rgba(255,255,255,.16),transparent 38%)'];
    /* card backs */
    BACKS[p+'ball']={n:'Μπάλα',c1:v.m,c2:v.d,a:'#f6f6f2',p:'dot',m:'ball'};
    BACKS[p+'shirt']={n:'Φανέλα',c1:v.m,c2:v.d,a:v.s,p:'vst',m:'shirt'};
    BACKS[p+'cup']={n:'Κύπελλο',c1:v.cup[0],c2:v.cup[1],a:v.cup[2],p:'dia',m:'trophy'};
    BACKS[p+'gloves']={n:'Γάντια',c1:v.d,c2:'#0b0d0c',a:v.gl,p:'str',m:'gloves'};
    BACKS[p+'crown']={n:'Στέμμα',c1:v.m,c2:v.d,a:'#f6d56a',p:'dia',m:'crown'};
    /* avatars */
    var X='#cfd6d1', ol='stroke="#1a1a1a" stroke-width="1"';
    AVS[p+'ball']=[v.m,fbBall(20,20,12)];
    AVS[p+'goal']=['#2a7d3b','<path d="M7 30V13h26v17" fill="none" stroke="#1a1a1a" stroke-width="4.2" stroke-linejoin="round"/><path d="M7 30V13h26v17" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M7 17.5h26M7 22h26M7 26.5h26M12.5 13v17M18 13v17M23 13v17M28.5 13v17" stroke="#fff" stroke-opacity=".6" stroke-width=".7"/>'];
    AVS[p+'scarf']=[X,'<g '+ol+' stroke-linejoin="round"><rect x="6" y="12" width="28" height="8" rx="2" fill="'+v.m+'"/><rect x="11" y="12" width="3.6" height="8" fill="'+v.s+'"/><rect x="19" y="12" width="3.6" height="8" fill="'+v.s+'"/><rect x="27" y="12" width="3.6" height="8" fill="'+v.s+'"/><rect x="22" y="20" width="10" height="13" fill="'+v.m+'"/><rect x="22" y="24" width="10" height="3.6" fill="'+v.s+'"/></g><path d="M23.5 33v3M27 33v3M30.5 33v3" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>'];
    AVS[p+'stadium']=[X,'<ellipse cx="20" cy="22" rx="15" ry="9.5" fill="'+v.m+'" '+ol+'/><ellipse cx="20" cy="22" rx="15" ry="9.5" fill="none" stroke="'+v.s+'" stroke-width="1.6" stroke-dasharray="2.2 2.2"/><ellipse cx="20" cy="22" rx="10" ry="5.6" fill="#2a7d3b" stroke="#fff" stroke-width=".8"/><path d="M20 16.4v11.2" stroke="#fff" stroke-width=".8"/><circle cx="20" cy="22" r="1.9" fill="none" stroke="#fff" stroke-width=".8"/><path d="M5 22V9M35 22V9" stroke="#1a1a1a" stroke-width="1.4"/><rect x="3.5" y="6.5" width="3" height="3" fill="#fff3b0"/><rect x="33.5" y="6.5" width="3" height="3" fill="#fff3b0"/>'];
    AVS[p+'medal']=[v.d,'<path d="M13 4h6.4l3 11-6.4 2z" fill="'+v.m+'" '+ol+' stroke-linejoin="round"/><path d="M27 4h-6.4l-3 11 6.4 2z" fill="'+v.s+'" '+ol+' stroke-linejoin="round"/><circle cx="20" cy="26" r="9.5" fill="#f2c14e" stroke="#8a5a00" stroke-width="1.3"/><circle cx="20" cy="26" r="6.4" fill="none" stroke="#8a5a00" stroke-opacity=".6"/><text x="20" y="29.6" text-anchor="middle" font-size="10" font-weight="700" font-family="Georgia,serif" fill="#8a5a00">1</text>'];
    /* emotes */
    var ES=function(g){ return '<svg viewBox="0 0 24 24" width="1em" height="1em" style="display:inline-block;vertical-align:-.12em" aria-hidden="true">'+g+'</svg>'; };
    EMOS[p+'yel']=[ES('<rect x="6" y="3" width="12" height="18" rx="2" fill="#f7cf1d" stroke="#8a6a00" stroke-width="1" transform="rotate(8 12 12)"/>'),'Κίτρινη!'];
    EMOS[p+'red']=[ES('<rect x="6" y="3" width="12" height="18" rx="2" fill="#e03b32" stroke="#7a1511" stroke-width="1" transform="rotate(8 12 12)"/>'),'Κόκκινη!'];
    EMOS[p+'off']=[ES('<path d="M6.5 22V2.5" stroke="#5a4a3a" stroke-width="1.7" stroke-linecap="round"/><path d="M6.5 4h13l-2.4 4 2.4 4h-13z" fill="#f7cf1d" stroke="#8a6a00" stroke-width="1" stroke-linejoin="round"/><path d="M6.5 8h11.6" stroke="#e03b32" stroke-width="1.6"/>'),'Οφσάιντ!'];
    EMOS[p+'go']=[ES('<path d="M3.5 9.5h4l8.5-4.5v14l-8.5-4.5h-4z" fill="#e5533d" stroke="#7a1f14" stroke-width="1" stroke-linejoin="round"/><path d="M8 14l1.4 5.5h2.6L11 15" fill="#c9c9c9" stroke="#555" stroke-width=".9" stroke-linejoin="round"/><path d="M18.4 9a4.2 4.2 0 0 1 0 6M20.6 7a7 7 0 0 1 0 10" fill="none" stroke="#555" stroke-width="1.3" stroke-linecap="round"/>'),'Πάμε!'];
    EMOS[p+'win']=[ES('<path d="M7 3.5h10V10a5 5 0 0 1-10 0z" fill="#f2c14e" stroke="#8a5a00" stroke-width="1"/><path d="M7 5.5H3.6c0 4.2 2 5.6 4.2 5.6M17 5.5h3.4c0 4.2-2 5.6-4.2 5.6" fill="none" stroke="#f2c14e" stroke-width="1.7"/><rect x="10.7" y="15" width="2.6" height="3.6" fill="#f2c14e" stroke="#8a5a00" stroke-width=".9"/><rect x="7.5" y="18.6" width="9" height="3" rx="1" fill="#8a5a00"/>'),'Πρωταθλητές!'];
  });
})();

/* ---------- card faces (shared): the symbols, the figures J Q K, the pips and the joker ---------- */
var SYM = {H:'♥',D:'♦',S:'♠',C:'♣'};
/* J, Q, K: double-ended figure inside a frame (own drawing; 7-10 and A keep the plain look) */
function faceSvg(c){
  var r=c.r, sy=SYM[c.s], k='#2a2a2a';
  var body='<path d="M6 60L10 29Q30 21 50 29L54 60Z" fill="#2f55a8" stroke="'+k+'" stroke-width=".5"/><path d="M10 29Q30 21 50 29L48 36Q30 29 12 36Z" fill="#f2c230" stroke="'+k+'" stroke-width=".4"/><path d="M15 60L27 27H33L45 60Z" fill="#d0201b"/><circle cx="30" cy="47" r="6.5" fill="#fff" stroke="'+k+'" stroke-width=".5"/><text x="30" y="50.8" text-anchor="middle" font-size="9.5" fill="currentColor">'+sy+'</text>';
  var head='<circle cx="30" cy="19" r="7" fill="#f3cfae" stroke="'+k+'" stroke-width=".5"/><circle cx="27.4" cy="18" r=".7" fill="#234"/><circle cx="32.6" cy="18" r=".7" fill="#234"/><path d="M28 22.4Q30 23.6 32 22.4" stroke="#8a3b2f" stroke-width=".6" fill="none"/>';
  var top;
  if(r==='K') top=head+'<path d="M23.5 20Q30 33 36.5 20Q36 27 30 29Q24 27 23.5 20Z" fill="#eceff1" stroke="'+k+'" stroke-width=".4"/><path d="M26.5 21Q30 19.6 33.5 21Q30 22.6 26.5 21Z" fill="#eceff1" stroke="'+k+'" stroke-width=".3"/><path d="M22 13V5.5L26 9.5L30 3.5L34 9.5L38 5.5V13Z" fill="#f2c230" stroke="'+k+'" stroke-width=".5"/><rect x="22" y="11.6" width="16" height="2.2" fill="#d0201b" stroke="'+k+'" stroke-width=".3"/><circle cx="30" cy="3.5" r="1" fill="#d0201b"/>';
  else if(r==='Q') top='<path d="M21.5 20Q20 31 25 33L27 22ZM38.5 20Q40 31 35 33L33 22Z" fill="#d9a441" stroke="'+k+'" stroke-width=".4"/>'+head+'<path d="M22 13Q30 8 38 13L38.5 18Q30 11.5 21.5 18Z" fill="#d9a441" stroke="'+k+'" stroke-width=".4"/><path d="M22.5 11.5L23.5 5.5L26.5 9L30 4L33.5 9L36.5 5.5L37.5 11.5Z" fill="#f2c230" stroke="'+k+'" stroke-width=".5"/><circle cx="23.5" cy="5.2" r=".9" fill="#d0201b"/><circle cx="30" cy="3.7" r=".9" fill="#d0201b"/><circle cx="36.5" cy="5.2" r=".9" fill="#d0201b"/>';
  else top='<path d="M22.5 20Q21 27 24.5 29L26 21ZM37.5 20Q39 27 35.5 29L34 21Z" fill="#7a4b22" stroke="'+k+'" stroke-width=".4"/>'+head+'<path d="M22.5 15Q24 5 36 7Q40 9 38.5 15Q30 9 22.5 15Z" fill="#d0201b" stroke="'+k+'" stroke-width=".5"/><path d="M36 8Q44 2 46 -1" stroke="#f2c230" stroke-width="1.4" fill="none"/>';
  var g='<g>'+body+top+'</g>';
  return '<svg class="fc" viewBox="0 0 60 120" preserveAspectRatio="none" aria-hidden="true">'+g+'<g transform="rotate(180 30 60)">'+g+'</g><line x1="2" y1="60" x2="58" y2="60" stroke="#3b5aa8" stroke-width=".3"/><text x="49" y="110" font-size="17" text-anchor="middle" fill="currentColor" transform="rotate(180 49 104)">'+sy+'</text></svg>';
}
/* suit symbols drawn as shapes, so they look the same on every device (font glyphs differ in size between systems) */
var SUITP={H:'<path d="M50 92C20 68 5 50 5 33 5 18 16 8 29 8c10 0 17 6 21 13 4-7 11-13 21-13 13 0 24 10 24 25 0 17-15 35-45 59z"/>',
 D:'<path d="M50 2 92 50 50 98 8 50z"/>',
 S:'<path d="M50 3C50 3 8 36 8 59c0 12 9 21 22 21 7 0 13-3 17-8-1 10-5 17-14 22h34c-9-5-13-12-14-22 4 5 10 8 17 8 13 0 22-9 22-21C92 36 50 3 50 3z"/>',
 C:'<circle cx="50" cy="27" r="22"/><circle cx="26" cy="63" r="22"/><circle cx="74" cy="63" r="22"/><path d="M50 55c0 20-4 32-15 42h30C54 87 50 75 50 55z"/>'};
function suitSvg(s){ return '<svg class="sv" viewBox="0 0 100 100" aria-hidden="true" focusable="false">'+SUITP[s]+'</svg>'; }
/* pips of the 2-10 («Classic cards» layout): shown on the cards of the hand and on the table */
var PIPS={'2':[[1,.2],[1,.8]],'3':[[1,.2],[1,.5],[1,.8]],'4':[[0,.2],[0,.8],[2,.2],[2,.8]],'5':[[0,.2],[0,.8],[2,.2],[2,.8],[1,.5]],'6':[[0,.2],[0,.5],[0,.8],[2,.2],[2,.5],[2,.8]],'7':[[0,.2],[0,.5],[0,.8],[2,.2],[2,.5],[2,.8],[1,.35]],'8':[[0,.2],[0,.5],[0,.8],[2,.2],[2,.5],[2,.8],[1,.35],[1,.65]],'9':[[0,.18],[0,.39],[0,.61],[0,.82],[2,.18],[2,.39],[2,.61],[2,.82],[1,.5]],'10':[[0,.18],[0,.39],[0,.61],[0,.82],[2,.18],[2,.39],[2,.61],[2,.82],[1,.285],[1,.715]]};
function pipsEl(c){
  var a=PIPS[c.r]; if(!a) return '';
  return '<span class="pips" aria-hidden="true">'+a.map(function(q){ return '<i'+(q[1]>.5?' class="fl"':'')+' style="left:'+[38,53,68][q[0]]+'%;top:'+(q[1]*100)+'%">'+suitSvg(c.s)+'</i>'; }).join('')+'</span>';
}

/* the joker: a jester, single-ended. The card is {r:'JK', s:'R'} (red) or {r:'JK', s:'B'} (black); the colour comes from the card's text colour */
function jokerSvg(){
  var k='#2a2a2a', st=' stroke="'+k+'" stroke-width=".5"';
  return '<svg class="fc" viewBox="0 0 60 120" preserveAspectRatio="none" aria-hidden="true">'
    +'<path d="M18 46C8 40 6 28 10 17C14 27 22 31 30 33Z" fill="currentColor"'+st+'/>'
    +'<path d="M42 46C52 40 54 28 50 17C46 27 38 31 30 33Z" fill="currentColor"'+st+'/>'
    +'<path d="M22 46C22 32 28 22 30 9C32 22 38 32 38 46Z" fill="currentColor"'+st+'/>'
    +'<circle cx="10" cy="16" r="2.3" fill="#f2c230"'+st+'/><circle cx="50" cy="16" r="2.3" fill="#f2c230"'+st+'/><circle cx="30" cy="8" r="2.3" fill="#f2c230"'+st+'/>'
    +'<rect x="18" y="44" width="24" height="5" fill="#f2c230"'+st+'/>'
    +'<circle cx="30" cy="60" r="11" fill="#f3cfae"'+st+'/><circle cx="26" cy="58" r="1" fill="#234"/><circle cx="34" cy="58" r="1" fill="#234"/><path d="M25 65Q30 69 35 65" stroke="#8a3b2f" stroke-width=".7" fill="none"/>'
    +'<path d="M12 76L18 86L24 76L30 86L36 76L42 86L48 76Z" fill="#f2c230"'+st+'/>'
    +'<path d="M16 86H44L48 110H12Z" fill="currentColor"'+st+'/>'
    +'<path d="M30 92L32.2 97.2L37.8 97.6L33.5 101.2L34.9 106.6L30 103.6L25.1 106.6L26.5 101.2L22.2 97.6L27.8 97.2Z" fill="#fff"/>'
    +'<text x="30" y="118" text-anchor="middle" font-size="7" font-weight="700" font-family="sans-serif" fill="currentColor">JOKER</text></svg>';
}
/* the inside of a card: rank in the corner, then the big suit (layout 'classic') or, in the full layout (full=true), the figure / the pips / the big suit.
   c = {r,s}; r is 2-10, J, Q, K, A, or JK (joker). No game rules in here. */
function cardInner(c,full){
  var r=c.r, jk=(r==='JK'), fig=(r==='J'||r==='Q'||r==='K');
  if(!full) return '<span class="rk">'+(jk?'\u2605':r)+'</span><span class="st">'+(jk?'\u2605':suitSvg(c.s))+'</span>';
  return '<span class="rk'+(r==='10'?' r10':'')+'">'+(jk?'\u2605':r+'<span class="rs" aria-hidden="true">'+suitSvg(c.s)+'</span>')+'</span>'
    +(jk ? jokerSvg() : fig ? faceSvg(c) : '<span class="st">'+suitSvg(c.s)+'</span>'+pipsEl(c));
}
