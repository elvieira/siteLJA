# 🎵 Louvor JA — Site Oficial

> Site institucional do **Louvor JA**, um software de letras para projeção de músicas gospel em cultos e eventos religiosos.
>
> **Acesse:** [louvorja.com.br](https://louvorja.com.br)

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Páginas e Rotas](#páginas-e-rotas)
- [Sistema de Internacionalização (i18n)](#sistema-de-internacionalização-i18n)
- [Sistema de Versões da Comunidade](#sistema-de-versões-da-comunidade)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Serviço de API](#serviço-de-api)
- [Como rodar localmente](#como-rodar-localmente)
- [Build de Produção](#build-de-produção)

---

## 🧭 Visão Geral

O site do Louvor JA é uma **SPA (Single Page Application)** construída com Vue 3 e Vite. Serve como portal informativo do software, com suporte a múltiplos idiomas (Português e Espanhol), sistema de versões da comunidade integrado com GitHub e seção completa de ajuda e FAQ.

**Funcionalidades principais:**

- 🌐 Suporte bilíngue (PT-BR / ES)
- 📦 Downloads dinâmicos detectados via GitHub Releases
- 🤝 Vitrine de versões da comunidade com dados ao vivo do GitHub
- 🖥️ Detecção do SO do usuário para indicar download recomendado
- 📰 Changelog dinâmico via GitHub Releases
- 🖼️ Galeria de capturas de tela por versão
- ❓ Central de ajuda com artigos em formato JSON
- 💬 Integração com redes sociais (WhatsApp, Telegram, Facebook, Instagram)
- 💳 Doações via PIX e PayPal

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| **Vue.js** | ^3.5.13 | Framework principal (SPA) |
| **Vite** | ^6.2.0 | Bundler e dev server |
| **Vue Router** | ^4.5.0 | Roteamento client-side |
| **Vue i18n** | ^11.0.0-rc.1 | Internacionalização (PT/ES) |
| **Bootstrap** | ^5.3.3 | Grid e utilitários base |
| **jQuery** | ^3.7.1 | Animações e manipulação DOM |
| **vue3-carousel** | ^0.14.0 | Carousel de capturas de tela |
| **vite-plugin-sitemap** | ^0.8.2 | Geração automática de sitemap.xml |
| **Font Awesome 4** | local | Ícones |
| **Google Fonts (Inter)** | CDN | Tipografia |

**CSS:** Vanilla CSS customizado (`src/assets/css/style.css`), sem Tailwind.

---

## 📁 Estrutura do Projeto

```
siteLJA/
├── index.html                    # Entry point HTML
├── vite.config.js                # Configuração do Vite (alias @, sitemap, porta 5003)
├── package.json                  # Dependências e scripts npm
├── .env                          # Variáveis de ambiente (URLs sociais, drives)
├── .env.production               # Override de variáveis para produção
│
└── src/
    ├── main.js                   # Bootstrap da aplicação Vue
    ├── App.vue                   # Root component (Header + RouterView + Footer)
    ├── i18n.js                   # Configuração do Vue i18n com auto-descoberta de traduções
    │
    ├── router/
    │   └── index.js              # Definição de todas as rotas da SPA
    │
    ├── lang/
    │   ├── pt.json               # Strings base em Português
    │   └── es.json               # Strings base em Espanhol
    │
    ├── versions/
    │   ├── registry.js           # ⭐ Fonte única de verdade das versões da comunidade
    │   ├── loader.js             # Carregador remoto (GitHub API + cache em memória/sessionStorage)
    │   └── index.js              # Módulo central (re-exporta registry + loader)
    │
    ├── views/
    │   ├── Home.vue              # Página inicial com hero, carousel, features e CTAs
    │   ├── About.vue             # Sobre o programa, tecnologia e equipe
    │   ├── Download.vue          # Download do instalador oficial (via API)
    │   ├── Community.vue         # Listagem de versões da comunidade
    │   ├── CommunityDetails.vue  # Detalhes de uma versão (downloads, galeria, changelog)
    │   ├── Help.vue              # Central de ajuda (listagem de artigos)
    │   ├── HelpItem.vue          # Artigo individual de ajuda
    │   ├── FAQ.vue               # Perguntas frequentes
    │   ├── Contact.vue           # Formulário de contato
    │   ├── Donation.vue          # Doações via PIX e PayPal
    │   ├── Version.vue           # Informações sobre a versão do site
    │   ├── Dev.vue               # Página interna de desenvolvimento
    │   └── NotFound.vue          # Página 404
    │
    ├── layout/
    │   ├── Header.vue            # Navbar com menu, seletor de idioma e menu mobile
    │   ├── Footer.vue            # Rodapé com links e redes sociais
    │   └── Popup.vue             # Modal/popup global
    │
    ├── components/
    │   ├── Carousel.vue          # Carousel de imagens reutilizável
    │   ├── LyricLayout.vue       # Layout de exibição de letras
    │   ├── NotFound.vue          # Componente de estado vazio/erro
    │   └── help/                 # Subcomponentes da central de ajuda
    │
    ├── services/
    │   └── Api.js                # Wrapper fetch para a API oficial (louvorja.com.br)
    │
    └── assets/
        ├── css/
        │   ├── style.css         # CSS principal (~68KB, design system completo)
        │   └── font-awesome.min.css
        ├── imgs/                 # Logo SVG, mockups e imagens estáticas
        ├── flags/                # Ícones de bandeiras para o seletor de idioma
        ├── icon-fonts/           # Webfonts do Font Awesome
        └── js/                   # Scripts JS legados
```

---

## 🗺️ Páginas e Rotas

### Rotas de conteúdo

| Rota | Nome | Componente | Descrição |
|---|---|---|---|
| `/` | `home` | `Home.vue` | Página inicial com hero, screenshots, features e CTAs |
| `/programa` | `about` | `About.vue` | Detalhes do programa, tecnologia e equipe |
| `/download` | `download` | `Download.vue` | Download do instalador oficial (via API louvorja.com.br) |
| `/comunidade` | `community` | `Community.vue` | Listagem de todas as versões da comunidade ativas |
| `/comunidade/:slug` | `community-details` | `CommunityDetails.vue` | Detalhes completos de uma versão (dados ao vivo do GitHub) |
| `/ajuda` | `help` | `Help.vue` | Central de ajuda com todos os artigos disponíveis |
| `/ajuda/:slug` | `help-item` | `HelpItem.vue` | Artigo individual da central de ajuda |
| `/faq` | `faq` | `FAQ.vue` | Perguntas frequentes |
| `/contato` | `contact` | `Contact.vue` | Formulário de contato |
| `/doacao` | `donation` | `Donation.vue` | Doações via PIX e PayPal |

### Rotas de redirecionamento

Estas rotas leem a URL de destino de variáveis de ambiente e redirecionam o browser:

| Rota | Variável de Ambiente |
|---|---|
| `/whatsapp` | `VITE_WHATSAPP_URL` |
| `/telegram` | `VITE_TELEGRAM_URL` |
| `/telegram-dev` | `VITE_TELEGRAM_DEV_URL` |
| `/facebook` | `VITE_FACEBOOK_URL` |
| `/instagram` | `VITE_INSTAGRAM_URL` |
| `/drive` | `VITE_DRIVE_URL` (banco de letras PT) |
| `/drive_es` | `VITE_ES_DRIVE_URL` (banco de letras ES) |

---

## 🌐 Sistema de Internacionalização (i18n)

O projeto usa **Vue i18n v11** com dois idiomas: Português (`pt`) e Espanhol (`es`).

### Fluxo de carregamento (`src/i18n.js`)

1. Carrega as strings base de `src/lang/pt.json` e `src/lang/es.json`.
2. Auto-descobre e mescla automaticamente arquivos `pt.json` / `es.json` encontrados em `src/versions/**/`.
3. A preferência do idioma é persistida em `localStorage` e pode ser definida via `?lang=es` na URL.
4. O idioma padrão é Português com fallback automático para PT se uma chave estiver ausente.

### Traduções dinâmicas de versões da comunidade

As versões da comunidade publicam seus próprios arquivos de tradução no repositório GitHub (`community/pt.json`, `community/es.json`). Esses arquivos são buscados remotamente e injetados no i18n em tempo de execução via `injectRemoteTranslations()`.

---

## 🤝 Sistema de Versões da Comunidade

O sistema de versões da comunidade é o subsistema mais sofisticado do projeto. É composto por **3 arquivos** que formam camadas distintas de responsabilidade.

---

### `registry.js` — Fonte Única de Verdade

**Este é o único arquivo que precisa ser editado** para cadastrar, ativar ou desativar versões da comunidade. Qualquer mudança aqui reflete imediatamente em todo o site.

```js
{
  slug: "flute",            // Identificador único e segmento de URL (/comunidade/flute)
  codename: "Flute",        // Nome de exibição do codinome
  repo: "usuario/repo",     // Repositório GitHub no formato "usuario/repositorio"
  branch: "main",           // Branch de publicação (padrão: "main")
  folder: "community",      // Pasta com os arquivos dentro do repo (padrão: "community")
  color: "#0084c1",         // Cor primária em HEX — usada nos badges e no tema da página
  stage: "Beta",            // Estágio: "Alpha" | "Beta" | "RC" | "Estável"
  platforms: ["windows", "mac", "linux"],  // Plataformas suportadas
  enabled: true,            // true = visível no site | false = completamente oculta
}
```

---

### `loader.js` — Carregador Remoto com Cache

Responsável por buscar e processar dados ao vivo do GitHub para cada versão registrada.

#### Arquivos esperados no repositório da versão

Dentro da pasta definida no campo `folder` (padrão: `community/`):

| Arquivo | Conteúdo |
|---|---|
| `pt.json` | Textos, descrições, features e changelog em Português |
| `es.json` | Textos, descrições, features e changelog em Espanhol |
| `main.webp` / `main.png` / `main.jpg` | Imagem principal / mockup da versão |
| `01.webp` … `10.webp` | Galeria de capturas de tela (até 10 fotos) |

#### Fontes de dados utilizadas

| Fonte | Endpoint base |
|---|---|
| Arquivos raw | `raw.githubusercontent.com/{repo}/{branch}/{folder}/` |
| CDN jsDelivr | `cdn.jsdelivr.net/gh/{repo}@{branch}/{folder}/` |
| GitHub Releases API | `api.github.com/repos/{repo}/releases` |

#### Sistema de cache em duas camadas

1. **Memória (`Map`):** Cache primário durante a sessão. Consultado primeiro, sem custo de parse.
2. **`sessionStorage`:** Cache secundário persistente entre navegações da aba (TTL: 30 minutos).
3. **Chave de cache:** `comm_remote_v10_{slug}` — incrementar o sufixo força a invalidação de todos os clientes.

#### Funções utilitárias de cor

| Função | Descrição |
|---|---|
| `parseColor(input)` | Converte hex (#RRGGBB, #RGB), nomes comuns (pt/en) ou rgb em `{r, g, b}` |
| `rgbToHsl(r, g, b)` | Converte RGB para HSL |
| `hslToRgb(h, s, l)` | Converte HSL para RGB |
| `hexToRgba(color, alpha)` | Retorna string `rgba(r, g, b, alpha)` para estilos inline |
| `hexToRgbString(color)` | Retorna `"r, g, b"` para uso em CSS custom properties |
| `getBadgeStyle(color)` | Calcula background, border e text-color do badge com ajuste inteligente para cores escuras ou monocromáticas |
| `getVersionThemeStyles(color)` | Retorna objeto de estilos CSS completo para o tema da página de uma versão |

---

### `index.js` — Módulo Central

Re-exporta e compõe tudo dos dois módulos anteriores. **É o único ponto de importação** para os componentes Vue.

```js
import { loadCommunityVersion, getVersionDownloads, detectUserPlatform } from "@/versions";
```

#### API pública

| Função | Descrição |
|---|---|
| `getRegisteredVersion(slug)` | Retorna o objeto de config de uma versão pelo slug |
| `getActiveVersions()` | Retorna todas as versões com `enabled: true` e `repo` preenchido |
| `loadCommunityVersion(slugOrConfig)` | Busca os dados remotos completos de uma versão com cache automático |
| `loadAllCommunityVersions()` | Carrega todas as versões ativas em paralelo com `Promise.all` |
| `getVersionDownloads(versionData, $t)` | Gera plataformas e botões de download a partir dos assets da última release |
| `detectUserPlatform()` | Detecta SO e arquitetura do navegador do usuário |
| `injectRemoteTranslations(i18n, versions)` | Injeta traduções remotas no i18n em tempo de execução |

---

### Como `getVersionDownloads` funciona

A função percorre **todos os assets da última release do GitHub**, filtra arquivos de metadados (`.yml`, `.blockmap`, `.sha256`, etc.) e classifica cada instalador por plataforma e arquitetura:

- **Linux:** `.AppImage`, `.deb`, `.rpm`, `.tar.gz`, `.tar.xz`, `.flatpak`, `.snap` (detecta ARM64 vs x86_64)
- **macOS:** `.dmg`, `.pkg` — priorizados sobre `.zip` de auto-update (detecta Intel vs Apple Silicon/ARM)
- **Windows:** `.exe`, `.msi`, `.zip` portátil (detecta versões 32/64-bit e ARM64)

Cards e botões só são renderizados se o arquivo estiver disponível. Se nenhum instalador for encontrado, exibe card de fallback com link para o repositório.

---

### Como `detectUserPlatform` funciona

Usa `navigator.userAgentData.platform` (API moderna) com fallback para `navigator.userAgent` para identificar o SO. No **macOS**, detecta Apple Silicon vs Intel de forma não intrusiva via **WebGL Renderer** (`WEBGL_debug_renderer_info`).

```js
// Retorno: { os: 'windows' | 'mac' | 'linux' | null, arch: 'arm' | 'intel' | 'x64' | null }
const { os, arch } = detectUserPlatform();
```

Com base nisso, `CommunityDetails.vue` destaca visualmente:
- O **card** do sistema operacional detectado (borda dourada + badge `★ RECOMENDADO`)
- O **botão** específico mais adequado para o hardware (ex: `.dmg (ARM)` em Macs Apple Silicon)

---

## 🔒 Variáveis de Ambiente

| Variável | Exemplo | Descrição |
|---|---|---|
| `VITE_APP_MODE` | `development` | Modo da aplicação |
| `VITE_BASE_URL` | `/` | URL base para o Vite router |
| `VITE_WHATSAPP_URL` | `https://chat.whatsapp.com/...` | Grupo WhatsApp |
| `VITE_TELEGRAM_URL` | `https://t.me/louvorja` | Canal Telegram |
| `VITE_TELEGRAM_DEV_URL` | `https://t.me/+...` | Canal Telegram de devs |
| `VITE_FACEBOOK_URL` | `https://facebook.com/louvorja` | Facebook |
| `VITE_INSTAGRAM_URL` | `https://instagram.com/louvorja.app/` | Instagram |
| `VITE_DRIVE_URL` | OneDrive PT | Banco de letras em Português |
| `VITE_ES_DRIVE_URL` | OneDrive ES | Banco de letras em Espanhol |

> ⚠️ Nunca commite o arquivo `.env` com URLs ou tokens sensíveis em repositórios públicos.

---

## 🔌 Serviço de API

`src/services/Api.js` é um wrapper leve de `fetch` para consumir a API oficial do Louvor JA.

- **Desenvolvimento:** `http://localhost:8000`
- **Produção:** `https://api.louvorja.com.br`

```js
import Api from "@/services/Api";

Api.get("endpoint", { param: "valor" }, (ok, data) => {
  if (ok) {
    console.log(data);
  }
});
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js >= 18
- npm >= 9

### Passos

```bash
# Clone o repositório
git clone https://github.com/elvieira/siteLJA.git
cd siteLJA

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento (porta 5003)
npm run dev
```

O servidor estará disponível em **http://localhost:5003** e também acessível na rede local para testes em dispositivos móveis (flag `--host`).

---

## 📦 Build de Produção

```bash
# Gera o bundle otimizado em /dist
npm run build

# Serve o build localmente para validação
npm run preview
```

O build gera automaticamente o `sitemap.xml` com as rotas estáticas via `vite-plugin-sitemap`, apontando para `https://louvorja.com.br`.

---
