
// event listener for when content is loaded 
window.addEventListener(
    'DOMContentLoaded', () => {
        const addModal = document.querySelector("#add-table-overlay");
        const closeBtn = document.querySelector("#close-overlay");
        const addBtn = document.querySelector("#add-table");
        const openModal = document.querySelector("#add-button");
        const logout = document.querySelector("#logout");

        // event listeners for button clicks
        closeBtn.addEventListener('click', () => {
            addModal.classList.add("hidden")
        })
        openModal.addEventListener("click", () => {
            addModal.classList.remove("hidden")
        })
        addBtn.addEventListener("click", () => {
            addTable($("#alias").val(), $("#capacity").val(), addModal)
        })
        logout.addEventListener("click", () => {
            logoutUser()
        })
    }
)
var table = null;
var capacity = null;
var alias = null;

// request the api end point for logging out a user and redirect to login page
function logoutUser() {
    var request = $.ajax({
        type: "GET",
        url: "/api/logout",
        contentType: 'application/json;charset=UTF-8'
    });
    request.done(function (response) {
        if (response) {
            window.location=response
        } else {
            // error
        }
    })
}

// open edit modal and populate capacity and alias 
function openEditModal(current_table, current_capacity, current_alias) {
    table = current_table
    capacity = current_capacity
    alias = current_alias

    const editModal = document.querySelector("#edit-table-overlay");
    $("#editCapacity").val(capacity)
    $("#editAlias").val(alias)
    editModal.classList.remove("hidden")
}

// close the edit modal 
function closeEditModal() {
    const editModal = document.querySelector("#edit-table-overlay");
    editModal.classList.add("hidden")
}

// request the deletion of a table from the backend
function deleteTable() {
    var request = $.ajax({
        type: "POST",
        url: "/api/client/delete-table",
        data: JSON.stringify({
            "tableID": table,
        }),
        contentType: 'application/json;charset=UTF-8'
    });
    request.done(function (response) {
        if (response == "success") {
            closeEditModal()
            // refresh table contents 
            $("#tables").load(location.href + " #tables");
        } else {
            console.log(response)
        }
    })
    
}

// send request to make a new table to backend 
function addTable(alias, capacity, modal) {
    var request = $.ajax({
        type: "POST",
        url: "/api/client/add-table",
        data: JSON.stringify({
            "alias": alias,
            "capacity": capacity
        }),
        contentType: 'application/json;charset=UTF-8'
    });
    request.done(function (response) {
        if (response == "success") {
            // refresh table contents and hide modal
            $("#tables").load(location.href + " #tables");
            modal.classList.add("hidden")
            $("#alias").val("")
            $("#capacity").val("")
        } else {
            console.log(response)
        }
    })
}
// send request to update details of a table
function updateTable() {
    var request = $.ajax({
        type: "POST",
        url: "/api/client/update-table",
        data: JSON.stringify({
            "tableID": table,
            "capacity": $("#editCapacity").val(),
            "alias": $("#editAlias").val()
        }),
        contentType: 'application/json;charset=UTF-8'
    });
    request.done(function (response) {
        if (response == "success") {
            // refresh table contents and close modal 
            $("#tables").load(location.href + " #tables");
            closeEditModal()
        } else {
            console.log(response)
        }
    })
}
