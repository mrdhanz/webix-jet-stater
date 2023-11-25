import { JetView } from "webix-jet";
export default class DataView extends JetView {
  config() {
    return {
      view: "datatable",
      id: "dt:products",
      autoConfig: true,
      resizeColumn: true,
      on: {
        onBeforeLoad: function () {
          this.showOverlay("Loading...");
        },
        onAfterLoad: function () {
          this.hideOverlay();
        },
      },
    };
  }
  init(view) {
    const productServ = this.app.getService("products");
    const dt = $$("dt:products");
    webix.extend(dt, webix.ProgressBar);
    dt.showProgress({
      type: "top",
    });
    productServ.getProducts(25).then((data) => {
      dt.hideProgress();
      view.parse(data.json().products);
    });
  }
}
