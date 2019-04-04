const electron=require('electron');
const url = require('url');
const path = require('path');
const express = require('express');
const server = express();
const exserver = require('http').createServer(server);
const session = require('express-session');
const parser = require('body-parser');
const io = require('socket.io').listen(exserver);
const mysql = require('mysql');
const fs = require('fs');

process.env.NODE_ENV = 'development'; //change to production for release builds

server.use(parser.json());
server.use(parser.urlencoded({ extended: true}));
server.use(session({
	name : 'sID',
	secret : '#14@4%=%^25$',
	resave: false,
	saveUninitialized:false

}));

exserver.listen(process.env.PORT || 3000); //Listening on port 3000

server.get('/',function(req,res){
	res.sendFile(__dirname+'/main.html');
});

const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
app.on('ready',function(){
	mainWindow = new BrowserWindow({});
	mainWindow.maximize();
	mainWindow.loadURL('http://localhost:3000/');
	const mainmenu = Menu.buildFromTemplate(menutemp);
	Menu.setApplicationMenu(mainmenu);
	if(process.env.NODE_ENV!='development'){
		mainWindow.setMenuBarVisibility(false);
	}
});


let pwindow; //just a placeholder for debugging.
function profile(){
	 pwindow= new BrowserWindow({
		height:500,
		width:200
	});
	pwindow.loadURL(url.format({
		pathname: path.join(__dirname,'comsign.html'),
		protocol:'file:',
		slashes:true
	}));
}

// template for the top-menu
const menutemp = [{
	label:'user',
	submenu:[{
		label:'profile',
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

//for ease in development
if(process.env.NODE_ENV=='development'){
	menutemp.push({
		label : 'Developer tools',
		submenu :[{
			label: "Dev Tools",
			click(item,focusedWindow){focusedWindow.toggleDevTools();},
			accelerator: 'ctrl + i'
		},{
			role : 'reload'			
		}]
	})
}

//express starts here
//handle requests to open a community

server.get('/communities/:com/:page',function(req,res){
	if(req.params.page=='dashboard'){
		req.session.currentCommunity = req.params.com; //stores the currently active community
		$images = fs.readdirSync('images/public/'+req.params.com+'/');
		res.render('comdash.ejs',{comname:req.params.com , gallery:[$images[0],$images[1],$images[2],$images[3],$images[4]] }); //for non-members
	}
	else{
		res.render('commain',{ comname:req.params.com}); // for members of the community
	}
});

//handle community join requests

server.get('/join/:com',function(req,res){
	//TODO
});

//Image routing
server.get('/images/dispics/:com',function(req,res){
	res.sendFile(__dirname+'/images/dispics/'+req.params.com+'.jpg');
});

//Serving gallery images
server.get('/images/public/:file',function(req,res){
	res.sendFile(__dirname + '/images/public/'+req.session.currentCommunity+'/'+req.params.file);
});

//CSS files
server.get('/styles/:file',function(req,res){
	res.sendFile(__dirname+'/styles/'+req.params.file);
});

//JS Files
server.get('/scripts/:file',function(req,res){
	res.sendFile(__dirname+'/scripts/'+req.params.file);
});