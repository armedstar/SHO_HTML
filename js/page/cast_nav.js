//LEVELS 
var LEVEL_EXIT = 0;
var LEVEL_BACK = 1;
var LEVEL_LOGO = 2;
var LEVEL_MENU = 3;
var LEVEL_CAST = 4;

var CAST_UP = 5;
var CAST_DOWN = 6;

//CONTENT MENUS
var menuIndex = 1;

//NAV ITEMS
var cast_index=1;

var MENU_ITEM_WHATSHOT = 1;
var MENU_ITEM_SERIES = 2;
var MENU_ITEM_SPOTS = 3;
var MENU_ITEM_MOVIES = 4;
var MENU_ITEM_VIEWERSPICKS = 5;
var MENU_ITEM_SCHEDULE = 6;
var MENU_ITEM_ABOUT = 5;
var MENU_ITEM_COMINGSOON = 7;


var INDEX_PAGE_URL = "index.html";
var SERIES_PAGE_URL = "series.html";

var currentLevel = LEVEL_MENU;
var currentMenuIndex = menuIndex;

var defaultMenuId = 0;

var SCROLL_STEP_SIZE = 50;
var timerDown;
var timerUp;


function initialize()
{
   	preloadImages();
    
    initializeNavObjects();
	
	document.onkeydown = navigationKeyHandler;
	
}

function initializeNavObjects()
{
    menuItems = new Array();
    
    menuItems[1] = link1;
    menuItems[2] = link2;
    menuItems[3] = link3;
    menuItems[4] = link4;
    menuItems[5] = link5;
    menuItems[6] = link6;
	menuItems[7] = link7;
   // menuItems[8] = link8;
	
	
	castItems = new Array();
    
    castItems[1] = cast_1;
    castItems[2] = cast_2;
    castItems[3] = cast_3;
    castItems[4] = cast_4;
    castItems[5] = cast_5;
	castItems[6] = cast_6;
    castItems[7] = cast_7;
    castItems[8] = cast_8;

 
	giveNavObjectFocus(menuItems[menuIndex]);
}

function preloadImages()
{
	preloadImage("images/dexter_bg.png");
	preloadImage("images/sho_logo_up.png");
	preloadImage("images/sho_logo_over.png");
	preloadImage("images/HomePromos/dexter_trivia.jpg");

}

function navigationKeyHandler(e) 
{            
    var keycode = event.keyCode;
    var realkey = String.fromCharCode(keycode);              
	
    // Right
    if (keycode == 39)
    {   
       //alert(menuIndex);
		if (currentLevel == LEVEL_MENU)
		{
            if (menuIndex >= 0 && menuIndex < 7) 
            {
			
				var previousNavObject = menuItems[menuIndex++];
                var navObject = menuItems[menuIndex];
				
				changeNavObjectFocus(navObject, previousNavObject);
			}
		}
		
		else if (currentLevel == LEVEL_BACK)
        {
 			
			changeNavObjectFocus(logo, back_btn);
			
            currentLevel = LEVEL_LOGO;
			
        }
		
                
    }    
    
	
	// Left
    else if (keycode == 37)
    {                
        if (currentLevel == LEVEL_MENU)
        {
            
		   if (menuIndex >= 2 && menuIndex <= 7) 
			{    
				var previousNavObject = menuItems[menuIndex--];
                var navObject = menuItems[menuIndex];

                changeNavObjectFocus(navObject, previousNavObject);
            }
			
        }
		
		else if (currentLevel == LEVEL_LOGO)
        {
            changeNavObjectFocus(back_btn, logo);
            
            currentLevel = LEVEL_BACK;
  
        }
		
		
    }
    
	
	// Up
    else if (keycode == 38)
    {                    
		
		if (currentLevel == LEVEL_LOGO)
        {
            changeNavObjectFocus(exit, logo);
            
            currentLevel = LEVEL_EXIT;
            currentMenuIndex = defaultMenuId;
        }
		
		else if (currentLevel == LEVEL_BACK)
        {
            changeNavObjectFocus(exit, back_btn);
            
            currentLevel = LEVEL_EXIT;
            currentMenuIndex = defaultMenuId;
        }
		
		else if (currentLevel == LEVEL_MENU)
        {
            
			if (menuIndex >= 1)
			{
			menuItems[menuIndex].className = "deselected";
			menuItems[4].className = "active";
			}
			
			currentLevel = LEVEL_BACK;
			
			giveNavObjectFocus(back_btn);
            
        }
		
		
		else if (currentLevel == LEVEL_CAST)
		{    
            
			if(cast_index == 1){
				
				changeNavObjectFocus(menuItems[menuIndex], castItems[cast_index]);
				
				currentLevel = LEVEL_MENU;
			}
			
			if ((cast_index > 1) && (cast_index <= 8)) 
			{
				
				var prevCastObject = castItems[cast_index--];
				var castObject = castItems[cast_index];
				
				changeNavObjectFocus(castObject, prevCastObject);
				
			}
			
			if (cast_index == 5)
			{
			
			changeNavObjectFocus(cast_up, castObject);
			
			currentLevel = CAST_UP;
			
				
			}
		
		}
	
		
		else if (currentLevel == CAST_DOWN)
		{
		
		cast_index = cast_index - 1;
		
		changeNavObjectFocus(castItems[cast_index], cast_down)
		
		currentLevel = LEVEL_CAST;
		
		
		}
		
		else if (currentLevel == CAST_UP)
		{    
            
			cast_index = cast_index + 1;
			
			changeNavObjectFocus(menuItems[menuIndex], cast_up)
		
			currentLevel = LEVEL_MENU;
		}
		
    	}
    // Down
	
	
    else if (keycode == 40)
    {
		
		
        if (currentLevel == LEVEL_EXIT)
        {
			changeNavObjectFocus(back_btn, exit);

            currentLevel = LEVEL_BACK;
        }
		
		
		else if (currentLevel == LEVEL_BACK)
        {
 
			changeNavObjectFocus(menuItems[menuIndex], back_btn);
			
			 
			menuItems[menuIndex].className = "selected";
			
            currentLevel = LEVEL_MENU;
			
        }
		
		else if (currentLevel == LEVEL_LOGO)
        {
 
			changeNavObjectFocus(menuItems[menuIndex], logo);
			
			 
			menuItems[menuIndex].className = "selected";
			
            currentLevel = LEVEL_MENU;
			
        }
		
		else if (currentLevel == LEVEL_MENU)
        {
			
			changeNavObjectFocus(castItems[cast_index], menuItems[menuIndex]);
			
			if (menuIndex >= 1)
			{
				menuItems[menuIndex].className = "deselected";
				 
				menuItems[4].className = "active";
			}
			//castItems[cast_index].className = "selected";
			
			
			currentLevel = LEVEL_CAST;

			
        }
		
		else if (currentLevel == LEVEL_CAST)
		{    
			
			if ((cast_index >= 1) && (cast_index < 8)) 
			{
				
				var prevCastObject = castItems[cast_index++];
				var castObject = castItems[cast_index];
				
				changeNavObjectFocus(castObject, prevCastObject);
				
				
			}
			
			if (cast_index == 6)
			{
				
				changeNavObjectFocus(cast_down, castItems[cast_index]);
				
				currentLevel = CAST_DOWN;
				
				
			}
		
		}
		
		else if (currentLevel == CAST_UP)
		{
		
		cast_index = cast_index + 1;
		
		changeNavObjectFocus(castItems[cast_index], cast_up)
		
		currentLevel = LEVEL_CAST;
		
		}
		
        
		
    }
    
	
	
	// Enter
    else if (keycode == 13) 
    {   
        if (currentLevel == LEVEL_EXIT)
        {
            clickNavObject(exit);
        }
		if (currentLevel == LEVEL_BACK)
        {
            clickNavObject(back_btn);
        }
		else if (currentLevel == LEVEL_LOGO)
        {   
            clickNavObject(logo);
        }
        else if (currentLevel == LEVEL_MENU)
        {   
            clickNavObject(menuItems[menuIndex]);
        }
       
	   else if(currentLevel == LEVEL_CAST)
		{
			
			clickNavObject(castItems[cast_index]);
			
		}
		
		else if(currentLevel == CAST_UP)
		{
			clickNavObject(cast_up)
		}
		else if(currentLevel == CAST_DOWN)
		{
			clickNavObject(cast_down)	
		}
    }               
}

function scrollDivDown(id)
{
    clearTimeout(timerDown); 
    document.getElementById(id).scrollTop += SCROLL_STEP_SIZE;
    timerDown = setTimeout("scrollDivDown('" + id + "')", 0);
} 

function scrollDivUp(id)
{
    clearTimeout(timerUp)
    document.getElementById(id).scrollTop -= SCROLL_STEP_SIZE;
    timerUp = setTimeout("scrollDivUp('" + id + "')", 0);
} 

function stopMe()
{
    clearTimeout(timerDown); 
    clearTimeout(timerUp);
} 

function castScrollDown()
{

				//alert('foo');
				
				SCROLL_STEP_SIZE = 500;
				
				var scrollpos = menu_box.scrollTop
				
				cast_up.style.opacity = 1;
		
				scrollDivDown('menu_box');
                window.setTimeout("stopMe();", 0);
				
				changeNavObjectFocus(castItems[cast_index], cast_down);
				
				//alert(scrollpos);
				if (scrollpos == 0)
				{
					//
					cast_down.style.opacity = .2;
					
				}
				
				currentLevel = LEVEL_CAST;
				
				
				
				
}

function castScrollUp()
	{
				
				cast_down.style.opacity = 1;
				
				SCROLL_STEP_SIZE = 500;
				
				scrollDivUp('menu_box');
                window.setTimeout("stopMe();", 0);
				
				changeNavObjectFocus(castItems[cast_index], cast_up);
				
				if (cast_index <= 5)
				{
					//alert(scrollpos);
					cast_up.style.opacity = .2;
					
				}
				
				currentLevel = LEVEL_CAST;
	}

