var selectDate = function(element){
	var thisWindow = Ti.UI.currentWindow;
	var mainView = Ti.UI.createWebView({url:'pngs/index.html',height:324,bottom:-324});
	win.add(mainView);
	var slideUp =  Titanium.UI.createAnimation({bottom:0,duration:250});
	var slideDown =  Titanium.UI.createAnimation({bottom:-324,duration:250});
	var x = 0;
	element.addEventListener('click',function(){
		switch(x){
			case 0: mainView.animate(slideUp); x=1;break;
			case 1: mainView.animate(slideDown); x=0;break;
		}
	});
	Ti.App.addEventListener('show_date',function(e)
	{
	   element.text=e.date;
	});	
};