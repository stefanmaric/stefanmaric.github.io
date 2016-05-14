---
layout: default
title: Impact on Node.js ecosystem - Research Notes - Stefan Maric
description: Research Notes
---

<style>
body {
  max-width: 980px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

pre {
  background-color: #f8f8f8;
  padding: .8em .5em;
}

code {
  font-family: monospace;
}

p > code {
  background-color: #f8f8f8;
  color: #cc4c87;
  padding: .3em .5em;
}
</style>

# Resource links

 * [Stackoverflow: How to get all npm packages that match a particular keyword in JSON format?](http://stackoverflow.com/questions/13657140/how-to-get-all-npm-packages-that-match-a-particular-keyword-in-json-format)
 * [historic count of modules in diff registers, including NPM](http://www.modulecounts.com/modulecounts.csv)
 * [npm stats charts site](http://www.npm-stats.com)
 * [npm stat (without S) charts site](http://npm-stat.com/charts.html)
 * [npm/download-counts on Github](https://github.com/npm/download-counts)

# HTTP call examples

## Check if user exists

```
GET https://www.npmjs.com/~stefanmaric
```

It will return `404` if user does NOT exists.


## User specific packages

### Using npmjs.com

```
GET https://www.npmjs.com/profile/stefanmaric/packages
```

Will return packages the user **contributes** to

```json
{
    "correlationID": "1438922446626:www-9-west.internal.npmjs.com:17385:id0jh0e5:40621",
    "stamp": "pid=17385 31841f0eea54e4ec66285210761f88409cae9492 https://www.npmjs.com www-9-west.internal.npmjs.com ",
    "features": {
        "access_page": true,
        "billing_page": true
    },
    "devEnv": false,
    "canonicalURL": "https://www.npmjs.com/profile/stefanmaric/packages",
    "count": 2,
    "items": [{
        "name": "node-scrapy",
        "access": "public",
        "version": "0.2.1",
        "description": "Simple, lightweight and expressive web scraping with Node.js",
        "versions": {},
        "homepage": "https://github.com/eeshi/node-scrapy",
        "dist-tags": {},
        "bugs": {
            "email": null,
            "url": "http://github.com/eeshi/node-scrapy/issues"
        }
    }, {
        "name": "ntee",
        "access": "public",
        "version": "1.1.4",
        "description": "Portable Unix shell command 'tee', with some extras - read from standard input and write to standard output and files",
        "versions": {},
        "homepage": "https://github.com/stefanmaric/ntee#readme",
        "dist-tags": {},
        "bugs": {
            "email": null,
            "url": "https://github.com/stefanmaric/ntee/issues"
        }
    }]
}
```

You need to fetch again with `?offset=n` until `res.hasMore !== true`.


### Using registry.npmjs.org

```
GET https://registry.npmjs.org/-/_view/browseAuthors?group_level=2&start_key=[%22stefanmaric%22]&end_key=[%22stefanmaric%22,{}]
```

Will return packages the user is **author** of.

```json
{
    "rows": [{
        "key": ["stefanmaric", "node-scrapy", "Simple, lightweight and expressive web scraping with Node.js"],
        "value": 1
    }, {
        "key": ["stefanmaric", "ntee", "Portable Unix shell command 'tee', with some extras - read from standard input and write to standard output and files"],
        "value": 1
    }]
}
```


### Using npm-stats.com

```
GET http://www.npm-stats.com/~repositories/stefanmaric
```

```json
[
  "node-scrapy",
  "ntee"
]
```


## Overall historic npm download count

```
GET https://api.npmjs.org/downloads/range/2000-01-01:3000-01-01/
```

## Historic npm download count for a given package

### Using npm-stats.com

```
GET http://www.npm-stats.com/~info/ntee
```

```json
{
  "downloads": [
    [
      "2015-06-17",
      27
    ],
    [
      "2015-06-18",
      1
    ],
    [
      "2015-06-19",
      2
    ],
    [
      "2015-06-20",
      70
    ],
    [
      "2015-06-21",
      90
    ],
    [
      "2015-06-22",
      26
    ],
    [
      "2015-06-24",
      11
    ],
    [
      "2015-06-25",
      8
    ],
    [
      "2015-06-30",
      11
    ],
    [
      "2015-07-01",
      6
    ],
    [
      "2015-07-02",
      6
    ],
    [
      "2015-07-03",
      6
    ],
    [
      "2015-07-04",
      6
    ],
    [
      "2015-07-05",
      6
    ],
    [
      "2015-07-08",
      6
    ],
    [
      "2015-07-11",
      12
    ],
    [
      "2015-07-14",
      6
    ],
    [
      "2015-07-18",
      1
    ],
    [
      "2015-07-20",
      31
    ],
    [
      "2015-07-23",
      1
    ],
    [
      "2015-07-25",
      6
    ],
    [
      "2015-07-26",
      5
    ],
    [
      "2015-07-29",
      6
    ],
    [
      "2015-08-05",
      6
    ]
  ],
  "maintainers": [
    "stefanmaric"
  ]
}
```


### Using npm-stat.com

```
GET http://npm-stat.com/downloads/range/2011-12-31:2015-07-31/ntee
```

```json
{
    "downloads": [{
        "day": "2015-06-17",
        "downloads": 27
    }, {
        "day": "2015-06-18",
        "downloads": 1
    }, {
        "day": "2015-06-19",
        "downloads": 2
    }, {
        "day": "2015-06-20",
        "downloads": 70
    }, {
        "day": "2015-06-21",
        "downloads": 90
    }, {
        "day": "2015-06-22",
        "downloads": 26
    }, {
        "day": "2015-06-24",
        "downloads": 11
    }, {
        "day": "2015-06-25",
        "downloads": 8
    }, {
        "day": "2015-06-30",
        "downloads": 11
    }, {
        "day": "2015-07-01",
        "downloads": 6
    }, {
        "day": "2015-07-02",
        "downloads": 6
    }, {
        "day": "2015-07-03",
        "downloads": 6
    }, {
        "day": "2015-07-04",
        "downloads": 6
    }, {
        "day": "2015-07-05",
        "downloads": 6
    }, {
        "day": "2015-07-08",
        "downloads": 6
    }, {
        "day": "2015-07-11",
        "downloads": 12
    }, {
        "day": "2015-07-14",
        "downloads": 6
    }, {
        "day": "2015-07-18",
        "downloads": 1
    }, {
        "day": "2015-07-20",
        "downloads": 31
    }, {
        "day": "2015-07-23",
        "downloads": 1
    }, {
        "day": "2015-07-25",
        "downloads": 6
    }, {
        "day": "2015-07-26",
        "downloads": 5
    }, {
        "day": "2015-07-29",
        "downloads": 6
    }],
    "start": "2011-12-31",
    "end": "2015-07-31",
    "package": "ntee"
}
```


## Bulk fetch of historic download count in a given range using api.npmjs.org

```
GET https://api.npmjs.org/downloads/range/2000-01-01:2015-08-07/ntee,node-scrapy
```

```json
{
    "node-scrapy": {
        "downloads": [{
            "day": "2014-11-10",
            "downloads": 21
        }, {
            "day": "2014-11-11",
            "downloads": 5
        }, {
            "day": "2014-11-12",
            "downloads": 1
        }, {
            "day": "2014-11-13",
            "downloads": 3
        }, {
            "day": "2014-11-14",
            "downloads": 1
        }, {
            "day": "2014-11-15",
            "downloads": 3
        }, {
            "day": "2014-11-17",
            "downloads": 1
        }, {
            "day": "2014-11-22",
            "downloads": 1
        }, {
            "day": "2014-11-23",
            "downloads": 3
        }, {
            "day": "2014-11-24",
            "downloads": 1
        }, {
            "day": "2014-11-27",
            "downloads": 2
        }, {
            "day": "2014-11-29",
            "downloads": 1
        }, {
            "day": "2014-12-04",
            "downloads": 1
        }, {
            "day": "2014-12-11",
            "downloads": 1
        }, {
            "day": "2014-12-12",
            "downloads": 3
        }, {
            "day": "2014-12-13",
            "downloads": 1
        }, {
            "day": "2014-12-18",
            "downloads": 1
        }, {
            "day": "2014-12-20",
            "downloads": 1
        }, {
            "day": "2014-12-26",
            "downloads": 31
        }, {
            "day": "2014-12-27",
            "downloads": 2
        }, {
            "day": "2014-12-29",
            "downloads": 2
        }, {
            "day": "2014-12-30",
            "downloads": 1
        }, {
            "day": "2015-01-06",
            "downloads": 2
        }, {
            "day": "2015-01-07",
            "downloads": 2
        }, {
            "day": "2015-01-08",
            "downloads": 3
        }, {
            "day": "2015-01-09",
            "downloads": 1
        }, {
            "day": "2015-01-11",
            "downloads": 1
        }, {
            "day": "2015-01-12",
            "downloads": 1
        }, {
            "day": "2015-01-13",
            "downloads": 1
        }, {
            "day": "2015-01-14",
            "downloads": 3
        }, {
            "day": "2015-01-16",
            "downloads": 5
        }, {
            "day": "2015-01-17",
            "downloads": 2
        }, {
            "day": "2015-01-19",
            "downloads": 1
        }, {
            "day": "2015-01-21",
            "downloads": 1
        }, {
            "day": "2015-01-22",
            "downloads": 1
        }, {
            "day": "2015-01-23",
            "downloads": 2
        }, {
            "day": "2015-01-24",
            "downloads": 4
        }, {
            "day": "2015-01-28",
            "downloads": 2
        }, {
            "day": "2015-01-31",
            "downloads": 3
        }, {
            "day": "2015-02-01",
            "downloads": 2
        }, {
            "day": "2015-02-03",
            "downloads": 1
        }, {
            "day": "2015-02-05",
            "downloads": 1
        }, {
            "day": "2015-02-07",
            "downloads": 1
        }, {
            "day": "2015-02-09",
            "downloads": 4
        }, {
            "day": "2015-02-10",
            "downloads": 1
        }, {
            "day": "2015-02-11",
            "downloads": 2
        }, {
            "day": "2015-02-12",
            "downloads": 1
        }, {
            "day": "2015-02-15",
            "downloads": 4
        }, {
            "day": "2015-02-17",
            "downloads": 2
        }, {
            "day": "2015-02-19",
            "downloads": 5
        }, {
            "day": "2015-02-20",
            "downloads": 1
        }, {
            "day": "2015-02-21",
            "downloads": 8
        }, {
            "day": "2015-02-22",
            "downloads": 2
        }, {
            "day": "2015-02-24",
            "downloads": 3
        }, {
            "day": "2015-02-25",
            "downloads": 1
        }, {
            "day": "2015-02-26",
            "downloads": 3
        }, {
            "day": "2015-03-02",
            "downloads": 2
        }, {
            "day": "2015-03-03",
            "downloads": 1
        }, {
            "day": "2015-03-06",
            "downloads": 1
        }, {
            "day": "2015-03-07",
            "downloads": 1
        }, {
            "day": "2015-03-09",
            "downloads": 2
        }, {
            "day": "2015-03-10",
            "downloads": 2
        }, {
            "day": "2015-03-11",
            "downloads": 2
        }, {
            "day": "2015-03-12",
            "downloads": 2
        }, {
            "day": "2015-03-13",
            "downloads": 2
        }, {
            "day": "2015-03-14",
            "downloads": 11
        }, {
            "day": "2015-03-15",
            "downloads": 1
        }, {
            "day": "2015-03-16",
            "downloads": 1
        }, {
            "day": "2015-03-17",
            "downloads": 2
        }, {
            "day": "2015-03-18",
            "downloads": 2
        }, {
            "day": "2015-03-19",
            "downloads": 4
        }, {
            "day": "2015-03-20",
            "downloads": 3
        }, {
            "day": "2015-03-21",
            "downloads": 2
        }, {
            "day": "2015-03-22",
            "downloads": 7
        }, {
            "day": "2015-03-26",
            "downloads": 1
        }, {
            "day": "2015-03-30",
            "downloads": 2
        }, {
            "day": "2015-03-31",
            "downloads": 2
        }, {
            "day": "2015-04-03",
            "downloads": 1
        }, {
            "day": "2015-04-04",
            "downloads": 3
        }, {
            "day": "2015-04-06",
            "downloads": 2
        }, {
            "day": "2015-04-07",
            "downloads": 4
        }, {
            "day": "2015-04-08",
            "downloads": 1
        }, {
            "day": "2015-04-10",
            "downloads": 2
        }, {
            "day": "2015-04-11",
            "downloads": 1
        }, {
            "day": "2015-04-17",
            "downloads": 1
        }, {
            "day": "2015-04-20",
            "downloads": 1
        }, {
            "day": "2015-04-21",
            "downloads": 1
        }, {
            "day": "2015-04-22",
            "downloads": 7
        }, {
            "day": "2015-04-24",
            "downloads": 3
        }, {
            "day": "2015-04-25",
            "downloads": 2
        }, {
            "day": "2015-04-27",
            "downloads": 2
        }, {
            "day": "2015-04-29",
            "downloads": 4
        }, {
            "day": "2015-04-30",
            "downloads": 1
        }, {
            "day": "2015-05-01",
            "downloads": 2
        }, {
            "day": "2015-05-02",
            "downloads": 1
        }, {
            "day": "2015-05-08",
            "downloads": 1
        }, {
            "day": "2015-05-09",
            "downloads": 1
        }, {
            "day": "2015-05-10",
            "downloads": 2
        }, {
            "day": "2015-05-11",
            "downloads": 1
        }, {
            "day": "2015-05-12",
            "downloads": 2
        }, {
            "day": "2015-05-14",
            "downloads": 2
        }, {
            "day": "2015-05-15",
            "downloads": 1
        }, {
            "day": "2015-05-17",
            "downloads": 2
        }, {
            "day": "2015-05-20",
            "downloads": 1
        }, {
            "day": "2015-05-25",
            "downloads": 1
        }, {
            "day": "2015-05-27",
            "downloads": 2
        }, {
            "day": "2015-05-31",
            "downloads": 1
        }, {
            "day": "2015-06-01",
            "downloads": 3
        }, {
            "day": "2015-06-02",
            "downloads": 4
        }, {
            "day": "2015-06-03",
            "downloads": 1
        }, {
            "day": "2015-06-04",
            "downloads": 1
        }, {
            "day": "2015-06-05",
            "downloads": 1
        }, {
            "day": "2015-06-07",
            "downloads": 2
        }, {
            "day": "2015-06-08",
            "downloads": 2
        }, {
            "day": "2015-06-09",
            "downloads": 2
        }, {
            "day": "2015-06-11",
            "downloads": 1
        }, {
            "day": "2015-06-12",
            "downloads": 2
        }, {
            "day": "2015-06-13",
            "downloads": 2
        }, {
            "day": "2015-06-14",
            "downloads": 1
        }, {
            "day": "2015-06-16",
            "downloads": 2
        }, {
            "day": "2015-06-18",
            "downloads": 2
        }, {
            "day": "2015-06-19",
            "downloads": 1
        }, {
            "day": "2015-06-21",
            "downloads": 1
        }, {
            "day": "2015-06-24",
            "downloads": 2
        }, {
            "day": "2015-06-25",
            "downloads": 1
        }, {
            "day": "2015-06-26",
            "downloads": 1
        }, {
            "day": "2015-06-27",
            "downloads": 1
        }, {
            "day": "2015-06-30",
            "downloads": 3
        }, {
            "day": "2015-07-01",
            "downloads": 1
        }, {
            "day": "2015-07-02",
            "downloads": 1
        }, {
            "day": "2015-07-03",
            "downloads": 1
        }, {
            "day": "2015-07-04",
            "downloads": 2
        }, {
            "day": "2015-07-05",
            "downloads": 1
        }, {
            "day": "2015-07-06",
            "downloads": 7
        }, {
            "day": "2015-07-07",
            "downloads": 3
        }, {
            "day": "2015-07-08",
            "downloads": 1
        }, {
            "day": "2015-07-10",
            "downloads": 1
        }, {
            "day": "2015-07-11",
            "downloads": 2
        }, {
            "day": "2015-07-12",
            "downloads": 8
        }, {
            "day": "2015-07-15",
            "downloads": 1
        }, {
            "day": "2015-07-21",
            "downloads": 2
        }, {
            "day": "2015-07-23",
            "downloads": 1
        }, {
            "day": "2015-07-24",
            "downloads": 2
        }, {
            "day": "2015-07-26",
            "downloads": 1
        }, {
            "day": "2015-07-30",
            "downloads": 1
        }, {
            "day": "2015-07-31",
            "downloads": 3
        }, {
            "day": "2015-08-05",
            "downloads": 4
        }, {
            "day": "2015-08-06",
            "downloads": 2
        }],
        "start": "2000-01-01",
        "end": "2015-08-07",
        "package": "node-scrapy"
    },
    "ntee": {
        "downloads": [{
            "day": "2015-06-17",
            "downloads": 27
        }, {
            "day": "2015-06-18",
            "downloads": 1
        }, {
            "day": "2015-06-19",
            "downloads": 2
        }, {
            "day": "2015-06-20",
            "downloads": 70
        }, {
            "day": "2015-06-21",
            "downloads": 90
        }, {
            "day": "2015-06-22",
            "downloads": 26
        }, {
            "day": "2015-06-24",
            "downloads": 11
        }, {
            "day": "2015-06-25",
            "downloads": 8
        }, {
            "day": "2015-06-30",
            "downloads": 11
        }, {
            "day": "2015-07-01",
            "downloads": 6
        }, {
            "day": "2015-07-02",
            "downloads": 6
        }, {
            "day": "2015-07-03",
            "downloads": 6
        }, {
            "day": "2015-07-04",
            "downloads": 6
        }, {
            "day": "2015-07-05",
            "downloads": 6
        }, {
            "day": "2015-07-08",
            "downloads": 6
        }, {
            "day": "2015-07-11",
            "downloads": 12
        }, {
            "day": "2015-07-14",
            "downloads": 6
        }, {
            "day": "2015-07-18",
            "downloads": 1
        }, {
            "day": "2015-07-20",
            "downloads": 31
        }, {
            "day": "2015-07-23",
            "downloads": 1
        }, {
            "day": "2015-07-25",
            "downloads": 6
        }, {
            "day": "2015-07-26",
            "downloads": 5
        }, {
            "day": "2015-07-29",
            "downloads": 6
        }, {
            "day": "2015-08-05",
            "downloads": 6
        }, {
            "day": "2015-08-06",
            "downloads": 7
        }],
        "start": "2000-01-01",
        "end": "2015-08-07",
        "package": "ntee"
    }
}
```


# Other notes

## npm authors with a lot of packages

 * sindresorhus - 684
 * substack - 678
 * tjholowaychuk - 549
 * phated - 404
 * tootallnate - 335
