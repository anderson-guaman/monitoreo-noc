import { envs } from "./config/plugins/env.plugin";
import { Server } from "./presentation/server";



(async() => {
    main();
})();

function main() {
    // Server.start();
    console.log(envs.MAILER_EMAIL);
}

