import { program } from 'commander';
import { setKey } from './src/actions';

program
  .name('tpng')
  .version('0.0.1')
  .description('A CLI for tinypng')
  .argument('<images...>', 'Images to upload')
  .action(() => console.log('no command'));

program
  .command('key')
  .description('Set your API key -- Get from https://tinypng.com/developers')
  .argument('<key>', 'Your API key')
  .action((key: string) => {
    console.log('Attempting to set APi key...');
    setKey(key);
  });

program.parse(process.argv);
