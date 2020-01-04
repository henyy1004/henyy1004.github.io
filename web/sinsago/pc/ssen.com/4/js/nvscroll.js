function NvScroll() {
this.version = "0.2";
this.name = "NvScroll";
this.item = new Array();
this.itemcount = 0;
this.currentspeed = 0;
this.scrollspeed = 50;
this.pausedelay = 1000;
this.pausemouseover = false;
this.stop = false;
this.type = 1;
this.height = 100;
this.to_height = this.height;
this.width = 100;
this.to_width = this.width;
this.stopHeight=0;
this.i=0;
this.add = function () {
 var text = arguments[0];
 this.item[this.itemcount] = text;
 this.itemcount = this.itemcount + 1;
};
this.add2 = function () {
 var url = arguments[0];
 var title = arguments[1];
 this.item[this.itemcount] = "<a href=" + url + ">" + title + "</a>";
 this.itemcount = this.itemcount + 1;
};
this.start = function () {
 if ( this.itemcount == 1 ) {
  this.add(this.item[0]);
 }
 this.display();
 this.currentspeed = this.scrollspeed;
 if ( this.type == 1 || this.type == 2 ) {
  this.stop = true;
  setTimeout(this.name+'.scroll()',this.currentspeed);
  window.setTimeout(this.name+".stop = false", this.pausedelay);
 } else if ( this.type == 3 ) {
  this.stop = true;
  setTimeout(this.name+'.rolling()',this.currentspeed);
  window.setTimeout(this.name+".stop = false", this.pausedelay);
 }
};
this.display = function () {
 document.write('<div id="'+this.name+'" style="height:'+this.to_height+'px; width:'+this.to_width+'px; position:relative; overflow:hidden; " OnMouseOver="'+this.name+'.onmouseover(); " OnMouseOut="'+this.name+'.onmouseout(); ">');
 for(var i = 0; i < this.itemcount; i++) {
  if ( this.type == 1 ) {
   document.write('<div id="'+this.name+'item'+i+'"style="left:0px; width:'+this.width+'px; position:absolute; top:'+(this.height*i)+'px; ">');
   document.write(this.item[i]);
   document.write('</div>');
  } else if ( this.type == 2 || this.type == 3 ) {
   document.write('<div id="'+this.name+'item'+i+'"style="left:'+(this.width*i)+'px; width:'+this.width+'px; position:absolute; top:0px; ">');
   document.write(this.item[i]);
   document.write('</div>');
  }
 }
 document.write('</div>');
};
this.scroll = function () {
 if ( this.pause == true ) {
  window.setTimeout(this.name+".scroll()",this.pausedelay);
  this.pause = false;
 } else {
  this.currentspeed = this.scrollspeed;
  if ( !this.stop ) {
   for (i = 0; i < this.itemcount; i++) {
    obj = document.getElementById(this.name+'item'+i).style;
    if ( this.type == 1 ) {
     obj.top = (parseInt(obj.top) - 1) + "px";
     if ( parseInt(obj.top) <= this.height * (-1) ) obj.top = (this.height * (this.itemcount-1)) + "px";
     if ( parseInt(obj.top) == 0 ) this.currentspeed = this.pausedelay;
    } else if ( this.type == 2 ) {
     obj.left = (parseInt(obj.left) - 1) + "px";
     if ( parseInt(obj.left) <= this.width * (-1) ) obj.left = (this.width * (this.itemcount-1)) + "px";
     if ( parseInt(obj.left) == 0 ) this.currentspeed = this.pausedelay;
    }
   }
  }
  window.setTimeout(this.name+".scroll()",this.currentspeed);
 }
};
this.rolling = function () {
 if ( this.stop == false  ) {
  this.next();
 }
 window.setTimeout(this.name+".rolling()",this.scrollspeed);
}
this.onmouseover = function () {
 if ( this.pausemouseover ) {
  this.stop = true;
 }
};
this.onmouseout = function () {
 if ( this.pausemouseover ) {
  this.stop = false;
 }
};
this.next = function() {
 for (i = 0; i < this.itemcount; i++) {
  obj = document.getElementById(this.name+'item'+i).style;
  if ( parseInt(obj.left) < 1 ) { 
   width = this.width + parseInt(obj.left);
   break;
  }
 }
 for (i = 0; i < this.itemcount; i++) {
  obj = document.getElementById(this.name+'item'+i).style;
  if ( parseInt(obj.left) < 1 ) { 
   obj.left = this.width * (this.itemcount-1);
  } else {
   obj.left = parseInt(obj.left) - width  + "px";
  }
 }
}
this.prev = function() {
 for (i = 0; i < this.itemcount; i++) {
  obj = document.getElementById(this.name+'item'+i).style;
  if ( parseInt(obj.left) < 1 ) { 
   width = parseInt(obj.left) * (-1);
   break;
  }
 }
 if ( width == 0 ) {
  total_width = this.width * (this.itemcount-1);
  for (i = 0; i < this.itemcount; i++) {
   obj = document.getElementById(this.name+'item'+i).style;
   if ( parseInt(obj.left) + 1 > total_width ) { 
    obj.left = 0;
   } else {
    obj.left = parseInt(obj.left) + this.width + "px";
   }
  }
 } else {
  for (i = 0; i < this.itemcount; i++) {
   obj = document.getElementById(this.name+'item'+i).style;
   if ( parseInt(obj.left) < 1 ) { 
    obj.left = 0;
   } else {
    obj.left = parseInt(obj.left) + width + "px";
   }
  }
 }
}
this.unext = function () {
 this.onmouseover();
 this.next();
 window.setTimeout(this.name+".onmouseout()",this.pausedelay);
}
this.uprev = function () {
 this.onmouseover();
 this.prev();
 window.setTimeout(this.name+".onmouseout()",this.pausedelay);
}
}
/*
��뿹��
nvs = new NvScroll(); 
nvs.name = "nvs"; 
nvs.height = 135; 
nvs.width = 200; 
nvs.scrollspeed = 1000; 
nvs.pausedelay = 3000; 
nvs.pausemouseover = true; 
nvs.type = 3;
nvs.add("aaaa");
nvs.add("bbbb");
nvs.add("cccc");
nvs.add("dddd");
nvs.start();
<!--
				<script>
				var nvs2 = new NvScroll();
				nvs2.name = "nvs2";
				nvs2.height = 110;
				nvs2.to_height = 110;
				nvs2.width = 250;
				nvs2.to_width = 250;
				nvs2.scrollspeed = 1;
				nvs2.pausedelay = 1000;
				nvs2.pausemouseover = true;
				nvs2.type = 2;
				<!-- LOOP START 'tinfo' -->
				nvs2.add('<a href="../teacher/teacher_info.aspx?ch={{ch}}&tid={{tinfo.login_id}}"><img src="{{tinfo.teacher_banner}}" alt="" height="110"  width="250" onError="ImageError(this);"/></a>');
				<!-- LOOP END 'tinfo' -->
				nvs2.start();
				</script> -->
*/