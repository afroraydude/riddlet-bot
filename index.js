class RiddletBot {
  constructor(server, token, messageHandler) {
    var keypair = require("keypair")
    this.pair = keypair()
    this.token = token
    this.messageHandler = messageHandler
    this.server = server
    this.serverInfo = null
    this.serverKey = null
    this.token = null
    this.user = null
    this.socket = null
  }

  ServerConnection() {
    const io = require("socket.io-client")

    this.socket = io(this.server)

    if (this.token) {
      this.socket.emit("identification", this.token)
    } else {
      this.socket.emit("noid")
    }

    this.socket.on(
      "serverinfo",
      function (info) {
        this.serverInfo = info
      }.bind(this)
    )

    this.socket.on(
      "identification",
      function (rtoken) {
        if (!this.token) console.log(rtoken.token)
        this.token = rtoken.token
        this.user = rtoken
        this.socket.emit("clientkey", this.pair.public)
      }.bind(this)
    )

    this.socket.on(
      "servkey",
      function (key) {
        this.serverKey = key
      }.bind(this)
    )

    this.socket.on(
      "reconnect",
      function () {
        this.socket.emit("token", this.token)
      }.bind(this)
    )

    this.socket.on(
      "message",
      function (message) {
        if (typeof this.messageHandler === "function") {
          if (this.serverInfo.encrypt === "true") {
            message.data = DecryptMessage(message)
          }
          this.messageHandler(this, message)
        } else {
          console.log(message)
        }
      }.bind(this)
    )
  }

  SendMessage(message, room) {
    var messageData = {
      id: String(Date.now()),
      room: room,
      data: message
    }
    if (this.serverInfo.version < 11) {
      messageData.token = this.token
    } else {
      if (this.serverInfo.encrypt === "true") {
        messageData.data = EncryptMessage(message)
      }
    }
    this.socket.emit("message", messageData)
  }

  EncryptMessage(message) {
    const crypto = require("crypto")
    const buffer = new Buffer(message.data)
    var encrypted = crypto.privateEncrypt(this.pair.private, buffer)
    return encrypted.toString("base64")
  }

  DecryptMessage(message) {
    const crypto = require("crypto")
    try {
      key = key ? key : localStorage.getItem("pubkey")
      const buffer = new Buffer(message, "base64")
      var decrypted = publicDecrypt(this.serverKey, buffer)
      return decrypted.toString("utf8")
    } catch (err) {
      return "decryption err"
    }
  }
}

exports.RiddletBot = RiddletBot