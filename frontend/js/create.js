$(document).ready(function(){
    $("body").on("change",'.myList',function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
        //console.log($(this).parent().parent().siblings());
        //.parent().parent().parent().parent().siblings().show()
            //console.log(optionValue);
            if(optionValue){
                $(this).parent().parent().siblings().not("." + optionValue).hide();
                $(this).parent().parent().siblings('.'+optionValue).show();
            } else{
                $(".box").hide();
            }
        });
    })
    $('.myList').change();
});


/*
$(function () {
    $(".repeat-button").on('click', function() {
        $('.repeat-div').clone().insertAfter('.repeat-div');
        //$self.remove();
    });
});
*/
//console.log($($('.repeat-div').children().children().children()[1]).attr('class'));


$(function () {
    $(".repeat-button").on('click', function (e) {
        e.preventDefault();
        var $self = $(this);
        $self.before($self.prev($('.repeat-div')).clone());
        //$self.remove();
    });
});

$('.submit-button').on('click',function(){
    var a = $('.repeat-div').children().children();
    var b = Object.entries(a);
    b.forEach(function(ele){
        ele.forEach(function(e){
            console.log(e);
        })
    })
});