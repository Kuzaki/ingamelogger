const fs = require('fs');
module.exports = function iglogger(dispatch) {
	let msgstr,
		txt;
	let	version=1,	//default packet version
		writeto=true, //default write to log file (true to save logs)
		shush=false,  //default silence system messages (true to silence sys msg)
		orderno= -999, //default order of packet (refer to tera-proxy-game readme)
		i=1,
		count=1,
		textstring='';
		

	dispatch.hook('C_CHAT', 1, event => {
		if(event.message.includes('!logger')) {
			if(event.message.includes('!logger start')) {
				if((/\d/.test(event.message))) {
					count= parseInt((event.message.replace(/[^0-9\.]/g, '')),10);
				};
				i=1;
				message('Start log '+(msgstr)+(version)+' count: '+(count)),
				hooker(count);
			}
			else if(event.message.includes('!logger order')) {
				orderno= parseInt((event.message.replace(/[^0-9\.\-]/g, '')),10), //update negative value
				message('Logging order '+orderno)
			}			
			
			else if(event.message.includes('shush')) {
				if(!shush) {
					shush=true, 
					message('Logger system message disabled');
				}
				else 
					shush=false, 
					message('Logger system message enabled');
			}
			
			else if(event.message.includes('!logger version')) {
				if (event.message.includes('*')) {version='*';}
				else
					version= parseInt(event.message.replace(/[^0-9\.]/g, ''));
				message('Logging version '+(version));
			}
			else if(event.message.includes('!logger save')) {
				if(!writeto) {
					writeto=true, 
					message('Saving Logs enabled');	
				}
				else 
					writeto=false, 
					message('Saving Logs disabled');
			}
			else if(event.message.includes('!logger raw')) 	{
				let pkt=(event.message.replace('!logger raw', '').replace(' ','')).replace('</FONT>','').replace('<FONT>','');
				if(pkt==='') {pkt='*';};
				hookall(pkt),
				message('Logging raw '+pkt+' packets. Order:'+orderno);		
			}
			else
				txt = event.message,
				msgstr=txt.replace('</FONT>','').replace('<FONT>','').replace('!logger','').replace(' ',''),
				message('Logging '+(msgstr)+' '+(version)+' Order:'+orderno);	
			return false;		
		};
	});
			
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: msg
		});
	};
	
	function hooker(counter) {
		if(i<=counter) {
			dispatch.hookOnce(msgstr, version, {order: (orderno)}, event => {
				textstring= JSON.stringify(event);
				if(!shush && msgstr!=='S_CHAT') {message('['+msgstr+version+'] '+(i)+' : '+textstring);};
				if(writeto) {
					let datehour=JSON.stringify(Date()).slice(5,20).replace(':','h'),
					minutesec=JSON.stringify(Date()).slice(18,25);
					fs.appendFileSync(((__filename).replace('index.js',('log '+datehour+'.json'))),('['+minutesec+'] ['+msgstr+' '+version+']('+orderno+') '+(i)+' : '+textstring+'\r\n'))
				};
				i++,
				hooker(count);
			});			
		}
		else
			message('Finished logging');
	};		
	
	function hookall(pktname) {
		dispatch.hook(pktname, 'raw', {order: (orderno)}, (code, data, fromServer) => { 
			let rawtext={x:(fromServer ? 'Yes' : 'No'), y: (dispatch.base.protocolMap.code.get(code)), z: (data.toString('hex'))};
			let datehour=JSON.stringify(Date()).slice(5,20).replace(':','h'),
			minutesec=JSON.stringify(Date()).slice(18,25);
			fs.appendFileSync(((__filename).replace('index.js',('log_raw '+pktname.replace('*','All')+' '+datehour+'.json'))),('['+minutesec+']'+': '+'From server? '+(rawtext.x)+' ('+(rawtext.y)+') '+(rawtext.z)+'\r\n'));
		});
	};
};
