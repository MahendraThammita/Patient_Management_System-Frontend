const scanner = require('sonarqube-scanner');
scanner(
  {
  serverUrl: "http://localhost:9000",
  login:"admin",
  password:"6f248e885f7aeb7729232f7847f97b23004273bb",
  options: {
    "sonar.sources": "./src"
  },
},
() => process.exit()
); 