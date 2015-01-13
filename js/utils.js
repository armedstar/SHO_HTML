function getQueryParameter(parameterName)
{
    parameterName = parameterName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    
    var regexS = "[\\?&]" + parameterName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    
    return (results == null) ? "" : results[1];
}

function hideElementById(elementId)
{
	hideElement(document.getElementById(elementId));
}
    
function showElementById(elementId)
{
	showElement(document.getElementById(elementId));
}

function hideElement(element)
{
    if (element != null)
    {
        element.style.display = "none";
    }
}
    
function showElement(element)
{
	if (element != null)
    {
        element.style.display = "block";
    }
}