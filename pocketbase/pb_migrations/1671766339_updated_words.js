migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26h0d9nlxwqvapy")

  // remove
  collection.schema.removeField("qlhggzz8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5nma5a1d",
    "name": "word",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26h0d9nlxwqvapy")

  // add
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

  // remove
  collection.schema.removeField("5nma5a1d")

  return dao.saveCollection(collection)
})
