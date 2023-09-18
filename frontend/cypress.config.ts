import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "1e2tt5",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Specify the folder where screenshots will be saved
  screenshotsFolder: "./cypress/screenshots",
  // Specify the folder where videos will be saved
  videosFolder: "./cypress/videos"
});
