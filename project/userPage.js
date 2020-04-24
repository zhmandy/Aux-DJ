$(document).ready(function() {
	var ID = getUrlVars()["id"];
	var flag = getUrlVars()["flag"];
	console.log(ID);
	console.log(flag);

	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
	        vars[key] = value;
	    });
	    return vars;
	}

	$(".RID").text("ID: " + ID);

	if (flag == 'user') {
		console.log("remove");
		$(".footer").remove();
		$(".delete").remove();
		$("#sortable").removeAttr("id");
		$('.ep').remove();
	} 

	$("#sortable").sortable();
	$(".btn-outline-secondary").popover();

	// Struct
	function Song(songName, albumName, singerName, albumCover,source){
		this.songName = songName;
		this.albumName = albumName;
		this.singerName = singerName;
		this.albumCover = albumCover;	
		this.source = source;
	}

	song1 = new Song("Roundabout","Fragile","Yes","Roundabout.jpg","Roundabout.mp3");
	song2 = new Song("Viva La Vida","Viva La Vida or Death and All His Friends","Coldplay","Viva La Vida.jpg","Viva La Vida.mp3");
	song3 = new Song("Something Just Like This","Memories...Do Not Open","Coldplay/The Chainsmokers", "Something Just Like This.png","Something Just Like This.mp3");
	song4 = new Song("Take It From Me", "Say I Am You","The Weepies", "Take It From Me.jpg","Take It From Me.mp3");
	song5 = new Song("Lucy in the Sky with Diamonds", "Sgt. Pepper's Lonely Hearts Club Band", "The Beatles", "Lucy in the Sky with Diamonds.jpg","Lucy in the Sky with Diamonds.mp3");
	song6 = new Song("It is My Life","Crush","Bon Jovi","It is My Life.jpg","It is My Life.mp3");

	var songs = [song1, song2, song3, song4, song5, song6]

	function getRecommendations() {
		$('.page-all').empty();
		songs.forEach(function(song) {
			var item = " \
			<div class='row rec'> \
				<div class='col-1'> \
					<img class='footer-pic play' src='songs/" + song.albumCover + "' width='50px'> \
				</div> \
				<div class='col-4'> \
					<div class='footer-song play'>" + song.songName + "</div> \
					<div class='footer-singer play'>" + song.singerName + "</div> \
				</div> \
			</div> \
			";

			$('.page-all').append(item);
		});
		$('.page-all').append("<br>");
		$('.page-all').append("<br>");
		$('.page-all').append("<br>");
		$('.page-all').append("<br>");
	}

	$('#searchInput').keypress(function(event) {
		if (event.which == 13) {
			var keyword = $('#searchInput').val();
			if (keyword == '') {
				return false;
			}
			var toAdd;
			songs.forEach(function(song) {
				if (song.songName == keyword) {
					toAdd = song;
				}
			});

			if ($('#list-current li').length == 0) {
				var item = "\
				<li class='list-group-item active current'> \
					<div class='row'> \
						<div class='col-2'> \
							<img class='list-pic' src='songs/" + toAdd.albumCover + "' width='80px'> \
						</div> \
						<div class='col-8 list-meta'> \
							<div class='list-song'>" + toAdd.songName + "</div> \
							<div class='list-siner'>" + toAdd.singerName + "</div> \
							<div class='list-album'>" + toAdd.albumName + "</div> \
						</div> \
					</div> \
				</li>";

				$('#list-current').append(item);
				$('.footer-pic.play').attr('src', 'songs/' + toAdd.albumCover);
				$('.footer-song.play').text(toAdd.songName);
				$('.footer-singer.play').text(toAdd.singerName);
				$('.footer-album.play').text(toAdd.albumName);
				$('#music').attr('src', 'songs/' + toAdd.source);

				$('.page-pic').attr('src', 'songs/' + toAdd.albumCover);
				$('.page-song').text(toAdd.songName);
				$('.page-singer').text(toAdd.singerName);
				$('.page-album').text(toAdd.albumName);
			} else {
				var item = "\
				<li class='list-group-item'> \
					<div class='row'> \
						<div class='col-2'> \
							<img class='list-pic' src='songs/" + toAdd.albumCover + "' width='80px'> \
						</div> \
						<div class='col-8 list-meta'> \
							<div class='list-song'>" + toAdd.songName + "</div> \
							<div class='list-siner'>" + toAdd.singerName + "</div> \
							<div class='list-album'>" + toAdd.albumName + "</div> \
						</div> \
						<div class='col-2 delete'><img src='https://img.icons8.com/ios/50/000000/delete-forever.png' width='30px'> \
						</div> \
					</div> \
				</li>";
				$('.waitlist').append(item);
			}

			getRecommendations();

			if (flag == 'user') {
				$(".delete").remove();
			}
			
			$('#searchInput').val('');
			return false;
		}
	});

	$('.waitlist').on('click', 'div.delete', function() {
		console.log("here");
		$(this).closest('li').remove();
	});

	function changeToNext() {
		var next_li = $('.waitlist li')[0];
		var next_name = $(next_li).find('.list-song').text();
		var toAdd;
		songs.forEach(function(song) {
			if (song.songName == next_name) {
				toAdd = song;
			}
		});

		console.log(toAdd);

		$('#list-current').empty();
		$(next_li).remove();

		var item = "\
		<li class='list-group-item active current'> \
			<div class='row'> \
				<div class='col-2'> \
					<img class='list-pic' src='songs/" + toAdd.albumCover + "' width='80px'> \
				</div> \
				<div class='col-8 list-meta'> \
					<div class='list-song'>" + toAdd.songName + "</div> \
					<div class='list-siner'>" + toAdd.singerName + "</div> \
					<div class='list-album'>" + toAdd.albumName + "</div> \
				</div> \
			</div> \
		</li>";

		$('#list-current').append(item);
		$('.footer-pic.play').attr('src', 'songs/' + toAdd.albumCover);
		$('.footer-song.play').text(toAdd.songName);
		$('.footer-singer.play').text(toAdd.singerName);
		$('.footer-album.play').text(toAdd.albumName);
		$('#music').attr('src', 'songs/' + toAdd.source);

		$('.page-pic').attr('src', 'songs/' + toAdd.albumCover);
		$('.page-song').text(toAdd.songName);
		$('.page-singer').text(toAdd.singerName);
		$('.page-album').text(toAdd.albumName);

		getRecommendations();
	}

	$('#skip').click(function() {
		changeToNext();
	});

	$('#music').on('ended', function() {
		changeToNext();
	});

	$('.ep').click(function() {
		window.location.href = "Login.html";
	});
});
