migrate((db) => {
  const collection = new Collection({
    "id": "b6cvbefjllkfhwm",
    "created": "2022-12-23 03:54:32.796Z",
    "updated": "2022-12-23 03:54:32.796Z",
    "name": "words",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kq5qicuy",
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
        "id": "lvw8jzsi",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b6cvbefjllkfhwm");

  return dao.deleteCollection(collection);
})
