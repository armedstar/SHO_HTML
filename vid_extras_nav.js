//LEVELS 
var LEVEL_EXIT = 0;
var LEVEL_BACK = 1;
var LEVEL_LOGO = 2;
var LEVEL_MENU = 3;
var LEVEL_FS = 4;
var VIDEO_MENU = 5;

var VIDEO_UP = 6;
var VIDEO_DOWN = 7;

//CONTENT MENUS
var menuIndex = 1;
var clickedIndex = 1;
var barker_index = 1;

//NAV ITEMS
var vid_index = 1;

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
	
	videoItems[clickedIndex].className = "active";
	
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
    //menuItems[8] = link8;
	
	
	videoItems = new Array();
    
    videoItems[1] = vid_1;
    videoItems[2] = vid_2;
    videoItems[3] = vid_3;
    videoItems[4] = vid_4;
    videoItems[5] = vid_5;
    videoItems[6] = vid_6;
	videoItems[7] = vid_7;
	videoItems[8] = vid_8;
	videoItems[9] = vid_9;
    videoItems[10] = vid_10;
	videoItems[11] = vid_11;
	videoItems[12] = vid_12;

 
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
		
		if (currentLevel == LEVEL_FS)
		{
            	changeNavObjectFocus(videoItems[vid_index], fullscreen);
				
				currentLevel = VIDEO_MENU;

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
		
		else if (currentLevel == VIDEO_MENU)
        {
          
			changeNavObjectFocus(fullscreen, videoItems[vid_index]);
			
			currentLevel = LEVEL_FS;
			
        }
		else if (currentLevel == VIDEO_UP)
        {
          	vid_index = vid_index + 1;
			
			changeNavObjectFocus(fullscreen, video_up);
			
			currentLevel = LEVEL_FS;
			
        }
		else if (currentLevel == VIDEO_DOWN)
        {
          	vid_index = vid_index - 1;
			
			changeNavObjectFocus(fullscreen, video_down);
			
			currentLevel = LEVEL_FS;
			
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
			
				changeNavObjectFocus(back_btn, menuItems[menuIndex]);
			
			} else {
				giveNavObjectFocus(back_btn);
			}
			
			currentLevel = LEVEL_BACK;
            
        }
		else if (currentLevel == LEVEL_FS)
		{
			
			changeNavObjectFocus(menuItems[menuIndex], fullscreen);
			
			currentLevel = LEVEL_MENU;
		
		}
		
		else if (currentLevel == VIDEO_MENU)
		{
			if (vid_index == 1)
			{
			changeNavObjectFocus(menuItems[menuIndex], videoItems[vid_index]);
			
            currentLevel = LEVEL_MENU;
			}
			
			if ((vid_index > 1) && (vid_index <= 12)) 
			{
				
				var prevVidObject = videoItems[vid_index--];
				var vidObject = videoItems[vid_index];
				
				changeNavObjectFocus(vidObject, prevVidObject);
				
			}
			
			if (vid_index == 6)
			{
			
			changeNavObjectFocus(video_up, vidObject);
			
			currentLevel = VIDEO_UP;
			
				
			}
			
			//if (vid_index != 1)
				//{
				//	videoItems[clickedIndex].className = "active";
				//}
			
		
		}
		
		
		
		else if (currentLevel == VIDEO_DOWN)
        {
            
			vid_index = vid_index - 1;
			
			changeNavObjectFocus(videoItems[vid_index], video_down);
			
			currentLevel = VIDEO_MENU;
			
			
			
 		}
		
		else if (currentLevel == VIDEO_UP)
        {
            
			changeNavObjectFocus(menuItems[menuIndex], video_up);
			
			//alert(vid_index);
			vid_index = vid_index + 1;
			
			currentLevel = LEVEL_MENU;
			
			
 		}
		
		
		else if (currentLevel == LEVEL_FS)
			{    
					
				
				changeNavObjectFocus(menuItems[menuIndex], fullscreen);
				
				menuItems[menuIndex].className = "selected";
				
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
			
			changeNavObjectFocus(videoItems[vid_index], menuItems[menuIndex]);
			
			if (menuIndex >= 1)
			{
			menuItems[menuIndex].className = "deselected";
			menuItems[3].className = "active";
			}
		
			currentLevel = VIDEO_MENU;
			
			
        }
		
		else if (currentLevel == VIDEO_MENU)
		{    
            	
		 	if ((vid_index >= 1) && (vid_index < 12)) 
			{
				
				var prevVidObject = videoItems[vid_index++];
				var vidObject = videoItems[vid_index];
				
				changeNavObjectFocus(vidObject, prevVidObject);
				
			}
			
			if (vid_index == 7)
			{
			
			changeNavObjectFocus(video_down, vidObject);
			
			currentLevel = VIDEO_DOWN;
			
				
			}
			
			
		}
		
		else if (currentLevel == VIDEO_UP)
		{
			vid_index = vid_index + 1;
			
			changeNavObjectFocus(videoItems[vid_index], video_up)
			
			currentLevel = VIDEO_MENU;
		}
		
        
		
    }
    
	
	
	// Enter
    else if (keycode == 13) 
    {   
        if (currentLevel == LEVEL_EXIT)
        {
            clickNavObject(exit);
        }
		else if (currentLevel == LEVEL_BACK)
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
       else if(currentLevel == VIDEO_MENU)
		{
			clickNavObject(videoItems[vid_index]);
		}
	   
	   else if(currentLevel == VIDEO_UP)
		{
			clickNavObject(video_up);
		}
		else if(currentLevel == VIDEO_DOWN)
		{
			clickNavObject(video_down);	
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

function videoScrollDown()
{

				SCROLL_STEP_SIZE = 220;
				
				var scrollpos = menu_box.scrollTop
				
				video_up.style.opacity = 1;
				
				
				scrollDivDown('menu_box');
                window.setTimeout("stopMe();", 0);
				
				if (vid_index > 6)
				{

					video_down.style.opacity = .2;
					
				}
				
				changeNavObjectFocus(videoItems[vid_index], video_down);
				
				
				currentLevel = VIDEO_MENU;
				
				
				
				
}

function videoScrollUp()
	{
				
				SCROLL_STEP_SIZE = 220;
				
				video_down.style.opacity = 1;
				
				scrollDivUp('menu_box');
                window.setTimeout("stopMe();", 0);
				
				changeNavObjectFocus(videoItems[vid_index], video_up);
				
				//alert(scrollpos);
				
				if (vid_index <= 6)
				{
					video_up.style.opacity = .2;
					
				}
				
				currentLevel = VIDEO_MENU;
	}


function vidMenuClick()
{
	
	if (vid_index == 1)
	{
		
		document.getElementById('mov').innerHTML = '<embed src="video/323_4_0_int02.mp4" autostart="true" width="797" height="447" ShowControls="0" ShowStatusBar="0" ShowDisplay="0" Loop="true"></embed><p><b>Drop of Blood </b>Clyde Phillips</p>';
		
		//document.getElementById('mov').innerHTML = "<img src='images/HomePromos/tudors_barker.png'><p><b>Tudors Returns:</b><br>Season 4 Preview</p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 1;
	}
	
	else if (vid_index == 2)
	{
		
		document.getElementById('mov').innerHTML = "<img src = 'images/VideoExtras/mov_placeholder.jpg'><p><b>Dexter</b> Early Cuts</p>";
		
		//document.getElementById('mov').innerHTML = "<img src='images/HomePromos/californication_barker.png'><p><b>Californication Season 3:</b><br>Trailer</p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 2;
	}
	
	else if (vid_index == 3)
	{
		document.getElementById('mov').innerHTML = "<img src = 'images/VideoExtras/mov3_placeholder.png'><p><b>FBI Profiler</b> on Dexter</p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 3;
	}
	
	else if (vid_index == 4)
	{
		document.getElementById('mov').innerHTML = "<img src='images/VideoExtras/mov4_placeholder.png'><p><b>Dexter's Private Life</b>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 4;
	}
	
	else if (vid_index == 5)
	{
		document.getElementById('mov').innerHTML = '<embed src="video/323_4_0_int01.mp4" width="797" height="447" autostart="true" ShowControls="0" ShowStatusBar="0" ShowDisplay="0" Loop="true"></embed><p><b>Richer Soil </b>Michael C. Hall</p>';
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 5;
	}
	
	else if (vid_index == 6)
	{
		document.getElementById('mov').innerHTML = "<img src='images/VideoExtras/mov6_placeholder.png'><p><b>Raising the Bar: </b>Jennifer Carpenter</p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 6;
	}
	
	else if (vid_index == 7)
	{
		document.getElementById('mov').innerHTML = "<img src = 'images/VideoExtras/mov7_placeholder.png'><p><b>Scoring Dexter</b></p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 7;
	}
	
	else if (vid_index == 8)
	{
		document.getElementById('mov').innerHTML = "<img src='images/VideoExtras/mov8_placeholder.png'><p><b>Dissecting Dexter</b>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 8;
	}
	
	else if (vid_index == 9)
	{
		document.getElementById('mov').innerHTML = '<embed src="video/323_4_0_ext14_hd.mp4" width="797" height="447" autostart="true" ShowControls="0" ShowStatusBar="0" ShowDisplay="0" Loop="true"><p><b>Dexter the Game </b>Lands at Comic-Con</p>';
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 9;
	}
	
	else if (vid_index == 10)
	{
		document.getElementById('mov').innerHTML = '<embed src="video/323_4_0_run02.mp4" width="797" height="447" autostart="true" ShowControls="0" ShowStatusBar="0" ShowDisplay="0" Loop="true"></embed><p><b>Clyde Phillips </b>Challenged</p>';
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 10;
	}
	
	else if (vid_index == 11)
	{
		document.getElementById('mov').innerHTML = '<embed src="video/323_4_0_int07.mp4" width="797" height="447" autostart="true" ShowControls="0" ShowStatusBar="0" ShowDisplay="0" Loop="true"><p><b>Momentum </b>David Zayas</p>';
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 11;
	}
	
	else if (vid_index == 12)
	{
		document.getElementById('mov').innerHTML = '<embed src="video/323_4_0_int08.mp4" width="797" height="447" autostart="true" ShowControls="0" ShowStatusBar="0" ShowDisplay="0" Loop="true"></embed><p><b>Being Watched: </b>Lauren Valez</p>';
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 12;
	}

}


