   var ratesVal = {
	weight: {
		basis: "kilogram", 
		rates: {
                        kilogram: 1,
			tonne: 0.001,
			gram: 1000,
			milligram: 1000000, 
			imperialTon: 0.000984207,
                        USTon: 0.00110231,
                        stone: 0.157473,
                        pound: 2.20462,
                        ounce: 35.274
		}
	}, 
	height: {
		basis: "metre", 
		rates: {
                        metre:1,
                        kilometre:0.001,
			centimetre: 100,
			milimetre: 1000,
                        micrometre: 1000000,
                        nanometre: 1000000000,
                        mile: 0.000621371,
                        yard: 1.09361,
                        foot: 3.28084,
                        inch: 39.3701,
                        nauticalMile: 0.000539957
		}
	} 
};
   
  
   /***Togglable Tabs***/  
   var mainSelect;  
   var togglableTabs = $('div ul li button');

  togglableTabs.click(function(e){
        e.preventDefault(); 
        manageView($(e.target).attr('data-view'));
        changeClass(e);
        cleanInput();       
    });
    
    
   function manageView(view){
       if(view==='currency'){
          $.get('currencyView.html', function(data){
             $('main div.mainDiv').html(data); 
          });           
       } else if(view==='weight'){
           $.get('weightView.html', function(data){
             $('main div.mainDiv').html(data); 
          });           
       }else{
            $.get('heightView.html', function(data){
             $('main div.mainDiv').html(data); 
          });          
       }
   };
   
   function changeClass(e){
        togglableTabs.removeClass('select');
        $(e.target).addClass('select');
        
   };

  
   /***input change***/
   $('form input.CurrencyVal').on('input',function(e){
      var formVal= $('select#fromSelect').val();
      var toVal= $('select#toSelect').val();
      var currentView = $('li button.select').attr('data-view'); 
      getData(e.target.value ,formVal,toVal,currentView);

   });
   
   function cleanInput(){
     $('input').val("");   
   };

    
   /***use AJAX currency Converter API***/
function getData(InputValue ,formVal,toVal,currentView){
  if (formVal === toVal ){
      var value =$('input.answer');
      value.val(InputValue);
  }else if (currentView === 'currency'){
      var data = {base:formVal,symbols:toVal }; 
      $.getJSON('//api.fixer.io/latest',data, function(response){
          var respons = response.rates[toVal];     
          var answer = (parseInt(InputValue) * respons); //.toFixed(2)
          convertVal(answer);
      });
  }else {
      convertVal(calcValue(InputValue ,formVal,toVal,currentView));
  }
  $('select#fromSelect').change(selectChange);
  $('select#toSelect').change(selectChange);
};

function calcValue(InputValue ,formVal,toVal,currentView){
  return (InputValue * ratesVal[currentView].rates[toVal] / ratesVal[currentView].rates[formVal]);  
};

/**print answer**/
function convertVal(answer){
  var value =$('input.answer');
  value.val(answer);
};

$("button#defult").click();
    
function selectChange(){
  var val = $('.CurrencyVal').val();  
  var formVal= $('select#fromSelect').val();
  var toVal= $('select#toSelect').val();
  var currentView = $('li button.select').attr('data-view');
  getData(val, formVal,toVal,currentView);
}