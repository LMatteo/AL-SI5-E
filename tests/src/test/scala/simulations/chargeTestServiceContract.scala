package simulations

import java.util.UUID

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.concurrent.duration._
import scala.language.postfixOps

class chargeTestServiceContract extends Simulation {

  val httpConf =
    http
      .baseURL("http://localhost:9090/blabla-move-backend/")
      .acceptHeader("application/json")
      .header("Content-Type", "application/json")

  val stressSample =
    scenario("CreateContract")
      .repeat(10)
      {
        exec(session =>
          session.set("id", UUID.randomUUID().toString)
        )
          .exec(
            http("Add contract")
              .post("cont")
              .body(StringBody(session => buildContract(session)))
              .check(status.is(200))
          )
          .pause(1 seconds)
          .exec(
          http("Consult All Contract Hightech")
            .get("contracts/hightech")
            .check(status.is(200))
          )
      }

  def buildContract(session: Session): String = {
    val id = session("id").as[String]
    raw"""{
          "contract":{
          "typeName":"hightech",
          "description":"Pour les objets HIGHTECH",
          "mail":"lassureur@bg.06"
          }
    }""""
  }



  setUp(stressSample.inject(rampUsers(20) over (10 seconds)).protocols(httpConf))

}
