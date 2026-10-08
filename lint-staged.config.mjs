const lintStagedConfig = {
  '*.{js,mjs,cjs,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,html,md,yml,yaml}': 'prettier --write',
};

export default lintStagedConfig;
