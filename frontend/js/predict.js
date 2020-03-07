$('#predict-button').click(function(e){
    e.preventDefault()
    console.log($('#file-picker').val());
    var fd = new FormData();
    var files = $('#file-picker')[0].files;
    const len = files.length;
    for (var x = 0; x < len; x++) {
        fd.append('files[]',files[x]);
    }
    console.log(files)
    
    $.ajax({
        url: 'http://127.0.0.1:8080/upload',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(response){
            console.log(response)
            const cards = $('.row').children();
            index = 0;
            console.log(cards[0]);
            for(index = 0;index <cards.length;index++){

                confidence = response[index];
                
                var label = "buildings"
                maxconfidence = confidence[label];
                console.log(confidence)
                var name = Object.keys(confidence);
                var value = Object.values(confidence)
                //console.log(Object.keys(confidence))
                //console.log(Object.values(confidence))
                var datapoints = []
                for(var i=0; i<name.length; i++){
                    datapoints.push({
                        // x: i,
                        y: parseFloat(value[i]),
                        label: name[i]
                    });
                }
                // console.log(datapoints);
                $('.graphContainer').show();
                var chart = new CanvasJS.Chart(`chartContainer${index}`, {
                    animationEnabled: true,
                    theme: "light2",
                    
                    
                    title: {
                        text: "Prediction Data"
                    },
                    axisY: {
                        // title: "abc",
                        maximum:1,
                        minimum:0,
                        titleFontSize: 24
                    },
                    axisX:{
                        labelFontSize: 10,
                        interval: 1,
                    },
                    data: [{
                        type: "column",
                        dataPoints: datapoints
                    }]
                });
                chart.render();
                for(c in confidence){
                    if(parseFloat(confidence[label]) < parseFloat(confidence[c])){
                        label = c;
                        maxconfidence = parseFloat(confidence[c]);
                    }
                }
                
                // console.log($(card).children('.card').children('.card-body').children('.class').text);
                // $(card).children('.card').children('.card-body').children('.confidence').text(maxconfidence)
                $(cards[index]).children('.card').children('.card-body').children('.class').text(label)
                // index++;
            }
        }   
    });   
    
});

$('body').on('click' ,'.incorrect',function(){
    $(this).attr('disabled',true)
    const predictedClass = $(this).parent().siblings('.card-body').children('.class').text();
    $(this).parent().siblings('.card-body').children('.class').remove();
    $(`<input type='text' value='${predictedClass}' /><button class = ' btn btn-success'id = 'correct'>correct</button>`).insertAfter($(this).parent().siblings('.card-body').children('h5'))
});


$('body').on('click' ,'#correct',function(){
    const correctedVal = $(this).siblings('input').val();
    $(this).siblings('input').remove();
    $(`<p class = "card-text class">${correctedVal}</p>`).insertAfter($(this).siblings('h5'));
    $(this).remove();
    alert('your change has been recorded the model will be trained shortly');
});

$("#file-picker").change(function () {
    $('.row').children().remove();
    if (typeof (FileReader) != "undefined") {
        var dvPreview = $(".row");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        index = 0;
        $($(this)[0].files).each(function () {
            var file = $(this);
            if (regex.test(file[0].name.toLowerCase())) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    const card = $(`<div class="col-md-4 col-sm-4">
                        <div class="card">
                            <img src="" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Class</h5><p class = "card-text class">not predicted</p>
                                <p class="card-text">Confidence Score</p>
                                <div class='graphContent' id="chartContainer${index}" style="height: 370px; width: 100%;"></div>
                            </div>
                            
                            <div class="card-body">
                                <button class="incorrect btn btn-warning">Incorrect ?</a>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    `
                    );
                    var img = card.children().children('img');
                    img.attr("style", "height:100px;width: 100px");
                    img.attr("src", e.target.result);
                    dvPreview.append(card);
                    index++;
                }
                reader.readAsDataURL(file[0]);
            } else {
                alert(file[0].name + " is not a valid image file.");
                dvPreview.html("");
                return false;
            }
            
        });
    } else {
        alert("This browser does not support HTML5 FileReader.");
    }
});
