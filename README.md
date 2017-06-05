# iglogger
My personal packet logger that I use in game to test stuffs. Prints out packet info in game chat and creates log files.

Commands (brackets denote the variables, type without brackets in game)- Spaces matters for '!logger start', '!logger save' and !logger raw' and '!logger order', anything else you can leave no spaces
- !logger raw- logs raw packets into .json file (WIP)
- !logger shush- Toggles whether to display packet data as ingame system messages
- !logger save- Toggles the creation of log files in .json (see log files)

- !logger order(order number)- changes the order of the packet hook to log (default=-999)
- !logger(version)- changes the default definition version to log and use * instead of a number to log latest version of the defined packet, eg: !logger 2 before using the next command if S_SPAWN_USER<2> is desired.
- !logger(packet name in tera-data def file)- direct the logging of defined packet. eg: !logger S_SPAWN_USER will direct the logging of S_SPAWN_USER<version> where version is set by the previous command. Confirmation message with packet definition and version number will be displayed.
- !logger start(number of runs)- Starts the logging and (number of runs) dictate the number of packets definied in the previous command to log before stopping logs. Default number of runs is 1. Leaving no numbers will just log the number set previously or log 1 if none has been set. Logs are displayed in game system message and log files by default.

It is recommended you double check the previous command output message for typos before starting the log.
    
## Sample command 
To log S_SPAWN_USER<3>,input
- !logger 3 [changes version to 3] (displays message 'Logging version 3')
- !logger S_SPAWN_USER [targets the defined packet] (displays message 'Logging S_SPAWN_USER 3')
- Check the output message, if correct, then start:
- !logger start [start logging one S_SPAWN_USER<3> packet by default] (displays message 'Start log S_SPAWN_USER3 count:1)
- !logger start 10 [start logging 10 S_SPAWN_USER<3> packets] (displays message 'Start log S_SPAWN_USER3 count:10)

## Errors
Important: If an invalid version for a def. packet is attempted to log, there will be an error displayed on the console. the logging will continue in this case for all packets received of that def. packet, with the wrong version number. you will have to restart the module by restarting the console to continue logging that packet. This is why you should double check the logging packet and version before starting the log.

If a wrong or nonexistant packet def is entered, console displays an error but no restart necessary. Just check spelling and capitalization.

C_CHAT packets should be correctly inputed or else it may cause the packet blocking commands(return false) on all C_CHAT hooks to fail. The only right packet to log for this is C_CHAT<1>. Make sure message displayed is 'Logging C_CHAT 1' before starting. You should restart the console before proceeding if wrong C_CHAT version is logged, as ur subsequent messages will be sent to servers, not even the no-more-command-typos module can prevent that.

## Log files
Log files are created by default whenever !logger start command is used and successfully completes and is stored in same folder as index.js of this module. New Logs files are created when the date and hour changes for better recording. Logs have time of log attached to the entry. To change this, modify datehour (slice less end strings if you do not want to create logs files every hour)

Date string format example: 'Mon Feb 31 2017 00:33:00 GMT+0800 (Malay Peninsula Standard Time)'

## TODO
- Correct order to take in negatives
- raw packet logging doesnt output right
- Export logged Packets to .json file in the same folder, create a new .json hourly
- Automatically stop hooking of packets that are erronous. 
