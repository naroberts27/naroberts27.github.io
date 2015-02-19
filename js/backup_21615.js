// My global variables
var city;
var state;
var zipcode;
var chosendayValue;
var mintimeValue;
var maxtimeValue;
var currentHours;
var timeNow;
var conditionValue;
var avgTempValue;
var degreeValue;
var d = new Date();
var day = d.getDate();
var conditionArrayValue;
var conditionInputs = [];
var tempInputs = [];
var feelslikeInputs = [];
var coldCloudyArray = {
    "Boots" : '<img src="images/WearCast_logo.png">',
    "Scarf" : '<img src="images/WearCast_logo.png">',
    "Winter Hat" : '<img src="images/WearCast_logo.png">',
    "Coat" : '<img src="images/WearCast_logo.png">'
};
var warmCloudyArray = {
    "Boots" : '<img src="images/WearCast_logo.png">',
    "T-Shirt" : '<img src="images/WearCast_logo.png">',
    "Hat" : '<img src="images/WearCast_logo.png">',
    "Light Coat" : '<img src="images/WearCast_logo.png">'
};

var coldRainArray = {
    "Umbrella" : '<img src="images/WearCast_logo.png">',
    "Rainboots" : '<img src="images/WearCast_logo.png">',
    "Jacket" : '<img src="images/WearCast_logo.png">',
    "Scarf" : '<img src="images/WearCast_logo.png">'
};
var warmRainArray = {
    "Umbrella" : '<img src="images/WearCast_logo.png">',
    "Rainboots" : '<img src="images/WearCast_logo.png">',
    "Light Coat" : '<img src="images/WearCast_logo.png">',
    "T-Shirt" : '<img src="images/WearCast_logo.png">'
};

var snowArray = {
    "Scarf" : '<img src="images/WearCast_logo.png">',
    "Gloves" : '<img src="images/WearCast_logo.png">',
    "Snow Boots" : '<img src="images/WearCast_logo.png">',
    "Heavy Coat" : '<img src="images/WearCast_logo.png">'
};

var coldSunnyArray = {
    "Sunglasses" : '<img src="images/WearCast_logo.png">',
    "Coat" : '<img src="images/WearCast_logo.png">',
    "Scarf" : '<img src="images/WearCast_logo.png">',
    "Winter Hat" : '<img src="images/WearCast_logo.png">'
};
var warmSunnyArray = {
    "Sunglasses" : '<img src="images/WearCast_logo.png">',
    "Shorts" : '<img src="images/WearCast_logo.png">',
    "Flip Flops" : '<img src="images/WearCast_logo.png">',
    "Hat" : '<img src="images/WearCast_logo.png">'
};

var coldHazyArray = {
    "Face Mask" : '<img src="images/WearCast_logo.png">',
    "Sunglasses" : '<img src="images/WearCast_logo.png">',
    "Scarf" : '<img src="images/WearCast_logo.png">',
    "Winter Hat" : '<img src="images/WearCast_logo.png">'
};
var warmHazyArray = {
    "Face Mask" : '<img src="images/WearCast_logo.png">',
    "Sunglasses" : '<img src="images/WearCast_logo.png">',
    "T-Shirt" : '<img src="images/WearCast_logo.png">',
    "Light Coat" : '<img src="images/WearCast_logo.png">'
};

var coldFogArray = {
    "Coat" : '<img src="images/WearCast_logo.png">',
    "Boots" : '<img src="images/WearCast_logo.png">',
    "Scarf" : '<img src="images/WearCast_logo.png">',
    "Winter Hat" : '<img src="images/WearCast_logo.png">'
};
var warmFogArray = {
    "Flip Flops" : '<img src="images/WearCast_logo.png">',
    "Pants" : '<img src="images/WearCast_logo.png">',
    "T-Shirt" : '<img src="images/WearCast_logo.png">',
    "Light Coat" : '<img src="images/WearCast_logo.png">'
};



function getValues(getArray, chosendayValue, mintimeValue, maxtimeValue) {
            alert('array');

            for(var i=0; i < getArray.length; i++) {
                if (parseInt(getArray[i]['FCTTIME']['mday']) === chosendayValue && parseInt(getArray[i]['FCTTIME']['hour_padded']) >= mintimeValue && parseInt(getArray[i]['FCTTIME']['hour_padded']) < maxtimeValue) {
                  console.log(getArray[i]);
                  
                  conditionInputs.push(getArray[i]['condition']);

                var degreeValue = $('input[name$="degree"]:checked').val();
                      if (degreeValue == "Farenheit"){
                        tempInputs.push(getArray[i]['temp']['english']);
                        feelslikeInputs.push(getArray[i]['feelslike']['english']);
                      }
                      else if (degreeValue == "Celcius"){
                        tempInputs.push(getArray[i]['temp']['metric']);
                        feelslikeInputs.push(getArray[i]['feelslike']['metric']);
                      }
                } // end of things inside array?

            } // end of FOR
            getAvgTemp();
            getCondition();
            getMaxTemp();
            getMinTemp();
            getFeelsLike();
            
          } // end of function


function getMost(array) { 
    if(array.length == 0) 
        return null; 

    var modeMap = {}; 
    var maxEl = array[0], 
    maxCount = 1; 

    for(var i = 0; i < array.length; i++) { 
        
        var el = array[i]; 

        if(modeMap[el] == null) 
            modeMap[el] = 1; 

        else modeMap[el]++;

            if(modeMap[el] > maxCount) { 
                maxEl = el; 
                maxCount = modeMap[el]; 
            } 
        } 
    return maxEl; 
    
}



function getCondition(){
    conditionValue = getMost(conditionInputs);
    $('#conditions').html('Weather Condition: ' + conditionValue);

    if (degreeValue == 'Farenheit'){
        if (avgTempValue >= 55){
             if (conditionValue.match(/^(Overcast|Scattered Clouds|Cloudy|Mostly Cloudy|Partly Cloudy)$/)){
                $.each(warmCloudyArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             } // end if Cloudy
             else if (conditionValue.match(/^(Thunderstorms|Thunderstorm|Rain|Freezing Rain|Sleet|Chance of Rain|Chance of a Thunderstorm|Chance of Showers)$/)){
                $.each(warmRainArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Rain
             else if (conditionValue.match(/^(Clear|Sunny|Partly Sunny|Mostly Sunny|Very Hot)$/)){
                $.each(warmSunnyArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Sunny
             else if (conditionValue.match(/^(Snow|Flurries|Blowing Snow|Snow Showers|Ice Pellets|Chance of Ice Pellets|Chance of Snow Showers|Chance of Snow|Blizzard)$/)){
                $.each(snowArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Snow
             else if (conditionValue.match(/^(Haze|Hazy)$/)){
                $.each(warmHazyArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Hazy
             else if (conditionValue.match(/^(Fog|Foggy)$/)){
                $.each(warmFogArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Fog
        } // end if over 55 degrees
        else {
            if (conditionValue.match(/^(Overcast|Scattered Clouds|Cloudy|Mostly Cloudy|Partly Cloudy)$/)){
                            $.each(coldCloudyArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         } // end if Cloudy
                         else if (conditionValue.match(/^(Thunderstorms|Thunderstorm|Rain|Freezing Rain|Sleet|Chance of Rain|Chance of a Thunderstorm|Chance of Showers)$/)){
                            $.each(coldRainArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Rain
                         else if (conditionValue.match(/^(Clear|Sunny|Partly Sunny|Mostly Sunny|Very Hot)$/)){
                            $.each(coldSunnyArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Sunny
                         else if (conditionValue.match(/^(Snow|Flurries|Blowing Snow|Snow Showers|Ice Pellets|Chance of Ice Pellets|Chance of Snow Showers|Chance of Snow|Blizzard)$/)){
                            $.each(snowArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Snow
                         else if (conditionValue.match(/^(Haze|Hazy)$/)){
                            $.each(coldHazyArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Hazy
                         else if (conditionValue.match(/^(Fog|Foggy)$/)){
                            $.each(coldFogArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Fog
        } // end else 
        
    } // end if farenheit




    else if (degreeValue == 'Celcius'){
        if (avgTempValue >= 13){
             if (conditionValue.match(/^(Overcast|Scattered Clouds|Cloudy|Mostly Cloudy|Partly Cloudy)$/)){
                $.each(warmCloudyArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             } // end if Cloudy
             else if (conditionValue.match(/^(Thunderstorms|Thunderstorm|Rain|Freezing Rain|Sleet|Chance of Rain|Chance of a Thunderstorm|Chance of Showers)$/)){
                $.each(warmRainArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Rain
             else if (conditionValue.match(/^(Clear|Sunny|Partly Sunny|Mostly Sunny|Very Hot)$/)){
                $.each(warmSunnyArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Sunny
             else if (conditionValue.match(/^(Snow|Flurries|Blowing Snow|Snow Showers|Ice Pellets|Chance of Ice Pellets|Chance of Snow Showers|Chance of Snow|Blizzard)$/)){
                $.each(snowArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Snow
             else if (conditionValue.match(/^(Haze|Hazy)$/)){
                $.each(warmHazyArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Hazy
             else if (conditionValue.match(/^(Fog|Foggy)$/)){
                $.each(warmFogArray,function(index, value){
                    $('#result-items').append(
                        '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                        ); // end append
                }); // end each warm
             }// end if Fog
        } // end if over 55 degrees
        else {
            if (conditionValue.match(/^(Overcast|Scattered Clouds|Cloudy|Mostly Cloudy|Partly Cloudy)$/)){
                            $.each(coldCloudyArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         } // end if Cloudy
                         else if (conditionValue.match(/^(Thunderstorms|Thunderstorm|Rain|Freezing Rain|Sleet|Chance of Rain|Chance of a Thunderstorm|Chance of Showers)$/)){
                            $.each(coldRainArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Rain
                         else if (conditionValue.match(/^(Clear|Sunny|Partly Sunny|Mostly Sunny|Very Hot)$/)){
                            $.each(coldSunnyArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Sunny
                         else if (conditionValue.match(/^(Snow|Flurries|Blowing Snow|Snow Showers|Ice Pellets|Chance of Ice Pellets|Chance of Snow Showers|Chance of Snow|Blizzard)$/)){
                            $.each(snowArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Snow
                         else if (conditionValue.match(/^(Haze|Hazy)$/)){
                            $.each(coldHazyArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Hazy
                         else if (conditionValue.match(/^(Fog|Foggy)$/)){
                            $.each(coldFogArray,function(index, value){
                                $('#result-items').append(
                                    '<li>' + value + index +'<a href="https://www.google.com/search?output=search&tbm=shop&q='+ index +'" target="_blank"><button class="buy">Buy</button></a> </li>'
                                    ); // end append
                            }); // end each warm
                         }// end if Fog
        } // end else 
        
    } // end if farenheit

}; // end function 

function getFeelsLike(){
    var total = 0;
    for (var i = 0; i < feelslikeInputs.length; i++) {
    total += feelslikeInputs[i] << 0;
    }
    var feelslikeValue = parseInt(total / feelslikeInputs.length);
    $('#temp-feels-input').html("Feels Like: " + feelslikeValue);
};


function getAvgTemp(){
    var total = 0;
    for (var i = 0; i < tempInputs.length; i++) {
    total += tempInputs[i] << 0;
    }
    avgTempValue = parseInt(total / tempInputs.length);

    $('#temp-result').html(avgTempValue);
};

function getMaxTemp(){
    var maxTempValue = Math.max.apply(Math,tempInputs);
    $('#high').html("High of " + maxTempValue);
};

function getMinTemp(){
    var minTempValue = Math.min.apply(Math,tempInputs);
    $('#low').html(" and Low of " + minTempValue);
};

function updateClock(){
    var currentTime = new Date ( );
    currentHours = currentTime.getHours ();
    var currentMinutes = currentTime.getMinutes ( );
    // var currentSeconds = currentTime.getSeconds ( );
 
    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    // currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
 
    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
 
    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
 
    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;
 
    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes + " "  + timeOfDay;
     
     
    // var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m = month[d.getMonth()];


    // var day = d.getDate();
    var output =  m + ' ' + day + ', ' + d.getFullYear() + ' at ' + currentTimeString;

    $("#clock").html(output);

         
 }

function getCalendarDays() {

    // var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m = month[d.getMonth()];
    
    var newDay = -1;

     $("#chosen-day option").each(function(){
        newDay++;
         var n = d.getDate();
         var dayInput = d.getDate() + newDay;
         var calendarDay = m + " " + dayInput + ", " + d.getFullYear();
            $(this).html(calendarDay);
         });

};

function getEndTimeOptions(){

    var endValue = $('#ending').html();
    $('#starting').change(function() {
        $('#ending').html(endValue);
        $('#ending option').each(function() {
            if ($(this).val() <= $('#starting').val()) $(this).hide();
        });
        if ($('#starting').val() >= 11){
            $("#ending > optgroup:nth-child(2)").hide();
        }     
    });

};
// IF IT IS TODAY, REMOVE TIMES THAT ALREADY HAPPENED
function removeStartingTimes(){
    var dayChosen = $("#chosen-day option:selected").val();
    timeNow = d.getHours();
    if (dayChosen == 0){
        var removeTimes = $('#starting').html();
        console.log(removeTimes);
            $('#starting').html(removeTimes);
            $('#starting option').each(function() {
                if (parseInt($(this).val()) <= timeNow) 
                    {
                        $(this).hide();
                        
                    }
            });
            if (timeNow >= 11){
                $("#starting > optgroup:nth-child(2)").hide();
            }
    }
    else {
        $('#starting option').each(function() {
            if (parseInt($(this).val()) <= timeNow) 
                {
                    $(this).show();
                    if (timeNow >= 11){
                        $("#starting > optgroup:nth-child(2)").show();
                    }
                    
                }
        });
    }

};


function getLocation(){
    
    var locationValue = $('#zipcode').val();
    $('#location-value').html(' for ' + locationValue);

    if ($.isNumeric(locationValue)){
        zipcode = parseFloat(locationValue);
    }

    else {
        var splitLocation = locationValue.split(',');

        var preState = splitLocation[1];
        state = $.trim(preState);

        var preCity = splitLocation[0];
        city = $.trim(preCity).replace(/\s+/g, '_');
    }
};

function getDegree(){
    degreeValue = $('input[name$="degree"]:checked').val();
    if (degreeValue == "Farenheit"){
        $('#degree-input1').html('&deg;F');
        $('#degree-input2').html('&deg;F');
        $('#degree-input3').html('&deg;F');
        $('#degree-input4').html('&deg;F');
    }
    else if (degreeValue == "Celcius"){
        $('#degree-input1').html('&deg;C');
        $('#degree-input2').html('&deg;C');
        $('#degree-input3').html('&deg;C');
        $('#degree-input4').html('&deg;C');
    }
};



function changeTopBackground(){
        var hour = new Date().getHours();
    if (hour > 6 && hour < 17) {
        $('#location').addClass('day');
    } 
    else {
        $('#location').addClass('night');
    }
};
 
$(document).ready(function(){
	

	function getAPI(city,state,zipcode){

		if (zipcode){ 

			
			var newUrl = "http://api.wunderground.com/api/8081f4d2157beccb/hourly10day/q/" + zipcode + ".json";
		}

		else {
			var newUrl = "http://api.wunderground.com/api/8081f4d2157beccb/hourly10day/q/" + state + "/" + city + ".json";
		}

    		alert(newUrl);

		  $.ajax({
		  	url : newUrl,

		  	dataType : "jsonp",
		  	success : function(parsed_json) {

                // console.log(parsed_json['hourly_forecast']);

		  		var getArray = parsed_json['hourly_forecast'];
                getValues(getArray, chosendayValue, mintimeValue, maxtimeValue);

         
              
            
		  	} // SUCCESS END
		  }); // END AJAX



          
	};


	// get the day needed (add 24 to the number to get the start to the right day)
	// get the hours needed
	// put into an array
	// return variables that i chose for those days, hours 
	// need: FCTTIME (hour padded), condition, feelslike [english, metric], temp [english, metric], find the highest and lowest "Temp" 
	// put into UI
    


    setInterval('updateClock()', 1000);

    changeTopBackground();
    getCalendarDays();
    getEndTimeOptions();

   
    

    $('#weather').click(function(event){
        event.preventDefault();
        getLocation();
        getDegree();
    });


    

    $( "#chosen-day" ).on('change', function() {
       
        $( "#chosen-day option:selected" ).each(function() {
          removeStartingTimes();
        });
        
      })
      .trigger( "change" );


     $('#submit').click(function(event){
        event.preventDefault();
        var dayValue = $('#chosen-day option:selected').text();
        var startValue = $('#starting option:selected').text();
        var endValue = $('#ending option:selected').text();
        $('#result-date').html(dayValue);
        $('#result-start').html(" between " + startValue + " and ");
        $('#result-end').html(endValue);
        mintimeValue = $('#starting option:selected').val();
        maxtimeValue = $('#ending option:selected').val();
        // var d = new Date();
        // var day = d.getDate();
        var dayNumber = $('#chosen-day option:selected').val();
        dayNumber = parseInt(dayNumber);
        chosendayValue = dayNumber + day;


        getAPI(city, state, zipcode);
        
    });

    $('#location-form').validate();





});