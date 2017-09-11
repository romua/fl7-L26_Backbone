var President = Backbone.Model.extend({
    defaults: {
        name: 'John',
        surname: '',
        rate: 0
    },
    validate: function (attributes) {
        if (attributes.name.length === 0 || attributes.surname.length === 0) {
            return 'Name or surname can`t be empty';
        }
        console.log("qe");
    },
    urlRoot: '/presidents'
});
var PresidentsCollection = Backbone.Collection.extend({
    model: President
});
var presidentsCollection = new PresidentsCollection([
    { name: 'George', surname: 'Washington', rate: 10 },
    { name: 'Barack', surname: 'Obama', rate: 7 },
    { name: 'Bobb', surname: 'Marley', rate: 4 },
    { name: 'Michel', surname: 'Jordan', rate: 2 }
]);
presidentsCollection.comparator = 'surname';
presidentsCollection.sort();
var PresidentView = Backbone.View.extend({
    tagName: 'li',
    className: 'president',
    template: _.template('<span><%= name %>  <%= surname %> <%= rate %></span>'),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
var PresidentCollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'presidentCollection',
    initialize: function (attr) {
        var that = this;
        attr.model.on('add', function () {
            that.$el.html('');
            that.render();
        });
        $("#app").on('click', function (event) {
            console.log($(event.target).parent().index());
            presidentsCollection.models.splice($(event.target).parent().index(), 1);
            that.$el.html('');
            that.render();
        });
    },
    render: function () {
        this.model.forEach((element) => {
            this.$el.append(new PresidentView({ model: element }).render().$el);
        });
        return this;
    }
});
var president1 = new President({ name: 'Bill', surname: 'Clinton' });
var president2 = new President({ name: 'Bobb', surname: 'Marley' });
var president3 = new President({ name: 'Kevin', surname: 'Durant' });
var president4 = new President({ name: 'LeBron', surname: 'James' });
var president5 = new President({ name: 'Michel', surname: 'Jordan' });
$('#app').html(new PresidentCollectionView({ model: presidentsCollection }).render().$el);
$('#button').on('click', function (event) {
    presidentsCollection.push(new President({
        name: $("#name").val() || 'New',
        surname: $("#surname").val() || 'President',
        rate: $("#rating").val() || 123
    }));
});