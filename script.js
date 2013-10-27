$(document).ready(function(){
	var username;
	var firebaseRootRef = new Firebase('https://yihang-chat.firebaseIO.com/chat');

	$("div#chat-input").hide();
	$("div#chat-messages").hide();

	firebaseRootRef.on('child_added', function(snapshot) {
		$("div#chat-messages > ul").append("<li>" + snapshot.val().username + ": " + snapshot.val().message + "</li>")
	});

	$("button#submit-username").click(function() {
		username = $("input#username").val();
		if (username.length) {
			$("div#username-container").hide();
			$("div#chat-input").show();
			$("div#chat-messages").show();
		}
	});

	$("button#submit-chat-message").click(function() {
		var message = $("input#chat-message").val();
		$("input#chat-message").val("");
		firebaseRootRef.push({username: username, message: message});
	});
});
