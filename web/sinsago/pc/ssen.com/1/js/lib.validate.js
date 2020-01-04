/**
* ���ϸ�: lib.validate.js
* ��  ��: �� üũ, �� ǥ��ȭ
* �ۼ���: jstoy project
* ��  ¥: 2003-10-28
*   lainTT (2003-11-20) : FormChecker Class�� �Լ� prototypeȭ & ���������� Ŭ���� ������...-_-;
***********************************************
*/

/**
* <pre>
* �� üũ trigger �Լ�
* </pre>
*
* @param Form Object
* @return boolean
*/
function validate(form) {
	
    var result;
    var checker = new FormChecker(form);

    result = checker.go();
    checker.destroy();
    return result;
}

function validate_init() {
    for (var i=0; i<document.forms.length; i++) {
        var formObj = document.forms[i];
        if (document.forms[i].getAttribute('VALIDATE') != null) {
            // pre_validate�� ������� �ʴ´ٸ� �� �Ʒ����� �ּ�ó���մϴ�.
            new FormLoader(formObj);
            formObj.submitAction = formObj.onsubmit;
            formObj.onsubmit = function() {
                formObj.submitAction;
                return validate(this);
            }
        }
    }
}

FormChecker = function(form) {
    /**
    * <pre>
    * �̸� ���ǵ� ���� �޽�����
    * </pre>
    */
    /*
    this.FORM_ERROR_MSG = {
       //common   : "�Է��Ͻ� ������ ��Ģ�� ��߳��ϴ�.\n��Ģ�� ��߳��� ������ �ٷ�����ּ���.",
	   common	: "",
       required : "�ݵ�� �Է��ϼž� �մϴ�.",
       notequal : "���� ��ġ���� �ʽ��ϴ�.",
       invalid  : "�Է� ���Ŀ� ��߳��ϴ�.",
	   denied   : "���ε尡 ���ѵ� �����Դϴ�.",
       minbyte  : "���̰� {minbyte}Byte �̻��̾�� �մϴ�.",
       maxbyte  : "���̰� {maxbyte}Byte�� �ʰ��� �� �����ϴ�."
    }
    */
    this.FORM_ERROR_MSG = {
       //common   : "�Է��Ͻ� ������ ��Ģ�� ��߳��ϴ�.\n��Ģ�� ��߳��� ������ �ٷ�����ּ���.",
	   common	: "",
       required : "�Է��ϼ���.",
       notequal : "���� ��ġ���� �ʽ��ϴ�.",
       invalid  : "�߸� �Է��Ͽ����ϴ�.",
	   denied   : "���ε尡 ���ѵ� �����Դϴ�.",
       minbyte  : "{minbyte}�� �̻� �Է��ϼ���.",
       maxbyte  : "{maxbyte}�� �̳��� �Է��ϼ���."
    }
    this.FORM_ERROR_MSG_POSTPOSITION = {
       //common   : "�Է��Ͻ� ������ ��Ģ�� ��߳��ϴ�.\n��Ģ�� ��߳��� ������ �ٷ�����ּ���.",
	   common	: "",
       required : "��",
       notequal : "��",
       invalid  : "��",
	   denied   : "��",
       minbyte  : "��",
       maxbyte  : "��"
    }

    /**
    * <pre>
    * �� üũ �Լ� ����
    * </pre>
    */
    this.VALIDATE_FUNCTION = {
       email   : this.func_isValidEmail,
       phone   : this.func_isValidPhone,
       userid  : this.func_isValidUserid,
       hangul  : this.func_hasHangul,
       number  : this.func_isNumeric,
       engonly : this.func_alphaOnly,
       jumin   : this.func_isValidJumin,
       bizno   : this.func_isValidBizNo
    }

    /**
    * <pre>
    * ���� ��� �÷���
    * </pre>
    */
    this.ERROR_MODE_FLAG = {
       all         : 1,         // ��ü ������ ǥ��
       one         : 2,         // ó���� �ɸ� ���� �ϳ��� ǥ��
       one_per_obj : 3          // �� object�� ó���� ���� ǥ��
    }

    this.form      = form;
    this.isErr     = false;
    this.errMsg    = (this.FORM_ERROR_MSG["common"] != "") ? this.FORM_ERROR_MSG["common"] + "\n\n" : "";
    this.errObj    = "";
    this.curObj    = "";
    this.errMode   = this.ERROR_MODE_FLAG["one"];  // �����޽��� ��¸��
}

FormChecker.prototype.go = function() {
    for (var i = 0; i < this.form.elements.length; i++) {
        var el = this.form.elements[i];
        if (el.tagName.toLowerCase() == "fieldset" || el.tagName.toLowerCase() == "object")
            continue;

        if (el.getAttribute("HNAME") == null || el.getAttribute("HNAME") == "")
            el.setAttribute("HNAME", el.getAttribute("NAME"));

		var trim    = el.getAttribute("TRIM");
        var minbyte = el.getAttribute("MINBYTE");
        var maxbyte = el.getAttribute("MAXBYTE");
        var option  = el.getAttribute("OPTION");
        var match   = el.getAttribute("MATCH");
        var delim   = el.getAttribute("DELIM");
        var glue    = el.getAttribute("GLUE");
        var pattern = el.getAttribute("PATTERN");
		var allow = el.getAttribute("ALLOW");
		var deny = el.getAttribute("DENY");
		var func = el.getAttribute("FUNC");

        if (el.type == "text") {
            switch (trim) {
                case "ltrim": el.value = el.value.ltrim(); break;
                case "rtrim": el.value = el.value.rtrim(); break;
                case "notrim": break;
                default:      el.value = el.value.trim();  break;
            }
        }
        if (el.getAttribute("REQUIRED") != null && el.getAttribute("REQUIRED") != "") {
            switch (el.type) {
                case "file": case "text": case "textarea": case "password": case "hidden":
                    if (el.value == null || el.value == "") this.addError(el,"required");
                    break;
                case "select-one":
                    if (el.options.length == 0 || el[el.selectedIndex].value == null || el[el.selectedIndex].value == "") this.addError(el,"required");
                    break;
                case "radio":
                case "checkbox":
                   // var elCheck = this.form.elements[el.name];
                    var elCheck = document.getElementsByName(el.name);
                    for (var j = 0, isChecked = false; j < elCheck.length; j++) {
                        if (elCheck[j].checked == true) isChecked = true;
                    }
                    if (isChecked == false) this.addError(el,"required");
                    break;

                //case "checkbox":
                 //   if (el.checked == false) this.addError(el,"required");
                 //   break;
            }
        }
        if (el.type == "text" || el.type == "password") {
            if (match && (el.value != this.form.elements[match].value)) {
                this.addError(el,"notequal");
            }
            if (el.value && option != null) {
                if (glue != null) {
                    var _value = new Array(el.value);
					var glue_arr = glue.split(",");
                    for (var j = 0; j < glue_arr.length; j++) {
                        _value[j+1] = this.form.elements[glue_arr[j]].value;

                    }
                    var value = _value.join(delim == null ? "" : delim);
                    var tmp_msg = this.VALIDATE_FUNCTION[option](el, value);
                    if (tmp_msg != true) this.addError(el,tmp_msg);
                } else {
                    var tmp_msg = this.VALIDATE_FUNCTION[option](el);
                    if (tmp_msg != true) this.addError(el,tmp_msg);
                }
            }
            if (el.value && minbyte != null) {
                if (el.value.bytes() < parseInt(minbyte)) this.addError(el,"minbyte");
            }
            if (el.value && maxbyte != null) {
                if (el.value.bytes() > parseInt(maxbyte)) this.addError(el,"maxbyte");
            }
            if (pattern != null) {
                pattern = new RegExp(pattern);
                if (!pattern.test(el.value)) this.addError(el,'invalid');
            }
        }
        if (el.type == "file") {
            if (el.value && allow != null && allow != "") {
                pattern = new RegExp("(" + allow.replace(",", "|").toLowerCase() + ")$");
                if (!pattern.test(el.value.toLowerCase())) this.addError(el,'denied');
			}
            if (el.value && deny != null && deny != "") {
                pattern = new RegExp("(" + deny.replace(",", "|").toLowerCase() + ")$");
                if (pattern.test(el.value.toLowerCase())) this.addError(el,'denied');
			}
		}

		if(func) {
			if(this.isErr) continue;
			var result = eval(func + "()");
			if(result + "" == "undefined") {
				this.addError(el, "����:[FUNC]�Ӽ� ���� �ݵ�� �����(true/false)�� �����ؾ� �մϴ�.");
			}
			if(result === false) {
				this.addError(el, "invalid");
			} else if(result !== true && result != "") {
				//this.errMsg = result;
				el.setAttribute("func_errmsg", result);
				this.addError(el, result);
			}
		}
    }
    return !this.isErr;
}

FormChecker.prototype.destroy = function() {
    if (this.isErr == true) {
        alert(this.errMsg);
        if (this.errObj.getAttribute("delete") != null)
            this.errObj.value = "";
        if (this.errObj.getAttribute("select") != null)
            this.errObj.select();
        if (this.errObj.getAttribute("nofocus") == null && this.errObj.type != "hidden")
            this.errObj.focus();
    }
    this.errMsg = "";
    this.errObj = "";
}

FormChecker.prototype.addError = function(el, type) {
    var pattern = /\{([a-zA-Z0-9_]+)\}/i;
    var msg = (this.FORM_ERROR_MSG[type]) ? this.FORM_ERROR_MSG[type] : type;
    var pp = this.FORM_ERROR_MSG_POSTPOSITION[type] ? this.FORM_ERROR_MSG_POSTPOSITION[type] : "��";

	if(type == "required") {
		if(el.type == "checkbox" || el.type == "radio" || el.type == "file" || el.type == "select-one") {
			msg = "������ �ּ���.";
		}
	}

	if (el.getAttribute("errmsg") != null) msg = el.getAttribute("errmsg");
    
    if (pattern.test(msg) == true) {
        while (pattern.exec(msg)) msg = msg.replace(pattern, el.getAttribute(RegExp.$1));
    }

    if (!this.errObj || this.errMode != this.ERROR_MODE_FLAG["one"]) {
        if (this.curObj == el.name && el.getAttribute("errmsg") == null) {
            if (this.errMode == this.ERROR_MODE_FLAG["all"]) {
                this.errMsg += "   - "+ msg +"\n";
			}
        } else if (this.curObj != el.name) {
            if (this.curObj) {
                    this.errMsg += "\n";
			}

			if(el.getAttribute("func_errmsg") != null) {
				this.errMsg += type;
			} else {
				if (el.getAttribute("errmsg") != null) {
					this.errMsg += el.getAttribute("errmsg");
				} else {
				//	this.errMsg += "["+ el.getAttribute("hname") +"] �׸��� "+ msg +"\n";
					this.errMsg += postposition(el.getAttribute("hname"), pp) + " " + msg +"\n";
				}
			}
			//el.style.backgroundColor = "yellow";
        }
    }

	if (!this.errObj) this.errObj = el;
    this.curObj = el.name;
    this.isErr = true;
    return;
}

/// ���� �˻� �Լ��� ///
FormChecker.prototype.func_isValidEmail = function(el,value) {
   var value = value ? value : el.value;
   var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
   return (pattern.test(value)) ? true : "invalid";
}

FormChecker.prototype.func_isValidUserid = function(el) {
   var pattern = /^[a-zA-Z]{1}[a-zA-Z0-9_]{3,14}$/;
   return (pattern.test(el.value)) ? true : "4���̻� 15�� �̸�,\n ����,����, _ ���� ���ո� ����� �� �ֽ��ϴ�";
}

FormChecker.prototype.func_hasHangul = function(el) {
   var pattern = /[��-��]/;
  // return (pattern.test(el.value)) ? true : "�ݵ�� �ѱ��� �����ؾ� �մϴ�";
   return (pattern.test(el.value)) ? true : "�ѱ��� �����ؾ� �մϴ�";
}

FormChecker.prototype.func_alphaOnly = function(el) {
   var pattern = /^[a-zA-Z]+$/;
   return (pattern.test(el.value)) ? true : "invalid";
}

FormChecker.prototype.func_isNumeric = function(el) {
   var pattern = /^[0-9]+$/;
  // return (pattern.test(el.value)) ? true : "�ݵ�� ���ڷθ� �Է��ؾ� �մϴ�";
   return (pattern.test(el.value)) ? true : "���ڷθ� �Է��ؾ� �մϴ�";
}

FormChecker.prototype.func_isValidJumin = function(el,value) {
    var pattern = /^([0-9]{6})-?([0-9]{7})$/;
    var num = value ? value : el.value;
    if (!pattern.test(num)) return "invalid";
    num = RegExp.$1 + RegExp.$2;

    var sum = 0;
    var last = num.charCodeAt(12) - 0x30;
    var bases = "234567892345";
    for (var i=0; i<12; i++) {
        if (isNaN(num.substring(i,i+1))) return "invalid";
        sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
    }
    var mod = sum % 11;
    return ((11 - mod) % 10 == last) ? true : "invalid";
}

FormChecker.prototype.func_isValidBizNo = function(el,value) {
    var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
    var num = value ? value : el.value;
    if (!pattern.test(num)) return "invalid";
    num = RegExp.$1 + RegExp.$2 + RegExp.$3;
    var cVal = 0;
    for (var i=0; i<8; i++) {
        var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7);
        cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10;
    }
    var li_temp = parseFloat(num.substring(i,i+1)) * 5 + "0";
    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
    return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10) ? true : "invalid";
}

FormChecker.prototype.func_isValidPhone = function(el,value) {
    var pattern = /^([0]{1}[0-9]{1,2})-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
    var num = value ? value : el.value;
    if (pattern.exec(num)) {
        if(RegExp.$1 == "010" || RegExp.$1 == "011" || RegExp.$1 == "016" || RegExp.$1 == "017" || RegExp.$1 == "018" || RegExp.$1 == "019") {
            if(!el.getAttribute("span"))
                el.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
        }
        return true;
    } else {
        return "invalid";
    }
}

/**
* common prototype functions
*/
String.prototype.trim = function(str) {
    str = this != window ? this : str;
    return str.ltrim().rtrim();
}

String.prototype.ltrim = function(str) {
    str = this != window ? this : str;
    return str.replace(/^\s+/g,"");
}

String.prototype.rtrim = function(str) {
    str = this != window ? this : str;
    return str.replace(/\s+$/g,"");
}

String.prototype.bytes = function(str) {
    var len = 0;
    str = this != window ? this : str;
    for (j=0; j<str.length; j++) {
        var chr = str.charAt(j);
        len += (chr.charCodeAt() > 128) ? 2 : 1;
    }
    return len;
}

String.prototype.bytesCut = function(bytes) {
    var str = this;
    var len = 0;
    for (j=0; j<str.length; j++) {
        var chr = str.charAt(j);
        len += (chr.charCodeAt() > 128) ? 2 : 1;
        if (len > bytes) {
            str = str.substring(0, j);
            break;
        }
    }
    return str;
}

function autoNext(el, limit, next_el) {
	if(el.value.bytes() == 6) next_el.focus();
}

//��ó:����� ��α�
function postposition(txt, josa)
{
	if(!txt) return "";
    var code = txt.charCodeAt(txt.length-1) - 44032;
    if (txt.length == 0) return '';
    if (code < 0 || code > 11171) return txt;
    if (code % 28 == 0) return txt + postposition.get(josa, false);
    else return txt + postposition.get(josa, true);
}
postposition.get = function (josa, jong) {
    // jong : true�� ��ħ����, false�� ��ħ����

    if (josa == '��' || josa == '��') return (jong?'��':'��');
    if (josa == '��' || josa == '��') return (jong?'��':'��');
    if (josa == '��' || josa == '��') return (jong?'��':'��');
    if (josa == '��' || josa == '��') return (jong?'��':'��');
    // �� �� ���� ����
    return '**';
}

