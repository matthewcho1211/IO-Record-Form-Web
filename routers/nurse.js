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
const websiteIp = parsedIni.IP.WEBSITE_IP

// 配置 bodyParser 以解析 urlencoded 和 json 數據
app.use(bodyParser.json());

// define nurse information
let name;
let employee_id;
// define patient info
let record_id;
let patient_name;

router.get("/login", function (req, res) {
  res.render("nurse_login");
});

router.post("/login", encoder, async function (req, res) {
  let account = req.body.account;
  let password = req.body.password;
  let login;

  await axios
    .get(`http://${ip}/api/nurse/${account}/${password}`)
    .then((res) => {
      if (res.data == "Account not found") {
        login = false;
      } else {
        name = res.data[0][0];
        employee_id = res.data[0][1];
        login = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  if (login == true) {
    res.redirect("/nurse/patient");
  } else {
    res.redirect("/nurse/login");
  }
});

router.get("/patient", function (req, res) {
  res.render("nurse_patient", { ip: ip, name: name, employee_id: employee_id , websiteIp: websiteIp});
});

router.get("/select", function (req, res) {
  res.render("select_page", {
    record_id: record_id,
    patient_name: patient_name
  });
});

router.post("/select", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "input") {
    res.redirect("/nurse/select/input/solid");
    res.end();
  } else if (kind == "output") {
    res.redirect("/nurse/select/output/poop");
    res.end();
  }
});

router.post("/patient", encoder, function (req, res) {
  record_id = req.body.record_id;
  patient_name = req.body.patient_name;
  console.log(record_id, patient_name);
  res.redirect("/nurse/select");
});

router.get("/select/input/solid", function (req, res) {
  res.render("nurse_input_solid", {
    ip: ip,
    record_id: record_id,
    patient_name: patient_name,
  });
});

router.post("/select/input/solid", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/nurse/select");
    res.end();
  } else if (kind == "solid") {
    res.redirect("/nurse/select/input/solid");
    res.end();
  } else if (kind == "liquid") {
    res.redirect("/nurse/select/input/liquid");
    res.end();
  }
});

router.get("/select/input/liquid", function (req, res) {
  res.render("nurse_input_liquid", {
    ip: ip,
    record_id: record_id,
    patient_name: patient_name,
  });
});

router.post("/select/input/liquid", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/nurse/select");
    res.end();
  } else if (kind == "solid") {
    res.redirect("/nurse/select/input/solid");
    res.end();
  } else if (kind == "liquid") {
    res.redirect("/nurse/select/input/liquid");
    res.end();
  }
});

router.get("/select/output/poop", function (req, res) {
  res.render("nurse_output_poop", {
    ip: ip,
    record_id: record_id,
    patient_name: patient_name,
  });
});

router.post("/select/output/poop", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/nurse/select");
    res.end();
  } else if (kind == "poop") {
    res.redirect("/nurse/select/output/poop");
    res.end();
  } else if (kind == "pee") {
    res.redirect("/nurse/select/output/pee");
    res.end();
  } else if (kind == "vomit") {
    res.redirect("/nurse/select/output/vomit");
    res.end();
  }
});

router.get("/select/output/pee", function (req, res) {
  res.render("nurse_output_pee", {
    ip: ip,
    record_id: record_id,
    patient_name: patient_name,
  });
});

router.post("/select/output/pee", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/nurse/select");
    res.end();
  } else if (kind == "poop") {
    res.redirect("/nurse/select/output/poop");
    res.end();
  } else if (kind == "pee") {
    res.redirect("/nurse/select/output/pee");
    res.end();
  } else if (kind == "vomit") {
    res.redirect("/nurse/select/output/vomit");
    res.end();
  }
});

router.get("/select/output/vomit", function (req, res) {
  res.render("nurse_output_vomit", {
    ip: ip,
    record_id: record_id,
    patient_name: patient_name,
  });
});

router.post("/select/output/vomit", encoder, function (req, res) {
  let kind = req.body.kind;
  if (kind == "select") {
    res.redirect("/nurse/select");
    res.end();
  } else if (kind == "poop") {
    res.redirect("/nurse/select/output/poop");
    res.end();
  } else if (kind == "pee") {
    res.redirect("/nurse/select/output/pee");
    res.end();
  } else if (kind == "vomit") {
    res.redirect("/nurse/select/output/vomit");
    res.end();
  }
});

router.get("/patient/qrcode", function (req, res) {
  res.render("nurse_qrcode", { websiteIp: websiteIp});
});

module.exports = router;
