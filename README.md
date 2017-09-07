# iglogger
My personal packet logger that I use in game to test stuffs. Prints out packet info in game chat and creates log files. This readme is wordy but its for my own reference since I have a bad memory >.<

Requires commands module by Pinkie-Pie

Warning: Don't attempt do anything you are not sure of. You will certainly get yourself banned.

Change defaults in index.js
## Commands
Brackets denote the variables, type without brackets in game - Will conflict with commands that has 'logger' in the command.

Type in /proxy chat or prefix commands with '!' if typing in other chats. Spaces needed between command and arguments.

- loggerraw - logs all raw packets into .json file (see 'log files' section). Will log until console is teriminated and no system messages containing strings will be displayed for raw hookings.
- loggerraw (packet name) - logs all raw packets with that packet name only into .json file (see 'log files' section). Will log until console is teriminated.

- loggersysmsg - Toggles whether to display packet data as ingame system messages
- loggersave - Toggles the creation of log files in .json (see 'log files' section)
- loggerconsole- Toggles display of packet info in console

- loggerorder(order number)- changes the order of the packet hook to log (default=-999)
- loggerversion(version number)- changes the default definition version to log and use * instead of a number to log latest version of the defined packet, eg: loggerversion 2 before using the next command if S_SPAWN_USER<2> is desired.

- logger (packet name in tera-data def file)- direct the logging of defined packet. eg: logger S_SPAWN_USER will direct the logging of S_SPAWN_USER<'version'> where version is set by the previous command. Confirmation message with packet definition and version number will be displayed. Using * as the packet name hooks onto all defined packets and you should keep Version number to 1 or * if you want to hook all defined packets without errors (See error section for explanation).
- loggerstart (number of runs)- Starts the logging and (number of runs) dictate the number of packets definied in the previous command to log before stopping logs. Default number of runs is 1. Leaving no numbers will just log the number set previously or log 1 if none has been set. Logs are displayed in game system message and log files by default.

- loggerbreak -Creates a break on the json log so it is easier to identify actions. You can type 'loggerbreak', do ur ingame action, then 'loggerbreak' again, and study the packets sent during the interval on the json log. Only works for 'loggerraw' jsons. 
The break will be called: '/////Breakoff chunk [time]'

It is recommended you double check the previous command output message for typos before starting the log.

## Sample command 
To log S_SPAWN_USER<3> of order 0,input
- loggerorder 0 [changes order to 0] (displays message 'Logging order 0')
- loggerversion 3 [changes version to 3] (displays message 'Logging version 3')
- logger S_SPAWN_USER [targets the defined packet] (displays message 'Logging S_SPAWN_USER 3 order:0')
- Check the output message, if correct, then start:
- loggerstart [start logging one S_SPAWN_USER<3> packet by default] (displays message 'Start log S_SPAWN_USER3 count:1)
- loggerstart 10 [start logging 10 S_SPAWN_USER<3> packets] (displays message 'Start log S_SPAWN_USER3 count:10)
- To log S_SPAWN_USER<3> 10 times again, just type !logger start, you dont have to retype everything

To log all defined packets of the latest version for a set count, input
- loggerversion * (if default isnt * yet)
- logger * (displays message 'Logging ** order:-999')
- loggersysmsg (silences sys messages for large counts)
- loggerstart 100
This logs the 1st 100 defined packets that passes though the proxy. However, no packet name is displayed. To display it, simply enable loggerraw to log all raw packets and compare the time stamp of raw packet to match with the data logs.

To log raw packets, input
- loggerraw -(logs every single raw packet that passes proxy)
- loggerraw S_SPAWN_USER -(logs all S_SPAWN_USER raw packets with that defined name only)

## Errors
Important: If an invalid version for a def. packet is attempted to log, there will be an error displayed on the console. the logging will continue in this case for all packets received of that def. packet, with the wrong version number. you will have to restart the module by restarting the console to continue logging that packet. This is why you should double check the logging packet and version before starting the log.

If a wrong or nonexistant packet def is entered, console displays an error but no restart necessary. Just check spelling and capitalization.

C_CHAT packets should be correctly inputed or else it may cause the packet blocking commands(return false) on all C_CHAT hooks to fail. The only right packet to log for this is C_CHAT<1>. Make sure message displayed is 'Logging C_CHAT 1' before starting. You should restart the console before proceeding if wrong C_CHAT version is logged, as ur subsequent messages will be sent to servers, not even the no-more-command-typos module can prevent that. Try not to link anything in your chat or it breaks the notif function using sys messages.

S_CHAT hook is abit wonky when system msg feature is used, it doesnt display it properly on system messages, probably due to the fact that links cannot be displayed on system messages. The module will silence all S_CHAT hooking from displaying in system messages. However, it will still be logged in .json file properly.

## Log files
Log files are created by default whenever !logger start command is used and successfully completes and is stored in same folder as index.js of this module. New Logs files are created when the date and hour changes for better recording. Logs have time of log attached to the entry. To change this, modify datehour (slice less end strings if you do not want to create logs files every hour).

Date string format example: 'Mon Feb 31 2017 00:33:00 GMT+0800 (Malay Peninsula Standard Time)'

The name of the log files created not using raw hook is in format of 'log (date) (hour)'.json.

Data format for defined hooks: [timestamp][packetname+version number](order hooked) count: {data string}
- Example: [5:08:34] [C_PLAYER_LOCATION *](-999) 3 : {data}

The name of the log files created using raw hook is in format of 'log_raw (packet name) (date) (hour)'.json. Packet name is 'All' if all raw packets are logged ('*')

Data format for raw hooks: [timestamp] : From server? 'yes/no' (packetname) 'data' 
- Example [4:47:08]: From server? Yes (S_RESPONSE_GAMESTAT_PONG) 040080e8

## TODO
- Automatically stop hooking of packets that are erronous. 
