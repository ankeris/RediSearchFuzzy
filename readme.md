# `RediSearchFuzzy` [![Build Status](https://travis-ci.com/ankeris/RediSearchFuzzy.svg?branch=master)](https://travis-ci.com/ankeris/RediSearchFuzzy)

Simple Node Interface for RediSearch indexes. Implemented for RediSearch 2.x

## Description

This library was created as an interface for RediSearch 2+ version for Nodejs.
It provides a simple Node API to create, remove and interact with RediSearch's [_Secondary Indexing_](https://oss.redislabs.com/redisearch/). It also provides an additional functionality for Searching with Fuzzy strings.
This library uses Promises and therefore supports ES6 async implementation over callbacks.

Please note, that this library does not contain ALL of RediSearch features and thus contributions are welcome.

## Installation

```bash
npm install redisearchfuzzy
```

## Getting started

Initiating the RediSearchFuzzy Client and passing existing Redis Client to it:

```js
const myRedisClient = require("redis").createClient();
const { RediSearchFuzzy } = require("redisearchfuzzy");
const RedisFuzzy = new RediSearchFuzzy(myRedisClient);
```

Now we can call the functions from **RedisFuzzy** instance.

```js
const INDEX_NAME = "PRODUCTS";

RedisFuzzy.createIndexList({
    indexName: INDEX_NAME,
    schema: [{ field: "title" }, { field: "body" }],
    options: ["PAYLOAD_FIELD", "myPayload"],
});

RedisFuzzy.addDocument("product:1", {
    title: "My favorite zebra",
    body: "A zebra's dazzling stripes make them among the most recognisable mammals",
    myPayload: `{ data: "hello1" }`,
});

RedisFuzzy.addDocument("product:2", {
    title: "My favorite snake cobra",
    body: "Venomous and many are capable of rearing upwards and producing a hood when threatened",
    myPayload: `{ data: "hello2" }`,
});

// Search in our index:
const searchIndex = async () => {
    // with Fuzzy option
    const resultFuzzy = await Fuzzy.searchDocuments({ indexName: INDEX_NAME, query: "Venom", useFuzzy: true });
    // without Fuzzy option
    const result = await Fuzzy.searchDocuments({ indexName: INDEX_NAME, query: "Venom" });
};

searchIndex();
```

## API

**RediSearchFuzzy** instance contains:
