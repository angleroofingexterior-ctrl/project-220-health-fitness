import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.project220.health',
  appName: 'Project 220',
  webDir: 'public-pages',
  bundledWebRuntime: false,
  android: { allowMixedContent: false },
};

export default config;
