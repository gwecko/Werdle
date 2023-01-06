migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26h0d9nlxwqvapy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qlhggzz8",
    "name": "word",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 7,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26h0d9nlxwqvapy")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
