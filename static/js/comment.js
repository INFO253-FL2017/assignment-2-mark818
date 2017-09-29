var chart = document.getElementById('old-posts');
var title = localStorage.getItem("current");
var comments = [];

function insert(name, comment) {
	var post_name = document.createElement('p');
	post_name.innerHTML = "--" + name;
	post_name.className += 'comment-name';
	var post_comment = document.createElement('p');
	post_comment.innerHTML = comment;
	post_comment.className += 'comment-post';
	chart.appendChild(post_comment); 
	chart.appendChild(post_name); 
	chart.appendChild(document.createElement('hr'));
	parent.postMessage("resize","*");
}

function restore() {
	var storage = localStorage.getItem(title);
	if (storage != null) {
		var old_comments = JSON.parse(storage);
		for (var i = 0; i < old_comments.length; i++) {
			var n = old_comments[i].name;
			var c = old_comments[i].comment;
			insert(n, c);
			comments.push({name:n, comment: c});
		}
	}
}

function post() {
	var n = document.getElementById('name').value;
	var c = document.getElementById('comment').value;
	insert(n, c);
	comments.push({name:n, comment: c});
	localStorage.setItem(title, JSON.stringify(comments));
	document.getElementById('name').value = '';
	document.getElementById('comment').value = '';
}

restore();
