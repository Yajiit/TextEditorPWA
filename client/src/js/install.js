// // client/src/js/install.js
const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // prevent default install prompt
  event.preventDefault();
  // stash event to be triggered later.
  deferredPrompt = event;
  // display install button
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // show install prompt
    deferredPrompt.prompt();
    // await user response
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    // clear defferedPrompt variable
    deferredPrompt = null;
    // remove install button
    butInstall.style.display = 'none';
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed!', event);
});
