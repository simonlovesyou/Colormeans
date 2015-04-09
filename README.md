# Colomeans.js 
A library for retrieving a colorpalette from an image. The library is based on an improved version of the **fast** data-clustering algorithm **k-means** for best use with images.

### Core idea
- Fast
- Customizable
- No dependencies
- Small

### Features
- Works with every image that can be used with the HTML5 canvas element.
- Supports every browser that has support for the canvas element.

### Improvements on the original algorithm
Improvements/Changes from the original algorithm include but is not limited to:

1. If a datapoint (color) is too far away from the clusters it will be	 added to the set of clusters.
2.	 With the possible addition of clusters as of I. and a user specified input 'numberOfClusters' there's a greater dataset to pick our final palette from.
3. With a possible greater dataset as of 1. and 2. the algorithm will trim the dataset down to the final palette based on the population of the clusters.

### Example / Usage
Include the file somewhere in your HTML document:

```html
	<script type="text/javascript" src="Colormeans.js"></script>
```
In your javascript file:

```javascript
	var colorMeans = new Colormeans();
	var image = document.getElementById('#imageID');
	var palette = colorMeans.getPalette(image, 4);
	//Returns the palette as an array with RGB-values.
	//Ex: [[84,121,128], [69, 173, 168], [157, 224, 169], [229, 255, 194]]
```

### Customizing
```javascript
	var colorMeans = new Colormeans();
	var image = document.getElementById('#imageID');
	var options = {
		numberOfClusters:10, 	//The number of initial clusters.
		minimumDifference: 0.1,	//The minimum difference when calculating centerpoints
		clusterThreshold:25		//The minimum euclidean-distance between initial clusters.
	}

	var palette = colorMeans.getPalette(image, 4, options);
```


## Documentation
- Coming soon! Meanwhile, look at the jsdoc within colormeans.js

### TODO
Features I or contributers will hopefully soon implement.

- Further improve the algorithm for retrieving the initial clusters.
- Remove dependency of the canvas element to further improve loading time.
- Further improve the algorithm for adding extra clusters when necessary.
- Add support for node.js
- Add resize option for larger images.

### Known issues
- Will fail when the number of colors to be retrieved from an image exceeds the number of unique colors in the image.

### Thanks
To Anna Päärni and Christian Fischer for discussing and what improvements can be made to the original algorithm.

### Creator
[simonlovesyou](https://github.com/simonlovesyou)


## License (MIT)

Copyright (c) 2015 Simon Johansson 

JohanssonLSimon@gmail.com

[Twitter](https://twitter.com/simonjohansosn)