import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";
import user from "./models/user";
import { getProducts } from "./models/product";

// dynamic import of views
const modules = import.meta.glob("./views/**/*.js");
const views = (name) => modules[`./views/${name}.js`]().then((x) => x.default);

// locales, optional
const locales = import.meta.glob("./locales/*.js");
const words = (name) =>
  locales[`./locales/${name}.js`]().then((x) => x.default);

export default class App extends JetApp {
  constructor(config) {
    const size = () => {
      const screen = document.body.offsetWidth;
      return screen > 1210 ? "wide" : screen > 1060 ? "mid" : "small";
    };
    let theme = "";
    let cookies = true;
    try {
      theme = webix.storage.local.get("theme");
    } catch (err) {
      cookies = false;
      webix.message(
        "You disabled cookies. The language and theme won't be restored after page reloads.",
        "debug"
      );
    }
    const defaults = {
      id: import.meta.env.VITE_APPNAME,
      version: import.meta.env.VITE_VERSION,
      router: import.meta.env.VITE_BUILD_AS_MODULE ? EmptyRouter : HashRouter,
      debug: !import.meta.env.PROD,
      start: "/top/start",
	  theme: theme || "",
      name: import.meta.env.VITE_APPNAME,
      host: import.meta.env.VITE_SERVER,
      size: size(),
      // set custom view loader, mandatory
      views,
    };

    super({ ...defaults, ...config });
    // locales plugin, optional
    this.use(plugins.Locale, {
      path: words,
      storage: this.webix.storage.session,
    });
    webix.event(window, "resize", () => {
      const newSize = size();
      if (newSize != this.config.size) {
        this.config.size = newSize;
        this.refresh();
      }
    });
    this.use(plugins.User, { model: user });
	this.setService("products", {
		getProducts,
	});
  }
}

if (!import.meta.env.VITE_BUILD_AS_MODULE) {
  webix.ready(() => {
    if (!webix.env.touch && webix.env.scrollSize && webix.CustomScroll)
      webix.CustomScroll.init();
    new App().render();
  });
}
