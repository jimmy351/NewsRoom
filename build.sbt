name := "newsroom"

version := "1.0"

lazy val `newsroom` = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  javaJdbc , javaEbean , cache , javaWs,
  "com.unboundid" % "unboundid-ldapsdk" % "2.3.6",
  "mysql" % "mysql-connector-java" % "5.1.36",
  "com.google.code.gson" % "gson" % "1.7.1",
  "com.typesafe.play" %% "play-mailer" % "2.4.1",
  "it.innove" % "play2-pdf" % "1.1.2"
)

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  