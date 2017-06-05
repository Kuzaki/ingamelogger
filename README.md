# iglogger
My personal packet logger for use in game to test stuffs. Prints out packet info in game chat

Commands (brackets denote the arguments-type without brackets in game)- Spacing does not matter Except for !logger start

!logger(version)- changes the default definition version to log, eg: !logger 2 before using the next command if S_SPAWN_USER<2> is desired instead of S_SPAWN_ME<1> (default: 1)- a confirmation message will be displayed

!logger(packet name in tera-data def file)- direct the logging of defined packet. Capitalization matters! eg: !logger S_SPAWN_USER will direct the logging of S_SPAWN_USER<version> where version is the current one set by the previous command. Confirmation message with packet definition and version number will be displayed.

!logger start(number of runs)- Starts the logging and (number of runs) dictate the number of packets definied in the previous command to log before stopping logs. Default number of runs is 1. Changing number of runs will change the default value until module is restarted. Logs are displayed in game system message. Leaving no numbers will just log the number set previously or log 1 if none has been set.
It is recommended you double check the previous command output message for typos before starting the log.

Examples: 
- !logger start 5 - logs 5 packet of the packet defined in previous command
- !logger start -logs the number of packets that is previously set or logs 1 packet by default.
    
## Sample command 
To log S_SPAWN_USER<3>,input
- !logger 3 [changes version to 3] (displays message 'Logging version 3')
- !logger S_SPAWN_USER [targets the defined packet] (displays message 'Logging S_SPAWN_USER 3')
- Check the output message, if correct, then start:
- !logger start [start logging one S_SPAWN_USER<3> packet by default] (displays message 'Start log S_SPAWN_USER3 count:1)
- !logger start 10 [start logging 10 S_SPAWN_USER<3> packets] (displays message 'Start log S_SPAWN_USER3 count:10)

## Errors
Important: If an invalid version for a def. packet is attempted to log, there will be an error displayed on the console. the logging will continue in this case for all packets received of that def. packet, with the wrong version number. you will have to restart the module by restarting the console to continue logging that packet.

If a wrong or nonexistant packet def is entered, console displays an error but no restart necessary. Just check spelling and capitalization.

C_CHAT packets should be correctly inputed or else it may cause the packet blocking commands(return false) on all C_CHAT hooks to fail. The only right packet to log for this is C_CHAT<1>. Make sure message displayed is 'Logging C_CHAT 1' before starting. You should restart the console before proceeding if wrong C_CHAT version is logged, as ur subsequent messages will be sent to servers, not even the no-more-command-typos module can prevent that.

## TODO
- Export logged Packets to .json file in the same folder, create a new .json hourly
- Automatically stop hooking of packets that are erronous. 
