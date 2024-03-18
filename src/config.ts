const getVariable = (name: string) => {
    const variable = process.env[name];

    if (!variable) throw new Error("Some environment variables are not specified! Make \"cp .env.example .env\" and fill it down properly");

    return variable;
};

const config = {
    DISCORD_TOKEN: getVariable("DISCORD_TOKEN"),
    DISCORD_CLIENT_ID: getVariable("DISCORD_CLIENT_ID"),
    YOUTUBE_TOKEN: getVariable("YOUTUBE_TOKEN"),
    YANDEX_TOKEN: getVariable("YANDEX_TOKEN"),
};

export default config;