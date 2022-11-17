import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: {
        serif: "Editorial New",
      },
    },
  },
  preflight: {
    "@font-face": [
      {
        fontFamily: "Editorial New",
        fontWeight: "800",
        src: 'url(/static/fonts/PPEditorialNew-Ultrabold.otf) format("otf")',
      },
    ],
  },
} as Options;
