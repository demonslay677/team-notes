'use strict';
const ROUTING_URL='https://api.github.com/repos/demonslay677/team-notes/contents/current.json?ref=live';
const FALLBACK_URL='https://raw.githubusercontent.com/demonslay677/team-notes/live/current.json';
const status=document.getElementById('status'),retry=document.getElementById('retry');
async function openBoard(){
  retry.hidden=true;status.textContent='Finding the board’s current address…';
  const fragment=location.hash;
  // Keep the invitation out of the address bar while routing metadata is fetched.
  if(fragment)history.replaceState(null,'',location.pathname+location.search);
  try{
    let response=await fetch(ROUTING_URL+'&v='+Date.now(),{headers:{Accept:'application/vnd.github.raw+json'},cache:'no-store',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(15000)});
    if(!response.ok)response=await fetch(FALLBACK_URL+'?v='+Date.now(),{cache:'no-store',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw new Error('Routing information is temporarily unavailable.');
    const data=await response.json();
    if(data.version!==1||!/^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/.test(data.origin))throw new Error('The board address could not be verified.');
    const target=new URL(data.origin+'/');target.hash=fragment;
    status.textContent='Opening the private board…';
    location.replace(target.href);
  }catch(error){
    if(fragment)history.replaceState(null,'',location.pathname+location.search+fragment);
    status.textContent='The board is temporarily unavailable. Wait a moment and try again using this same invitation.';
    retry.hidden=false;
  }
}
retry.onclick=openBoard;openBoard();
