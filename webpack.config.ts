import webpack from 'webpack';
import path from 'path';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        build: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'src', 'index.html'),
        favicon: path.resolve(__dirname, 'src', 'app/assets/favicon.svg'),
    };

    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env.port || 3001;
    const devTool = isDev ? 'inline-source-map' : false;

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        target: 'web',
        devPort: PORT,
        devTool,
    });

    return config;
};
