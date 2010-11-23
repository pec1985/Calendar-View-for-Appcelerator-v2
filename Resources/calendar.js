var win = Ti.UI.createWindow({backgroundImage:'pngs/Default-calinvite.png'});



var setDate = new Date();
a = setDate.getFullYear();
b = setDate.getMonth();
c = setDate.getDate();
//draw the calendar, this calls the main function 'showCal' with the default values

//showCal(setYear,3,setDay);


var daysInMonth = 32 - new Date(a,b,32).getDate();
var dayOfMonth = new Date(a,b,c).getDate();
var dayOfWeek = new Date(a,b,1).getDay(); 
var daysInLastMonth = 32 - new Date(a,b-1,32).getDate();
var daysInNextMonth = (new Date(a,b,daysInMonth).getDay())-6;

calView = function(){
	//create main calendar view
	var mainView = Ti.UI.createView({layout:'horizontal',backgroundColor:'#DCDCDF',width:322,height:'auto',left:-1,top:-1});
	
	//create day
	dayView = function(e){
		var view = Ti.UI.createView({left:0,width:46,height:44,backgroundImage:'pngs/monthdaytile-Decoded.png'});
		view.day = Ti.UI.createLabel({text:e.day,textAlign:'center',color:e.color,font:{fontSize:20,fontWeight:'bold'}});
		if(dayOfMonth == e.day){view.backgroundImage='pngs/monthdaytiletoday.png';view.day.color='white';}
		view.add(view.day);
		return view;
	};
	//create a new empty day for custamization later
	var oldDay=Ti.UI.createView();
	oldDay.day=Ti.UI.createLabel();
	//the clicker function!!
	var clicker = function(e,day){
		e.addEventListener('click',function(){
			//reset old day
			if(oldDay.day.text == dayOfMonth){
				oldDay.day.color='white';
				oldDay.backgroundImage='pngs/monthdaytiletoday.png';
			} else {
				oldDay.day.color='#3a4756';
				oldDay.backgroundImage='pngs/monthdaytile-Decoded.png';
			}
			oldDay.left=0;
			oldDay.width=46;
			oldDay.day.left=0;
			//set window title, only for testing
			win.title=e.day.text;
			//custumize clicked day
			e.day.left=1;
			e.left=-1;
			e.width=47;
			e.backgroundImage='pngs/monthdaytile_selected.png';
			e.day.color='white';
			//this day becomes old :(
			oldDay=e;
		});
	};
	
	//set initial day number
	var dayNumber = daysInLastMonth-dayOfWeek+1;
	//get last month's days
	for(i=0;i<dayOfWeek;i++){
		mainView.add(new dayView({day:dayNumber,color:'#8e959f'}));
		dayNumber++;
	};
	// reset day number for current month
	dayNumber = 1;
	//get this month's days
	for(i=0;i<daysInMonth;i++){
		var newDay=new dayView({day:dayNumber,color:'#3a4756'});
		mainView.add(newDay);
		//the clicker function!!!! ha ha!
		clicker(newDay,dayNumber);
		
		dayNumber++;
	};
	dayNumber = 1;
	//get remaining month's days
	for(i=0;i>daysInNextMonth;i--){
		mainView.add(new dayView({day:dayNumber,color:'#8e959f'}));
		dayNumber++;
	};

return mainView;
};

win.add(calView());

win.open({modal:true});