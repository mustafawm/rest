module.exports = function(express, Book) {
	var bookRouter = express.Router();
    var booksController = require('../controllers/booksController')(Book);    

    // middleware
    bookRouter.use('/:id', function(req, res, next) {
    	Book.findById(req.params.id, function(err, book) {

			if (err) {
				res.status(500).send(err);
			} else if (book){
				req.book = book;
				next();
			} else {
				res.status(404).send('No book found');
			}
		});
    });

	// All (index)
	bookRouter.route('/')		
		.get(booksController.getIndex)

		.post(booksController.postBook)

	// Single book (by ID)
	bookRouter.route('/:id')
		.get(booksController.getByID)

		.put(booksController.putByID)

		.patch(booksController.patchByID)

		.delete(booksController.deleteByID);


	return bookRouter;
};