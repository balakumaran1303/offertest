console.log('124');
$(document).ready(function() {
    $('#exampleModal').on('show.bs.modal', function(event) {
        var li = $(event.relatedTarget);
        var modalUrlContent = li.attr('data-url');
        var modal = $(this)
        modal.find('.modal-body').load(modalUrlContent + ' ' + '.gridcard', function(response, status, xhr ) {
            console.log( "Load was performed.", response,  status);
          });
        // modal.find('.modal-title').text(modalTitle)
        if (modalUrlContent) {


                $.ajax({
                     type: "GET",
                     url: "./sampleData.json",
                     dataType: 'json',
                     success: function(res) {
                         console.log(res + 'response')
                             // get the ajax response data
                         var data = res;
                         console.log(data);
                         console.log(data.heading);
                         $("#content-heading").append(data.heading);
                         $("#content-description").append(data.description);
                         $("#content-image").attr("src", data.img);
                        //  var name=document.querySelectorAll("#title");
                        //  name.textContent=data.heading;
                        //  console.log(name);
                        //  modal.find('.modal-body').html(markup);
                         
                             // show modal
                             //$('#myModal').modal('show');
                     },
                     error: function(request, status, error) {
                         console.log("ajax call went wrong:" + request.responseText);
                     }
                 });

        } else {
            alert('something went wrong');
        }

    });

    $('#exampleModal').on('hidden.bs.modal', function(event) {
        var modal = $(this)
        var childNodes = modal.find('.modal-body').children();
        if (childNodes.length) {
            childNodes.remove();
        }
    })
})

// $(document).ready(function() {
//     console.log('inside js file');
//     $('#newPage').on('show.bs.modal', function(event) {
//             var li = $(event.relatedTarget);
//             console.log(li);
//             var modalImage = li.find('.tile-image').html();
//             console.log(modalImage);
//             var modalTitleSelection = document.querySelector('.card-body'); 
//             console.log(modalTitleSelection);
//             var modalTitle = li.find('h3').html();
//             console.log(modalTitle);
//             var modalContent = li.find('.card-body').html();
//             console.log(modalContent);
//             var modal = $(this)
//             modal.find('.card-image').append(modalImage)
//             modal.find('.card-heading').append(modalTitleSelection)
//             modal.find('.modal-body').append(modalContent)
//     });

//     $('#newPage').on('hidden.bs.modal', function(event) {
//         var modal = $(this)
//         var childNodes = modal.find('.modal-body').children();
//         if (childNodes.length) {
//             childNodes.remove();
//         }
//     })
// })