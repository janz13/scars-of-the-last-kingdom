const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// In hoisted mode, packages live in the workspace's node_modules, not the monorepo root.
// Tell Metro to look in the project's node_modules first.
config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, "node_modules/react"),
  "react-dom": path.resolve(projectRoot, "node_modules/react-dom"),
};

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react") {
    return {
      filePath: path.resolve(projectRoot, "node_modules/react/index.js"),
      type: "sourceFile",
    };
  }
  if (moduleName === "react-dom") {
    return {
      filePath: path.resolve(projectRoot, "node_modules/react-dom/index.js"),
      type: "sourceFile",
    };
  }
  if (moduleName === "react-dom/client") {
    return {
      filePath: path.resolve(projectRoot, "node_modules/react-dom/client.js"),
      type: "sourceFile",
    };
  }
  if (moduleName === "react/jsx-runtime") {
    return {
      filePath: path.resolve(projectRoot, "node_modules/react/jsx-runtime.js"),
      type: "sourceFile",
    };
  }
  if (moduleName === "react/jsx-dev-runtime") {
    return {
      filePath: path.resolve(projectRoot, "node_modules/react/jsx-dev-runtime.js"),
      type: "sourceFile",
    };
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
