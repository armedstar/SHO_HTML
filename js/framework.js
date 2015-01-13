var images = new Array();

function registerNavHandlers(
    navObj, 
    onGiveNavFocusHandler, 
    onRemoveNavFocusHandler)
{
    $(navObj).observe('navHandler:giveNavFocus', onGiveNavFocusHandler); 
    $(navObj).observe('navHandler:removeNavFocus', onRemoveNavFocusHandler); 
}

function changeNavObjectFocus(navObject, previousNavObject)
{
    removeNavObjectFocus(previousNavObject);
    giveNavObjectFocus(navObject);
}

function giveNavObjectFocus(navObject)
{
    if (navObject != null)
    {
        $(navObject).fire('navHandler:giveNavFocus');
    }
}

function removeNavObjectFocus(navObject)
{
    if (navObject != null)
    {
        $(navObject).fire('navHandler:removeNavFocus');
    }
}

function clickNavObject(navObject)
{
    if (navObject != null)
    {
        navObject.onclick();
    }
}

function changePage(url)
{
    if (url != null && url.length > 0)
    {
        window.location = url;
    }
}

function handleExitButtonClick() {
    if (!parent || (parent == window) || !parent.handleExitButtonClick) {
        try {
            window.open('', '_self', '');
            window.close();
        }
        catch (e) {
            alert(e);
        }
    } else {
        parent.handleExitButtonClick();
    }
}

function preloadImage(imageUrl) {
    var image = new Image();
    image.src = imageUrl;
    images.push(image);
}

function getPreloadedImageCount() 
{
	return images.length;
}