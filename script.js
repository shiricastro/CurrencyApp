   /***nav***/
   var navLink = $('nav ul li button');
    navLink.click(function(e){
        e.preventDefault();
        navLink.removeClass('select');
        $(e.target).addClass('select');
    });
    
  /***form***/
  var formVal= $('select#fromSelect').val();
  var toVal= $('select#toSelect').val();
  
  
   var fromSelect = $('select#fromSelect'); 
    fromSelect.change(function(e){
      formVal = fromSelect.val();     
    });
   var toSelect = $('select#toSelect');
    toSelect.change(function(e){
      toVal = toSelect.val();     
    });
   
  
   /***input change***/
   var inputValue = $('form input.CurrencyVal');   
   inputValue.change(function(e){
      e.preventDefault();
      getData(formVal,toVal);
   });


function getData(formVal,toVal){
  var data = {symbols: formVal +","+ toVal }; 
  $.getJSON('http://api.fixer.io/latest',data, function(response){
      var respons = response.rates;
      convertVal(respons[formVal],respons[toVal]);
      console.log(formVal +","+ toVal);
      console.log(response.rates);
      console.log(respons[formVal] +","+ respons[toVal]);
  });  
};


/**print answer**/
  function convertVal(rate1, rate2){
      var value =$('input.answer');
      var answer = (parseInt(inputValue.val()) * rate1 / rate2).toPrecision(3);
      value.val(answer);
};




