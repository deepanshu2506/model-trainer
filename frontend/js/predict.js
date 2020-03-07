$('#predict-button').click(function(){
    console.log($('#file-picker').val());
    var fd = new FormData();
    var files = $('#file-picker')[0].files;
    const len = files.length;
    for (var x = 0; x < len; x++) {
        fd.append('files[]',files[x]);
    }
    console.log(files)
    
    $.ajax({
        url: 'http://127.0.0.1:4555/upload',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(response){
                console.log(response);
        
        }   
    });   
    
});


$("#file-picker").change(function () {
    $('.row').children().remove();
    if (typeof (FileReader) != "undefined") {
        var dvPreview = $(".row");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        $($(this)[0].files).each(function () {
            var file = $(this);
            if (regex.test(file[0].name.toLowerCase())) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    const card = $(`<div class="col-md-3 col-sm-4">
                        <div class="card">
                            <img src="" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Class</h5>
                                <p class="card-text">Confidence Score</p>
                            </div>
                            <div class="card-body">
                                <a href="#" class="card-link">Incorrect ?</a>
                            </div>
                        </div>
                    </div>`);
                    var img = card.children().children('img');
                    img.attr("style", "height:100px;width: 100px");
                    img.attr("src", e.target.result);
                    dvPreview.append(card);
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
