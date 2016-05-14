
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function init() {

/* Chart setup */

var margin = {top: 20, right: 100, bottom: 30, left: 100},
    width = 1800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var parseDate = d3.time.format('%Y-%m-%d').parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var simpleArea = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.y); });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

var svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

/* LoDash mixins */

_.mixin({
  chunkByLength: function chunkByLength(arr, size) {
    return _.reduce(arr, function(result, el, i) {
      if (_.sum(result[result.length -1], 'length') + el.length >= size) result.push([]);
      result[result.length - 1].push(el);
      return result;
    }, [[]]);
  }
});

_.mixin({
  complete: function complete(destination, source) {
    return _.merge(destination, source, function(a,b) {
      return a || 0;
    });
  }
});

_.mixin({
  mergeDownloadCounts: function (arr) {
    return _.merge.apply(_, [{}].concat(arr).concat(function(a,b) {
      return _.sum([a,b]);
    }));
  }
});

/* Datastores */

var npmDownloadHistory = {};
var authors = window.authors = [];
var urls = {
  cors: 'https://atcors.herokuapp.com/',
  userModules: 'https://registry.npmjs.org/-/_view/browseAuthors?group_level=2&start_key=[":username"]&end_key=[":username",{}]',
  downloadCountHistory: 'https://api.npmjs.org/downloads/range/2000-01-01:3000-01-01/'
};

/* Data fetchers */

function fetchUserModules(username, cb) {

  var modules = [];

  oboe(urls.cors + urls.userModules.replace(/:username/g, username))
    .node('rows.*', function(module) {
      modules.push(module.key[1]);
    })
    .done(function(data) {
      cb(null, modules);
    })
    .fail(function(err) {
      console.log('Failing ', username);
      cb(err);
    });
}

function fetchModulesDownloadsCount(modules, cb) {

  var dailyDownloadCount = {};

  oboe(urls.downloadCountHistory + modules.join(','))
    .node('!.downloads[*]', function(day) {
      dailyDownloadCount[day.day] = dailyDownloadCount[day.day] ? dailyDownloadCount[day.day] + day.downloads : day.downloads;
    })
    .node('!.*.downloads[*]', function(day) {
      dailyDownloadCount[day.day] = dailyDownloadCount[day.day] ? dailyDownloadCount[day.day] + day.downloads : day.downloads;
    })
    .done(function(data) {
      cb(null, dailyDownloadCount);
    })
    .fail(function(err) {
      console.log('Failing ', modules);
      window.oboeError = err;
      cb(err);
    });
}

function fetchUserData(username, cb) {
  var author = { username: username };

  fetchUserModules(username, function(err, data) {
    if (err) return cb(err);
    author.modules = data;

    async.mapLimit(_.chunkByLength(author.modules, 250), 2, fetchModulesDownloadsCount, function(err, data) {
      if (err) return cb(err);
      author.downloadHistory = _.mergeDownloadCounts(data);
      cb(null, author);
    });
  });
}

/* Initiate */

fetchModulesDownloadsCount([], function(err, data) {
  if (err) return console.error(err);

  npmDownloadHistory.raw = data;
  npmDownloadHistory.unwound = _.sortBy(_.map(npmDownloadHistory.raw, function(downloads, day) {
    return {
      date: parseDate(day),
      y: downloads
    };
  }), 'date');

  y.domain([0, _.max(npmDownloadHistory.raw)]);
  x.domain(d3.extent(npmDownloadHistory.unwound, function(d) { return d.date; }));
  
  svg.append('path')
    .datum(npmDownloadHistory.unwound)
    .attr('class', 'npm')
    .attr('d', simpleArea);

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

  async.mapLimit(['sindresorhus', 'substack', 'tjholowaychuk', 'phated', 'tootallnate'], 2, fetchUserData, function(err, data) {
    if (err) return console.error(err);

    _.forEach(data, function(author) {
      _.complete(author.downloadHistory, npmDownloadHistory.raw);
      author.values = _.sortBy(_.map(_.keys(author.downloadHistory), function(date) {
                            return {
                              date: parseDate(date),
                              y: author.downloadHistory[date]
                            };
                          }), 'date');
      authors.push(author);
    });

    color.domain(_.pluck(authors, 'username'));

    var downloads = stack(authors);

    var downloadGraph = svg.selectAll('.author')
        .data(downloads)
      .enter().append('g')
        .attr('class', 'author');

    downloadGraph.append('path')
        .attr('class', 'area')
        .attr('d', function(d) { return area(d.values); })
        .style('fill', function(d) { return color(d.username); });

    downloadGraph.append('text')
        .datum(function(d) { return {username: d.username, value: d.values[d.values.length - 1]}; })
        .attr('transform', function(d) { return 'translate(' + x(d.value.date) + ',' + y(d.value.y0 + d.value.y / 2) + ')'; })
        .attr('x', -6)
        .attr('dy', '.35em')
        .text(function(d) { return d.username; });
  });
});

});
