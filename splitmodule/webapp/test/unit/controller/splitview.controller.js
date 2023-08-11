/*global QUnit*/

sap.ui.define([
	"splitmodule/controller/splitview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("splitview Controller");

	QUnit.test("I should test the splitview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
