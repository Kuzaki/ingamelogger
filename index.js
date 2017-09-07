const fs = require('fs'),
	path= require('path'),
	Command = require('command')

//Defaults
let version = '*',		//default packet version
	writeto = true, 	//default write to log file (true to save logs)
	sysmsg = true, 		//default silence system messages (false to silence sys msg)
	consolelog = false,	//default console logging (false to silence console logging)
	orderno = -999 		//default order of packet (refer to tera-proxy-game readme)
	
module.exports = function iglogger(dispatch) {
	const command = Command(dispatch)
	
	let msgstr,
		txt,
		count = 1,
		textstring = ''
	
	
	//////Commands
	command.add('loggerstart',counts => {
		if(counts!==undefined) count=parseInt(counts)
		command.message('Start log '+(msgstr)+(version)+' count: '+(count))
		hooker(count,msgstr,version,orderno,1)
	})
	
	command.add('loggerorder',order => {
		orderno= parseInt(order), //update negative value
		command.message('Logging order '+orderno)
	})
	
	command.add('loggersysmsg', () => {
		sysmsg=!sysmsg
		command.message(sysmsg ? 'Logger system message enabled' : 'Logger system message disabled')
	})

	command.add('loggerversion', versionno => {
		version= parseInt(versionno)
		if(isNaN(version)) {
			version='*',
			command.message('Logging latest version *')
		}
		else
			version= parseInt(versionno),
			command.message('Logging version '+version)
	})
	
	command.add('loggersave',() => {
		writeto=!writeto
		command.message(writeto ? 'Saving logs enabled' : 'Saving logs disabled')
	})
	
	command.add('loggerconsole',() => {
		consolelog=!consolelog
		command.message(consolelog ? 'Logger console logs enabled' : 'Logger console logs disabled')
	})

	
	command.add('loggerraw', pkt => {
		if(pkt===undefined) pkt='*'
		hookall(pkt)
		command.message('Logging raw '+pkt+' packets. Order:'+orderno)
	})

	command.add('logger', packet => {
		msgstr=packet
		command.message('Logging '+(msgstr)+' '+(version)+' Order:'+orderno)
	})
	
	command.add('loggerbreak', () => {
		breakoff()
		command.message('Break off Logger. Search for the word chunk.')
	})
	
	
	//////Functions
	function hooker(counter,msgstring,ver,ordern,id) {
		if(id<=counter) {
			dispatch.hookOnce(msgstring, ver, {order: (ordern)}, event => {  ///TODO: Use unhook to handle.
				textstring= JSON.stringify(event)
				if(sysmsg) command.message('['+msgstring+ver+'] '+(id)+' : '+textstring)
					
				if(consolelog) console.log('['+msgstring+ver+'] '+(id)+' : '+textstring)
					
				if(writeto) {
					let datehour=Date().slice(4,19).replace(':','h'),
					minutesec=Date().slice(16,24)
					fs.appendFileSync(path.join(__dirname,('log '+datehour+'.json')),('['+minutesec+'] ['+msgstring+' '+ver+']('+ordern+') '+(id)+' : '+textstring+'\r\n'))
				}
				
				id++
				hooker(count,msgstring,ver,ordern,id)
			})
		}
		else
			command.message('Finished logging')
	}	
	
	function hookall(pktname) {
		dispatch.hook(pktname, 'raw', {order: (orderno)}, (code, data, fromServer) => { 
			let rawtext={x:(fromServer ? 'Yes' : 'No'), y: (dispatch.base.protocolMap.code.get(code)), z: (data.toString('hex'))},
				datehour=Date().slice(4,19).replace(':','h'),
				minutesec=Date().slice(16,24)
			if(consolelog) console.log('['+minutesec+']'+': '+'From server? '+rawtext.x+' ('+rawtext.y===undefined ? code : rawtext.y+') '+rawtext.z)
			fs.appendFileSync(path.join(__dirname,('log_raw '+pktname.replace('*','All')+' '+datehour+'.json')),('['+minutesec+']'+': '+'From server? '+(rawtext.x)+' ('+(rawtext.y===undefined ? code : rawtext.y)+') '+(rawtext.z)+'\r\n'))
		})
	}
	
	function breakoff() {
		let datehour=Date().slice(4,19).replace(':','h')
		fs.appendFileSync(path.join(__dirname,('log_raw All '+datehour+'.json')),('/////Breakoff ['+Date().slice(16,24)+']\r\n'))
	}
}
