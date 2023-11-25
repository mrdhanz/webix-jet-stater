import {JetView} from "webix-jet";
import ToolView from "./toolbar";
import MenuView from "./menu";

export default class TopView extends JetView{
	config(){
		return {
			rows:[
				ToolView,
				{
					cols:[
						MenuView,
						{
							type:"space",
							cols:[
								{ $subview:true }
							]
						}
					]
				}
			]
		};
	}
}