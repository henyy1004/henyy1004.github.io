
//마우스 오른쪽 막기
document.oncontextmenu = function(e)
{
	if(e)
	{
		e.preventDefault();
	}
	else
	{
		event.keyCode = 0;
		event.returnValue = false;
	}
}

//뒤로가기, 새로고침 막기
document.onkeydown = function(e) 
{
	key = (e) ? e.keyCode : event.keyCode;
	ctrl = (e) ? e.ctrlKey  : event.ctrlKey;

	if( (ctrl == true && (key == 78 || key == 82)) || key==8 || key==116) 
	{
		if(e) 
		{
			e.preventDefault();
		} 
		else 
		{
			event.keyCode = 0;
			event.returnValue = false;
		}
	}
}