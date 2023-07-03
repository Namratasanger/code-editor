import path from "path";
import { Command } from "commander";
import { serve } from "@codenote/server";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "codeNote.js", options: { port: string }) => {
    // handle error handling if some error occurred for an instance a port is already in use
    try {
      //calculating the file path
      // join current working directory file path and the directory path
      const dir = path.join(process.cwd(), path.dirname(filename));

      //path.basename(filename) : extract only the file name
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigation to http://localhost:${options.port} to edit the the file.`
      );
    } catch (err: any) {
      if (err.code === "EADDRINUSE") {
        console.log("Port is in use. Try running on a different port");
      } else {
        console.log("Error log : ", err.message);
      }
      process.exit(1);
    }
  });
