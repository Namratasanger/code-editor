import { program } from "commander";
import { serveCommand } from "./commands/serve";

program.addCommand(serveCommand);

// parse the command line arguments and handle the execution as mentioned by serveCommand.
program.parse(process.argv);
