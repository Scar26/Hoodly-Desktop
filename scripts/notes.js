
var data = new Object;
var task = 0;
var tmp = 0;

function events(list, e, listName) {
   e.which = e.which || e.keyCode;
    if(e.which == 13) {
    var task = strip_tags(list, '').replace(/\s/g,''); // Clean the string of any tag or white space
    var clean = task.substring(tmp, 9999999999999).length;
    var key = listName.toString();
    if(tmp == 0) {
        data[key] = task.substr(tmp, tmp + clean) + ",";
     } else {
        data[key] += task.substr(tmp, tmp + clean) + ",";
     }
    tmp = task.length;
    }
    
}

function strip_tags(list, allowed) {
    input = list.innerHTML;
    allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)

  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

  return input.replace(commentsAndPhpTags, ',')
      .replace(tags, function($0, $1) {
          return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
}

function mark(single, className){
    
    if(single.innerHTML != 0) {
    
        if (!single || !className){
            return;
        }
        var classString = single.className, nameIndex = classString.indexOf(className);
        if (nameIndex == -1) {
            classString += ' ' + className;
        }
        else {
            classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
        }
        single.className = classString;
    
    }
}
    
function del(note) {
  var wrapper = document.getElementById("stick-box");
  var label = document.getElementById(note);
  label.style.opacity = '0';
  setTimeout(function() {
    wrapper.removeChild(label);
    }, 
  300);
  console.log("delete: " + label);
};  

function newSticky(stickyName) {
var id = stickyName.replace(/\s/g,'');
var sticky = "<div id=\""+id+"\" class=\"col-md-4 list-col\">";
    sticky += "<button class=\"del stick-icon\" onclick=\"del('"+id+"')\"><i class=\" fa fa-trash-o\" aria-hidden=\"true\"></i></button>"
    sticky += "<div class=\"col-md-12 list\">";
    sticky += "<h2 class=\"list-title\"> "+stickyName+" </h2>";
    sticky += "<ul onkeyup=\"events(this, event, '"+stickyName+"')\" contenteditable=\"true\" class=\"task-wrapper\">";
    sticky += "<li onclick=\"mark(this, 'complete')\" class=\"task\"></li>";
    sticky += "</ul>";
    sticky += "</div>";
    sticky += "</div>";
if(stickyName == '') {
  alert("Please give your stiky a name :)");
} else {
    document.getElementById("stick-box").innerHTML += sticky;
}
};
