// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqUjGdjNpK40i2mNuUnqhF3DMKwQgp2y0",
  authDomain: "transport-1aadc.firebaseapp.com",
  databaseURL: "https://transport-1aadc-default-rtdb.firebaseio.com",
  projectId: "transport-1aadc",
  storageBucket: "transport-1aadc.appspot.com",
  messagingSenderId: "643897797184",
  appId: "1:643897797184:web:7a325d4c24a15f06c90da5",
  measurementId: "G-17LWZCCTNS"
};

firebase.initializeApp(firebaseConfig);
console.log(firebase);
function savePartyToFirebase(){
	var uniqueIDkey = new Date().getTime().toString();
	var PartyName = $("#txtPartyName").val();
    var PageNo =    $("#txtPageNo").val();

	firebase.database().ref("/").child('test').child(uniqueIDkey).update({
		key : uniqueIDkey,
		PartyName: PartyName,
		PageNo : PageNo
	});
	alert("added successfully");
	 $("#txtPartyName").val("");
   $("#txtPageNo").val("");
}

function get(){
	var database = firebase.database();
	var party_ref = database.ref('test');
	party_ref.on('value',function(snapshot){
		var totalCount = 0;
		if(snapshot.exists()){
        var content = '<tr><th>Party Name</td><th>Page No</td><td>Action</td></tr>';
			
        snapshot.forEach(function(data){
			console.log(data.val());
			totalCount+=1
            var PartyName = data.val().PartyName;
            var PageNo= data.val().PageNo;
			var key = data.val().key;
            content += '<tr>';
            content += '<td>' + PartyName + '</td>'; //column1
            content += '<td>' + PageNo + '</td>';//column2
            content += '<td><input type="button" value="Edit" onclick="editParty('+key+')"</td>';//column2
            content += '</tr>';
        });

        $('#ex-table').append(content);
		console.log("total count = "+totalCount);
		if(totalCount>0)
		{
		$("#totalCount").text( totalCount + " records found ");
		}else{$("#totalCount").text(" No records found ");}

    }
	});
}
$(document).ready(function() {
	var database = firebase.database();
get();
});
function editParty(key){
		var database = firebase.database();	
		var editParty_ref = database.ref('test/'+key);
	editParty_ref.on('value',function(snapshot){
		var totalCount = 0;
		if(snapshot.exists()){
			
        snapshot.forEach(function(data){
			console.log(data.val());
			
        });}})
	
}
