// send a request to delete an availbility slot 
function deleteSlot(id) {
    var request = $.ajax({
        type: "POST",
        url: "/api/client/delete-slot",
        data: JSON.stringify({
            "slotID": id,
        }),
        contentType: 'application/json;charset=UTF-8'
    });
    request.done(function (response) {
        if (response == "success") {
            $("#slot-cards").load(location.href + " #slot-cards");
            $("#booking-cards").load(location.href + " #booking-cards");
        } else {
            console.log(response)
        }
    })
}
//add window event listener for when content is loaded 
window.addEventListener(
    'DOMContentLoaded', () => {
        const addBtn = document.querySelector("#add-slot");
        const addSlot = document.querySelector("#add-slot-confirm");
        const addSlotModal = document.querySelector("#add-slot-overlay")
        const closeEditModal = document.querySelector("#close-overlay")
        const acceptBookingBtn = document.querySelector("#accept-booking")
        const rejectBookingBtn = document.querySelector("#reject-booking")
        //add event listeners for button clicks 
        addBtn.addEventListener("click", () => {
            addSlotModal.classList.remove("hidden")
        })
        if (acceptBookingBtn != null) {
            
            acceptBookingBtn.addEventListener("click", () => {
                handleBookingRequest("accept",acceptBookingBtn.value)
            })
            rejectBookingBtn.addEventListener("click", () => {
                handleBookingRequest("reject",rejectBookingBtn.value)
            })
        }
        closeEditModal.addEventListener("click", () => {
            addSlotModal.classList.add("hidden")
        })
        addSlot.addEventListener("click", () => {
            startDate = $("#start-date").val()
            endDate = $("#end-date").val()
            price = $("#slot-price").val()
            startTime = $("#start-time").val()
            endTime = $("#end-time").val()
            id = $("#table-selector").val()
            // convert times to correct format 
            if (startTime.includes("PM")) {
                split = startTime.replace(" PM", "").split(":")
                newTime = (parseInt(split[0]) + 12).toString()
                startTime = newTime + ":" + split[1]
                
            } else {
                startTime = startTime.replace(" AM", "")
            }
            if (endTime.includes("PM")) {
                split = endTime.replace(" PM", "").split(":")
                newTime = (parseInt(split[0]) + 12).toString()
                endTime = newTime + ":" + split[1]
                
            } else {
                endTime = endTime.replace(" AM", "")
            }
            // send request to add a new availability slot 
            var request = $.ajax({
                type: "POST",
                url: "/api/client/add-slot",
                data: JSON.stringify({
                    "tableID": id,
                    "start": startDate,
                    "startTime": startTime,
                    "end": endDate,
                    "endTime": endTime,
                    "price": price
                }),
                contentType: 'application/json;charset=UTF-8'
            });
            request.done(function (response) {
                if (response == "success") {
                    $("#slot-cards").load(location.href + " #slot-cards");
                } else {
                    console.log(response)
                }
            })
            
        })
        
    }
)

// handle rejection or accepting a booking request
function handleBookingRequest(type,bookingid) {
    var request = $.ajax({
        type: "POST",
        url: "/api/client/"+type+"-booking",
        data: JSON.stringify({
            "bookingID": bookingid
        }),
        contentType: 'application/json;charset=UTF-8'
    });
    request.done(function (response) {
        if (response == "success") {
            $("#booking-cards").load(location.href + " #booking-cards");
            $("#slot-cards").load(location.href + " #slot-cards");
        } else {
            console.log(response)
        }
    })
}