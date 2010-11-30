/*

calendarView for Appcelerator Version 3!!!

feel free to modify it and improve it.
find me on twitter @pecdev
questions and suggestions accepeted

This is a test of a fully working day picker.
The new calendar (calendar2.js and pngs/index.html) has very few comments
if you get lost reading my code, don't worry.
you don't need to understand everything, only accept that
it works :)
I will fill the code up with commnets, publish it on
github, and write a blog post on it... eventually.
hope you like it and find it usefull

-Pedro Enrique
*/



//this is the old one, it uses only native elements
//Ti.include('calendar.js');

//this is the new one it uses a webview, HTML, CSS, and JavaScript
Ti.include('calendar2.js');

var win = Ti.UI.createWindow();
var label = Ti.UI.createLabel({text:'Click Here To Show And Hide',textAlign:'center',top:20,left:50,right:50,height:40,backgroundColor:'white',borderRadius:15});
win.add(label);
win.open();

selectDate(label);