// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
// I'm going to add am optional input for this function to make the 
// recursive iteration easier when going down the document.
// As in, when I want to check only on a lower element and not the whole
// document, this maker variable should be helpful.
var getElementsByClassName = function(className, marker){
  // your code here
  //first things first...I need to return an array-like object...
  var elementsArray = [];
  // document.body : grab the whole document
  // element.childNodes : get an orderd collection of node objects ie, list
  // element.classList : returns a token list of the class attribute of the element.
  //	add, remove, toggle, contains.
  // probably will use contains to check out our node list.

  // use entered marker or start at the whole document
  //hooray ||  :)
  var marker = marker || document.body;
  if(marker.classList){
    if(marker.classList.contains(className)){
      elementsArray.push(marker);
    }
  }
  //let's go through the curret marker
  // .children gets us all children elements under the current element
  for(var i = 0; i<marker.children.length; i++){
  	// keep the original className inputed and move down the line of child nodes
  	var childMarker = getElementsByClassName(className, marker.children[i]);
  	elementsArray = elementsArray.concat(childMarker);
  }
  return elementsArray;
};