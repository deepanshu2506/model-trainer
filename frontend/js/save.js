

                        

$(document).ready(
    function(e) {
        $.ajax({
            url: 'http://127.0.0.1:3000/alltrained',
            type: 'get',
            data: {
               
            },
            success: function(response){
                
                console.log(response)
                for(resp of response.data){
                    console.log(resp)
                    name = resp.name;
                    temp = new Date(resp.createdAt)
                    date = temp.getDate()+'/'+temp.getMonth() + "/" + temp.getFullYear();
                    status = "a"
                    statusDesc = ''
                    if(!resp.istrained && resp.isTraining){
                        status = 'r'
                        statusDesc = 'training'
                    }
                    if(!resp.isTraining && !resp.istrained){
                        status = 'i'
                        statusDesc = 'failed'
                    }
                    accuracy = 'not calculated yet';
                const div = `<div class="col-md-3 col-sm-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="head">
                                        <h5 class="card-title"><a href="#">${name} </a></h5>
                                        <div class="statusbox">
                                            
                                            <p class="status"><div class="boxst${status}"></div>${statusDesc}</p>
                                            
                                        </div>
                                    </div>
                                    
                                    
                                    <p class="card-text">Date - <span>${date}</span></p>
                                    <p class="card-text">Accuracy - <span>${accuracy}</span></p>
                                </div>
                                
                            </div>
                        </div>`
                    // div.children().children().children('.head').children('.card-title').children('a').text(resp.name);
                    $('.area2').append(div);
                    $('.area2').append("<br>");
                }
            }
                // if(response.code == 1)
                    // window.location.href  = "save.html"
            
        });
    }
);