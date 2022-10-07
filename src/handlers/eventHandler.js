function loadEvents(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Events', 'Status');

    // fs está lendo o caminho a partir da origem do package.json, por isso o ./src
    const folders = fs.readdirSync("./src/events");
    for (const folder of folders) {
        const files = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);

            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, (...args) =>
                    event.execute(...args, client),
                )}
                else {
                        client.rest.on(event.name, (...args) =>
                        event.execute(...args, client),
                    )}
            } else {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                }
                else { client.on(event.name, (...args) => event.execute(...args, client)); }
            }
            table.addRow(file, "loaded");
            continue;
        }
    }
    return console.log(table.toString(), "\nLoaded events");
}

module.exports = { loadEvents };