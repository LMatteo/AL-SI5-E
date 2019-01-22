import { InsuranceValidate } from "./InsuranceValidate";
import { PathValidate } from "./PathValidate";
import { Travel } from "../../entity/travel/Travel";
import { injectable } from "inversify";
import { getConnection } from "../../entityManager/db/DbConnection";

@injectable()
export class TravelValidator implements InsuranceValidate, PathValidate {
    insuranceValidate(travel: Travel): Travel {
        travel.$validator.$insuranceValidation = true;
        async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        };
        return travel;
    }
    insuranceInvalidate(travel: Travel): Travel {
        travel.$validator.$insuranceValidation = false;
        async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        };
        return travel;
    }
    pathValidate(travel: Travel): Travel {
        travel.$validator.$pathValidation = true;
        async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        };
        return travel;
    }
    pathInvalidate(travel: Travel): Travel {
        travel.$validator.$pathValidation = false;
        async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        };
        return travel;
    }
}
