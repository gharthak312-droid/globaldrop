/* GlobalDrop — storefront visitor tracking (visits + presence)
   Tiny + defensive: everything is wrapped in try/catch, there is NO UI, and
   any failure (including the visits/presence tables not existing yet) is
   silently ignored — the store is never affected.
   Writes ONE visits row per visitor per day (PKT) and keeps a presence row
   fresh every 30s so the Admin > Stats view can show "online now".
   Uses the same Supabase project + public publishable key as store-data.js;
   the constants are duplicated here with local fallbacks so this file also
   works if load order ever changes. */
(function(){
  'use strict';
  try {
    var SB_URL = (typeof GD_SB_URL !== 'undefined' && GD_SB_URL) || 'https://orzsyrrckekegymjpalx.supabase.co';
    var SB_KEY = (typeof GD_SB_KEY !== 'undefined' && GD_SB_KEY) || 'sb_publishable_lL4h47MDzjR8Gx2f0JCb8g_F738zRT4';
    var REST = SB_URL + '/rest/v1/';

    var vid = null;
    try { vid = localStorage.getItem('gd_vid'); } catch(e){}
    if (!vid) {
      vid = (typeof gdUid === 'function')
        ? gdUid('v')
        : 'v' + Date.now().toString(36) + Math.floor(Math.random() * 1e9).toString(36);
      try { localStorage.setItem('gd_vid', vid); } catch(e){}
    }

    function todayPKT(){
      try { return new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Karachi'}).format(new Date()); }
      catch(e){ return new Date().toISOString().slice(0, 10); }
    }
    function post(path, body, prefer){
      try {
        return fetch(REST + path, { method:'POST', keepalive:true,
          headers:{ 'apikey':SB_KEY, 'Authorization':'Bearer ' + SB_KEY, 'Content-Type':'application/json', 'Prefer':prefer },
          body: JSON.stringify(body) }).catch(function(){});
      } catch(e){}
    }
    function beat(){
      post('presence?on_conflict=visitor',
        { visitor: vid, seen_at: new Date().toISOString() },
        'resolution=merge-duplicates,return=minimal');
    }

    /* one row per visitor per PKT day — duplicates are ignored server-side */
    post('visits?on_conflict=day,visitor',
      { day: todayPKT(), visitor: vid },
      'resolution=ignore-duplicates,return=minimal');
    beat();
    setInterval(beat, 30000);
  } catch(e){}
})();
