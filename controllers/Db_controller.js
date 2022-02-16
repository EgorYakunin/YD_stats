const { MongoClient } = require('mongodb')
const { db_connection_url } = require('../config')

class Mongo {
    static client = new MongoClient(db_connection_url)

    /**
     * --- Opening and closing connection to db ---
     */

    static async start_connection() {
        try {
            await this.client.connect()
            console.log('Connection with db established successfully!')
        }
        catch (e) {
            console.log(e)
        }
    }

    static async close_connection() {
        try {
            await this.client.close()
            console.log('The connection to the db was closed!')
        }
        catch (e) {
            console.log(e)
        }
    }

    /**
     * --- Creation methods ---
     *
     * This method inserts whatever object u pass inside into the collection in Green Sharing db
     * @param collection_name
     * @param object - js object that will be stored in db
     * @returns {Promise<void>}
     *
     */
    static async write_one(collection_name, object){
        try{
            await this.start_connection()
            const collection = this.client.db().collection(collection_name.toString())
            await collection.insertOne(object)
            await this.close_connection()
        }
        catch (e) {
            await this.close_connection()
            console.log(e)
        }
    }

    /**
     * Not available yet
     */
    static async write_many(collection_name, object){
        try {
            await this.start_connection()

            const collection = this.client.db().collection(collection_name.toString())
            await collection.insertMany(object)
            await this.close_connection()

        }
        catch (e) {
            await this.close_connection()
            console.log(e)
        }
    }

    /**
     * --- Reading methods ---
     * Do not use if u have more than 100 possible documents
     * @param collection_name
     * @param filter - selection criteria
     * @returns {Promise<Document & {_id: InferIdType<Document>}>}
     */
    static async read_one(collection_name, filter = {}){
        try{
            await this.start_connection()
            const collection = this.client.db().collection(collection_name.toString())

            const data = await collection.findOne(filter)

            await this.close_connection()
            return data
        }
        catch (e) {
            await this.close_connection()
            console.log(e)
        }
    }

    static async read_many(collection_name, filter = {}){
        try{
            await this.start_connection()
            const collection = this.client.db().collection(collection_name.toString())

            const cursor = collection.find(filter)
            const all_values = await cursor.toArray()

            await this.close_connection()
            return all_values
        }
        catch (e) {
            await this.close_connection()
            console.log(e)
        }
    }

    /**
     * --- Updating methods ---
     * @param collection_name - collection name
     * @param filter - selection criteria
     * @param object - object u want to update
     * @returns {Promise<void>}
     */
    static async update_one(collection_name, filter, object){
        try{
            await this.start_connection()
            const collection = this.client.db().collection(collection_name.toString())
            await collection.updateOne(filter, object)
            await this.close_connection()
        }
        catch (e) {
            await this.close_connection()
            console.log(e)
        }
    }

}

module.exports = Mongo