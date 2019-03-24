var global = {};
var app = angular.module("myApp", []);
app.controller("mainCtrl", function($scope) {
	
	var self = this;
	
	$scope.starred = false;
	
	$scope.patchs = [/*{
		id: 1, name: "HTML 5.2 New Features", env: "prod" }, {
		id: 2, name: "Responsive Images (picture element, srcset/sizes etc.)", env: "prod" }, {
		id: 3, name: "Serverless", env: "prod" }, {
		id: 4, name: "Variable Fonts", env: "prod" }, {
		id: 5, name: "Shadow DOM", env: "prod" }, {
		id: 6, name: "ES6+", env: "prod" }, {
		id: 7, name: "JSON & AJAX", env: "prod" }, {
		id: 8, name: "API's", env: "prod" }, {
		id: 9, name: "JavaScript Patterns", env: "prod" }, {
		id: 10, name: "jQuery", env: "prod" }, {
		id: 11, name: "SVG", env: "prod" }, {
		id: 12, name: "React JS", env: "prod" }, {
		id: 13, name: "Angular JS", env: "prod" }, {
		id: 14, name: "TypeScript", env: "prod" }, {
		id: 15, name: "Vue JS", env: "prod" }, {
		id: 16, name: "Node JS", env: "prod" }, {
		id: 17, name: "Webpack", env: "prod" }, {
		id: 18, name: "SEO Techniques", env: "prod" }, {
		id: 19, name: "HTML Emails", env: "prod" }, {
		id: 20, name: "WordPress", env: "prod" }, {
		id: 21, name: "Static Site Generators (Jekyll, Hugo, Gatsby etc.)", env: "prod"}, {
		id: 22, name: "HTML Elements", env: "preprod" }, {
		id: 23, name: "HTML Form Validation", env: "preprod" }, {
		id: 24, name: "HTML Structured Data", env: "preprod" }, {
		id: 25, name: "Advanced CSS Selectors", env: "preprod" }, {
		id: 26, name: "CSS Transforms", env: "preprod" }, {
		id: 27, name: "CSS Animations", env: "preprod" }, {
		id: 28, name: "CSS Flexbox", env: "preprod" }, {
		id: 29, name: "CSS Grid", env: "preprod" }, {
		id: 30, name: "CSS Methodologies (BEM, SMACSS etc.)", env: "preprod" }, {
		id: 31, name: "SASS/SCSS", env: "preprod" }, {
		id: 32, name: "Layout Fallbacks", env: "preprod", action_required: true }, {
		id: 33, name: "Responsive Design", env: "preprod" }, {
		id: 34, name: "Design Patterns", env: "preprod" }, {
		id: 35, name: "JavaScript Fundamentals", env: "preprod" }, {
		id: 36, name: "JavaScript OOP", env: "preprod" }, {
		id: 37, name: "JavaScript DOM Manipulation", env: "preprod" }, {
		id: 38, name: "JavaScript Debugging Techniques", env: "preprod" }, {
		id: 39, name: "Node Package Manager", env: "preprod" }, {
		id: 40, name: "Grunt/Gulp", env: "preprod" }, {
		id: 41, name: "GitHub", env: "preprod" }, {
		id: 42, name: "Git Commands", env: "preprod" }, {
		id: 43, name: "Web Accessibility", env: "preprod" }, {
		id: 44, name: "Web Performance", env: "preprod" }, {
		id: 45, name: "Web Hosting", env: "preprod" }, {
		id: 46, name: "Browser Dev Tools", env: "preprod" }, {
		id: 47, name: "Google Analytics", env: "preprod" }, {
		id: 48, name: "Basic Photoshop/Sketch Usage", env: "preprod" }, {
		id: 49, name: "Clear email inbox", env: "uat" }, {
		id: 50, name: "Finalise requirements for client web design", env: "uat", action_required: true }, {
		id: 51, name: "Begin work on mock-up for client website", env: "uat" }, {
		id: 65, name: "Complete mock-up for client website", env: "dev" }, {
		id: 52, name: "Email mock-up to client for feedback", env: "dev" }, {
		id: 53, name: "Update personal website header background image", env: "dev" }, {
		id: 54, name: "Update personal website heading fonts", env: "dev" }, {
		id: 55, name: "Add google map to personal website", env: "dev" }, {
		id: 56, name: "Begin draft of CSS Grid article", env: "dev" }, {
		id: 57, name: "Read new CSS-Tricks articles", env: "dev" }, {
		id: 58, name: "Read new Smashing Magazine articles", env: "dev" }, {
		id: 59, name: "Read other bookmarked articles", env: "dev" }, {
		id: 60, name: "Look through portfolios to gather inspiration", env: "dev" }, {
		id: 61, name: "Create something cool for CodePen", env: "dev" }, {
		id: 62, name: "Post latest CodePen work on Twitter", env: "dev" }, {
		id: 63, name: "Listen to new Syntax.fm episode", env: "dev" }, {
		id: 64, name: "Listen to new CodePen Radio episode", env: "dev"
	}*/];
	
	$scope.users = [];
	
	$scope.checkhide = function(value) {
		var ret = true;
		if (!$scope.starred) return false;
		if ((value == true) && ($scope.starred == true)) ret = false;
		return ret;
	};
	
	$scope.init = function() {
		
		//$scope.patchs = [];
		self.loadpersons();
		/////////////////////////////
		var data = { "orderBy": "age:desc" };
		ax.ServerCall("list", "patch", null, "all", function(e, g, t) {
			var items = [];
			if (e.hasOwnProperty('length') && e.length > 0) {
				var count = g.count;		    //Total count of records in entity
				var nbResult = e.length;        //Number of results
				items = e;						//Records returned
				//console.log(items[0]);		    //Logging item one of the result
				//console.log(items);
				$scope.patchs = items;
				self.sync();
			}
		}, function(e, a, t) { console.warn("echec !"); });
	};
	
	$scope.createpatch = function() {
		var data = {
			name: $scope.patchname,
			description: $scope.patchdescription,
			env: "dev"
		};
		ax.ServerCall("post", "patch", data, null, function(e) {
			if (e.hasOwnProperty("success") && (e.success == true)) {
				var id = e.id;
				var msg = e.message;
				$(".close-modal").trigger("click");
				$scope.init();
				ax.popupmessage({
					message: "SUCCESS",
					bgclr: "#58D68D",
					txclr: "#FFF",
					timer: 1000
				});
			}
		}, function(e) {
			console.warn("echec !");
		});
	};
	
	$scope.addusertolist = function() {
		var duration = 2000;
		self.addperson($scope.useremail);
		//setTimeout(function() { $(".close-modal").trigger("click") }, duration);
		setTimeout(function() { 
			//
		}, duration + 750);
	};
	
	$scope.touat = function() {
		self.publish();
	};
	$scope.topreprod = function() {
		self.publish();
	};
	$scope.toprod = function() {
		self.publish();
	};
	$scope.invalidate = function() {
		self.invalidate();
	};
	
	$scope.opennewpatch = function() {
		$('#modal-newpatch').modal({
			closeExisting: false,
			fadeDuration: 75
		});
	};
	
	self.sync = function() {
        if(!$scope.$$phase) { $scope.$digest(); $scope.$apply(); }
    };
	
	self.publish = function() {
		var data = {};
		var duration = 2000;
		ax.popupmessage({
			message: "Publication en cours ...",
			bgclr: "#0079BF",
			txclr: "#FFF",
			timer: duration
		});
		switch($scope.currentpatch.env) {
			case "dev":
				data = { "env": "uat" };
				break;
			case "uat":
				data = { "env": "preprod" };
				break;
			case "preprod":
				data = { "env": "prod" };
				break;
		};
		ax.ServerCall("update", "patch", data, $scope.currentpatch.id, function(e) {
			if (e.hasOwnProperty("success") && (e.success == true)) {
				//console.log("updated");
				$scope.init();
			}
		}, function(e) {
			console.warn("echec !");
		});
		setTimeout(function() { $(".close-modal").trigger("click") }, duration);
		setTimeout(function() { 
			ax.message("Send email to the distribution List ?", {
				yes: function() {
					//callback here
					var data = {
						"env": "Recette",
						"name": $scope.currentpatch.name,
						"template": "patchdelivery",
						"email": "gilles.bandza@gmail.com;bandzagilles@yahoo.fr"
					};

					ax.ServerCall("mail", "user", data, 1, function(e) {
						console.log("email envoyé!");
					}, function(e) { console.warn("Mail not sent"); });
				},
				no: function() {
					//callback here
				}
			});
		}, duration + 750);
	};
	
	self.invalidate = function() {
		var duration = 2500;
		ax.popupmessage({
			message: "Invalidation processing ...",
			bgclr: "#FF0066",
			txclr: "#FFF",
			timer: duration
		});
		setTimeout(function() { $(".close-modal").trigger("click") }, duration);
		setTimeout(function() { 
			//
		}, duration + 750);
	};
	
	$scope.OpenCase = function(item) {
		$scope.env = item.env;
		$scope.currentpatch = item;
		self.sync();
		$('#sub-modal').modal({
			closeExisting: false,
			fadeDuration: 75
		});
	};
	
	$scope.dropperson = function(person) {
		ax.ServerCall("delete", "person", null, person.id, function(e) {
			if (e.hasOwnProperty("success") && (e.success == true)) {
				var msg = e.message;
				person.hidden = true;
				self.sync();
			}
		}, function() { console.warn("echec !"); });
	};
	
	self.addperson = function(email) {
		var data = {
			"email": email
		};
		ax.ServerCall("post", "person", data, null, function(e) {
			if (e.hasOwnProperty("success") && (e.success == true)) {
				var id = e.id;
				var msg = e.message;
				$scope.useremail = "";
				self.sync();
				self.loadpersons();
				setTimeout(function() {
					ax.popupmessage({
						message: "SUCCESS",
						bgclr: "#58D68D",
						txclr: "#FFF",
						timer: 1000
					});
				}, 500);
			}
		}, function(e) { console.warn("echec !"); });
	};
	
	$scope.SetActionReq = function(e) {
		var data = {};
		if (e && (e == true || e === 1)) {
			data = { action_required: 0 };
			ax.ServerCall("update", "patch", data, $scope.currentpatch.id, function(e) {
				if (e.hasOwnProperty("success") && (e.success == true)) {
					//console.log("updated");
				}
			}, function(e) { console.warn("echec !"); });
		}
		else {
			data = { action_required: 1 };
			ax.ServerCall("update", "patch", data, $scope.currentpatch.id, function(e) {
				if (e.hasOwnProperty("success") && (e.success == true)) {
					//console.log("updated");
				}
			}, function(e) { console.warn("echec !"); });
		}
	};
	
	self.loadpersons = function() {
		ax.ServerCall("list", "person", null, "all", function(e, g, t) {
			var items = [];
			if (e.hasOwnProperty('length') && e.length > 0) {
				var count = g.count;		    //Total count of records in entity
				var nbResult = e.length;        //Number of results
				items = e;						//Records returned
				$scope.users = items;
				self.sync();
			}
		}, function(e, a, t) { console.warn("echec !"); });
	};
	
});
var ax = new Axelib({
	code: "JwUEMhM",
	active: "#0079bf"
});
$(document).ready(function() {
	//console.log( "DOM ready!" );
});