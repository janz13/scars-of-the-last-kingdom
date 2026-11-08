module.exports = ({ config }) => {
  const rawBaseUrl = process.env.EXPO_BASE_URL ?? config.experiments?.baseUrl;
  // Clean baseUrl: ensure leading slash, remove trailing slash if present (except if root '/')
  let baseUrl = rawBaseUrl;
  if (baseUrl) {
    baseUrl = baseUrl.trim();
    if (!baseUrl.startsWith('/')) {
      baseUrl = '/' + baseUrl;
    }
    if (baseUrl.length > 1 && baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
  }

  return {
    ...config,
    web: {
      ...config.web,
      ...(baseUrl && baseUrl !== '/' ? { scope: `${baseUrl}/` } : {}),
    },
    experiments: {
      ...config.experiments,
      ...(baseUrl && baseUrl !== '/' ? { baseUrl } : {}),
    },
  };
};
