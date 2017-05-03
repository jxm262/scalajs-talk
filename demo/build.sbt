enablePlugins(ScalaJSPlugin)

name := "Scala.js Demo"

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  "org.scala-js" %%% "scalajs-dom" % "0.9.0",
  "com.github.karasiq" % "scalajs-marked_sjs0.6_2.11" % "1.0.1",
  "be.doeraene" %%% "scalajs-jquery" % "0.9.0",
  "com.lihaoyi" %%% "scalatags" % "0.6.0"
)

jsDependencies ++= Seq(
  "org.webjars.bower" % "leaflet" % "1.0.0-rc.1" / "leaflet.js"
)
