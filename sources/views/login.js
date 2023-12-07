import { JetView } from "webix-jet";
export default class LoginView extends JetView {
  config() {
    const login_form = {
      view: "form",
      id: "login:form",
      width: 310,
      borderless: false,
      margin: 10,
      rows: [
        { type: "header", css: 'logo' },
        {
          view: "text",
          name: "login",
          label: "Username",
          labelPosition: "top",
          invalidMessage: "Username is required",
          placeholder: "Please enter your username",
          required: true,
        },
        {
          view: "text",
          type: "password",
          name: "pass",
          label: "Password",
          labelPosition: "top",
          invalidMessage: "Password is required",
          placeholder: "Please enter your password",
          required: true,
        },
        {
          cols: [
            {
                view: "checkbox",
                name: "remember",
                labelRight: "Remember",
                labelWidth: 0
            },
          ],
        },

        {
          view: "button",
          css: "webix_primary",
          value: "Login",
          click: () => this.do_login(),
          hotkey: "enter",
        },
      ],
      rules: {
        login: webix.rules.isNotEmpty,
        pass: webix.rules.isNotEmpty,
      },
      data: webix.storage.cookie.get(import.meta.env.VITE_USER),
    };

    return {
      cols: [
        {},
        {
          rows: [{}, login_form, {}],
        },
        {},
      ],
    };
  }

  init(view) {
    view.$view.querySelector("input").focus();
  }

  do_login() {
    const user = this.app.getService("user");
    const form = this.$$("login:form");

    if (form.validate()) {
      const data = form.getValues();
      if (data.remember === 1) {
        webix.storage.cookie.put(import.meta.env.VITE_USER, data);
      } else {
        webix.storage.cookie.remove(import.meta.env.VITE_USER);
      }
      webix.extend(form, webix.ProgressBar);
      form.disable();
      form.showProgress({
        type: "top",
      });
      user.login(data.login, data.pass).catch(function (xhr) {
        form.enable();
        form.hideProgress();
        webix.message(JSON.parse(xhr.response).message, "error");
      });
    }
  }
}
