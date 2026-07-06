/*
  Icon-Set fuer das IT-Lernprogramm.
  Reine Vektor-Icons (kein externes Bildmaterial, funktioniert offline).
*/

var ICON_PATHS = {
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/><line x1="9" y1="2" x2="9" y2="6"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="9" y1="18" x2="9" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="15" y1="18" x2="15" y2="22"/><line x1="2" y1="9" x2="6" y2="9"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="2" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="18" y1="15" x2="22" y2="15"/>',
  os: '<rect x="3" y="4" width="14" height="10" rx="1"/><rect x="7" y="10" width="14" height="10" rx="1"/><line x1="3" y1="7" x2="17" y2="7"/><line x1="7" y1="13" x2="21" y2="13"/>',
  terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="6,9 10,12 6,15"/><line x1="12" y1="15" x2="17" y2="15"/>',
  paths: '<path d="M2 5a1 1 0 0 1 1-1h3l1.5 1.5H9a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/><line x1="6" y1="10.5" x2="6" y2="14"/><line x1="6" y1="14" x2="16" y2="14"/><path d="M13 13a1 1 0 0 1 1-1h3l1.5 1.5H21a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1z"/>',
  message: '<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="12" x2="13" y2="12"/>',
  boss: '<line x1="14.5" y1="3" x2="4" y2="13.5"/><line x1="4" y1="13.5" x2="6.5" y2="16"/><line x1="6.5" y1="16" x2="17" y2="5.5"/><line x1="17" y1="5.5" x2="21" y2="3"/><line x1="14.5" y1="3" x2="17" y2="5.5"/><line x1="3" y1="19" x2="7" y2="15"/>',
  flag: '<line x1="5" y1="3" x2="5" y2="21"/><path d="M5 4h13l-3 4 3 4H5z"/>',
  check: '<polyline points="4,12 9,17 20,6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  star: '<path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>'
};

var TOPIC_COLORS = {
  flag: "#c58b4a",
  cpu: "#e0a458",
  os: "#5b9bd5",
  terminal: "#4ac57a",
  paths: "#a67fd6",
  message: "#3fbfae",
  boss: "#e07070"
};

function svgIcon(name, size, color) {
  var inner = ICON_PATHS[name] || "";
  var fill = name === "star" ? color : "none";
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + fill + '" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>";
}
