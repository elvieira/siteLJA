/**
 * Registro de Versões da Comunidade Louvor JA
 * 
 * Para adicionar ou remover uma versão, basta editar este registro.
 * O site buscará automaticamente na pasta 'community/' do repositório cadastrado
 * e validará os arquivos (pt.json, es.json, main.webp, 01.webp, 02.webp, etc).
 */

export const registeredVersions = [
  {
    slug: "flute",
    codename: "Flute",
    repo: "elvieira/LouvorJA",
    branch: "electron",
    folder: "community",
    color: "#0084C1",
    stage: "Beta",
    platforms: ["windows", "mac", "linux"],
  },
  {
    slug: "piano",
    codename: "Piano",
    repo: "",
    branch: "main",
    folder: "community",
    color: "#E08B5B",
    stage: "Beta",
    platforms: ["windows", "linux", "mac"],
  },
  {
    slug: "violin",
    codename: "Violin",
    repo: "",
    branch: "main",
    folder: "community",
    color: "#F5A611",
    stage: "Beta",
    platforms: ["linux", "mac", "windows"],
  },
];

export default registeredVersions;
