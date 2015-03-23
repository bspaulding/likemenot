var xray = require("x-ray");
var phantom = require('x-ray-phantom');
var _ = require("underscore");
var Promise = require("promise");

var urls = [
  "http://www.robbinsbrothers.com/Engagement-Rings/Ring-With-Sidestones/Robbins-Brothers-i53300.ring#",
  "http://www.robbinsbrothers.com/Engagement-Rings/Ring-With-Sidestones/Simon-G--i33891.ring#",
  "http://www.robbinsbrothers.com/Engagement-Rings/Ring-With-Sidestones/Simon-G--i26105.ring#",
  "http://www.robbinsbrothers.com/Engagement-Rings/Ring-With-Sidestones/Robbins-Brothers-i44131.ring#",
  "http://www.robbinsbrothers.com/Engagement-Rings/Ring-With-Sidestones/Simon-G--i49454.ring#"
];

Promise.all(_.map(urls, function(url) {
  return new Promise(function(resolve, reject) {
    xray(url)
      .use(phantom())
      .select({
        title: 'title',
        images: [".slick-slide>img[src]"]
      })
      .run(function(err, item) {
        resolve({
          page: url,
          title: item.title,
          images: _.uniq(item.images)
        });
      })
  });
})).then(function(pages) {
  console.log(pages);
});

