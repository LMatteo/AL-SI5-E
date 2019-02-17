import {MongoClient,Db} from "mongodb";

export class MongoHelper {
    // @ts-ignore
    public mongoClient: MongoClient = undefined;
    public host: string;
    public db: Db;
    public count: number;
    public static MAX_RETRY : number= 5;

    constructor(host: string) {
        this.host = host;
        this.count = 0;
    }
    public async initialize(): Promise<void>{
        if(this.mongoClient === undefined){
            this.mongoClient = new MongoClient(this.host,  {useNewUrlParser: true});
        }
        let zis = this;
        await this.mongoClient.connect(async function (err) {
            if (err) {
                if (zis.count === MongoHelper.MAX_RETRY) {
                    console.error("Couldn't connect to mongo database", err);
                    throw err;
                }
                console.log('Failed to connect to mongo on startup - retrying in 5 sec');
                zis.count ++;
                await zis.initialize();
                console.log("todo: try reconnection")
            } else {
                console.log("Connected successfully to server");
                zis.db = zis.mongoClient.db("contracts");
                zis.db.createCollection("contracts",
                    function (err, results) {
                    }
                );

            }
        });
}

}