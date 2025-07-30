// cleans string to prevent code injection
export const sanitize = (string: string) => {
  // from here: https://stackoverflow.com/a/12034334
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };
  return String(string).replace(/[&<>"'`=/]/g, function (s) {
    return entityMap[s as keyof typeof entityMap];
  });
};

// takes in list of emails, returns mailto link
export const generateMailto = (text: string, clubName: string) => {
  const emails = text.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  );
  return "mailto:" + emails + "?subject=" + clubName;
};

export const parseLocation = (location: string | number) => {
  return !Number.isNaN(location) ? "Room " + location : location;
};


export const getUniqueValues = (allData, property) => {
  return [...new Set(allData.map((doc) => doc[property]))].map((value) =>
    value === '' ? 'No Time Specified' : value,
  );
}