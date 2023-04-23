import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from 'localforage';

// using local forage to deal with indexDB 
const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) =>{
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild){
        build.onLoad({ filter: /.*/ }, async (args: any) => {    
            if (args.path === 'index.js') {
              return {
                loader: 'jsx',
                contents: inputCode,
              };
            } 
    
            // reducing network calls to the library code for better performance
            // Check whether the file is already fetched and is in the cache
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
    
            // if in cache then return 
            if(cachedResult){
              return cachedResult;
            }
    
            // file not found use axios to fetch the file
            const { data, request } = await axios.get(args.path);
    
            const result : esbuild.OnLoadResult = {
              loader: "jsx",
              contents: data,
              resolveDir: new URL("./", request.responseURL).pathname
            }
            
            // store the reponse in the cache 
            await fileCache.setItem(args.path, result);
            return result;
          });
        }
    }
}