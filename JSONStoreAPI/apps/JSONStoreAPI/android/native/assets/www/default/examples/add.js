
/* JavaScript content from examples/add.js in folder common */
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

asyncTest('Add', function () {

	var peopleCollectionName = 'people';
	var ordersCollectionName = 'orders';

	// Object that defines all the collections.
	var collections = {

			// Object that defines the 'people' collection.
			people : {

				// Object that defines the Search Fields for the 'people' collection.
				searchFields : {name: 'string', age: 'integer'}
			},
			
			// Object that defines the 'orders' collection.
			orders : {

				// Object that defines the Search Fields for the 'orders' collection.
				searchFields : {item: 'string'}
			},
	};

	//Destroy first to start with no data and get predictable results in the test
	WL.JSONStore.destroy()

	.then(function () {

		//Open the collection
		return WL.JSONStore.init(collections);
	})

	.then(function () {

		// Data to add, you probably want to get
		// this data from a network call (e.g. Worklight Adapter).
		var data = [{name: 'carlos', age: 10}];

		// Optional options for add.
		var addOptions = {

				// Mark data as dirty (true = yes, false = no), default true.
				markDirty: true
		};

		// Get an accessor to the people collection and add data.
		return WL.JSONStore.get(peopleCollectionName).add(data, addOptions);
	})

	.then(function (dataAdded) {

		deepEqual(dataAdded, 1, 'check add result - people collection');
		
		// Data to add, you probably want to get
		// this data from a network call (e.g. Worklight Adapter).
		var data = [{item: 'candy'}];

		// Optional options for add.
		var addOptions = {

				// Mark data as dirty (true = yes, false = no), default true.
				markDirty: true
		};

		// Get an accessor to the orders collection and add data.
		return WL.JSONStore.get(ordersCollectionName).add(data, addOptions);
	})
	
	.then(function (dataAdded) {
		
		deepEqual(dataAdded, 1, 'check add result - orders collection');
		start();
	})

	.fail(function (errorObject) {
		// Handle failure for any of the previous JSONStore operations (init, add).

		ok(false, "Failed with:" + errorObject.toString());
		start();
	});

});