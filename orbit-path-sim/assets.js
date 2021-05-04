function loadAssets () {
  /*
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNho:+dMMMMMMMNdo/oydNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNy/-....-+hdmmmh/-.....-+ymMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNms-...../o/--:--//+oo/......-/ymMMMMMMNNMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMmdmNMMMMMMMMMmdyo+/-.....-/-:::-...-:/:--::........-+hhysssshMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMysssyhNMMMNdhysss+-.......::................-/.......`./oossshMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMmsssssssssssyss:........+-.....................::........`.-``--:/oydMMMMMMMMMMM
MMMMMMMMMMNssssssssssyys+........./...................-....-/.......`  :.`/shdNMMMMMMMMMMMM
MMMMMMMMMMMdyosss+:sso//........./.......:............./...../.....``   -:`-hMMMMMMMMMMMMMM
MMMMMMMMNhsssss+:-+/-::........./.......::......```````-/..``-+.`````````./..sMMMMMMMMMMMMM
MMMMMMMMMNdyso/::-..::........./......../:.````````````./:....//-.......:.-oo-oNMMMMMMMMMMM
MMMMMMMMNmyo:-.....::.....````:-.``````.//.`............:+-...//+:--...../.:dmoyMMMMMMMMMMM
MMMMMMMmdys+/:::::+-```````.--+:/:--.../-/-.............-/+/::::-/.......:-.+NMmNMMMMMMMMMM
MMMMMMMMMMMy-....::..........::-/:.--://://............./+:/..-+--/.......o--hMMMMMMMMMMMMM
MMMMMMMMMMNo....::...........+-///...:/...+:..........+.::.+-.-:://-......oo.sMMMMMMMMMMMMM
MMMMMMMMMMd/...::..-.........//--:..::....-/........./::/:://:++/+++-.....oh:sMMMMMMMMMMMMM
MMMMMMMMMm+:..:-.-:-........:+:.::-//::::-.::......./..+/+ooooo+-.+o:.....oh+yMMMMMMMMMMMMM
MMMMMMMNy-.-.::-/:........../+/+oo++ooooooo//-....-:...-.`/+++++o-`oo..../:-+oyhhhysyNMMMMM
MMMMNds:....:/::+.........../ooo-`` /o++++o:./-.-:-`````--/++++/++`/o:..-+......../hMMMMMMM
MNdo:-.-...:/-../-.....:-...:+o:`.//o++++++o``:::```````.o:-::-.// ::/.-+-----:/odMMMMMMMMM
Ndhssy+.........-/...../::..-+o- .o/:+/+/-.o.````````````-+/:::/o. -`:+/-/....-sNMMMMMMMMMM
MMMMN+.........../:...::..::-/::  /o/---.-+/``````````..```-://-``.`..`+::-.....:sNMMMMMMMM
MMMNo.............+-../.....-/:``` -:/+//:.````````````````````:-/-/:-/.+./....-:--sdMMMMMM
MMMy.....-......../:/-/...`` .:```--..--.-````````...........`../-/-::-`+--:.....:++/odNMMM
MMm/...-+:......../.--:..``.` :..//:-//-:.`-:/-:+++oooooooooo+```...````/-./......-ommddmMM
MMh-.-+mo.........-::/........`/----::..``.+++++++++++++oooooo`````````.+..-/.......+mMMMMM
MMs.:hMm/..........//+:......:-./.```.--``/++++++++++++++++oo+````````.+-.../.--...../dMMMM
MMy/mMMm/........-../-/-....../:./----/```-+++++++++++++++++o.``````.:/-....:--//:-.../mMMM
MMmdMMMMo......-+-...:.::.....-+///-./.````/++++++++++++++++.`````-///...:-.-:--yNdy/:./NMM
MMMMMMMMh-....:hy-..:+..:+-..../-`:+/+---```:+++++++++++++-```.-/+/+-:/..:/:./+-/mMMMmh+sMM
MMMMMMMMMs.../dMh:.-yd/--:+/-..-/   `../-.````-://////:----:::-.-.-/-./:./-::+ds-hMMMMMMNNM
MMMMMMMMMMs-:dMMN+./mMh:-.`-+/-.+`     ``.+:..`..-:/++/::-..`   `-//--ys-+:.:oNN+sMMMMMMMMM
MMMMMMMMMMMmhMMMMd:sMMd-.-::::+//.`   ```.-/ssssssssys/-.       `-+-:yMm+ss-ymMMdyMMMMMMMMM
MMMMMMMMMMMMMMMMMMhhMMd-...-. :-+/:.``  -..//::-----:+o+/``:.`-----:odMMdmNdMMMMMmMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMy/....:..``.:/-/:::+//+:/::::---oo/::://://omMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMmo--`....`  -:/:///++o+/:--:-.-:+++++:--::- `/hMMMMMMMMMMMMMMMMMMMMMMMM
*/

  w = 1200
  h = 768
  g = 6.673*Math.pow(10,-11)
  m_e = 5.972*Math.pow(10,24)
  r_e = 6.371*Math.pow(10,6)
  //Earth is at position [0,0]
  //Distance is in m

  satellites = []
  satellites.push(new satellite([-5000,0], [0,10000000]))

  camX = 0
  camY = 0
  z = 0.00002
  camSpeed = 10

  upDown = false
  downDown = false
  leftDown = false
  rightDown = false
  raiseDown = false
  lowerDown = false
  mouseClick = false
}
