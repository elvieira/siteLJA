/**
 * Registro Oficial de Versões da Comunidade Louvor JA
 * 
 * Este arquivo é a ÚNICA fonte de verdade para cadastrar, ativar ou customizar
 * as versões da comunidade. Qualquer alteração aqui (cor, estágio, plataformas, etc.)
 * reflete imediatamente em todo o site.
 * 
 * Campos suportados por versão:
 * - slug: Identificador único da versão e rota (/comunidade/:slug).
 * - codename: Nome oficial de exibição do codinome musical.
 * - repo: Repositório GitHub no formato "usuario/repositorio".
 * - branch: Branch de publicação (padrão: "main").
 * - folder: Pasta dentro do repositório onde estão os arquivos (padrão: "community").
 * - color: Cor primária/badge da versão em HEX (ex: "#0084C1").
 * - stage: Estágio de desenvolvimento ("Beta", "Alpha", "RC", "Estável").
 * - platforms: Lista de sistemas suportados (["windows", "mac", "linux"]).
 * - enabled: Define se a versão está visível no site (true) ou oculta (false).
 */

export const registeredVersions = [
  {
    slug: "flute",
    codename: "Flute",
    repo: "elvieira/LouvorJA",
    branch: "electron",
    folder: "community",
    color: "#0084c1",
    stage: "Beta",
    platforms: ["windows", "mac", "linux"],
    enabled: true,
  },
  {
    slug: "piano",
    codename: "Piano",
    repo: "pianolouvorja/app",
    branch: "main",
    folder: "community",
    color: "#E08B5B",
    stage: "Beta",
    platforms: ["windows", "linux", "mac"],
    enabled: false,
  },
  {
    slug: "violin",
    codename: "Violin",
    repo: "louvorja/violin-app",
    branch: "main",
    folder: "community",
    color: "#F5A611",
    stage: "Beta",
    platforms: ["linux", "mac", "windows"],
    enabled: false,
  },
];

export default registeredVersions;
