import "reflect-metadata";

import {Contact} from "../../../../main/src/entity/contact/Contact";
import {Connection} from "typeorm";
import * as assert from "assert";
import {getConnection} from "../../../../main/src/entityManager/db/DbConnection";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Type} from "../../../../main/src/entity/Type";


describe('getType orm test', function () {

    beforeEach(() => {
        return getConnection()
            .then(async (connect : Connection) => {
                await connect.dropDatabase();
                await connect.close()
            })
    });

    it('should retrieve getContact', function () {
        let contact : Contact = new Contact("salut");

        return getConnection()
            .then(async (connection : Connection) => {
                let contactRepo = connection.getRepository(Contact);
                await contactRepo.save(contact);
                let entity : Contact = await contactRepo.findOne(contact.getId());
                assert.deepStrictEqual(contact,entity);
                await connection.close();
            })

    });

    it('should retrive contract', function () {
        let contract : Contract = new Contract("type",Type.fragile,new Contact("sal"));

        return getConnection()
            .then(async (connect : Connection) => {
                let contractRepo = await connect.getRepository(Contract);
                await contractRepo.save(contract);
                assert.deepStrictEqual(contract, (await contractRepo.findOne({
                    where : {id : contract.getId},
                    relations : ['contact']
                })));
                await connect.close()
            })
    });
});