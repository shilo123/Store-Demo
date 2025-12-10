/// <reference types="vite/client" />

import { ComponentCustomProperties } from "vue";
import axios from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
