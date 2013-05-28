/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * wire/dojo/data plugin
 * wire plugin that provides a REST resource reference resolver.  Referencing
 * any REST resource using the format: resource!url/goes/here will create a
 * dojo.store.JsonRest pointing to url/goes/here.  Using the id or query
 * options, you can alternatively resolve references to actual data.
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

define(['when'], function(when) {

    /**
     * Reference resolver for "datastore!url" for easy references to
     * legacy dojo/data datastores.
     * 
     * @param resolver
     * @param name
     * @param refObj
     * @param wire
     */
    function dataStoreResolver(resolver, name, refObj, wire) {
        var promise = wire({
            create: {
                module: 'dojo/data/ObjectStore',
                args: {
                    objectStore: {
                        create: {
                            module: 'dojo/store/JsonRest',
                            args: { target: name }
                        }
                    }
                }
            }
		});

		resolver.resolve(promise);
    }

    /**
     * The plugin instance.  Can be the same for all wiring runs
     */
    var plugin = {
        resolvers: {
            datastore: dataStoreResolver
        }
    };

    return {
        wire$plugin: function datastorePlugin(/* ready, destroyed, options */) {
            return plugin;
        }
    };
});