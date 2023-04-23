import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      // resolving index.js file or the root entry file
      build.onResolve({ filter:/(^index\.js$)/}, async(args: any)=>{
        return { path: args.path, namespace: 'a'}
      });

      // resolving ./ or ../ paths of a module
      build.onResolve({ filter:/(^\.+\/$)/}, async(args:any)=>{
        return { 
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href, 
          namespace: 'a' }
        ;  
      })

      // resolving main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace : 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });

    },
  };
};
