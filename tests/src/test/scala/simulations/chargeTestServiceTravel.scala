package simulations

import java.util.UUID

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.concurrent.duration._
import scala.language.postfixOps

class chargeTestServiceTravel extends Simulation {

  val httpConf =
    http
      .baseURL("http://localhost:9090/blabla-move-backend/")
      .acceptHeader("application/json")
      .header("Content-Type", "application/json")

  val stressSample =
    scenario("CreateTravel")
      .repeat(10)
      {
        exec(session =>
          session.set("id", UUID.randomUUID().toString)
        )
          .exec(
            http("Add travel")
              .post("travels")
              .body(StringBody(session => buildTravel(session)))
              .check(status.is(200))
          )
          .pause(1 seconds)
          .exec(
            http("Consult All travels")
              .get("travels")
              .check(status.is(200))
          )
      }

  def buildTravel(session: Session): String = {
    val id = session("id").as[String]
    raw"""{
         	"travel":{
         	  "customerName":"Celine",
            "departure":"Paris",
            "destination":"Nice"
          }
    }""""
  }



  setUp(stressSample.inject(rampUsers(20) over (10 seconds)).protocols(httpConf))

}
