import { JetView } from "webix-jet";

export default class ToolView extends JetView {
  config() {
    const _ = this.app.getService("locale")._;
    const theme = this.app.config.theme;
    const user = this.app.getService("user").getUser();

    return {
      view: "toolbar",
      css: theme,
      height: 56,
      elements: [
        {
          paddingY: 7,
          rows: [
            {
              view: "icon",
              icon: "mdi mdi-menu",
              click: () => this.app.callEvent("menu:toggle"),
              tooltip: "Click to collapse / expand the sidebar",
            },
          ],
        },
        { css: "logo" },
        {},
        {
          paddingY: 7,
          rows: [
            {
              margin: 8,
              cols: [
                {
                  view: "icon",
                  icon: "mdi mdi-invert-colors",
                  tooltip:
                    this.app.config.theme == "webix_dark"
                      ? "Switch to light theme"
                      : "Switch to dark theme",
                  click: () => {
                    if (this.app.config.theme == "webix_dark") {
                      this.app.config.theme = "";
                      webix.storage.local.put("theme", "");
                    } else {
                      this.app.config.theme = "webix_dark";
                      webix.storage.local.put("theme", "webix_dark");
                    }
                    this.app.refresh();
                  },
                },
                {
                cols: [
                    {
                        template: `<image class="mainphoto" src="${user.image}">`,
                        localId: "avatar",
                        width: 32,
                        borderless: true,
                      },
                      {
                        view: "label",
                        label: user.username,
                        width: 100,
                        css: "username",
                      }
                    ],
                },
                {
                  view: "icon",
                  icon: "mdi mdi-logout",
                  tooltip: "Logout",
                  click: () => {
                    this.app.getService("user").logout();
                    this.show("/login");
                  },
                },
              ],
            },
          ],
        },
        { width: 6 },
      ],
    };
  }
  init() {}
}
