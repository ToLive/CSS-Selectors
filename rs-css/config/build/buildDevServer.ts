import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";

export function buildDevServer({ paths, devPort }: BuildOptions): DevServerConfiguration {
    return {
        static: {
            directory: paths.build,
        },
        port: devPort,
        historyApiFallback: true,
        hot: true,
    }
}