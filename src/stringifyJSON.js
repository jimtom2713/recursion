// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // ok let's think this out...cause yeah....ugh

  //start with a simple case... obj is a string....
  // if this is the case we only need to return the string wrapped as a string
  if (typeof(obj) === 'string'){
    return '"' + obj + '"';
  }
  // next case would be that obj is an Array....
  // we'll need to go through each item in the Array obj and run it through 
  // stringifyJSON().
  if (Array.isArray(obj)){
    // can we use map? reminder to ask abou this at next hangout!!
    //map will apply stringifyJSON to every thing in the array
    // this handles the recursion for Arrays
    // should we destroy the original obj????
    //CORRECTION: I think we can destroy the original obj. Otherwise 
    // we could just pass the object around.
    obj = obj.map(function(arrayItem){
      return stringifyJSON(arrayItem);
    });
    //now that I have a stringifyJSON object for the Array...
    // let's deal with the outer array brackets...
    return "[" + obj + "]";
  }
  // now the hardest part for last....
  // if obj is a JS obj already we need to go through it with every case
  // did we even get obj or did we get {} ???
  if (typeof(obj) === 'object' && obj) {
    //can we use join? Reminder to ask in the next hangout
    //build an array to store everything and join() to place it together
    //at the end in one big string.
    var stringedResults = new Array();
    //cycle through all the key:values and get to work on them...
    for(var key in obj){
      //check if the key:value is undefined or a function
      //do nothing if this is the case
      if(typeof(obj[key]) === 'function' || obj[key] === undefined){
        continue; //skip the key and go to the next one
      }
      //rebuild the key in stringifyJSON...
      stringedResults.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));
    }
    return "{" + stringedResults.join() + "}";
  }
  return "" + obj; 

};