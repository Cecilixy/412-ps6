// routes/ps4.js
const express = require("express")
const router = express.Router()
const request = require("request")
const fetch = require("node-fetch")
const fs = require('fs');

const API_KEY = "q=Boston&aqi=no"
// route using promises and request package
router.post("/route1", (req, res) => {
  const query = req.body
  const url = `https://api.weatherapi.com/v1/current.json?key=9e99fe8822df4c9e8d6131519230904&q=${query.city}&aqi=no`
  const options = {
    method: "GET",
    url: url,
    headers: {
      "User-Agent": "request",
    },
  }

  const promise = new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
        return res.send(body)
      }
    })
  })

  promise
    .then(data => {
      res.render("results", { data: JSON.parse(data) })
      writeFile(data);
      return res.send(data)
    })
    .catch(error => {
      writeFile('');
      res.render("error", { error: error })
    })
})

// route using async/await and node-fetch package
router.post("/route2", async (req, res) => {
  const query = req.body

  const url = `https://api.weatherapi.com/v1/current.json?key=9e99fe8822df4c9e8d6131519230904&q=${query.city}&aqi=no`

  try {
    const response = await fetch(url)
    const data = await response.json()
    if (response.status === 200) {
      writeFile(JSON.stringify(data));
    } else {
      throw new Error();
    }
    return res.send(data)
  } catch (error) {
    writeFile('');
    return res.send(error)
  }
})

// route using callbacks and request package
router.post("/route3", (req, res) => {
  const query = req.body
  const url = `https://api.weatherapi.com/v1/current.json?key=9e99fe8822df4c9e8d6131519230904&q=${query.city}&aqi=no`

  request(url, (error, response, body) => {
    if (error) {
      writeFile('');
      res.render("error", { error: error })
    } else {
      console.log(body);
      writeFile(body);
      return res.send(JSON.parse(body))
    }
  })
})

function writeFile(data) {
  fs.open('../ps6/src/assets/mock.json', 'w', (error, fd) => {
    if (error) return;
    fs.write(fd, data, (error) => {
      if (error) return;
      console.log('写入成功！');
      fs.close(fd, error => {});
    });
  });
}

module.exports = router
