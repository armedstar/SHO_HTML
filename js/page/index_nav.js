//LEVELS 
var LEVEL_EXIT = 0; 
var LEVEL_LOGO = 1;
var LEVEL_MENU = 2;
var LEVEL_PROMOS = 3;
var BARKER_BOX = 4;
var VIDEO_MENU = 5;

//CONTENT MENUS
var menuIndex = 1;

var clickedIndex = 1;

//NAV ITEMS
var nav_index = 0;
var promo_index = 1;
var vid_index=1;
var barker_index = 1;

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

var newBarkerObject = 0;


function initialize()
{
   	initializeNavObjects();
	preloadImages();
    
    document.onkeydown = navigationKeyHandler;
	
	menuItems[1].className = "selected";
	videoItems[1].className = "active";
	
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
    menuItems[8] = link8;
	
	promoItems = new Array();
    
    promoItems[1] = promo1;
    promoItems[2] = promo2;
    promoItems[3] = promo3;
	
	videoItems = new Array();
    
    videoItems[1] = vid_1;
    videoItems[2] = vid_2;
    videoItems[3] = vid_3;
    videoItems[4] = vid_4;
    videoItems[5] = vid_5;
    videoItems[6] = vid_6;
	
	barkerItems = new Array();
    
    barkerItems[1] = barker_1;
   /* barkerItems[2] = barker_2;
    barkerItems[3] = barker_3;
    barkerItems[4] = barker_4;
	barkerItems[5] = barker_5;
	barkerItems[6] = barker_6;*/
  

 
	giveNavObjectFocus(menuItems[menuIndex]);
}

function preloadImages()
{
	var i = 0;
	   
	pageImaes = new Array();
	
	preloadImage("images/background.png");
	preloadImage("images/barker_deselected.png");
	preloadImage("images/barker_selected.png");
	preloadImage("images/sm_selected_home.png");
	preloadImage("images/sm_deselected_home.png");
	preloadImage("images/sho_logo_up.png");
	preloadImage("images/sh_logo_over.png");
	preloadImage("images/HomePromos/dexter_trivia.jpg");
	preloadImage("images/HomePromos/tara_promo.jpg");
	preloadImage("images/HomePromos/dexter_promo.jpg");
	preloadImage("images/HomePromos/dexter_barker.jpg");
	preloadImage("images/HomePromos/californication_barker.jpg");
	preloadImage("images/HomePromos/twilight_barker.jpg");
	preloadImage("images/HomePromos/nursejackie_barker.jpg");
	preloadImage("images/HomePromos/tudors_barker.jpg");
	preloadImage("images/HomePromos/weeds_barker.jpg");

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
            if (menuIndex >= 0 && menuIndex < 8) 
            {
			
				var previousNavObject = menuItems[menuIndex++];
                var navObject = menuItems[menuIndex];
				
				changeNavObjectFocus(navObject, previousNavObject);
				
			}
		}
		
		else if (currentLevel == LEVEL_PROMOS)
        {
            
			
			changeNavObjectFocus(barkerBox, promoItems[promo_index]);	
			currentLevel = BARKER_BOX;
			
        }
		
		else if (currentLevel == BARKER_BOX)
        {
            
			changeNavObjectFocus(videoItems[vid_index], barkerBox);
			currentLevel = VIDEO_MENU;
		
        }
		
                
    }    
    
	
	// Left
    else if (keycode == 37)
    {                
        if (currentLevel == LEVEL_MENU)
        {
            
		   if (menuIndex >= 2 && menuIndex <= 8) 
			{    
				var previousNavObject = menuItems[menuIndex--];
                var navObject = menuItems[menuIndex];

                changeNavObjectFocus(navObject, previousNavObject);
            }
			
        }
		
		else if (currentLevel == BARKER_BOX)
        {
          
			promo_index = 1;
			
			removeNavObjectFocus(barkerBox);
			
			promoItems[promo_index].style.background = "url(images/sm_selected_home.png) no-repeat";
			promoItems[promo_index].style.color = "#f2f2f2";
			
			currentLevel = LEVEL_PROMOS;
			
        }
		
		else if (currentLevel == VIDEO_MENU)
        {
          
			changeNavObjectFocus(barkerBox, videoItems[vid_index]);
			
			videoItems[clickedIndex].className = "active";
			
			currentLevel = BARKER_BOX;
			
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
		
		else if (currentLevel == LEVEL_MENU)
        {
            
			removeNavObjectFocus(menuIndex[menuItems]);
			
			
			if (menuIndex >= 1)
			{
			menuItems[menuIndex].className = "deselected";
			 
			}
			
			currentLevel = LEVEL_LOGO;
			
            giveNavObjectFocus(logo);
        }
		
		else if (currentLevel == LEVEL_PROMOS)
		{    
            
			if(promo_index == 1)
			{
				
				promoItems[promo_index].style.background = "url(images/sm_deselected_home.png) no-repeat";
				promoItems[promo_index].style.color = "#575757";
				
				menuItems[menuIndex].className = "selected";
				
				currentLevel = LEVEL_MENU;
				
				giveNavObjectFocus(menuItems[menu_index]);
				
			}
			
			if ((promo_index > 1) && (promo_index <= 3)) 
			{
				
				var prevPromoObject = promoItems[promo_index--];
				var promoObject = promoItems[promo_index];
				
				changeNavObjectFocus(promoObject, prevPromoObject);
				
			}
		}
		
		else if (currentLevel == BARKER_BOX)
        {
            
			changeNavObjectFocus(menuItems[menuIndex], barkerBox);
            
			menuItems[menuIndex].className = "selected";
			
            currentLevel = LEVEL_MENU;
            
        }
		
		else if (currentLevel == VIDEO_MENU)
		{    
            
			if(vid_index == 1){
				
				
				removeNavObjectFocus(promoItems[promo_index]);
				
				videoItems[vid_index].className = "deselected";
				menuItems[menuIndex].className = "selected";
				videoItems[clickedIndex].className = "active";
				
				currentLevel = LEVEL_MENU;
			}
			
			if ((vid_index > 1) && (vid_index <= 8)) 
			{
				var barkerObject = barkerItems[barker_index--];
				var prevBarkerObject = barkerItems[barker_index];
				
				var prevVidObject = videoItems[vid_index--];
				var promoVidObject = videoItems[vid_index];
				
				barkerObject = newBarkerObject;
				
				changeNavObjectFocus(promoVidObject, prevVidObject);
				
				
			}
		
		}
		
		
		
    }
    // Down
    else if (keycode == 40)
    {
		
        if (currentLevel == LEVEL_EXIT)
        {
			changeNavObjectFocus(logo, exit);

            currentLevel = LEVEL_LOGO;
        }
		else if (currentLevel == LEVEL_LOGO)
        {
 
			changeNavObjectFocus(menuItems[menuIndex], logo);
			
            currentLevel = LEVEL_MENU;
			
        }
		
		else if (currentLevel == LEVEL_MENU)
        {
			
			promo_index = 1;
			
			changeNavObjectFocus(menuItems[menuIndex], promoItems[promo_index]);
			menuItems[menuIndex].className = "deselected";
			menuItems[1].className = "active";
			
			promoItems[promo_index].style.background = "url(images/sm_selected_home.png) no-repeat";
			promoItems[promo_index].style.color = "#f2f2f2";
			
			currentLevel = LEVEL_PROMOS;
			
			
        }
		
		else if (currentLevel == LEVEL_PROMOS)
		{    
            
			
			if ((promo_index >= 1) && (promo_index < 3)) 
			{
				
				
				var prevPromoObject = promoItems[promo_index++];
				var promoObject = promoItems[promo_index];
				
				changeNavObjectFocus(promoObject, prevPromoObject);
				
			}
		
		}
		
		else if (currentLevel == VIDEO_MENU)
		{    

			
			if ((vid_index >= 1) && (vid_index < 6)) 
			{
				
				var barkerObject = barkerItems[barker_index++];
				var prevBarkerObject = barkerItems[barker_index];
				
				var prevVidObject = videoItems[vid_index++];
				var promoVidObject = videoItems[vid_index];
				
				
				changeNavObjectFocus(promoVidObject, prevVidObject);
				
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
        else if (currentLevel == LEVEL_MENU)
        {   
            clickNavObject(menuItems[menuIndex]);
        }
		 else if (currentLevel == LEVEL_PROMOS)
        {   
            clickNavObject(promoItems[promo_index]);
        }
        else if (currentLevel == VIDEO_MENU)
        {
            clickNavObject(videoItems[vid_index]);
        }
                 
    }               
}


function vidMenuClick()
{
	
	
	if (barker_index == 1)
	{
		
		document.getElementById('barker_1').innerHTML = '<embed src="video/376_4_0_ori02.mp4" width="682" height="383" ShowControls="0" autostart="true" ShowStatusBar="0" ShowDisplay="0" Loop="true"></embed><p><b>Tudors:</b><br>The Final Season</p>';
		
		//document.getElementById('barker_1').innerHTML = "<img src='images/HomePromos/tudors_barker.png'><p><b>Tudors Returns:</b><br>Season 4 Preview</p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 1;
	}
	
	else if (barker_index == 2)
	{
		
		document.getElementById('barker_1').innerHTML = "<img src='images/HomePromos/cali_vid_chat.png'><p>Chat with <br><b>David Duchovny</b></p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 2;
	}
	
	else if (barker_index == 3)
	{
		
		document.getElementById('barker_1').innerHTML = "<img src='images/HomePromos/valykrie_barker.png'><p><b>Valkyrie:</b><br>Go Behind the Scenes</p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 3;
	}
	
	else if (barker_index == 4)
	{
		document.getElementById('barker_1').innerHTML = '<embed src="video/613_2_135159_eps01.mp4" width="682" height="383" ShowControls="0" autostart="true" ShowStatusBar="0" ShowDisplay="0" Loop="true"></embed><p><b>United States of Tara:</b><br>New Episodes</p>';
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 4;
	}
	
	else if (barker_index == 5)
	{
		document.getElementById('barker_1').innerHTML = "<img src='images/HomePromos/weeds_barker.png'><p><b>Weeds Returns:</b><br>Season 6 Preview</p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 5;
	}
	
	else if (barker_index == 6)
	{
		document.getElementById('barker_1').innerHTML = "<img src='images/HomePromos/californication_barker.png'><p>All New Season of <br><b>Californication</b></p>";
		videoItems[clickedIndex].className = "deselected";
		clickedIndex = 6;
	}

}






