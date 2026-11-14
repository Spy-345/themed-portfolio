import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:60000,use:{baseURL:process.env.PLAYWRIGHT_BASE_URL||'https://spyy.xyz',browserName:'chromium',reducedMotion:'reduce'},reporter:'list',outputDir:'test-results'});
