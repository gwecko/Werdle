migrate((db) => {
  const collection = new Collection({
    "id": "26h0d9nlxwqvapy",
    "created": "2022-12-22 20:31:27.134Z",
    "updated": "2022-12-22 20:31:27.134Z",
    "name": "words",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qlhggzz8",
        "name": "word",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 6,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("26h0d9nlxwqvapy");

  return dao.deleteCollection(collection);
})
