- models: Cat, Dog

- cat routes will start as localhost:8080/cat
- dog routes : localhost:8080/dog

each has the following routes. User cat as example:

- /all get: view all cats 

- /all post: add a new cat document

- /:catName get: to view a specific cat by the name

- /:catName put: to update a cat by name. User $set method so not overwriting existing infor. upsert set to true and multi is set to true

- /:catName delete: to delete a cat by name

-/addfriend/:catName put: add a cat friend. pass a new cat object in the request body. use $push to push a cat object to friends array as embeded document. multi set to true. 

-/addenemy/:catName put: pass a dog's name in the request.body. add an enemy from dogs collection.  multi set to true. Save the objectID to the enemies array as embeded document

Dog routes is not implemented with friend/enemy yet.