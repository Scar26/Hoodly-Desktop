const electron=require('electron');
const url = require('url');
const path = require('path');
const express = require('express');
const server = express();
const exserver = require('http').createServer(server);
const session = require('express-session');
const parser = require('body-parser');
const io = require('socket.io').listen(exserver);

process.env.NODE_ENV = 'development'; //change to production for release builds

server.use(parser.json());
server.use(parser.urlencoded({ extended: true}));

server.use(session({
	name : 'sID',
	secret : '#14@4%=%^25$',
	resave: false,
	saveUninitialized:false

}));

const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
app.on('ready',function(){
	mainWindow = new BrowserWindow({});
	mainWindow.maximize();
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname,'main.html'),
		protocol:'file:',
		slashes:true
	}));
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

exserver.listen(process.env.PORT || 3000); //Set up a server at port 3000 for dynamic requests

//server.use('view engine','ejs');


server.get('/login',function(req,res){
	$auth='SELECT * FROM `user` where `name` ="'+req.body.uname+'" and `pass` ="'+req.body.pass+'"';
	connection.query($auth,(err,rows,fields)=>{
	console.log(rows);
	if(rows[0]){
			req.session.uname = req.body.uname;
			console.log(req.body.uname+" added to the session");
			res.sendFile(__dirname+'/chat.html');

			}
	else{
			res.sendFile(__dirname+'/Invalid credentials');
			}
		}); 
});

//handle requests to open a community

server.get('/communities/:com/:page',function(req,res){
	console.log(req.params);
	if(req.params.page=='dashboard'){
		res.render('comdash.ejs',{comname:req.params.com}); //for non-members
	}
	else{
		res.render('commain',{ comname:req.params.com}); // for members of the community
	}
});

//image routing
server.get('/images/dispics/:com',function(req,res){
	res.sendFile(__dirname+'/coms/dispics/'+req.params.com+'.jpg');
});
