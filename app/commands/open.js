import { TermColors } from "../constants.js";
import { colorize, sleep } from "../utils.js";
import fileSystem from "../file-system.js";

const WebApps = [
  {
    name: 'twitch',
    url: 'https://twitch.tv/flumuffel'
  },
];

const open = {
  id: "open",
  description: 'öffne files oder programme',
  usage: `\r\n\topen filename\r\n\topen [${WebApps.map(app => app.name).join(' | ')}]`,
  args: 1,
  async exec(term, args) {
    let url = '';
    const file = fileSystem.get(args[0]);
    if (file) {
      url = `${window.location.origin}${file.path}`;
    } else {
      const app = WebApps.find(a => a.name === args[0]);
      if (app) {
        url = app.url;
      }
    }
   
    if (url === '') {
      term.writeln(colorize(TermColors.Red, '[error]: ') + `"${args[0]}" keine solche Datei oder Programm gefunden`);
      term.writeln(this.usage);
      return;
    }
    term.writeln(`opening ${args[0]}...`);
    await sleep(1000);
    window.open(url);
  }
};

export default open;


