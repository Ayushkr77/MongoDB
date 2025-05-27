// show dbs

// use school // if this db exists, it will switch to it and if not, it will create it

db.createCollection("students") 
db.dropDatabase()






// insert documents

// use school


db.students.insertOne({name:"Spongebob", age:30, gpa: 3.2})   // if collection students doesnt exist, it will create it and insert the document

db.students.insertMany([{name:"Patrick", age:38, gpa: 1.5},  
		                             {name:"Sandy", age:27, gpa: 4.0},
		                             {name:"Gary", age:18, gpa: 2.5}])





 
                                     
// data types
db.students.insertOne(
{
  name: "Larry",
  age: 32,
  gpa: 2.8,
  fullTime: false,
  registerDate: new Date(), 
  graduationDate: null,
  courses:["Biology", "Chemistry", "Calculus"],
  address:{street:"123 Fake St.", 
                  city:"Bikini Bottom", 
                  zip: 12345} 
}
)






// sorting and limiting

db.students.find()
db.students.find().sort({name: 1})  // sort ascending by name
db.students.find().sort({name: -1}) // sort descending by name
db.students.find().sort({gpa: 1})
db.students.find().sort({gpa: -1})
db.students.find().limit(1)
db.students.find().limit(3)
db.students.find().sort({gpa: -1}).limit(1)
db.students.find().sort({gpa: -1}).limit(3)







// find documents

db.students.find({name: "Spongebob"})
db.students.find({gpa: 4.0})
db.students.find({fullTime: false})

// 2 parameters filter and projection, where projection is optional 
db.students.find({}, {name: true})  // The first {} is the filter → means no filter, so it matches all documents. The second { name: true } is the projection → it tells MongoDB to include only the name field (and _id by default).
db.students.find({}, {_id:false, name: true}) // if u want to exclude id
db.students.find({}, {_id: false, name: true, gpa: true})

db.students.find({name:"Spongebob"}, {_id: false, name: true, gpa: true})  // Filter Part ({ name: "Spongebob" })This looks for documents where the name field is exactly "Spongebob".    Projection Part ({ _id: false, name: true, gpa: true }) This includes only the name and gpa fields. It excludes the _id field (which is shown by default unless you turn it off).







// update documents  
// parameters (filter, update)
db.students.updateOne({name:"Spongebob"}, {$set:{fullTime:true}})   // Adds a new field fullTime: true, or updates it if it already exists.
db.students.updateOne({_id: ObjectId("642c0e70985f18e1bcf24d35")}, {$set:{fullTime:false}})
db.students.updateOne({_id: ObjectId("642c0e70985f18e1bcf24d35")}, {$unset:{fullTime:""}})  // Deletes a field from document

db.students.updateMany({}, {$set:{fullTime:false}})

db.students.updateOne({name:"Gary"}, {$unset:{fullTime:""}})
db.students.updateOne({name:"Sandy"}, {$unset:{fullTime:""}})


db.students.updateMany({fullTime:{$exists:false}}, {$set:{fullTime:true}})   // filter: This finds all documents in the students collection that do not have the fullTime field. update: For each of those documents, it adds a fullTime field with the value true.








// delete documents
// before deleting, make sure u first export collection and after deletion u can import it

db.students.deleteOne({name:"Larry"})
db.students.deleteMany({fullTime:false})
db.students.deleteMany({registerDate:{$exists:false}})   // Deletes all documents in the students collection where the registerDate field does NOT exist.



// to delete a collection
// db.students.drop()

db.students.find()


// In case if u have not imported the json file from mongodb compass
db.students.insertMany([
  {
    _id: ObjectId("6835dd687688ce78cf1be809"),
    name: "Spongebob",
    age: 30,
    gpa: 3.2,
    fullTime: false
  },
  {
    _id: ObjectId("6835dd6fa3c2c35349fc23a6"),
    name: "Patrick",
    age: 38,
    gpa: 1.5,
    fullTime: false
  },
  {
    _id: ObjectId("6835dd6fa3c2c35349fc23a7"),
    name: "Sandy",
    age: 27,
    gpa: 4
  },
  {
    _id: ObjectId("6835dd6fa3c2c35349fc23a8"),
    name: "Gary",
    age: 18,
    gpa: 2.5
  },
  {
    _id: ObjectId("6835de97284fd1cdaaf914fb"),
    name: "Larry",
    age: 32,
    gpa: 2.8,
    fullTime: false,
    registerDate: new Date("2025-05-27T15:47:35.812Z"),
    graduationDate: null,
    courses: ["Biology", "Chemistry", "Calculus"],
    address: {
      street: "123 Fake St.",
      city: "Bikini Bottom",
      zip: 12345
    }
  }
])








// comparison operators

db.students.find({name:{$ne:"Spongebob"}})   // not equal. u can also use lt, gt,...  if u use lt, then Finds all documents where the name field is lexicographically less than "Spongebob".
db.students.find({age:{$lt:20}})
db.students.find({age:{$lte:27}})
db.students.find({age:{$gt:27}})
db.students.find({age:{$gte:27}})

// more than one, here name and gpa
db.students.find({
  name: { $ne: "Spongebob" },
  gpa: { $lt: 4 }
})


db.students.find({gpa:{$gte:3, $lte:4}})  // Finds all documents where the gpa field is greater than or equal to 3 AND less than or equal to 4.

db.students.find({name:{$in: ["Spongebob", "Patrick", "Sandy"]}})   // Finds all documents where the name field is either "Spongebob", "Patrick", or "Sandy".

db.students.find({name:{$nin: ["Spongebob", "Patrick", "Sandy"]}})








// logical operators
// logical operators return data based on expressions that evaluate to true or false
// and, not, nor, or

db.students.find({$and: [{fullTime:true}, {age:{$lte:22}}]})
db.students.find({$or: [{fullTime:true}, {age:{$gte:22}}]})
db.students.find({$nor: [{fullTime:true}, {age:{$lte:22}}]})
db.students.find({age:{$not:{$gte:30}}})









// indexes
// indexes support the efficient execution of queries in mongodb. Without indexes, mongodb must perform a full collection scan, i.e., scan every document in a collection, to select those documents that match the query statement. If an appropriate index exists for a query, mongodb can use the index to limit the number of documents it must inspect.
// It slows insert, update and delete operations. It helps in quick lookup. So, apply indexes when u are doing a lot of searching.

db.students.find({name:"Larry"}).explain("executionStats")  // see totalDocsExamined


db.students.createIndex({name: 1})

db.students.find({name:"Larry"}).explain("executionStats")  // now see totalDocsExamined

db.students.getIndexes()  // indexes are applied to id by default and we have added index to name

db.students.dropIndex("name_1")

db.students.getIndexes()







// collections
db.createCollection("teachers", {capped : true , size : 1000 * 1024, max : 100}, {autoIndexId:false})

// capped = Enables a capped collection. Oldest entries are overwritten when the collection reaches its max size.
// size = specifies the maximum size in bytes (x * y bytes)
// max = maximum number of documents allowed
// autoIndexId = Creates an index on _id field




// Also see     https://github.com/rijnasdev/mongo_practice