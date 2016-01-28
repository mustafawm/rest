module.exports = function(Book) {

	// GET Index (All Books)
	var getIndex = function(req, res) {
		var query = {}; // passing req.query is not a good idea :\

		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		Book.find(query, function(err, books) {

			if(err) console.log(err);
			else res.json(books);
		});
	};

	// POST New book
	var postBook = function(req, res) {
		var book = new Book(req.body);
		book.save();

		res.status(201).send(book);
	};

	/*----------------------------------------
	| Single Book Operations (/:id)
	|----------------------------------------*/
	// GET 
	var getByID = function(req, res) {
		res.json(req.book);
	};

	// PUT 
	var putByID = function(req, res) {
		var book = req.book;
		
		book.title  = req.body.title;
		book.author = req.body.author;
		book.genre  = req.body.genre;
		book.read   = req.body.read;
		
		book.save(function(err) {
			if (err) res.status(500).send(err)
			else res.json(book);
		});
	};

	//PATCH 
	var patchByID = function(req, res) {
		var book = req.book;

		if (req.body._id) delete req.body._id;

		for (var key in req.body) {
			book[key] = req.body[key];
		}

		book.save(function(err) {
			if (err) res.status(500).send(err)
			else res.json(book);
		});

	};

	// DELETE
	var deleteByID = function(req, res) {
		req.book.remove(function(err) {
			if (err) res.status(500).send(err);
			else res.status(204).send('Book removed');
		});
	};


	return {
		getIndex:   getIndex,
		postBook:   postBook,
		getByID:    getByID,
		putByID:    putByID,
		patchByID:  patchByID,
		deleteByID: deleteByID,
	};
};

