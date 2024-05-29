function getOAuthService() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var clientId = scriptProperties.getProperty('CLIENT_ID');
  var clientSecret = scriptProperties.getProperty('CLIENT_SECRET');
  
  return OAuth2.createService('Hunter')
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
      .setTokenUrl('https://oauth2.googleapis.com/token')
      .setClientId(clientId)
      .setClientSecret(clientSecret)
      .setCallbackFunction('authCallback')
      .setPropertyStore(PropertiesService.getUserProperties())
      .setScope('https://www.googleapis.com/auth/script.external_request')
      .setParam('access_type', 'offline')
      .setParam('approval_prompt', 'force');
}

function authCallback(request) {
  var oauthService = getOAuthService();
  var authorized = oauthService.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab.');
  }
}

function showSidebar() {
  var oauthService = getOAuthService();
  if (!oauthService.hasAccess()) {
    var authorizationUrl = oauthService.getAuthorizationUrl();
    var htmlOutput = HtmlService.createHtmlOutput('<a href="' + authorizationUrl + '" target="_blank">Authorize</a>');
    SpreadsheetApp.getUi().showSidebar(htmlOutput);
  } else {
    SpreadsheetApp.getUi().alert('Already authorized.');
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput("<h1>Welcome to Hunter.io Email Finder</h1>");
}

function findEmail(firstName, lastName, company) {
  var apiKey = PropertiesService.getUserProperties().getProperty('HUNTER_API_KEY');
  if (!apiKey) {
    Logger.log('API key not found');
    return 'API key not found';
  }

  if (!firstName || !lastName || !company) {
    Logger.log('Invalid input parameters: firstName=' + firstName + ', lastName=' + lastName + ', company=' + company);
    return 'Invalid input parameters';
  }

  var url = `https://api.hunter.io/v2/email-finder?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&company=${encodeURIComponent(company)}&api_key=${apiKey}`;

  Logger.log('Constructed URL: ' + url); // Log the constructed URL

  try {
    var response = UrlFetchApp.fetch(url);
    var result = JSON.parse(response.getContentText());

    Logger.log('API Response: ' + JSON.stringify(result)); // Log the full response for debugging

    if (result.data && result.data.email) {
      return result.data.email;
    } else if (result.errors) {
      Logger.log('API Error: ' + JSON.stringify(result.errors));
      return 'Error: ' + result.errors[0].details;
    } else {
      Logger.log('No email found');
      return 'No email found';
    }
  } catch (e) {
    Logger.log('Fetch Error: ' + e.message);
    return 'Fetch Error: ' + e.message;
  }
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Hunter.io')
    .addItem('Authorize Hunter.io', 'showSidebar')
    .addItem('Enter API Key', 'showApiKeyPrompt')
    .addItem('Find Emails', 'findEmailsInSheet')
    .addToUi();
}

function findEmailsInSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) { // Start from 1 to skip header row
    var email = findEmail(data[i][0], data[i][1], data[i][2]);
    sheet.getRange(i + 1, 4).setValue(email); // Assumes emails go in column D (4th column)
  }
}

function showApiKeyPrompt() {
  var html = HtmlService.createHtmlOutputFromFile('ApiKeyPrompt')
      .setWidth(300)
      .setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(html, 'Enter Hunter.io API Key');
}

function saveApiKey(apiKey) {
  PropertiesService.getUserProperties().setProperty('HUNTER_API_KEY', apiKey);
}