import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

const numCPUs = os.cpus().length;

class WorkerPool<I, O> {
  private workers: Worker[] = [];

  constructor(
    private workerFile: string,
    private numWorkers: number = numCPUs,
  ) {
    for (let i = 0; i < this.numWorkers; i++) {
      const worker = new Worker(path.join(__dirname, this.workerFile), {
        execArgv: ['-r', 'ts-node/register'],
      });

      worker.on('error', (err) => {
        console.error('Worker error:', err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          console.warn(`Worker exited with code ${code}`);
        }
      });

      this.workers.push(worker);
    }
  }

  /** This method distributes the task to a free worker and returns a promise with the result. */
  execute(data: I): Promise<O> {
    return new Promise((resolve, reject) => {
      const worker = this.workers.pop();
      if (!worker) {
        reject('No-available-workers.');
        return;
      }

      worker.once('message', (message: O) => {
        resolve(message);
        this.workers.push(worker); // Return worker to the pool
      });

      worker.postMessage(data);
    });
  }

  /** This method distributes the task to all available workers and returns a promise with the results. */
  executeAll(data: I): Promise<O[]> {
    return Promise.all(this.workers.map(() => this.execute(data)));
  }
}

export default WorkerPool;
