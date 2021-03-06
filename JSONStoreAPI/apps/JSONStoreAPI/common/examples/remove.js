/*
 *
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

 */

asyncTest('Remove', function () {

	var collectionName = 'people';

	//Destroy first to start with no data and get predictable results in the test
	WL.JSONStore.destroy()

	.then(function () {

		// Object that defines all the collections.
		var collections = {

				// Object that defines the 'people' collection.
				people : {

					// Object that defines the Search Fields for the 'people' collection.
					searchFields : {name: 'string', age: 'integer'}
				}
		};

		//Open the collection
		return WL.JSONStore.init(collections);
	})

	.then(function () {
		//Add data
		return WL.JSONStore.get(collectionName).add([{name: 'carlos', age: 10}, {name: 'mike', age: 5}]);
	})

	.then(function () {

		// Remove all documents that match the queries.
		var queries = [{_id: 1, json:{}}];

		var options = {

				// Exact match (true) or fuzzy search (false), default fuzzy search.
				exact: true,

				// Mark data as dirty (true = yes, false = no), default true.
				markDirty: true
		};

		return WL.JSONStore.get(collectionName).remove(queries, options);
	})

	.then(function (numberOfDocumentsRemoved) {

		deepEqual(numberOfDocumentsRemoved, 1, 'check number of documents removed');
		start();
	})

	.fail(function (errorObject) {
		// Handle failure.

		ok(false, "Failed with:" + errorObject.toString());
		start();
	});

});
