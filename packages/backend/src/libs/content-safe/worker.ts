import { Mint } from 'mint-filter';
import { parentPort } from 'worker_threads';

import type { MintWorkerInput, MintWorkerOutput } from './types';

if (parentPort) {
  let mint = new Mint([]);
  parentPort.on('message', (data: MintWorkerInput) => {
    let reply: MintWorkerOutput;
    switch (data.type) {
      case 'set-keys': {
        mint = new Mint(data.keys);
        reply = { type: 'set-keys' };
        break;
      }
      case 'filter': {
        reply = {
          type: 'filter',
          data: mint.filter(data.text, { replace: data.replace }),
        };
        break;
      }
      case 'verify': {
        reply = {
          type: 'verify',
          pass: mint.verify(data.text),
        };
        break;
      }
    }
    parentPort.postMessage(reply);
  });
}
