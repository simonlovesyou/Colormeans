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
});




//Test if getRandomCluster returns the correct array length.

//Test if trim clusters trims the datset to the correct size.