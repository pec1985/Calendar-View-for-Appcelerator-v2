var win = Ti.UI.createWindow({backgroundImage:'pngs/Default-calinvite.png',layout:'vertical'});

//-------------------toolbar-------------------

// title and buttons
var nextMonth = Ti.UI.createImageView({right:15,width:12,height:15,title:'next',image:'pngs/next.png'});
var prevMonth = Ti.UI.createImageView({left:15,width:12,height:15,title:'prev',image:'pngs/prev.png'});
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

// -------------------main calendar function, this is EVERYTHING!! ha ha-------------------
var calView = function(a,b,c){
	var month = b;
	var year = a;
	if(b > 11){ month = b-12;year = a+1}
	if(b < 0){ month = b+12;year = a-1}
	
	if(month==0){monthTitle.text='January';}
	if(month==1){monthTitle.text='February';}
	if(month==2){monthTitle.text='March';}
	if(month==3){monthTitle.text='April';}
	if(month==4){monthTitle.text='May';}
	if(month==5){monthTitle.text='June';}
	if(month==6){monthTitle.text='July';}
	if(month==7){monthTitle.text='Augost';}
	if(month==8){monthTitle.text='September';}
	if(month==9){monthTitle.text='October';}
	if(month==10){monthTitle.text='November';}
	if(month==11){monthTitle.text='December';}
	//create main calendar view
	var mainView = Ti.UI.createView({layout:'horizontal',backgroundColor:'#DCDCDF',width:322,height:'auto',left:-1,top:0});
	//set the time
	var daysInMonth = 32 - new Date(a,b,32).getDate();
	var dayOfMonth = new Date(a,b,c).getDate();
	var dayOfWeek = new Date(a,b,1).getDay(); 
	var daysInLastMonth = 32 - new Date(a,b-1,32).getDate();
	var daysInNextMonth = (new Date(a,b,daysInMonth).getDay())-6;
	//create day
	dayView = function(e){
		var label = Ti.UI.createLabel({current:e.current,width:46,height:44,backgroundImage:'pngs/monthdaytile-Decoded.png',text:e.day,textAlign:'center',color:e.color,font:{fontSize:20,fontWeight:'bold'}});
		if(e.day == dayOfMonth){
			label.color='white';
			label.backgroundImage='pngs/monthdaytiletoday_selected.png';
			oldDay = label;
		}
		return label;
	};
	//create a new empty day for custamization later - it will become first our current day
	var oldDay = null;
	//set initial day number
	var dayNumber = daysInLastMonth-dayOfWeek+1;
	//get last month's days
	for(i=0;i<dayOfWeek;i++){
		mainView.add(new dayView({day:dayNumber,color:'#8e959f',current:'no'}));
		dayNumber++;
	};
	// reset day number for current month
	dayNumber = 1;
	//get this month's days
	for(i=0;i<daysInMonth;i++){
		var newDay=new dayView({day:dayNumber,color:'#3a4756',current:'yes'});
		mainView.add(newDay);
		//the clicker function!!!! ha ha!
	//	clicker(newDay,dayNumber);
		
		dayNumber++;
	};
	dayNumber = 1;
	//get remaining month's days
	for(i=0;i>daysInNextMonth;i--){
		mainView.add(new dayView({day:dayNumber,color:'#8e959f',current:'no'}));
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
			win.title=monthTitle.text+' '+e.source.text+', '+year;
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

return mainView;
};

// what's today's date?
var setDate = new Date();
a = setDate.getFullYear();
b = setDate.getMonth();
c = setDate.getDate();
// wrap the calendar view function into a variable so it can be removed when changing months
var calendarView = calView(a,b,c);

// create shadow
var shadow = Ti.UI.createView({height:18,backgroundImage:'pngs/monthshadow.png'});

// add everything to the window 
win.add(toolBar);
win.add(calendarView);
win.add(shadow);

// yeah, open the window, why not?
win.open({modal:true});



//-------------------switching months-------------------
// next month button
nextMonth.addEventListener('click',function(){
	win.remove(calendarView);
	win.remove(shadow);
	b++;
	calendarView = calView(a,b,c);
	win.add(calendarView);
	win.add(shadow);
});
//prevoius month button
prevMonth.addEventListener('click',function(){
	win.remove(calendarView);
	win.remove(shadow);
	b--;
	calendarView = calView(a,b,c);
	win.add(calendarView);
	win.add(shadow);
});
