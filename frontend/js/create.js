$(document).ready(function(){
//     $("#myList").change(function(){
//         $(this).find("option:selected").each(function(){
//             var optionValue = $(this).attr("value");
//             console.log($(this).parent().parent().parent().parent().siblings());
//             if(optionValue){
//                 $(this).parent().parent().parent().parent().siblings().show()
//                 $(this).parent().parent().parent().parent().siblings('.box').not("." + optionValue).hide();
//                 // $(this).parent().parent().parent().parent().siblings("." + optionValue).show();
//             } else{
//                 // $(".box").hide();
//             }
//         });
//     }).change();
$(".myList").change()
});

$(".myList").on('change' , 'body',function(){
    console.log('sds')
    $(this).find("option:selected").each(function(){
        var optionValue = $(this).attr("value");
        console.log($(this).parent().parent().parent().siblings('.box'));
        if(optionValue){
            $(this).parent().parent().parent().siblings().not("." + optionValue).hide();
            $(this).parent().parent().parent().siblings("." + optionValue).show();
        } else{
            // $(".box").hide();
        }
    }).change();
});

var repeatdiv = `<div class="repeat-div">
<div class="group-input">
    <label for="layer_type">Layer Type
    <select id = "myList">
        <option value = "convolution_layer">Convolution Layer</option>
        <option value = "dense_layer">Dense Layer</option>
        <option value = "pooling_layer">Pooling Layer</option>
        <option value = "output_layer">Output Layer</option>
    </select>
    </label>
</div>

    <div class="box convolution_layer">
        <div class="group-input">
            <label for="stride">Stride
                <input type="text" id="stride">
            </label>
        </div>	
        <div class="group-input">	
            <label for="filter_size">Filter Size
                <input type="text" id="filter_size">
            </label>
        </div>
        <div class="group-input gi-check">	
            <label for="same_conv">
                Same Convolution Layer
                <input type="checkbox" id="same_conv">
                <span class="checkmark"></span>
            </label>
        </div>
    </div>

    <div class="box dense_layer">
        <div class="group-input">
            <label for="no_units">No of Units
                <input type="text" id="no_units">
            </label>
        </div>	
        <div class="group-input">	
            <label for="activation">Activation Layer
                <select id = "myList">
                    <option value = "relu">ReLu Layer</option>
                    <option value = "leaky_relu">Leaky ReLu Layer</option>
                    <option value = "tanh">tanh</option>
                    <option value = "sigmoid">Sigmoid</option>
                
                </select>
            </label>
        </div>
    </div>

    <div class="box pooling_layer">
        <div class="form-check">
            <label class="form-check-label">
            <input type="radio" class="form-check-input" name="max_radio">Max
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
            <input type="radio" class="form-check-input" name="avg_radio">Average
            </label>
        </div>
        <div class="group-input">
            <label for="filter_size_pool">Filter Size
                <input type="text" id="filter_size">
            </label>
        </div>	
        <div>
            <label for="stride_pool">
                stride
                <input type="text" id="stride_pool">
            </label>
        </div>
    </div>

    <div class="box output_layer">
        <div class="form-check">
            <label class="form-check-label" for="soft_max">
            <input type="radio" class="form-check-input" name="soft_max">Softmax
            </label>
        </div>
    </div>

</div> `


$(function () {
    $(".repeat-button").on('click', function (e) {
        e.preventDefault();
        var $self = $(this);    
        $('.repeat-div:last-child').appendAfter(repeatdiv)
        //$self.remove();
    });
});
