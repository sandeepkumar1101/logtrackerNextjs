import { EventEmitter } from "events";
class Logs extends EventEmitter {
  constructor() {
    super();
    this.logs = "";
  }

  generatelogs(logs) {
    // is logs if of type json then stringify it
    if (typeof logs === "object") {
      logs = JSON.stringify(logs);
    }

    this.logs = logs;

    this.emit("logstracker", logs);
  }
}

export default Logs;
