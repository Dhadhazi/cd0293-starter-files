export default {
  spec_dir: "dist",
  spec_files: ["**/*[sS]pec.@(js|mjs)"], // Only JS files in dist
  helpers: ["helpers/**/*.?(m)js"],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true,
  },
};
