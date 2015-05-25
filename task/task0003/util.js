/**
 * Created by Ooop on 2015/5/6.
 */
//����2
// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
function isArray(arr){
    return arr instanceof(Array);
}
// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
    return typeof fn == 'function';
}
// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
function cloneObject(src) {
    var ret = src,i;
    if(isArray(src)){
        ret=[];
        for(i= 0,length = src.length;i<length;i++){
            if(typeof src[i] === 'object'){
                ret[i]= cloneObject(src[i]);
            }
            else{
                ret[i]=src[i];
            }
        }
        return ret;
    }
    if(src instanceof Object){
        ret = {};
        ret.prototype = src.prototype;
        for(i in src) {
            if(typeof src[i] === 'object'){
                ret[i]= cloneObject(src[i]);
            }
            else{
                ret[i]=src[i];
            }
        }
        return ret;
    }

    return ret;
}

// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
function uniqArray(arr) {
    if(isArray(arr)){
        var res = [], hash = {};
        for(var i=0, elem; (elem = arr[i]) != null; i++)  {
            if (!hash[elem])
            {
                res.push(elem);
                hash[elem] = true;
            }
        }
        return res;
    }
    else{
        throw new TypeError();
    }
}
// ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
// ����ʱ��Ҫ�򵥵���һ��������ʽ��ʵ��
function trim(str) {
    var i;
    for (i = 0; i < str.length; i++) {
        if(str.charAt(i)!=' '&&str.charAt(i)!='    '){
            break;
        }
    }
    str=str.substring(i,str.length);

    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=' '&&str.charAt(i)!=' ')break;
    }
    str=str.substring(0,i+1);
    return str;
}
// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
function each(arr, fn) {
    if(arr.length===+arr.length){
        for (var i = 0; i < arr.length; i++) {
            fn.call(this,arr[i],i);
        }
    }
    else{
        throw new TypeError()
    }
}
// ��ȡһ�����������һ��Ԫ�ص�����������һ������
function getObjectLength(obj) {
    var count = 0,key;
    for(key in obj){
        count++;
    }
    return count;
}
// �ж��Ƿ�Ϊ�����ַ
function isEmail(emailStr) {
    return emailStr.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
}

// �ж��Ƿ�Ϊ�ֻ���
function isMobilePhone(phone) {
    return phone.match(/^1[3458]\d{9}$/);
}
// cancel propagation
function cancelPropagation (event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else {
        event.cancelBubble = true;
    }
}
// cancel event
function cancelEvent (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

function getTarget(event){
    if(event.target){
        return event.target;
    }
    else{
        return event.srcElement;
    }
}


//����3
function hasClass(element,className){
    if(!element){
        return;
    }
    var elementClass = element.className;
    if(!elementClass){
        return false;
    }
    var classList = elementClass.split(/\s+/),
        key = 0;
    for(key in classList) {
        if(classList[key] == className) {
            return true;
        }
    }
    return false;
}

// Ϊdom����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    if(!element){
        return;
    }
    if(element.classList){
        element.classList.add(newClassName);
    }
    else{
        if(!hasClass(element,newClassName)){
            element.className = element.className + " " + newClassName;
        }
    }
}

// �Ƴ�dom�е���ʽoldClassName
function removeClass(element, oldClassName) {
    if(!element){
        return;
    }
    if(element.classList){
        element.classList.remove(oldClassName);
    }
    else{
        if (hasClass(element, oldClassName)) {
            var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
    }
}

// �ж�siblingNode��dom�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(element, siblingNode) {
    var nodeList = element.parentNode.childNodes;
    for (var i = 0; i < nodeList.length; i++) {
        if(nodeList[i] == siblingNode){
            return true;
        }
    }
    return false;
}

// ��ȡdom�������������ڵ�λ�ã�����һ������{x, y}
function getPosition(element) {
    var top = document.documentElement.clientTop;//ie��Bug
    var left= document.documentElement.clientLeft;
    return{
        x:element.getBoundingClientRect().left-left,
        y:element.getBoundingClientRect().top-top
    }
}

//����4
// ��һ��dom��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
function addEvent(element, event, listener) {
    if(document.addEventListener){
        element.addEventListener(event,listener,false)
    }
    else{
        element.attachEvent("on"+event, listener);
    }
}

// �Ƴ�dom�������event�¼�����ʱִ��listener����Ӧ����listenerΪ��ʱ���Ƴ�������Ӧ����
function removeEvent(element, event, listener) {
    console.log(listener)

    if(listener){
        if(document.removeEventListener){
            element.removeEventListener(event,listener,false)
        }
        else{
            element.detachEvent("on"+event, listener);
        }
    }
    else{
        //��������Ԫ�صļ���Ҳû��
        var newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement,element);
    }

}

var $ = function (selector) {
    selector = trim(selector);
    var arr = [];
    var ret;//��󷵻ص�����
    var temp;//����ϼ�ѡ������ѡ��������
    arr = selector.split(/\s+/);
    var _retList = [];//������

    var _findClass = function (dom,className) {
        if(hasClass(dom,className)){
            _retList.push(dom)
        }
        if(dom.childNodes){
            each(dom.childNodes, function (child,index) {
                _findClass(child,className);
            })
        }
    };

    var _findAttr = function (dom,attr,value) {
        if(value){
            if(dom&&dom.getAttribute){
                if(dom.getAttribute(attr)==value){
                    _retList.push(dom);
                }
            }
        }
        else{
            if(dom&&dom.hasAttribute){
                if(dom.hasAttribute(attr)){
                    _retList.push(dom);
                }
            }
        }
        if(dom.childNodes){
            each(dom.childNodes, function (child,index) {
                _findAttr(child,attr,value);
            })
        }

        return _retList;
    };

    var _$ = function(item,index){
        var checkId = item.match(/#(\S+)/);
        var checkClass= item.match(/\.(\S+)/);
        var checkAttr= item.match(/\[(\S+)\]/);
        var body = document.body;
        //����idѡ����
        if(checkId){
            temp = document.getElementById(checkId[1]);
        }
        //������ѡ����
        if(checkClass){
            if(temp){
                if(isArray(temp)){
                    each(temp, function (value,index) {
                        _findClass(value,checkClass[1]);
                    });
                    temp = _retList;
                    _retList = [];
                }
                else{
                    _findClass(temp,checkClass[1]);
                    temp = _retList;
                    _retList = [];
                }
            }
            else{
                _findClass(body,checkClass[1]);
                temp = _retList;
                _retList = [];
            }
        }
        //������Ϥѡ����
        if(checkAttr){
            var hasValue = checkAttr[1].match(/(.+)=(.+)/);
            var attr;
            var value;
            if(hasValue){
                attr = hasValue[1];
                value = hasValue[2];
            }
            else{
                attr = checkAttr[1];
                value =null;
            }
            if(temp){
                if(isArray(temp)){
                    each(temp, function (item,index) {
                        _findAttr(item,attr,value);
                    });
                    temp = _retList;
                    _retList = [];
                }
                else{
                    _findAttr(temp,attr,value);
                    temp = _retList;
                    _retList = [];
                }
            }
            else{
                _findAttr(body,attr,value);
                temp = _retList;
                _retList = [];
            }
        }
        //�����ǩѡ����
        if(!checkAttr&&!checkClass&&!checkId){
            if(temp){
                if(isArray(temp)){
                    each(temp, function (value, index) {
                        var tags = value.getElementsByTagName(item);
                        _retList.concat(tags);
                    })
                }
                else{
                    _retList = temp.getElementsByTagName(item);
                }
            }
            else{
                _retList = document.getElementsByTagName(item);
            }
            temp = _retList;
            _retList = [];
        }

        if(index==arr.length-1){
            ret = temp;
        }
    };

    each(arr,_$);
    if(ret&&ret.length==1||ret&&ret.length==0){
        return ret[0];
    }
    return ret;

};


$.on = function (selector, event, listener) {
    var nodeList = $(selector);
    if (document.addEventListener) {
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.addEventListener(event, listener, false);
            });
        }
        else{
            $(selector).addEventListener(event, listener, false);
        }
    }
    else {
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.attachEvent("on"+event, listener);
            })
        }
        else{
            $(selector).attachEvent("on"+event, listener);
        }
    }
};

$.un = function (selector, event, listener) {
    var nodeList = $(selector);
    if(document.removeEventListener){
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.removeEventListener(event, listener, false);
            });
        }
        else{
            nodeList.removeEventListener(event, listener, false);
        }
    }
    else{
        if(nodeList.length){
            each(nodeList, function (item,index) {
                item.detachEvent("on"+event, listener);
            })
        }
        else{
            nodeList.detachEvent("on"+event, listener);
        }
    }
};

$.click = function (selector, listener) {
    $.on(selector,'click',listener);
};

$.enter = function(element, listener) {
    if (document.addEventListener) {
        element.addEventListener('keydown', function (e) {
            // ����FF��IE��Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                listener();
            }
        }, false)
    }
    else {
        element.attachEvent("keydown", function (e) {
            // ����FF��IE��Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                listener();
            }
        });
    }
};

$.delegate = function(selector, tag, eventName, listener){
    $.on(selector,eventName, function (e) {
        var theEvent = e || window.event;
        var target = getTarget(theEvent);
        if(target.nodeName.toLowerCase() == tag){
            listener(theEvent)
        }
    });
};


//����5
// �ж��Ƿ�ΪIE�����������-1���߰汾��
function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return true;
    }
    else{
        return false;
    }
}

// ����cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exp = new Date();
    exp.setTime(exp.getTime() + expiredays*24*60*60*1000);
    document.cookie = cookieName + "="+ escape (cookieValue) + ";expires=" + exp.toGMTString();
}
// ��ȡcookieֵ
function getCookie(cookieName) {
    if (document.cookie.length>0)
    {
        var c_start=document.cookie.indexOf(cookieName + "="),c_end;
        if (c_start!=-1)
        {
            c_start=c_start + cookieName.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

//����6
//
function ajax(url, options) {
    var xmlhttp,
        key,
        type = options.type?options.type:"get",
        data = options.data?options.data:"",
        onsuccess = options.onsuccess,
        onfail = options.onfail?options.onfail:function(err){console.log(err)};
    if(data!=""){
        url = url + "?";
        for(key in data){
            url = url + key + "=" +data[key] +"&";
        }
    }
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open(type,url,true);
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4)
        {   var s = xmlhttp.status;
            if (s >= 200 && s < 300) {
                onsuccess(xmlhttp.responseText,xmlhttp);
            }
            else{
                onfail(xmlhttp.responseText,xmlhttp)
            }
        }

    };
    xmlhttp.send();
}

