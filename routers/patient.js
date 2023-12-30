const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const fs = require("fs");
const ini = require("ini");
const axios = require("axios");

const iniData = fs.readFileSync("config.ini", "utf-8");
const parsedIni = ini.parse(iniData);
const ip = parsedIni.IP.SERVER_IP;

app.use(bodyParser.json());

let recordId;
let patientName;

// verticattion
router.get("/vertification/:record_id", function (req, res) {
  recordId = req.params.record_id;
  res.redirect("/patient/vertification");
});

router.get("/vertification", function (req, res) {
  res.render("patient_login");
});

router.post("/vertification", encoder, async function (req, res) {
  let verticattionNumber = req.body.password;
  let login;

  await axios
    .get(`http://${ip}/api/vertification/${recordId}/${verticattionNumber}`)
    .then((res) => {
      if (res.data == "Correct") {
        login = true;
      } else {
        login = false;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  if (login == true) {
    res.redirect("/patient/select");
  } else {
    res.redirect("/patient/vertification");
  }
});

// select
router.get("/select", async function (req, res) {

  await axios
    .get(`http://${ip}/api/patient/${recordId}`)
    .then((res) => {
      let data = res.data.toString()
      patientName = res.data.toString().split(',')[3]
    })
    .catch((error) => {
      console.log(error)
    })

  res.render("patient_select_page", { record_id: recordId, patient_name: patientName });
});

router.post("/select", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "input") {
    res.redirect("/patient/select/input/solid");
    res.end();
  } else if (kind == "output") {
    res.redirect("/patient/select/output/poop");
    res.end();
  }
});

//input
router.get("/select/input/solid", function (req, res) {
  res.render("patient_input_solid", { record_id: recordId, ip: ip });
});

router.post("/select/input/solid", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/patient/select");
    res.end();
  } else if (kind == "solid") {
    res.redirect("/patient/select/input/solid");
    res.end();
  } else if (kind == "liquid") {
    res.redirect("/patient/select/input/liquid");
    res.end();
  }
});

router.get("/select/input/liquid", function (req, res) {
  res.render("patient_input_liquid", { record_id: recordId, ip: ip });
});

router.post("/select/input/liquid", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/patient/select");
    res.end();
  } else if (kind == "solid") {
    res.redirect("/patient/select/input/solid");
    res.end();
  } else if (kind == "liquid") {
    res.redirect("/patient/select/input/liquid");
    res.end();
  }
});

//output
router.get("/select/output/poop", function (req, res) {
  res.render("patient_output_poop", { record_id: recordId, ip: ip });
});

router.post("/select/output/poop", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/patient/select");
    res.end();
  } else if (kind == "poop") {
    res.redirect("/patient/select/output/poop");
    res.end();
  } else if (kind == "pee") {
    res.redirect("/patient/select/output/pee");
    res.end();
  } else if (kind == "vomit") {
    res.redirect("/patient/select/output/vomit");
    res.end();
  }
});

router.get("/select/output/pee", function (req, res) {
  res.render("patient_output_pee", { record_id: recordId, ip: ip });
});

router.post("/select/output/pee", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/patient/select");
    res.end();
  } else if (kind == "poop") {
    res.redirect("/patient/select/output/poop");
    res.end();
  } else if (kind == "pee") {
    res.redirect("/patient/select/output/pee");
    res.end();
  } else if (kind == "vomit") {
    res.redirect("/patient/select/output/vomit");
    res.end();
  }
});

router.get("/select/output/vomit", function (req, res) {
  res.render("patient_output_vomit", { record_id: recordId, ip: ip });
});

router.post("/select/output/vomit", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/patient/select");
    res.end();
  } else if (kind == "poop") {
    res.redirect("/patient/select/output/poop");
    res.end();
  } else if (kind == "pee") {
    res.redirect("/patient/select/output/pee");
    res.end();
  } else if (kind == "vomit") {
    res.redirect("/patient/select/output/vomit");
    res.end();
  }
});

module.exports = router;
