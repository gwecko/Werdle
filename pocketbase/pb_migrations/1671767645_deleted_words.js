migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ms28kwd6eq2frjc");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ms28kwd6eq2frjc",
    "created": "2022-12-23 03:43:38.036Z",
    "updated": "2022-12-23 03:43:54.753Z",
    "name": "words",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "r5bka3lz",
        "name": "word",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zz1mh5iw",
        "name": "word_number",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
