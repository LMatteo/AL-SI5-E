import "reflect-metadata";
import "typeorm"
//import "../../../../main/src/entityManager/db/CreateConnection"
import {createConnection, getConnection, getConnectionManager, getManager, getRepository} from "typeorm";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Contact} from "../../../../main/src/entity/contact/Contact";


describe("connection test db", function(){

    before(async () => {
        try {
            await createConnection()
        } catch (e) {
            await getConnection().synchronize(true)
        }
    });

    after(async () =>{
        await getConnection().dropDatabase();
    });

    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });

    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });
    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });
    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });
    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });
    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });
    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });
    it('should save obj', async function () {
        let contact = new Contact("salut");
        let repo = getRepository(Contact);
        await repo.save(contact);

    });
});