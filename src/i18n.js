import { createI18n } from "vue-i18n";

// Auto-descoberta de todas as traduções modulares das versões
const versionLangFiles = import.meta.glob("./versions/**/(pt|es).json", {
  eager: true,
  import: "default",
});

const loadLocaleMessages = async () => {
  const locales = ["pt", "es"];
  const messages = {};

  for (const locale of locales) {
    const baseModule = await import(`./lang/${locale}.json`);
    const baseMessages = { ...(baseModule.default || baseModule) };

    if (!baseMessages.community_versions) {
      baseMessages.community_versions = {};
    }

    // Mesclar traduções modulares de cada versão: ./versions/{slug}/{locale}.json
    Object.entries(versionLangFiles).forEach(([path, content]) => {
      const match = path.match(/\.\/versions\/([^/]+)\/(pt|es)\.json$/);
      if (match) {
        const [, slug, lang] = match;
        if (lang === locale) {
          baseMessages.community_versions[slug] = {
            ...(baseMessages.community_versions[slug] || {}),
            ...content,
          };
        }
      }
    });

    messages[locale] = baseMessages;
  }

  return messages;
};

export const createI18nInstance = async () => {
  const messages = await loadLocaleMessages();
  const lang = localStorage.getItem("lang") || "pt";

  return createI18n({
    legacy: false, // Usando a API Composition
    locale: lang, // Idioma padrão
    fallbackLocale: "pt", // Idioma de fallback
    messages, // Carregar as mensagens
  });
};

export default createI18nInstance;
