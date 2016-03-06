var Blog = Backbone.Model.extend({
	defaults: {
		author: 'Demo',
		title: 'Your first demo blog',
		url: 'your-first-demo-blog'
	}
});

var Blogs = Backbone.Collection.extend({
	model: Blog
});

var blog1 = new Blog({
	author: 'FOO',
	title: 'Post number one',
	url: 'http://blog.com/post1'
});

var blog2  = new Blog({
	author: 'BAR',
	title: 'Post number two',
	url:'http://blog.com/post2' 
});

var blogs = new Blogs([blog1, blog2]);

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		
	},
	render: function() {
		var template = _.template ($(".blogs-list-template").html());
    	this.$el.html(template(this.model.toJSON()));
		return this;
	}
});

var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		this.model.on('add', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog){
			var blogView = new BlogView({model: blog});
			self.$el.append(blogView.render().$el);
		})
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function(){
	$('.add-blog').on('click', function(){
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('title-input').val(),
			url: $('.url-input').val()
		});
		blogs.add(blog);
	});
})