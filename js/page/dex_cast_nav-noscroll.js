//LEVELS 
var LEVEL_EXIT = 0; 
var LEVEL_BACK = 1;
var LEVEL_LOGO = 2;
var LEVEL_MENU = 3;
var SUB_MENU = 4;
var VIDEO_MENU = 6;

var VIDEO_UP = 7;
var VIDEO_DOWN = 8;

//NAV ITEMS
var menuIndex = 1;
var nav_index = 0;
var vid_index = 1;
var sub_index = 1;

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
    //menuItems[8] = link8;
	
/*	videoItems = new Array();
    
    videoItems[1] = vid_1;
    videoItems[2] = vid_2;
    videoItems[3] = vid_3;*/
	
	subItems = new Array();
    
    subItems[1] = sub_1;
    subItems[2] = sub_2;
    subItems[3] = sub_3;
	subItems[4] = sub_4;

 
	giveNavObjectFocus(menuItems[menuIndex]);
}

function preloadImages()
{
	preloadImage("images/background_dex.png");
	/*preloadImage("images/barker_deselected.png");
	preloadImage("images/barker_selected.png");
	preloadImage("images/sm_selected_home.png");
	preloadImage("images/sm_deselected_home.png");
	preloadImage("images/sho_logo_up.png");
	preloadImage("images/sh_logo_over.png");
	preloadImage("images/HomePromos/dexter_trivia.jpg");
	preloadImage("images/HomePromos/californication.jpg");
	preloadImage("images/HomePromos/tudors.jpg");
	preloadImage("images/HomePromos/dexter_barker.jpg");*/

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
		
		
		/*else if (currentLevel == SUB_MENU)
        {
			
            removeNavObjectFocus(videoItems[vid_index], subItems[sub_index]);
            
            subItems[sub_index].className = "deselected";
			videoItems[vid_index].className = "selected"
			
			currentLevel = VIDEO_MENU;
				
  
        }*/
		

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
            
			//changeNavObjectFocus(scroll_text, videoItems[vid_index]);
			changeNavObjectFocus(subItems[sub_index], videoItems[vid_index]);
			
            //currentLevel = CONTENT;
			currentLevel = SUB_MENU;
			
  
        }
		else if (currentLevel == VIDEO_UP)
        {
            
	
			changeNavObjectFocus(subItems[sub_index], vid_up);
			
			vid_index = vid_index + 1;
			
			currentLevel = SUB_MENU;
			
  
        }
		else if (currentLevel == VIDEO_DOWN)
        {
            

			changeNavObjectFocus(subItems[sub_index], vid_down);
			
			vid_index = vid_index - 1;
			
			currentLevel = SUB_MENU;
			
  
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
            
			changeNavObjectFocus(back_btn, menuItems[menuIndex]);
			
			currentLevel = LEVEL_BACK;

        }
		
		else if (currentLevel == SUB_MENU)
		{    
            
			if(sub_index == 1)
			{
				removeNavObjectFocus(subItems[sub_index]);
				
				currentLevel = LEVEL_MENU;
				
				 
				menuItems[menuIndex].className = "selected";
				
				giveNavObjectFocus(menuItems[menu_index]);
				
				
				
			}
			
			if ((sub_index >= 1) && (sub_index <= 4)) 
			{
				
				var prevSubObject = subItems[sub_index--];
				var subObject = subItems[sub_index];
				
				changeNavObjectFocus(subObject, prevSubObject);
				
			}
		
		}
		
		
		else if (currentLevel == VIDEO_MENU)
		{    
            	
		if (vid_index == 1)
			{
			changeNavObjectFocus(menuItems[menuIndex], videoItems[vid_index]);
			
            currentLevel = LEVEL_MENU;
			}
			
			if ((vid_index > 1) && (vid_index <= 3)) 
			{
				
				var prevVidObject = videoItems[vid_index--];
				var vidObject = videoItems[vid_index];
				
				changeNavObjectFocus(vidObject, prevVidObject);
				
			}

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
			
			
			changeNavObjectFocus(menuItems[menuIndex], subItems[sub_index]);
			
			if (menuIndex >= 1)
			{
			 menuItems[menuIndex].className = "deselected";
			 menuItems[4].className = "active";
			 
			}
			
			subItems[1].className = "selected";
			sub_index = 1;
			
			currentLevel = SUB_MENU;

			
        }
		

		
		else if (currentLevel == SUB_MENU)
		{    
            
			
			if ((sub_index >= 1) && (sub_index < 4)) 
			{
				
				var prevSubObject = subItems[sub_index++];
				var subObject = subItems[sub_index];
				
				changeNavObjectFocus(subObject, prevSubObject);
				
			}
		
		}
		
		else if (currentLevel == VIDEO_MENU)
		{    
			
			if ((vid_index >= 1) && (vid_index < 3)) 
			{
				
				var prevVidObject = videoItems[vid_index++];
				var vidObject = videoItems[vid_index];
				
				changeNavObjectFocus(vidObject, prevVidObject);
				
			}
			
			
		
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
       
  
		else if(currentLevel == VIDEO_MENU)
		{
			
			clickNavObject(videoItems[vid_index]);
			
		}
		else if(currentLevel == SUB_MENU)
		{
			clickNavObject(subItems[sub_index]);
			
		}
		
		else if(currentLevel == VIDEO_UP)
		{
			clickNavObject(vid_up)
		}
		else if(currentLevel == VIDEO_DOWN)
		{
			clickNavObject(vid_down)	
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

				SCROLL_STEP_SIZE = 80;
				
				var scrollpos = cast_menu_box.scrollTop
				
				vid_up.style.display = "block";
				
				scrollDivDown('cast_menu_box');
                window.setTimeout("stopMe();", 0);
				
				changeNavObjectFocus(videoItems[vid_index], vid_down);
				
				
				if (scrollpos == 160)
				{
					//alert(scrollpos);
					vid_down.style.display = "none";
					
				}
				
				currentLevel = VIDEO_MENU;
				
				
				
				
}

function videoScrollUp()
	{
				
				SCROLL_STEP_SIZE = 80;
				
				var scrollpos = cast_menu_box.scrollTop
				
				vid_down.style.display = "block";
				
				scrollDivUp('cast_menu_box');
                window.setTimeout("stopMe();", 0);
				
				changeNavObjectFocus(videoItems[vid_index], vid_up);
				
				//alert(scrollpos);
				
				if (vid_index <= 3)
				{
					//alert(scrollpos);
					vid_up.style.display = "none";
					
				}
				
				currentLevel = VIDEO_MENU;
	}
	




