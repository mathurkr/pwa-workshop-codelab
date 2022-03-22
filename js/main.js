/*
 Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// import swURL from 'sw:../service-worker.js';
// /* 1) REGISTER SERVICE WORKER
//   "The import syntax for the service worker URL is needed so our build tool, 
//  WMR, can compile the service worker correctly. If you aren't using WMR, 
//  instead set swURL to the path to your service worker."" */
// if('serviceWorker' in navigator){
//   window.addEventListener('load',async()=>{
//     //trying to register sw
//     try{
//       const reg = await navigator.serviceWorker.register(swURL);
//       console.log('Service worker registered! ',reg);
//     }
//     catch(err){
//       console.log('Service worker registration failed: ',err);
//     }
//   });
// }
import swURL from 'sw:../service-worker.js';

// Register the service worker
if ('serviceWorker' in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener('load', async () => {
    // Try to register the service worker.
    try {
      const reg = await navigator.serviceWorker.register(swURL);
      console.log('Service worker registered! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registration failed: ', err);
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  // Set up the editor
  const { Editor } = await import('./app/editor.js');
  const editor = new Editor(document.body);

  // Set up the menu
  const { Menu } = await import('./app/menu.js');
  new Menu(document.querySelector('.actions'), editor);

  // Set the initial state in the editor
  const defaultText = `# Welcome to PWA Edit!\n\nTo leave the editing area, press the \`esc\` key, then \`tab\` or \`shift+tab\`.`;

  editor.setContent(defaultText);
});
