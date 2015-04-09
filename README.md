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

## Customizing
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
- See /docs

### TODO
Features I or contributers will hopefully soon implement.

- Further improve the algorithm for retrieving the initial clusters.
- Remove dependency of the canvas element to further improve loading time.
- Further improve the algorithm for adding extra clusters when necessary.
- Add support for node.js
- Add resize option for larger images.

### Known issues
- Will fail when the number of colors to be retrieved from an image exceeds the number of unique colors in the image.


### Creator
[simonlovesyou](https://github.com/simonlovesyou)


## License (MIT)

Copyright (c) 2015 Simon Johansson 

[Mail](SimonLJohansson92@gmail.com)

[Twitter](https://twitter.com/simonjohansosn)