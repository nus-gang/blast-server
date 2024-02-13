import { Application } from './scripts/Application';

let app: Application;
async function main() {
  const valid_stages: string[] = ['local', 'dev', 'stg', 'prod'];
  console.info(`stage: ${process.env.stage}`);
  if (false === valid_stages.includes(process.env.stage)) {
    throw new Error(`invalid environment: ${process.env.stage}`);
  }

  app = Application.getInstance();
  console.info(process.env.listen_port);
  await app.init(Number(process.env.listen_port));
  await app.start();
}

process.on('uncaughtException', function (err) {
  console.error(err, 'Uncaught exception');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    {
      promise,
      reason,
    },
    'Unhandled Rejection at: Promise',
  );
});

process.on('exit', async () => {
  console.log('process.exit() method is fired');
  if (app) {
    await app.close();
  }
});

main().then();
