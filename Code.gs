const SHEET_ID = "1wNjzNfu2nb1M4m_W7ob-Wk-B2_l0j-BNF3pC0v0iTAo";
const PIN_CODE = "1234";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("عينات حسو")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* AUTH */
function auth(pin){
  return pin === PIN_CODE;
}

/* ALBUMS */
function getAlbums(){
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName("الألبومات");
  const data = sh.getDataRange().getValues();

  return data.slice(1).map(r => ({
    id: r[0],
    title: r[1],
    cover: r[2]
  }));
}

/* ITEMS */
function getItems(albumId){
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName("المحتوى");
  const data = sh.getDataRange().getValues();

  return data.slice(1)
    .filter(r => r[0] == albumId)
    .map(r => ({
      title: r[1],
      url: r[2],
      type: r[3]
    }));
}
