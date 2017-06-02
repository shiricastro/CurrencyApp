   /***nav***/
   var mainSelect;  
   var navLink = $('nav ul li button');

  navLink.click(function(e){
        e.preventDefault();        
        console.log(e);
        closeTab(e);
        changeClass(e);
        openTab(e);
        cleanInput();
    });
      
   function changeClass(e){
        navLink.removeClass('select');
        $(e.target).addClass('select');
   };
   function closeTab(e){
        mainSelect = $('.mainSelect');
        mainSelect.each(function (i,el){
          $(el).hide();  
        });       
   };
   function openTab(e){
        var tab =$(e.target).attr('data-src');
        $('#'+ tab +'').show();
        console.log(tab);      
   };
   
  /***form***/
  var formVal= $('select#fromSelect').val();
  var toVal= $('select#toSelect').val();
  
  
   var fromSelect = $('select#fromSelect'); 
    fromSelect.change(function(e){
      formVal = fromSelect.val();
      getData(formVal,toVal);
    });
   var toSelect = $('select#toSelect');
    toSelect.change(function(e){
      toVal = toSelect.val(); 
      getData(formVal,toVal);
    });
   
  
   /***input change***/
   var inputValue = $('form input.CurrencyVal');   
   inputValue.change(function(e){
      e.preventDefault();
      getData(formVal,toVal);
   });
   
   function cleanInput(){
     $('input').val("");   
   };

   /***use AJAX currency Converter API***/
function getData(formVal,toVal){
  var data = {symbols: formVal +","+ toVal }; 
  $.getJSON('//api.fixer.io/latest',data, function(response){
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
      if (formVal === 'EUR'){
        var answer = (parseInt(inputValue.val()) / rate2).toPrecision(3);   
      }else if (toVal === 'EUR'){
        var answer = (parseInt(inputValue.val()) * rate1).toPrecision(3);  
      }else{
        var answer = (parseInt(inputValue.val()) * rate1 / rate2).toPrecision(3);
      }     
      value.val(answer);
};

   $("button#defult").click();

