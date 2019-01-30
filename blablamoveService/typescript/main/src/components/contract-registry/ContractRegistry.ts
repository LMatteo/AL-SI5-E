import {HandleContract} from "./HandleContract";
import {ListContract} from "./ListContract";
import {Type} from "../../entity/Type";
import {ContractStore} from "../../entityManager/local/ContractStore";
import {RegisterInsurer} from "../agency-notifier/RegisterInsurer";
import {Contract} from "../../entity/contract/Contract";
import {Contact} from "../../entity/contact/Contact";
import {AgencyNotifier} from "../agency-notifier/AgengyNotifier";
import {inject, injectable} from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import {ContractDoesNotExist} from "../../error/ContractDoesNotExist";
import {getConnection} from "../../entityManager/db/DbConnection";

@injectable()
export class ContractRegistry implements HandleContract, ListContract{

    @inject(COMPONENT_IDENTIFIER.RegisterInsurer)
    private registerInsurer: RegisterInsurer;

    constructor(){
    }

    async addContract(type: Type, description: string, mail: string): Promise<Contract> {
        let contract : Contract = new Contract(description,type, new Contact(mail));
        let connection = await getConnection();
        let repo = connection.getRepository(Contract);
        await repo.save(contract);
        await connection.close();
        this.registerInsurer.registerInsurerContact(contract);
        return contract;
    }

    async getContractById(id: number): Promise<Contract> {
        let connection = await getConnection();
        let repo = connection.getRepository(Contract);
        let contract : Contract = await repo.findOne({
            where: { id: id },
            relations: ["contact"]
        });
        await connection.close();
        if(contract === undefined){
            throw new ContractDoesNotExist();
        }
        return contract;
    }

    async getContractByType(type: Type): Promise<Array<Contract>>{

        let connection = await getConnection();
        let repo = connection.getRepository(Contract);
        let contracts : Contract[] = await repo.find({
            where: { type: type },
            relations: ["contact"]
        });
        await connection.close();
        return contracts;
    }

    async updateContractDescription(id: number, description: string): Promise<Contract> {
        let contract = await this.getContractById(id);
        contract.getDescription = description;
        let connection = await getConnection();
        let repo = connection.getRepository(Contract);
        await repo.save(contract);
        await connection.close();
        return contract;
    }

    async getAllContract(): Promise<Array<Contract>> {

        let connection = await getConnection();
        let repo = connection.getRepository(Contract);
        let contracts =  await repo.find({
            relations: ["contact"]
        });
        await connection.close();
        return contracts;
    }

}