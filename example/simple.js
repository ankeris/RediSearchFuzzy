const redisClient = require("redis").createClient();
const { RediSearchFuzzy } = require("../dist/index");
const Fuzzy = new RediSearchFuzzy(redisClient);

const init = async () => {
    const info = await Fuzzy.getInfoIndexList("FAVORITE_LIST").catch((e) => console.log(e));

    if (!info) {
        Fuzzy.createIndexList({
            indexName: "FAVORITE_LIST",
            schema: [{ field: "title" }, { field: "body" }],
            options: ["PAYLOAD_FIELD", "myPayload"],
        });
    }

    Fuzzy.addDocument("product:1", {
        title: "My favorite zebra",
        body: "A zebra's dazzling stripes make them among the most recognisable mammals",
        myPayload: `{ data: "hello1" }`,
    });
    Fuzzy.addDocument("product:2", {
        title: "My favorite snake cobra",
        body: "Venomous and many are capable of rearing upwards and producing a hood when threatened",
        myPayload: `{ data: "hello2" }`,
    });
    Fuzzy.addDocument("product:3", {
        title: "My favorite bird parrot",
        body: "Will say whatever I say",
        myPayload: `{ data: "hello3" }`,
    });
    Fuzzy.addDocument("product:4", {
        title: "My favorite dog chihuahua",
        body: "A companion dog favored by the Toltec civilization in Mexico",
        myPayload: `{ data: "hello4" }`,
    });
    const infoAfterCreate = await Fuzzy.getInfoIndexList("FAVORITE_LIST");
    const res = await Fuzzy.searchDocuments({ indexName: "FAVORITE_LIST", query: "Venom", useFuzzy: true });
};

init();
