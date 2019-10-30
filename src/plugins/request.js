const xml2js = require('xml2js');
const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = async function request(url, data = {}) {
    if (typeof url === 'object') {
        data = { ...url };
        url = data.url;
        delete data.url;
    }

    data.headers = data.headers || {};
    data.method = data.method || data.form ? 'POST' : 'GET';

    if (data.form) {
        data.body = new URLSearchParams(data.form).toString();
        Object.assign(data.headers, {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    }

    if (data.formData) {
        const form = new FormData();
        for (const key in data.formData) {
            form.append(key, data.formData[key]);
        }
        data.body = form;
        Object.assign(data.headers, form.getHeaders());
    }

    const res = await fetch(url, data);

    if (data.json) {
        return res.json();
    }

    if (data.xml) {
        return res.text().then(xml2js);
    }

    return res.text();
};
