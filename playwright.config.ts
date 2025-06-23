import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para tests E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* Ejecutar tests en paralelo */
  fullyParallel: true,
  /* Fallar build si tests están marcados como test.only en CI */
  forbidOnly: !!process.env.CI,
  /* Reintentos en CI solamente */
  retries: process.env.CI ? 2 : 0,
  /* Opt out de parallel tests en CI */
  workers: process.env.CI ? 1 : undefined,
  /* Configuración de reportes */
  reporter: 'html',
  /* Configuración compartida para todos los tests */
  use: {
    /* URL base */
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:8080',
    /* Recopilar trace en retry */
    trace: 'on-first-retry',
    /* Screenshot en fallo */
    screenshot: 'only-on-failure',
    /* Video en fallo */
    video: 'retain-on-failure',
  },

  /* Configurar proyectos para browsers principales */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Tests móviles */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Ejecutar servidor dev local antes de iniciar tests */
  webServer: {
    command: 'yarn start',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
