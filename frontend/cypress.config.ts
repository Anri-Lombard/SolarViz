import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "1e2tt5",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "src/app/**/*.cy.tsx",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Specify the folder where screenshots will be saved
  screenshotsFolder: "./cypress/screenshots",
  trashAssetsBeforeRuns: true,
  // Specify the folder where videos will be saved
  videosFolder: "./cypress/videos",
  defaultCommandTimeout: 10000,
});
