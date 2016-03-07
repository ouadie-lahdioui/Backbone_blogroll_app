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

var blogs = new Blogs();

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {},
	events: {
		'click .edit-blog': 'edit',
		'click .update-blog': 'update',
		'click .cancel': 'cancel',
		'click .delete-blog': 'delete',
	},
	edit: function() {
		this.$('.edit-blog').hide();
		this.$('.delete-blog').hide();
		this.$('.update-blog').show();
		this.$('.cancel').show();

		var author = this.$('.author').html();
		var title = this.$('.title').html();
		var url = this.$('.url').html();

		this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
		this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
		this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
	},	
	update: function() {
		this.model.set('author', this.$('.author-update').val());
		this.model.set('title', this.$('.title-update').val());
		this.model.set('url', this.$('.url-update').val());
	},
	cancel: function(){
		blogsView.render();
	},
	delete: function(){
		this.model.destroy();
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
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', this.render, this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		console.log('TIC');
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog){
			var blogView = new BlogView({model: blog});
			self.$el.append(blogView.render().$el);
		})
	}
});

var blogsView = new BlogsView();

$(document).ready(function(){
	$('.add-blog').on('click', function(){
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});
		blogs.add(blog);
	});
})