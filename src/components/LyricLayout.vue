<template>
  <div :id="uuid" style="position: relative">
    <img
      src="@/assets/imgs/photo-001.webp"
      style="width: 100%; height: 250px"
      class="object-fit-cover"
    />

    <table
      cellspacing="0"
      cellpadding="0"
      width="100%"
      height="100%"
      id="body"
      style="position: absolute; bottom: 0; height: 100px"
    >
      <tbody>
        <tr>
          <td style="text-align: center">
            <div id="quadro" class="quadro">{{ $t("help.lyric_css") }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-html="style"></div>
</template>

<script>
export default {
  name: "LyricLayoutComponent",
  props: {
    css: String,
  },
  computed: {
    uuid() {
      return "uuid-" + Math.random().toString(36).substr(2, 9);
    },
    style() {
      let css = "";
      this.css.split("\n").forEach((line) => {
        if (line.includes("{")) {
          css += `#${this.uuid} ${line}`;
        } else {
          css += line;
        }
        css += "\n";
      });
      return `<style>${css}</style>`;
    },
  },
};
</script>

<style scoped>
html,
body {
  padding: 0;
  margin: 0;
  font-family: "Open Sans", Verdana, Arial, Helvetica, sans-serif;
  font-size: 13px;
  color: #000;
}
.retorno {
  background: #111;
}
.quadro {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 10px 40px;
  color: #fff;
  font-weight: bold;
  transition: opacity 600ms, visibility 600ms;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.capa {
  color: #efb400;
}
.letra {
  color: #fff;
}
.transmissao #quadro {
  font-size: 25px;
  min-height: 70px;
}
.retorno #quadro {
  font-size: 10vh;
}
.retorno .prox_letra {
  font-size: 8vh;
  color: #000;
  background-color: rgba(255, 255, 255, 0.75);
  margin-top: 5px;
  padding-top: 5px;
}

.biblia_texto {
  color: #fff;
}
.biblia_info {
  color: #ffffff;
  text-align: right;
  font-style: italic;
}
</style>
