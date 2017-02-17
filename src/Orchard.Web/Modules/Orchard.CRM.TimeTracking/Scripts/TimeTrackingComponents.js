
window.orchardcollaboration = window.orchardcollaboration || {};
var orchardcollaboration = window.orchardcollaboration;
orchardcollaboration.react = orchardcollaboration.react || {};
orchardcollaboration.react.allComponents = orchardcollaboration.react.allComponents || {};

(function () {

    var TimeTrackingList = React.createClass({
        displayName: "TimeTrackingList",

        showAddDialog: function () {
            this.props.root.actions.addItem();
        },
        edit: function (item) {},
        render: function () {
            var _self = this;
            var root = this.props.root;

            var items = this.props.data.Items.map(function (item) {
                return React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "div",
                        null,
                        item.FullUsername
                    ),
                    React.createElement(
                        "div",
                        null,
                        item.TrackedTimeInString
                    ),
                    React.createElement(
                        "div",
                        null,
                        item.Comment
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "button",
                            { onClick: _self.edit.bind(null, item) },
                            root.T("Edit", "Edit")
                        )
                    )
                );
            });

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    root.T("Log items", "Log Items")
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "button",
                        { onClick: this.showAddDialog },
                        root.T("Log new work", "Log new work")
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "ul",
                        null,
                        items
                    )
                )
            );
        }
    });

    orchardcollaboration.react.allComponents.TimeTrackingList = TimeTrackingList;

    var EditLogWorkModal = React.createClass({
        displayName: "EditLogWorkModal",

        closeSyncModel: function () {
            this.props.root.actions.closeModal();
        },

        save: function () {
            var data = {
                date: this.refs.date.value,
                comment: this.refs.comment.value,
                timeSpend: this.refs.timeSpend
            };

            if (this.props.data.selectedItem) {
                data.id = this.props.data.selectedItem.id;
            }

            this.props.root.actions.saveItem(data);
        },

        render: function () {
            var _self = this;
            var root = this.props.root;
            var selectedItem = this.props.data.selectedItem;

            var title = "Log new item";
            var comment = "";
            var date = "";
            var timeSpend = "";
            if (selectedItem) {
                title = selectedItem.title;
                comment = selectedItem.comment;
                timeSpend = selectedItem.timeSpend;
            }

            return React.createElement(
                ReactBootstrap.Modal,
                { className: "edit-logwork-modal", show: _self.props.data.showModal, onHide: _self.closeSyncModel },
                React.createElement(
                    ReactBootstrap.Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        ReactBootstrap.Modal.Title,
                        null,
                        title
                    )
                ),
                React.createElement(
                    ReactBootstrap.Modal.Body,
                    null,
                    React.createElement(
                        "div",
                        { className: "edit-logwork-modal" },
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    { className: "label-row" },
                                    root.T("Date", "Date")
                                ),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement("input", { ref: "date", type: "text", defaultValue: date })
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    { className: "label-row" },
                                    root.T("Time spend", "Time spend")
                                ),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement("input", { ref: "timeSpend", type: "text", defaultValue: timeSpend })
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    { className: "label-row" },
                                    root.T("Comment", "Comment")
                                ),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "textarea",
                                        { ref: "comment" },
                                        comment
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    ReactBootstrap.Modal.Footer,
                    null,
                    React.createElement(
                        ReactBootstrap.Button,
                        { onClick: _self.save },
                        root.T("Save", "Save")
                    ),
                    React.createElement(
                        ReactBootstrap.Button,
                        { onClick: _self.closeSyncModel },
                        root.T("Cancel", "Cancel")
                    )
                )
            );
        }
    });

    orchardcollaboration.react.allComponents.EditLogWorkModal = EditLogWorkModal;
})();