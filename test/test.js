var expect = chai.expect;

describe("ColorMeans", function() {
	describe("constructor", function() {
		var colorMeans = new Colormeans();
		it("should have a default value for number of colors", function() {
			expect(colorMeans.numberOfColors).to.equal(5);
		});
		it("should have a default value for number of clusters", function() {
			expect(colorMeans.numberOfClusters).to.equal(5);
		});
		it("should have a default value for minimum difference", function() {
			expect(colorMeans.minimumDifference).to.equal(0.5);
		});
		it("should have a default value for cluster threshold", function() {
			expect(colorMeans.clusterThreshold).to.equal(25);
		});
		it("should have an empty array for points", function() {
			expect(colorMeans.points).to.be.ok;
		});
		it("should have an empty image object", function() {
			expect(colorMeans.image).to.be.not.ok;
		});
		it("should have an empty palette array", function() {
			expect(colorMeans.palette).to.be.empty;
		});
	});

	var images = document.getElementsByTagName('IMG');
	var colorMeans = new Colormeans();

	var imgRGB = {
		blue: [25, 150, 255],
		pink: [235, 20, 140],
		green: [65, 185, 125]
	}

	describe("image test 1", function() {
		it("should return a palette of one color", function() {
			var images = document.getElementsByTagName('IMG');
			var palette = colorMeans.getPalette(images[0], 1);
			expect(palette.length).to.equal(1);
		});
		it('should be a blue color', function () {
			var images = document.getElementsByTagName('IMG');
			var palette = colorMeans.getPalette(images[0], 1);
			expect(palette[0]).to.have.approxEqualMembers(imgRGB.blue);
		});
	});
	describe("image test 2", function() {
		it("should return a palette of two colors", function() {
			var images = document.getElementsByTagName('IMG');
			var palette = colorMeans.getPalette(images[1], 2);
			expect(palette.length).to.equal(2);
		});
		it('should be a pink color and a blue color', function () {
			var images = document.getElementsByTagName('IMG');
			var palette = colorMeans.getPalette(images[1], 2);
			console.log(palette);
			expect(palette).to.have.approxEqualMembers([imgRGB.blue, imgRGB.pink]);
		});
	});
	describe("image test 3", function() {
		it("should return a palette of three colors", function() {
			var images = document.getElementsByTagName('IMG');
			var palette = colorMeans.getPalette(images[2], 3);
			expect(palette.length).to.equal(3);
		});
		it('should be a pink color, blue color and a green color', function () {
			var images = document.getElementsByTagName('IMG');
			var palette = colorMeans.getPalette(images[2], 3);
			console.log(palette);
			expect(palette).to.have.approxEqualMembers([imgRGB.blue, imgRGB.pink, imgRGB.green]);
		});
	});
});

/*chai.Assertion.addMethod('approxEqualMembers', function (otherArray) {
    var array = this._obj;

    expect(array).to.be.an.instanceOf(Array);
    expect(otherArray).to.be.an.instanceOf(Array);

		var result = array.filter(function(member) {
		  for(var i = 0; i < otherArray.length; i++) {
		    var count = 0;
		    for(var j = 0; j < otherArray[i].length; j++) {
		      if(member[j] === otherArray[i][j]) {
		        count++;
		      } else {
		        break;
		      }
		      if(count === 3) {
		        return true;
		      }
		    }
		  }
		  return false;
		});


    console.log(result);
    this.assert(
        array.length === result.length,
        "expected #{this} to be equal to #{exp} (as sets, i.e. no order)",
        array,
        otherArray
    );
});*/

chai.Assertion.addMethod('approxEqualMembers', function (otherArray) {
    var array = this._obj;

    expect(array).to.be.an.instanceOf(Array);
    expect(otherArray).to.be.an.instanceOf(Array);

		var result = array.filter(function(member) {
		  for(var i = 0; i < otherArray.length; i++) {
		    //return compareColor(member, otherArray[i]);
		    if(compareColor(member, otherArray[i])) {
		    	console.log("sant");
		    	return true;
		    } 
		  }
		  return false;
		});

    function compareColor(rgb1, rgb2) {
			var difference = 0;
			for(var i = 0; i < rgb1.length; i++) {
				difference += Math.abs(rgb1[i] - rgb2[i]);
			}
			console.log(difference);
			if(difference < 15) {
				console.log("sant");
				return true;
			} else {
				console.log("falskt");
				return false;
			}
		}

    this.assert(
        array.length === result.length,
        "expected #{this} to be equal to #{exp} (as sets, i.e. no order)",
        array,
        otherArray
    );
});





//Test if getRandomCluster returns the correct array length.

//Test if trim clusters trims the datset to the correct size.