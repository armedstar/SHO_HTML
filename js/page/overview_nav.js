//LEVELS 
var LEVEL_EXIT = 0; 
var LEVEL_BACK = 1;
var LEVEL_LOGO = 2;
var LEVEL_MENU = 3;
var SUB_MENU = 4;
var EPISODE_PROMO = 5;
var PROMO_MENU = 6;

//CONTENT MENUS
var menuIndex = 1;

//NAV ITEMS
var nav_index = 0;
var promo_index = 1;
var sub_index=1;

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
	
	promoItems = new Array();
    
    promoItems[1] = promo1;
    promoItems[2] = promo2;
    promoItems[3] = promo3;
	
	subItems = new Array();
    
    subItems[1] = sub_1;
    subItems[2] = sub_2;
    subItems[3] = sub_3;
	subItems[4] = sub_4;

 
	giveNavObjectFocus(menuItems[menuIndex]);
}

function preloadImages()
{
	preloadImage("images/background.png");
	preloadImage("images/barker_deselected.png");
	preloadImage("images/barker_selected.png");
	preloadImage("images/sm_selected_home.png");
	preloadImage("images/sm_deselected_home.png");
	preloadImage("images/sho_logo_up.png");
	preloadImage("images/sho_logo_over.png");
	preloadImage("images/HomePromos/dexter_trivia.jpg");
	preloadImage("images/HomePromos/californication.jpg");
	preloadImage("images/HomePromos/tudors.jpg");
	preloadImage("images/HomePromos/dexter_barker.jpg");

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
            if (menuIndex >= 1 && menuIndex < 7) 
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
		
		else if (currentLevel == SUB_MENU)
        {
          
			removeNavObjectFocus(subItems[sub_index]);
			
			subItems[sub_index].className = "deselected";
			ep_promo.className = "selected";
			giveNavObjectFocus(ep_promo);
			
			currentLevel = EPISODE_PROMO;
        }
		
		else if (currentLevel == PROMO_MENU)
		{    
            
			
			if ((promo_index >= 1) && (promo_index < 3)) 
			{
				
				var prevPromoObject = promoItems[promo_index++];
				var promoObject = promoItems[promo_index];
				
				changeNavObjectFocus(promoObject, prevPromoObject);
				
			}
		
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
		
	
		
		else if (currentLevel == PROMO_MENU)
		{    
            
			
			if (promo_index == 1)
			{
			
			changeNavObjectFocus(subItems[sub_index],promoItems[promo_index] );
			
			currentLevel = SUB_MENU;
			
			}
			
			if ((promo_index > 1) && (promo_index <= 3)) 
			{
				
				var prevPromoObject = promoItems[promo_index--];
				var promoObject = promoItems[promo_index];
				
				changeNavObjectFocus(promoObject, prevPromoObject);
				
			}
		
		}
		
		else if (currentLevel == EPISODE_PROMO)
		{
			changeNavObjectFocus(subItems[sub_index], ep_promo);
			
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
			
			if (menuIndex >= 1)
			{
			menuItems[menuIndex].className = "deselected";
			menuItems[1].className = "active";
			}

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
		
		else if (currentLevel == EPISODE_PROMO)
        {
            
			changeNavObjectFocus(menuItems[menuIndex], ep_promo);
            
			menuItems[menuIndex].className = "selected";
			ep_promo.className = "deselected";
			
            currentLevel = LEVEL_MENU;
            
        }
		
		else if (currentLevel == PROMO_MENU)
        {
			
			
			changeNavObjectFocus(ep_promo, promoItems[promo_index]);
			
			promoItems[promo_index].className = "deselected";
			ep_promo.className = "selected";
			promo_index = 1;
			
			currentLevel = EPISODE_PROMO;

			
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
			menuItems[1].className = "active";
			
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
		
		
		
		else if (currentLevel == EPISODE_PROMO)
        {
 
			changeNavObjectFocus(promoItems[promo_index], ep_promo);
			
			ep_promo.className = "deselected";
	
			currentLevel = PROMO_MENU;
			
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
        else if (currentLevel == SUB_MENU)
        {
            clickNavObject(subItems[sub_index]);
        }
		else if (currentLevel == EPISODE_PROMO)
        {
            clickNavObject(ep_promo);
        }
       
    }               
}

