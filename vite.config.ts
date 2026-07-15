import { defineConfig, loadEnv, type UserConfig, type ConfigEnv } from 'vite'
import type { PluginOption, IndexHtmlTransformResult } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { siteConfig } from './src/config/site'

function siteMetaPlugin(): PluginOption {
  return {
    name: 'site-meta',
    transformIndexHtml(html): IndexHtmlTransformResult {
      const replacements: Record<string, string> = {
        SITE_TITLE: siteConfig.seo.title,
        SITE_DESCRIPTION: siteConfig.seo.description,
        SITE_OG_TITLE: siteConfig.seo.ogTitle,
        SITE_OG_DESCRIPTION: siteConfig.seo.ogDescription,
        SITE_LANG: siteConfig.seo.lang,
      }
      let result = html
      for (const [key, value] of Object.entries(replacements)) {
        result = result.replaceAll(`{{${key}}}`, value)
      }
      return result
    },
  }
}

// https://vite.dev/config/
const config = async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  const plugins: PluginOption[] = [react(), tailwindcss(), siteMetaPlugin()];
  try {
    // @ts-expect-error — optional source tags plugin
    const m = await import('./.vite-source-tags.js');
    const tags = m.sourceTags();
    if (Array.isArray(tags)) {
      plugins.push(...tags);
    } else {
      plugins.push(tags);
    }
  } catch { /* not available */ }

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
    server: {
      host: true,
      allowedHosts: true,
    },
  };
};

export default defineConfig(config);
