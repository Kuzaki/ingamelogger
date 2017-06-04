module.exports = function iglogger(dispatch) {
	let msgstr,
		txt;
	let	version=1,
		count=1,
		textstring='';
		

	dispatch.hook('C_CHAT', 1, event => {
		if(event.message.includes('!logger')) {
			if((/\d/.test(event.message))) {
				version= parseInt(event.message.replace(/[^0-9\.]/g, '')),
				message('Logging version '+(version));
			}
			else if(event.message.includes('!logger start')) {
				if((/\d/.test(event.message))) {count= parseInt(event.message.replace(/[^0-9\.]/g, ''));};
				hooker();
			}
			else
				txt = event.message,
				msgstr=txt.replace('</FONT>','').replace('<FONT>','').replace('!logger','').replace(' ',''),
				message('Logging '+(msgstr)+' '+(version));	
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
		})
	};
	
	function hooker() {
		for(i = 0; i < count; i++) {
			dispatch.hookOnce(msgstr, version, event => {
				textstring= JSON.stringify(event),
				message(msgstr+version+': '+textstring);
			});
		};
    };
};
