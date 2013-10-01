define([
	'text!templates/todo/FooterView.html',
	'common'
], function (template, common) {
	var FooterView = Backbone.View.extend({

		navigatorBehaviors: ["IHasStateUpdate"],

		id: 'footer',
		tagName: 'footer',
		template: Handlebars.compile(template),

		todosModel: 'inject',

		events: {
		},

		initialize: function() {
			this.listenTo(this.todosModel, 'change', this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));
			this.$el.find("."+this.todosModel.get('filter')).addClass('selected');
			return this;
		},

		updateState: function(truncatedState, fullState) {
			var lastSegment = fullState.getLastSegment(),
				filter = lastSegment == 'active' || lastSegment == 'completed' ? lastSegment : 'all';

			this.todosModel.set({filter: filter});
		}
	});

	return FooterView;
});