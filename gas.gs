var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
var values = spreadsheet.getRange('A1:A10').getValues();
var ll = new LinkedList();

for (var i = 0; i < values.length; i++) {
  // Insert row data
  ll.add(values[i]);
}