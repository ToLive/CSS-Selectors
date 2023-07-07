import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, target, devTool } = options;

    return {
        mode: mode,
        entry: paths.entry,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(),
        target,
        devServer: buildDevServer(options),
        devtool: devTool,
        output: {
            publicPath: 'auto',
            path: paths.build,
            filename: 'bundle.js',
            clean: true,
            chunkFilename: '[id].[contenthash].js',
        },
    }
}