/** @type {import('next-i18next').UserConfig} */

const userConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["sv", "en"],
  },
  react: { useSuspense: false },
  localePath: path.resolve("./public/locales"),
};

module.exports = userConfig;
