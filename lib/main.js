var im = require('imagemagick'),
	path = require("path"),
	fs = require("fs"),
	options = require("./options");

var Main = function(){

}

Main.prototype = {
	
	queue: [],
	
	icon: function( source ){
		// load sizes from options
		var sizes = options.icons;
		// get (or create) the destination dir
		var destdir = path.join( dir( source ), options.output, "icon/");
		check( destdir );
		// create the queue based on the sizes
		for( var i in sizes ){
			// add to the queue
			this.queue.push({ src: source, w: sizes[i], h: sizes[i], dest: destdir + sizes[i] +".png" });
		}
		// process queue
		this.process();
	},

	process: function(){ 
		var self = this;
		// get the next item from the queue 
		var img = this.queue.pop();
		im.resize({
			srcPath: img.src,
			dstPath: img.dest,
			width: img.w,
			height:  img.h,
		}, function(err, stdout, stderr){
			if (err) throw err
			console.log("- created icon: "+ img.dest)
			// process the next image
			if( self.queue.length ){ 
				self.process();
			} else {
				console.log("!!! All icons created");
			}
		});
		
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

module.exports = new Main();
