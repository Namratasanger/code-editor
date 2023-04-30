import * as esbuild from "esbuild-wasm";
import axios from "axios";
import * as localForage from "localforage";

// using local forage to deal with indexDB
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      // for any paths return the cached result otherwise esbuild will look for other onLoad if this onLoad will return nothing
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // reducing network calls to the library code for better performance
        // Check whether the file is already fetched and is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if in cache then return
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // file not found use axios to fetch the file
        const { data, request } = await axios.get(args.path);

        // escaping css snippets to safely add it in javascript
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        // adding a style element in the head tag
        const contents = `const style = document.createElementBy('style');
              style.innerText = '${escaped}';
              document.head.appendChild(style);`;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // store the reponse in the cache
        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // file not found use axios to fetch the file
        const { data, request } = await axios.get(args.path);
        console.log(args);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // store the reponse in the cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
