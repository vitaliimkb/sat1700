$("#activity").hide();

let types = [
    "education", "recreational", 
    "social", "diy", "charity", 
    "cooking", "relaxation", "music", 
    "busywork"
]

$.each(types, function(index, type) {
    $("#types").append(`
        <label for="${type}">${type.toUpperCase()}</label>
        <input type="radio" id="${type}" 
            value="${type}" name="type">
    `);
});

$("#btn").click(function () {
    let params = $("#filters").serialize();
    let url = "http://www.boredapi.com/api/activity/?" + params;
    $(this).attr("disabled", true);
    $.ajax(url, {
        success: function(result) {
            $("#activity").show();
            $("#activity").html(`
                <p>Activity: ${result.activity}</p>
                <p>Price: ${result.price}$</p>
                <p>Participants: ${result.participants}</p>
                <p>Type: ${result.type}</p>
            `);
            $("#btn").attr("disabled", false);
            $("#btn").html("Randomize again");
        },
        error: function(result) {
            alert(result.statusText);
            $("#btn").attr("disabled", false);
        }
    });
});