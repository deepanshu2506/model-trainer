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
    var cards = $('.repeat-div')
    // var b = Object.entries(a);
    console.log(cards);
    config ={}
    layers = []
    for(card of cards){
        layerconfig = {}
        let layerType = $(card).children('.card-body').children('.group-input').children('select').val();
        if(layerType == 'convolution_layer'){

            const data =  $(card).children('.card-body').children('.convolution_layer').children('.group-input');
            console.log(data[0])
            const stride = $(data[0]).children('input').val()
            const filter = $(data[1]).children('input').val();
            const sameconvolution = $(data[2]).children('input').is(":checked");
            layerconfig = {layerType,stride,filter,sameconvolution}
        }
        else if(layerType == 'dense_layer'){
            const data =  $(card).children('.card-body').children('.dense_layer').children('.group-input');
            const numberOfUnits = $(data[0]).children('input').val();
            console.log(data[1]);
            const activation = $(data[1]).children('select').val();
            layerconfig = {layerType,numberOfUnits,activation}
            
        }
        else if(layerType == 'pooling_layer'){
            const data =  $(card).children('.card-body').children('.pooling_layer').children('.group-input');
            // console.log($(card).children('.card-body').children('.pooling_layer').children('form-check'));
            const type =  $(card).children('.card-body').children('.pooling_layer').children('.form-check').children('input[name="radio1"]:checked').val();
            const filter = $(data[0]).children('input').val();
            const stride = $(data[1]).children('input').val()
            layerconfig = {layerType,type,filter,stride}
        }

        else if(layerType == 'output_layer'){
            layerconfig = {layerType,softmax:true}
        }

        layers.push(layerconfig);
    }
    config={layers}
    console.log(config)
});