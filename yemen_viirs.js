// Political boundaries and select only yemen

var boundary = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2")
var yemen = boundary.filter(ee.Filter.eq('ADM0_NAME','Yemen'))

var geometry = yemen.geometry()

// VIIR data and filter it with all three years and clip them

var image = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG");

var y2012 = image
.filterDate('2012-01-01', '2012-12-31')
.select('avg_rad')
.mean() 
.clip(geometry)
// mean for one average image from the year 2012

var y2015 = image
.filterDate('2015-01-01', '2015-12-31')
.select('avg_rad')
.mean() 
.clip(geometry)

print(image)


// Add to map

var visParams = {
  palette: ['black', 'white'],
  min: 0,
  max: 60
}

Map.addLayer(y2012, visParams, '2012')
Map.addLayer(y2015, visParams, '2015')


// export images

Export.image.toDrive({
  image: y2012,
  description: 'Yemen2012',
  fileNamePrefix: 'Yemen', 
  region: geometry, 
  scale: 500})
  
  Export.image.toDrive({
  image: y2015,
  description: 'Yemen2015',
  fileNamePrefix: 'Yemen', 
  region: geometry, 
  scale: 500})
  
// center map
Map.centerObject(y2012)
