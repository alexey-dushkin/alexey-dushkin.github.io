"use strict";!function(){function e(e){e.hello="Новостной агрегатор"}var o=angular.module("mynews",["ui.router"]);o.config(function(e,o){e.state("news",{url:"/",controller:"NewsController",templateUrl:"news.html"}).state("sources",{url:"/sources",controller:"SourcesController",templateUrl:"sources.html"}),o.otherwise("/")}),o.factory("SourcesService",function(e){return{sources:[],getSources:function(){var o=e.defer();return JsAPI.Dao.getProperties({block_id:84683},function(e){o.resolve(e.publishers)},function(e){o.reject(e)}),o.promise}}}),o.factory("NewsService",function(e){return{getNews:function(o,r,t){var c=e.defer();return JsAPI.Dao.getArticles({block_id:84683,count:o,fields:65535,filter_publishers:r,filter_articles:t},function(e){c.resolve(e)},function(e){c.reject(e)}),c.promise}}}),o.controller("MainController",e),o.controller("NewsController",function(e,o,r){e.articles=[],e.loadArticles=function(t){var c=[],s=[];$.each(e.articles,function(){s=s.concat(this.id)}),$.each(r.sources,function(){0==this.show&&(c=c.concat(this.id))});var n=o.getNews(t,c,s);n.then(function(o){e.articles=e.articles.concat(o)})},$(window).scroll(function(){$(window).scrollTop()+$(window).height()==$(document).height()&&e.loadArticles(30)}),e.loadArticles(60)}),o.controller("SourcesController",function(e,o){if(0==o.sources.length){var r=o.getSources();r.then(function(r){o.sources=r,e.sources=o.sources,$.each(o.sources,function(){this.show=!0})})}else e.sources=o.sources})}();