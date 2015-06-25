/**
 * Colormeans.js
 * This file is licensed under the MIT License, please see MIT-license.txt for details.
 * @module Colormeans.js
 * @author Simon Johansson @simonlovesyou
 * @license MIT
 * @version 0.1
 * @see {@link https://github.com/simonlovesyou/colormeans}
 */


/**
 * @class ImageCanvas
 * @param {} image The image to be used in the canvas
 */
 var ImageCanvas = function (image) {
 	if(typeof image === 'canvas') {
 		this.canvas = image;
 	} else {
	  	this.canvas = document.createElement('canvas');
	 	this.context = this.canvas.getContext('2d');
	 	this.canvas.width = image.width;
	 	this.canvas.height = image.height;
	 	this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
 	}
 };

/**
 * Will retrieve the data from the canvas/image.
 * @method getData
 * @return CallExpression
 */
 ImageCanvas.prototype.getData = function() {
 	return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
 };

/**
 * Will create an array of RGB-values retrieved from the canvas/image data.
 * @method getRGBdata
 * @param {array} data The datapoints from the canvas/image
 * @return points The RGB-array of all the pixel values
 */
 ImageCanvas.prototype.getRGBdata = function(data) {
 	var points = [];
 	for(var i = 0; i < data.length; i+=4) {
 		var r = data[i],
 		g = data[i+1],
 		b = data[i+2];
 		points.push([r,g,b]);
 	}
 	return points;
 };

/**
 * Will remove the canvas.
 * @method removeCanvas
 */
 ImageCanvas.prototype.removeCanvas = function () {
 	this.canvas = null;
 };

/**
 * Constructor for the Colormeans object used by the user.
 * @constructor Colormeans
 */
 var Colormeans = function() {
	this.image;
 	this.palette = [];
 	this.DOMimage = new Image();
 	this.points = [];
 	/*Default values*/
 	this.numberOfColors = 5;
 	this.numberOfClusters = this.numberOfColors;
 	this.minimumDifference = 0.5;
 	this.clusterThreshold = 25;

	/**
 	 * Javascript implementation of the kmeans algorithm.
 	 * This is an improved version that is better suited for getting a color palette
 	 * from an image.
 	 *
	 * Improvements/Changes from the original algorithm include:
	 * I.		If a datapoint (color) is too far away from the clusters it will be
	 *			added to the set of clusters.
	 * II.		With the possible addition of clusters as of I. and a user specified
	 *			input 'numberOfClusters' there's a greater dataset to pick our final
	 *			palette from.
	 * III.		With a possible greater dataset as of I. and II. the algorithm will
	 *			trim the dataset down to the final palette based on the population
	 * 			of the clusters.
	 *
	 * @summary Javascript implementation of the kmeans algorithm with some improvements better suited for getting a color palette.
 	 * @method kmeans
 	 * @param {array} points An array with RGB-values
 	 * @param {number} numberOfColors The number of RGB-values it will return
 	 * @param {number} numberOfClusters The number of clusters that initially will be created.
 	 * @param {number} min_diff The minimum difference that is allowed when comparing euclidean distances
 	 * @param {number} clusterThreshold The minimum difference when initializing the random clusters.
 	 * @return {array} palette The final colorpalette from the image.
 	 */
 	 this.kmeans = function(points, numberOfColors, numberOfClusters, min_diff, clusterThreshold) {
 	 	var clusters = getRandomVector(points, numberOfClusters, clusterThreshold);
 	 	var change = true;
 	 	var meanDistance = meanClusterDistance(clusters);
 	 	var temp_count = 0;
 	 	while(change) {
			//Assume that there is no change
			var change = false;
			var clusterColors = [];
			//Populate an array with empty array of the number of clusters.
			for(var i = 0; i < numberOfClusters; i++) {
				clusterColors.push([]);
			}

			for(var i = 0; i < points.length; i++) {
				var p = points[i];
				var smallestDist = 10000000;
				var id = 0;
				for(var j = 0; j < clusters.length; j++) {
					var distance = euclidean(p, clusters[j]);

					if(distance < smallestDist) {
						smallestDist = distance;
						if(smallestDist > meanDistance) {
							clusters.push(p);
							clusterColors.push([]);
							numberOfClusters++;
							meanDistance = meanClusterDistance(clusters);
							temp_count++;
							//Recalculate the contents of the clusters
							i = 0;
							j = 0;
							clusterColors = [];
							for(var i = 0; i < numberOfClusters; i++) {
								clusterColors.push([]);
							}
						} else {
							id = j;
							//There's been a change
							change=true;
						}

					}
				}
			//Populate the clusters.
			clusterColors[id].push(p);

		}
			//Shift through the clusters and set the clusters that are the most populated.
			if(numberOfClusters !== numberOfColors) {
				var index = 0;
				var clusterColorsFinal = [];
				var clusterFinal = [];
				for(var i = 0; i < numberOfColors; i++) {
					var clusterSize = 0;
					for(var j = 0; j < clusterColors.length; j++) {
						var ok = clusterColors[j].length;
						if(ok > clusterSize) {
							index = j;
							clusterSize = ok;
						}
					}
					clusterColorsFinal.push(clusterColors[index]);
					clusterColors.splice(index, 1);
					clusterFinal.push(clusters[index]);
				}
				//Overwrite the old clusterarray with the most populated one.
				clusterColors = clusterColorsFinal;
				clusters = clusterFinal;
			}
			var diff = 0;
				//Recalculate centerpoints for the clusters if there's been a change
				if(change) {
					for(var i = 0; i < clusterColors.length; i++) {
						var oldCluster = clusters[i];
						var center = calculateCenter(clusterColors[i]);
						var newCenter = center;
						var dist = euclidean(oldCluster, center);
						clusters[i] = newCenter;
						diff = diff > dist ? diff : dist;

						if(diff > dist) {
							diff = dist;
						}
					}
					return palette = clusters;
				}
			}
		}
	}

	/**
	 * Calculate the mean euclidean distance between all clusters.
	 * @method meanClusterDistance
	 * @param {array} clusters An array with RGB-values
	 * @return {number} meanDistance The mean eclidean distance multiplied by a constant
	 */
	 function meanClusterDistance(clusters) {
	 	var distance = 0;
	 	var count = 0;
	 	for(var j = 0; j < clusters.length; j++) {
	 		for(var i = j+1; i < clusters.length-j; i++) {
	 			distance += euclidean(clusters[j], clusters[i]);
	 			count++;
	 		}
	 	}
	 	var meanDistance = (distance/count);
	 	return meanDistance*3;
	 }

/**
  * Will retrieve a palette from an image.
  * @method getPalette
  * @param {Object} img The image object used to retrieve image data from
  * @param {number} numberOfColors The number of colors to be returned by the algorithm
  * @param {Object} [options] A number of options to customize the way the algorithm
  *                 retrieves the number of colors
  *	@param {number} [options.numberOfClusters="5"] The number of random clusters to be initialized
  * @param {number} [options.minimumDifference="0.5"] The minimum difference that is allowed when comparing euclidean distances
  * @param {number} [options.clusterThreshold="25"] The minimum difference when initializing the random clusters.
  * @example:
  * 	var options = {
  *			numberOfClusters:10,
  *			minimumDifference: 0.1,
  * 		clusterThreshold:25,
  * 		}
  * @return {array} palette The final colorpalette generated by the algorithm. Is outputted as an RGB-array.
  */
Colormeans.prototype.getPalette = function(img, numberOfColors, options) { //numberOfClusters, minimumDifference, cluster_threshold, sort
 	/* Error handling */
   console.log(typeof img);
 	if(typeof img === 'undefined') {
 		throw new Error("Image is undefined.");
 	} else if(typeof img !== 'object' && img.nodeName !== 'CANVAS') {
 		throw new Error("Image is not an Image- or a Canvas-object.");
 	} else {
 		if(typeof numberOfColors !== 'undefined') {
 				if(typeof numberOfColors !== 'number' || numberOfColors%1!==0) {
 					throw new Error("numberOfColors is not a whole number.");
 				} else {
 					this.numberOfColors = numberOfColors;
 					this.numberOfClusters = numberOfColors;
 				}
 			}
 			if(typeof options !== 'undefined') {
 				if(typeof options !== 'object') {
 					throw new Error("options is not an object.");
 				} else {
 					if(typeof options.numberOfClusters !== 'undefined') {
 						if(typeof options.numberOfClusters !== 'number' || options.numberOfClusters%1!==0) {
 							throw new Error("numberOfClusters is not a whole number.");
 						} else {
 							this.numberOfClusters = options.numberOfClusters;
 						}
 					}
 					if(numberOfColors > options.numberOfClusters) {
 						throw new Error("The number of clusters has to be a bigger number than the number of colors or equal.");
 					}
 					if(typeof options.minimumDifference !== 'undefined') {
 						if(typeof options.minimumDifference !== 'number') {
 							throw new Error("minimumDifference is not a number.");
 						} else {
 							this.minimumDifference = options.minimumDifference;
 						}
 					}
 					if(typeof options.clusterThreshold !== 'undefined') {
 						if(typeof options.clusterThreshold !== 'number') {
 							throw new Error("cluster_threshold is not a number.");
 						} else {
 							this.cluster_threshold = options.clusterThreshold;
 						}
 					}
 				}
 			}
 		}

 		//If the image is the same one already stored it will use its
 		//data instead, for improved performance
 		if(this.DOMimage.src === img.src) {
 			console.log("Same canvas");
 			this.palette = this.kmeans(this.points, this.numberOfColors, this.numberOfClusters, this.minimumDifference, this.cluster_treshold);
 		} else {
 			this.DOMimage = img;
 			this.image = new ImageCanvas(this.DOMimage);
 			var image = this.image.getData();
	 		//Detaching the pixel array from the DOM
	 		var imageData = image.data;
	 		this.points = this.image.getRGBdata(imageData);
	 		this.palette = this.kmeans(this.points, this.numberOfColors, this.numberOfClusters, this.minimumDifference, this.cluster_treshold);
 		}
 		return this.palette;
 	};

/**
  * Retrieves the inital random clusters from the image.
  * The function will return an array populated with n number of clusters
  * specified by the parameter numberOfClusters.
  *
  * This is an improved version of the inital k-means algorithm where
  * the initial dataclusters are picked more carefully based on their
  * euclidean distance between eachother.
  *
  * @method getRandomVector
  * @param {array} points The data points to retrieve the random clusters from
  * @param {number} numberOfClusters The number of clusters to get randomly selected
  * @param {number} minimalDistance The minimal distance between the clusters
  * @return {array} clusters The final clusterset
  */
  function getRandomVector(points, numberOfClusters, minimalDistance) {
  	var clusters = [];
  	seen = [];
  	var dist = 200;
  	var count = 0;
  	while (clusters.length < numberOfClusters) {
  		index = getRandomInt(0, points.length);
  		found = false;
  		count++;

  		for(var i = 0; i < clusters.length; i++) {
  			if(euclidean(clusters[i], points[index]) > minimalDistance && index === seen[i]) {
  				found = true;
  				break;
  			}
  		}

  		if (!found) {
  			seen.push(index);
  			clusters.push(points[index]);
  		}
  	}
  	return clusters;
  }



 /**
  * Calculate the center of a cluster based on their respective datapoints.
  * @method calculateCenter
  * @param {array} clusterData The cluster data from a cluster
  * @return {number} vals The center of the cluster
  */
  function calculateCenter(clusterData) {
  	var vals = []
  	, plen = 0;
  	for (var i = 0; i < clusterData[i].length; i++) {
  		vals.push(0);
  	}
  	for (var i = 0; i < clusterData.length; i++) {
  		for (var j = 0; j < clusterData[i].length; j++) {
  			vals[j] += clusterData[i][j];
  		}
  		plen++;
  	}
  	for (var i = 0; i < clusterData[i].length; i++) {
  		vals[i] = vals[i] / plen;
  	}
  	return vals;
  }

 /**
  * Will retrieve an random integer between min and max
  * @method getRandomInt
  * @param {number} min
  * @param {number} max
  * @return {number} - An random integer between min and max
  */
  function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

 /**
  * Will retrieve the euclidean distance between two datapoints.
  * @method euclidean
  * @param {number} point1
  * @param {number} point2
  * @return {number} - Euclidean distance
  */
  function euclidean(point1, point2) {
  	var d = 0;
  	for(var i = 0; i < point1.length; i++) {
  		d += Math.pow(point1[i] - point2[i], 2);
  	}
  	return Math.sqrt(d);
  }
