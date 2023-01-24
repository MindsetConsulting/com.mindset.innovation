sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/ColumnListItem",
    "sap/m/Input"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast,ColumnListItem,Input) {
        "use strict";

        return Controller.extend("com.mindset.resumeapp.controller.View", {
            onInit: function () {
                this._oTable = this.byId("table0");
            },
            onSave: function(){
                this.getView().byId("editModeButton").setVisible(true);
                this.getView().byId("saveButton").setVisible(false);
                this._oTable.setMode(sap.m.ListMode.None);
                this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                
            }, 
        onEditMode: function(){
            this.byId("editModeButton").setVisible(false);
            this.byId("saveButton").setVisible(true);
            this.byId("deleteButton").setVisible(true);
        },
        onDelete: function(){

            var oSelected = this.byId("table0").getSelectedItem();
            if(oSelected){
                var oName = oSelected.getBindingContext("mainModel").getObject().name;
            
                oSelected.getBindingContext("mainModel").delete("$auto").then(function () {
                    MessageToast.show(oName + " SuccessFully Deleted");
                }.bind(this), function (oError) {
                    MessageToast.show("Deletion Error: ",oError);
                });
            } else {
                MessageToast.show("Please Select a Row to Delete");
            }
            
        },
        rebindTable: function(oTemplate, sKeyboardMode) {
            this._oTable.bindItems({
                path: "mainModel>/ResumeData",
                template: oTemplate,
                templateShareable: true
            }).setKeyboardMode(sKeyboardMode);
        },
            onOpenAddDialog: function () {
                this.getView().byId("OpenDialog").open();
             },
             onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
             },
             onCreate: function () {
                var oSo = this.getView().byId("cadname").getValue();
                if (oSo !== "") {
                    const oList = this._oTable;
                        const oBinding = oList.getBinding("items");
                        const oContext = oBinding.create({
                            "name": this.byId("cadname").getValue(),
                            "eMail": this.byId("emailid").getValue(),
                            "phoneNo": this.byId("phno").getValue(),
                            "experience": this.byId("exp").getValue(),
                            "expertise": this.byId("expertise").getValue(),
                            "position": this.byId("pos").getValue(),
                            "confidencelevel": this.byId("conf").getValue(),
                            "overallFeedback": this.byId("overfeed").getValue(),  
                        });
                        oContext.created()
                        .then(()=>{
                                // that._focusItem(oList, oContext);
                                this.getView().byId("OpenDialog").close();
                        });
  
                }else {
                    MessageToast.show("So cannot be blank");
                }
    
            },
        });
    });
