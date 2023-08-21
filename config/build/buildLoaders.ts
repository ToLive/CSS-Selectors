import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const typescriptLoader = { test: /\.ts?$/, loader: 'ts-loader' };

    const fontLoader = {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
            filename: './fonts/[name][ext]',
        },
    };

    const imageLoader =
    {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
            filename: 'images/[name][ext]',
        },
    }

    const cssLoader = {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    };

    const svgLoader = {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
            filename: 'images/[name][ext]',
        },
    };

    return [
        typescriptLoader,
        fontLoader,
        cssLoader,
        svgLoader,
        imageLoader
    ]
}