  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-ej2WOoj9H8sksa3YN2FjWgse0cm4rck",
    authDomain: "booksreact.firebaseapp.com",
    databaseURL: "https://booksreact.firebaseio.com",
    projectId: "booksreact",
    storageBucket: "booksreact.appspot.com",
    messagingSenderId: "780293877411"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

  $("#add-train-btn").on("click", function() {
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var firstTrain = $("#first-train-input")
      .val()
      .trim();
    var frequency = $("#frequency-input")
      .val()
      .trim();

    var train = {
        name: trainName,
        dest: destination,
        first: firstTrain,
        freq: frequency
    }

    database.ref().push(train);

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#first-train-input").val("")
    $("#frequency-input").val("")

    return false
  })

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    let train =  {
        name: childSnapshot.val().name,
        dest: childSnapshot.val().dest,
        first: childSnapshot.val().first,
        freq: childSnapshot.val().freq
    }
    let timeArr = train.first.split(":")
    let trainTime = moment().hours(timeArr[0]).minutes(timeArr[1])
    let max = moment.max(moment(),trainTime)
    let tmins,tarrive;

    if(max === trainTime) {
        tarrive = trainTime.format("hh:mm A");
        tmins = trainTime.diff(moment(), "minutes")
    } else {
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % train.freq;
        tmins = train.freq - tRemainder;
        tarrive = moment().add(tmins, "m").format("hh:mm A");
    }

    $("#train-table > tbody").append(
        $("<tr>").append(
          $("<td>").text(train.name),
          $("<td>").text(train.dest),
          $("<td>").text(train.freq),
          $("<td>").text(tarrive),
          $("<td>").text(tmins)
        )
      );
    
})
