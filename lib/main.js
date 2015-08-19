var im = require('imagemagick'),
	path = require("path"),
	fs = require("fs"),
	defaults = require("./options");

var Main = function(){

}

Main.prototype = {

	options: {},

	queue: [],


	set: function( options ){
		options = options || {};
		for( var i in options ){
			// no extending...
			this.options[i] = options[i];
		}
	},

	icon: function( source, options ){
		// merge with defaults
		this.options = extend( defaults, ( options || {} ) );
		// load sizes from options
		var sizes = this.options.icons;
		// get (or create) the destination dir
		var destdir = path.join( dir( source ), this.options.output, "icon/");
		check( destdir );
		// create the queue based on the sizes
		for( var i in sizes ){
			// add to the queue
			this.queue.push({ src: source, w: sizes[i], h: sizes[i], dest: destdir + sizes[i] +"."+ (sizes[i].format || "png") });
		}
		// process queue
		this.process();
	},

	splash: function( source, options ){
		// merge with defaults
		this.options = extend( defaults, ( options || {} ) );
		// load sizes from options
		var sizes = this.options.splash;
		// get (or create) the destination dir
		var destdir = path.join( dir( source ), this.options.output, "splash/");
		check( destdir );
		// create the queue based on the sizes
		for( var i in sizes ){
			// add to the queue
			this.queue.push({ src: source, w: sizes[i].w, h: sizes[i].h, dest: destdir + sizes[i].w +"x"+ sizes[i].h +"."+ (sizes[i].format || "png") });
		}
		// process queue
		this.process();
	},

	process: function(){
		var self = this;
		// get the next item from the queue
		var img = this.queue.pop();
		// skip this file if it already exists
		if( fs.existsSync(img.dest) && !this.options.force ) return this.tick();
		// actual image resizing
		im.crop({
			srcPath: img.src,
			dstPath: img.dest,
			width: img.w,
			height:  img.h,
		}, function(err, stdout, stderr){
			if (err) throw err
			console.log("- created image: "+ img.dest)
			// process the next image
			self.tick();
		});

	},

	tick: function(){
		if( this.queue.length ){
			this.process();
		} else {
			console.log("!!! All images created");
		}
	}

}

// Helpers
function dir( path ){
	return path.substring(0,path.lastIndexOf("/")+1);
}

function check( dir ){
	var folders = dir.split("/");
	var path = "";
	// loop through folders to create the new ones...
	for(var i in  folders ){
		path += folders[i] +"/";
		var exists = fs.existsSync( path );
		if(!exists) fs.mkdirSync( path );
	}

}

// Deep extend:
// http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
function extend(destination, source) {
	for (var property in source) {
		if (source[property] && source[property].constructor && source[property].constructor === Object) {
			destination[property] = destination[property] || {};
			arguments.callee(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
}

module.exports = new Main();
