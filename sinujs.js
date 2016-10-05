// -------------------------------------------------------------------------------- //
// ------------          Sinu Framework for Web Development ----------------------- //
// ------------					         for                   -------------------- //
// ------------     CSS, SinglePage Apps and Client Side Oriented ----------------- //
// -------------------------------------------------------------------------------- //

/* 
  
*/


/*

*/
function uiNews(Name,Place,JSONArray)
{
	var HTMLTag = '';
	var News = JSONArray;
	for(var i = 0; i < News.length; i++)
	{
		HTMLTag += '<li class="ui News Cover" id="'+i+'">'+News[i].Name+'</li>';
	}
	document.getElementById(Place).innerHTML = HTMLTag;
}
	



/* -----------------------------------------------------------------------------------------------
	function : getDatabase() [AJAX]
		- Función que asincroniza la petición del JSON asociado al servicio getDatabaseByHost
		  retornando información de las tablas,listas,info del server, etc. Es un servicio pesado. 
		  Solo utilizar cuando sea necesario. 
   -----------------------------------------------------------------------------------------------
*/
function getDatabaseList()
{
var rName = ["getDatabaseInfo"]; // function Name
var rPlace = ["uiMain"]; // HTML id tag name
var rUIHandle = ["ui.Main"]; // ui css+js method for front end handling
var rMethod = "GET"; // HTTP method
var rFolder = "/rtl/Admin/"; // Server service folder
var rService = "getDatabaseByHost"; // Service name
var rData = [{Tag:"",Value:""}];
var HTTPRequest = {Name:rName,Place:rPlace,UIHandle:rUIHandle,Method:rMethod,Folder:rFolder,Service:rService,Data:rData};
getServiceHTTP(HTTPRequest);
}

/* -----------------------------------------------------------------------------------------------
	function : getNews() [AJAX]
		- Función que asincroniza la petición del JSON asociado al servicio getNews
		  retornando la información de la base de datos asociada con las noticias que mostar. 
		  Para definir la forma y el lugar donde se mostrara esta información, especificar en los
		  parametros rPlace y rUIHandle. 
   -----------------------------------------------------------------------------------------------
*/
function getNews(ColumnName,Value)
{
var rName = ["getNews"];
var rPlace = ["MainPanel-News-Cover"];
var rUIHandle = ["ui.News"];
var rMethod = "GET";
var rFolder = "rtl/Index/";
var rService = "getNews";
var rData = [{Tag:ColumnName,Value:Value}];
var HTTPRequest = {Name:rName,Place:rPlace,UIHandle:rUIHandle,Method:rMethod,Folder:rFolder,Service:rService,Data:rData};
getServiceHTTP(HTTPRequest);	
}

// --- getServiceHTTP   --- //
function getServiceHTTP(HTTPRequest)
{
var xmlhttp = newXMLHTTP();  //Create AJAX connection
//Create Request Objetct.
	var RequestName = HTTPRequest.Name;
	var RequestPlace = HTTPRequest.Place;
	var RequestUIHandle = HTTPRequest.UIHandle;
	var RequestMetod = HTTPRequest.Method;
	var RequestFolder = HTTPRequest.Folder;
	var RequestService = HTTPRequest.Service;
	var RequestData = HTTPRequest.Data;
var HTTPQuery = RequestFolder + RequestService+".php?";//Init HTTP Query for PHP Services
//Create HTTP Query String
var i = 0;
for(i=0;i<RequestData.length;i++)
{
	HTTPQuery += RequestData[i].Tag + "=" + RequestData[i].Value + "&";
}
// Set Action when AJAX get a server response
xmlhttp.onreadystatechange = function()
{
if (xmlhttp.readyState===4 && xmlhttp.status===200)
{
	var JSONArray = JSON.parse(xmlhttp.responseText);
	toWalkJSON(RequestName,RequestPlace,RequestUIHandle,JSONArray);
}
}
xmlhttp.open(RequestMetod,HTTPQuery,true);//Open an Ajax connection
xmlhttp.send();//Send Ajax Connection
}
// ----------------------------------------------------------------------------- //

// -----------------   newXMLHTTP   ------------------------------------ //
function newXMLHTTP()
{
  if (window.XMLHttpRequest) 
  {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } 
  else 
  {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlhttp;
}
// ----------------------------------------------------------------------------- //

function toWalkJSON(RequestName,RequestPlace,RequestUIHandle,JSONArray)
{
	//For Loop for each UIHandle element
	var i = 0;
	for(i = 0; i < RequestUIHandle.length; i++) 
 {
 
   iUIHandle = RequestUIHandle[i];
   iPlace = RequestPlace[i];
   iName = RequestName[i];
			switch (iUIHandle) 
			{
				case 'ui.Main':
						    uigetMain(iName,iPlace,JSONArray);
						    break;
				case 'ui.Message':
						    break;
			 case 'ui.News':
						    uiNews(iName,iPlace,JSONArray);
						    break;
			}
  }
}