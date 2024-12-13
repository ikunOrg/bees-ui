import { mount } from "@vue/test-utils";
import { describe, bench } from "vitest";
import antdv from "./components/antdv.vue";
import naive from "./components/naive.vue";
import ionic from "./components/ionic.vue";
import custom from "./components/custom.vue";

describe("UI Library Rendering Performance", () => {
  const counts = [200];

  counts.forEach((count) => {
    bench(`should render antv ${count} components quickly`, () => {
      mount(antdv, {
        props: { count },
      });
    });
    bench(`should render naive ${count} components quickly`, () => {
      mount(naive, {
        props: { count },
      });
    });
    bench(`should render ionic ${count} components quickly`, () => {
      mount(ionic, {
        props: { count },
      });
    });
    bench(`should render custom ${count} components quickly`, () => {
      mount(custom, {
        props: { count },
      });
    });
  });
});
