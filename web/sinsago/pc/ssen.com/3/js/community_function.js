var isIE = (navigator.appName.indexOf("Microsoft") != -1) ? 1 : 0;
var isIE6 = (navigator.appVersion.indexOf("MSIE 6") != -1) ? 1 : 0;
var isIE7 = (navigator.appVersion.indexOf("MSIE 7") != -1) ? 1 : 0;
var isIE8 = (navigator.appVersion.indexOf("MSIE 8") != -1) ? 1 : 0;

var area_cnt = 0;
el = parent.parent.document.getElementById("comments");

function chkFirst(obj)
{
	if(area_cnt == 0)
	{
		obj.value = "";
		area_cnt++;
	}
}

function chkTxt(obj,mgr_idx,bulletin_idx)
{
	if(obj.value.length < 5 || obj.value.length > 300)
	{
		alert("최소 5자에서 300자 내외로 작성해주세요");
		return false;
	}
	if(obj.value == "최소 5자에서 300자 내외로 작성해주세요")
		return false;
	
	document.getElementById("recommendFrame1").src = "/comm/recommend_proc.aspx?mgr_idx=" + mgr_idx + "&bulletin_idx=" + bulletin_idx + "&content=" + escape(obj.value) + "&type=write";
}

function deleteComment(comment_idx)
{
	if(confirm("삭제하시겠습니까?"))
		document.getElementById("recommendFrame1").src = "/comm/recommend_proc.aspx?ch={{ch}}&type=delete&comment_idx=" + comment_idx;
}

function click_reply_best(id) 
{
	var tr_comment_idx = document.getElementById(id + "_best_comment");
	var replyname = document.getElementById("best_replyname_" + id);

	tr_comment_idx.style.display = tr_comment_idx.style.display == "" ? "none" : "";
	replyname.innerHTML = tr_comment_idx.style.display == "" ?  "답글취소": "답글";

	if(tr_comment_idx.style.display == "")
	{
		el.height = Number(el.height) + 30;
		$('#best_row_'+id).addClass("reply");
	}
	else if(tr_comment_idx.style.display == "none")
	{
		el.height = Number(el.height) - 30;
		$('#best_row_'+id).removeClass("reply");
	}
}

function click_reply(id) 
{
	var tr_comment_idx = document.getElementById(id + "_comment");
	var replyname = document.getElementById("replyname_" + id);

	tr_comment_idx.style.display = tr_comment_idx.style.display == "" ? "none" : "";
	replyname.innerHTML = tr_comment_idx.style.display == "" ?  "답글취소": "답글";

	if(tr_comment_idx.style.display == "")
	{
		el.height = Number(el.height) + 30;
		$('#row_'+id).addClass("reply");		
	}
	else if(tr_comment_idx.style.display == "none")
	{
		el.height = Number(el.height) - 30;
		$('#row_'+id).removeClass("reply");
	}
}

function reply_insert_best(mgr_idx, comment_idx, bulletin_idx)
{
	var input_comment_id = null;

	input_comment_id = document.getElementById("input_best_" + comment_idx);
     
    if (input_comment_id.value != '') 
    {
		document.getElementById("recommendFrame1").src = "/comm/recommend_proc.aspx?mgr_idx=" + mgr_idx + "&comment_idx=" + comment_idx + "&bulletin_idx=" + bulletin_idx + "&content=" + escape(input_comment_id.value) + "&type=insert";
    }
    else 
    {
		alert("내용을 입력하세요");
    }
}

function reply_insert(mgr_idx, comment_idx, bulletin_idx)
{
	var input_comment_id = null;

	input_comment_id = document.getElementById("input_" + comment_idx);
     
    if (input_comment_id.value != '') 
    {
		document.getElementById("recommendFrame1").src = "/comm/recommend_proc.aspx?mgr_idx=" + mgr_idx + "&comment_idx=" + comment_idx + "&bulletin_idx=" + bulletin_idx + "&content=" + escape(input_comment_id.value) + "&type=insert";
    }
    else 
    {
		alert("내용을 입력하세요");
    }
}
function recommend_set(ch,mgr_idx,seq, qid, cid)
{
	if(seq == "1")
		document.getElementById("recommendFrame1").src = "/comm/recommend_proc.aspx?ch=" + ch + "&type=recommend&type2=user&mgr_idx=" + mgr_idx + "&bulletin_idx=" + qid + "&comment_idx=" + cid;
	else
		OpenWindow('/comm/declaration_popup.aspx?ch=' + ch + '&mgr_idx=' + mgr_idx + '&bulletin_idx=' + qid + '&comment_idx=' + cid, '__DECLARATION__', '340px','240px',(window.screen.width/2 - 340/2),(window.screen.height/2 - 240/2 - 50));
}