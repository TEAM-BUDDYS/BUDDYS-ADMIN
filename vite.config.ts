import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const REQUIRED_ENVIRONMENT_VARIABLES = [
  'VITE_API_BASE_URL',
  'VITE_KAKAO_REST_API_KEY',
  'VITE_KAKAO_REDIRECT_URI',
] as const;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '');
  const missingEnvironmentVariables = REQUIRED_ENVIRONMENT_VARIABLES.filter(
    (name) => !environment[name]?.trim(),
  );

  if (missingEnvironmentVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvironmentVariables.join(', ')}`,
    );
  }

  return {
    plugins: [react(), tailwindcss()],
  };
});
