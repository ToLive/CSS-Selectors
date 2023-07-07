import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export function buildResolvers(): webpack.ResolveOptions {
    return {
        extensions: ['.js', 'jsx', '.mjs', '.css', '.ts', '.tsx'],
        alias: {
            events: 'events',
        },
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    }
}