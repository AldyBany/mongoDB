const {MongoClient} = require('mongodb')

async function main(){

    const uri = "mongodb+srv://demo:crud123@crud.la91c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    const client = new MongoClient(uri,{ useUnifiedTopology: true })

    try {
        await client.connect()
        // await createMultipleListings(client,[
        //     {
        //         name: "lovely Loft",
        //         summary: "A charming loft in paris",
        //         property_type: "House",
        //         boderooms: 1,
        //         bathrooms: 1,
        //         beds: 5
        //     },
        //     {
        //         name: "Private room in London",
        //         property_type: "Apartment",
        //         boderooms: 1,
        //         bathrooms: 1
        //     },
        //     {
        //         name: "Beautiful Beach House",
        //         summary: "Enjoy relaxed beach living in this house with a private beach",
        //         boderooms: 4,
        //         bathrooms: 2.5,
        //         beds: 7,
        //         last_review: new Date()
        //     },
        // ])
        await findOneListingByName(client, "Infinite Views")
    } catch (error) {
        console.log(error)
    } finally{
        await client.close()
    }

    
}
main().catch(console.error)

async function findOneListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing})

    if(result){
        console.log(`Found a listing in the collection with the name ${nameOfListing}`)
        console.log(result)
    }else{
        console.log(`No listing found with the name of ${nameOfListing}`)
    }
}


async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing)

    console.log(`New listing created with the following id: ${result.insertedId}`)

}

async function createMultipleListings(client, newListings){
    const result =  await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings)

    console.log(`${result.insertedCount} new listings created with the following id(s):`)
    console.log(result.insertedIds)
}

// async function listDatabases(client){
//    const dataList = await client.db().admin().listDatabases()

//    console.log("Databases: ")
//    dataList.databases.forEach(
//        db=>{
//            console.log(`_${db.name}`)
//        }
//    )
// }