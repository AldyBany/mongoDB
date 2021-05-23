const {MongoClient} = require("mongodb")

async function main(){
    const uri = "mongodb+srv://demo:crud123@crud.la91c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    const client = new MongoClient(uri, { useUnifiedTopology: true })

    try {
        await client.connect()
        await dataBasesList(client)

    } catch (error) {
        console.log(error)
    } finally{
        client.close()
    }
}

main().catch(console.error)

async function dataBasesList(client){
    const data = await client.db().admin().listDatabases()

    console.log("Databases: ")
    data.databases.forEach(db=>{
        console.log("Name: ", db.name)
    })
}