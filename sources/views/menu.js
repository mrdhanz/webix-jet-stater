import { JetView, plugins } from "webix-jet";

export default class MenuView extends JetView {
  config() {
    const _ = this.app.getService("locale")._;
    const theme = this.app.config.theme;
    const screen = this.app.config.size;

    return {
      view: "sidebar",
      css: theme,
      width: 200,
      collapsed: screen !== "wide",
      tooltip: (obj) => {
        return this.getRoot().config.collapsed ? obj.value : "";
      },
      data: [
        { value: "Dashboard", id: "start", icon: "mdi mdi-monitor-dashboard" },
        { value: "Products", id: "products", icon: "mdi mdi-database" },
      ],
    };
  }
  init(sidebar) {
    this.use(plugins.Menu, {
      id: sidebar,
    });
    this.on(this.app, "menu:toggle", () => sidebar.toggle());
    sidebar.getPopup().attachEvent("onBeforeShow", () => false);
    
  }
  urlChange(ui, url) {
    if (!ui.find((opts) => url[1].page === opts.id).length) ui.unselect();
  }
}
