var win = Ti.UI.createWindow({backgroundImage:'pngs/Default-calinvite.png'});

// button to close the window and go back
var backButton = Ti.UI.createButton({bottom:20,height:40,width:200});

//-------------------toolbar-------------------

// title and buttons
var nextMonth = Ti.UI.createButton({right:15,width:12,height:15,backgroundImage:'pngs/next.png'});
var prevMonth = Ti.UI.createButton({left:15,width:12,height:15,backgroundImage:'pngs/prev.png'});
var monthTitle = Ti.UI.createLabel({width:200,height:20,textAlign:'center',color:'#3a4756',font:{fontSize:20,fontWeight:'bold'}});

var toolBar= Ti.UI.createView({top:0,width:322,height:44,backgroundImage:'pngs/monthgradient.png',layout:'vertical'});
var toolBarTitle= Ti.UI.createView({top:3,width:322,height:24});
toolBarTitle.add(prevMonth);
toolBarTitle.add(monthTitle);
toolBarTitle.add(nextMonth);
//days - don't try to understand it, is simple, although it looks complicated
var toolBarDays= Ti.UI.createView({top:0,width:322,height:10,layout:'horizontal',left:-1});
toolBarDays.sunday = Ti.UI.createLabel({left:0,height:20,text:'sun',width:46,textAlign:'center',font:{fontSize:12,fontWeight:'bold'},color:'#3a4756'});
toolBarDays.monday = Ti.UI.createLabel({left:0,height:20,text:'mon',width:46,textAlign:'center',font:{fontSize:12,fontWeight:'bold'},color:'#3a4756'});
toolBarDays.tuesday = Ti.UI.createLabel({left:0,height:20,text:'tues',width:46,textAlign:'center',font:{fontSize:12,fontWeight:'bold'},color:'#3a4756'});
toolBarDays.wednesday = Ti.UI.createLabel({left:0,height:20,text:'wed',width:46,textAlign:'center',font:{fontSize:12,fontWeight:'bold'},color:'#3a4756'});
toolBarDays.thursday = Ti.UI.createLabel({left:0,height:20,text:'thu',width:46,textAlign:'center',font:{fontSize:12,fontWeight:'bold'},color:'#3a4756'});
toolBarDays.friday = Ti.UI.createLabel({left:0,height:20,text:'fri',width:46,textAlign:'center',font:{fontSize:12,fontWeight:'bold'},color:'#3a4756'});
toolBarDays.saturday = Ti.UI.createLabel({left:0,height:20,text:'sat',width:46,textAlign:'center',font:{fontSize:12,fontWeight:'bold'},color:'#3a4756'});

toolBarDays.add(toolBarDays.sunday);
toolBarDays.add(toolBarDays.monday);
toolBarDays.add(toolBarDays.tuesday);
toolBarDays.add(toolBarDays.wednesday);
toolBarDays.add(toolBarDays.thursday);
toolBarDays.add(toolBarDays.friday);
toolBarDays.add(toolBarDays.saturday);
// blah blah blah - this is also important
toolBar.add(toolBarTitle);
toolBar.add(toolBarDays);
//create a new empty day for custamization later - it will become first our current day
//create day
dayView = function(e){
	var label = Ti.UI.createLabel({current:e.current,width:46,height:44,backgroundImage:'pngs/monthdaytile-Decoded.png',backgroundColor:'#DCDCDF',text:e.day,textAlign:'center',color:e.color,font:{fontSize:20,fontWeight:'bold'}});
	return label;
};

monthName = function(e){
	switch(e){
		case 0: e='January'; break;
		case 1: e='February'; break;
		case 2: e='March'; break;
		case 3: e='April'; break;
		case 4: e='May'; break;
		case 5: e='June'; break;
		case 6: e='July'; break;
		case 7: e='Augost'; break;
		case 8: e='September'; break;
		case 9: e='October'; break;
		case 10: e='November'; break;
		case 11: e='December'; break;
	};
	return e;
};

// -------------------main calendar function, this is EVERYTHING!! ha ha-------------------
var calView = function(a,b,c){
	var nameOfMonth = monthName(b);
	monthTitle.text=nameOfMonth+' '+a;
	//create main calendar view
	var mainView = Ti.UI.createView({layout:'horizontal',width:322,height:'auto',top:44});
	//set the time
	var daysInMonth = 32 - new Date(a,b,32).getDate();
	var dayOfMonth = new Date(a,b,c).getDate();
	var dayOfWeek = new Date(a,b,1).getDay(); 
	var daysInLastMonth = 32 - new Date(a,b-1,32).getDate();
	var daysInNextMonth = (new Date(a,b,daysInMonth).getDay())-6;
	//set initial day number
	var dayNumber = daysInLastMonth-dayOfWeek+1;
	//get last month's days
	for(i=0;i<dayOfWeek;i++){
		mainView.add(new dayView({day:dayNumber,color:'#8e959f',current:'no',dayOfMonth:''}));
		dayNumber++;
	};
	// reset day number for current month
	dayNumber = 1;
	//get this month's days
	for(i=0;i<daysInMonth;i++){
		var newDay=new dayView({day:dayNumber,color:'#3a4756',current:'yes',dayOfMonth:dayOfMonth});
		mainView.add(newDay);
		if(newDay.text == dayOfMonth){
			newDay.color='white';
			newDay.backgroundImage='pngs/monthdaytiletoday_selected.png';
			var oldDay = newDay;
		}
		dayNumber++;
	};
	dayNumber = 1;
	//get remaining month's days
	for(i=0;i>daysInNextMonth;i--){
		mainView.add(new dayView({day:dayNumber,color:'#8e959f',current:'no',dayOfMonth:''}));
		dayNumber++;
	};
	// this is the new "clicker" function, although it doesn't have a name anymore, it just is.
	mainView.addEventListener('click',function(e){
		if (e.source.current == 'yes'){
			// reset last day selected
			if(oldDay.text == dayOfMonth){
				oldDay.color='white';
				oldDay.backgroundImage='pngs/monthdaytiletoday.png';
			} else {
				oldDay.color='#3a4756';
				oldDay.backgroundImage='pngs/monthdaytile-Decoded.png';
			}
			oldDay.backgroundPaddingLeft=0;
			oldDay.backgroundPaddingBottom=0;
			// set window title with day selected, for testing purposes only
			backButton.title = nameOfMonth+' '+e.source.text+', '+a;
			// set characteristic of the day selected
			if(e.source.text == dayOfMonth){
				e.source.backgroundImage='pngs/monthdaytiletoday_selected.png';
			} else {
				e.source.backgroundImage='pngs/monthdaytile_selected.png';
			}
			e.source.backgroundPaddingLeft=1;
			e.source.backgroundPaddingBottom=1;
			e.source.color='white';
			//this day becomes old :(
			oldDay=e.source;
		}
	});
	var shadow = Ti.UI.createView({height:18,left:-1,width:322,backgroundImage:'pngs/monthshadow.png'});
	mainView.add(shadow);

return mainView;
};

// what's today's date?
var setDate = new Date();
a = setDate.getFullYear();
b = setDate.getMonth();
c = setDate.getDate();
// add the three calendar views to the window for changing calendars with animation later
var thisCalendarView = calView(a,b,c);
thisCalendarView.left=-1;
var nextCalendarView = calView(a,b+1,c);
nextCalendarView.left=323;
var prevCalendarView = calView(a,b-1,c,-323);
prevCalendarView.left=-323;

backButton.title=monthName(b)+' '+c+', '+a;

// add everything to the window 
win.add(toolBar);
win.add(thisCalendarView);
win.add(nextCalendarView);
win.add(prevCalendarView);
win.add(backButton);

// yeah, open the window, why not?
win.open({modal:true});

var slideNext =  Titanium.UI.createAnimation({left:-322,duration:500});
var slideReset =  Titanium.UI.createAnimation({left:-1,duration:500});
var slidePrev =  Titanium.UI.createAnimation({left:322,duration:500});

//-------------------switching months-------------------
// next month button
nextMonth.addEventListener('click',function(){
	if(b > 11){ b = b-12; a++;}
	b++;
	thisCalendarView.animate(slideNext);

	nextCalendarView.animate(slideReset);
	setTimeout(function(){
		thisCalendarView.left=-322;
		nextCalendarView.left=-1;
		prevCalendarView = thisCalendarView;
		thisCalendarView = nextCalendarView;
		nextCalendarView = calView(a,b,c);
		nextCalendarView.left=322;
		win.add(nextCalendarView);
	},500);
});

//prevoius month button
prevMonth.addEventListener('click',function(){
	if(b < 0){ b = b+12;a--;}
	b--;
	thisCalendarView.animate(slidePrev);

	prevCalendarView.animate(slideReset);

	setTimeout(function(){
		thisCalendarView.left=322;
		prevCalendarView.left=-1;
		nextCalendarView = thisCalendarView;
		thisCalendarView = prevCalendarView;
		prevCalendarView = calView(a,b,c);
		prevCalendarView.left=-322;
	
		win.add(prevCalendarView);
	},500);
});

