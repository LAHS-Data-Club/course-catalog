// cleans string to prevent code injection
export const sanitize = (string) => {
    // from here: https://stackoverflow.com/a/12034334
    let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
};

// takes in list of emails, returns mailto link
export const generateMailto = (text, clubName) => {
    const emails = text.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
    );
    return 'mailto:' + emails + '?subject=' + clubName;
};

export const parseLocation = (location) => {
    if (!isNaN(location)) {
        return 'Room ' + location;
    }
    return location;
};
