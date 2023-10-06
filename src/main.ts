import VeryGoodConfig from "./lib/config";
import { useGlobal } from "./lib/utils/internals";
import { printlog, printwarn } from "./lib/utils/logger";
const config = new VeryGoodConfig({
  config: {
    baseUrl: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json"
    },
    muteLogs: false,
    muteWarnings: false,
    muteErrors: false
  },
  interceptors: {}
});

printlog(config);


printlog(useGlobal().get('_config'));

printwarn("This is a warning message");

