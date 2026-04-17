const SHEET_ID = '15J40EiM0OD6WZ1y6G0VHuy1jwdoPcGWYoWtQp2Y5HuQ';
const HEADERS = ['Date Added', 'Company', 'Name', 'Title', 'Phone', 'Email'];

// Accepts GET requests with query params to avoid Google's POST redirect issue.
// Example: ?company=Acme&name=Jane+Doe&title=CEO&phone=%2B1234&email=jane@acme.com
function doGet(e) {
  // Health-check when called with no params
  if (!e.parameter || !e.parameter.name) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'BC Extractor endpoint is live' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];

    // Add header row on first use
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

    sheet.appendRow([
      today,
      e.parameter.company || '',
      e.parameter.name    || '',
      e.parameter.title   || '',
      e.parameter.phone   || '',
      e.parameter.email   || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Contact added' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
