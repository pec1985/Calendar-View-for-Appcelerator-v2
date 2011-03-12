var selectDate = function(element){
	var thisWindow = Ti.UI.currentWindow;
	var mainView = Ti.UI.createView({width:320,height:480,bottom:-480});
	var calView = Ti.UI.createWebView({url:'calendar/index.html',height:324,bottom:0});
	var done = Ti.UI.createButton({title:'Done',style:1});
	var flexSpace = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	var toolbar = Ti.UI.createToolbar({bottom:324,items:[flexSpace,done]});
	mainView.add(toolbar);
	mainView.add(calView);
	win.add(mainView);
	var slideUp =  Titanium.UI.createAnimation({bottom:0,duration:350});
	var slideDown =  Titanium.UI.createAnimation({bottom:-480,duration:350});

	element.addEventListener('click',function(){
			mainView.animate(slideUp);
	});
	done.addEventListener('click',function(){
			mainView.animate(slideDown);
	});
	Ti.App.addEventListener('show_date',function(e)
	{
	   element.text=e.date;
	});	
};