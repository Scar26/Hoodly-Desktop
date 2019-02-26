const electron=require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;
let mainWindow;
app.on('ready',function(){
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname,'main.html'),
		protocol:'file:',
		slashes:true
	}));
	const mainmenu = Menu.buildFromTemplate(menutemp);
	Menu.setApplicationMenu(mainmenu);
});
let pwindow;
function profile(){
	 pwindow= new BrowserWindow({
		height:500,
		width:200
	});
	pwindow.loadURL(url.format({
		pathname: path.join(__dirname,'main.comsign.html'),
		protocol:'file:',
		slashes:true
	}));
}


const menutemp = [{
	label:'user',
	submenu:[{
		label:'profile'
		click(){
			profile();}
	},
	{
		label:'privacy settings'
	},
	{
		label:'Quit',
		accelerator :'ctrl+w',
		click(){app.quit();}
	}]
}];