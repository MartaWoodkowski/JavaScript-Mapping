# Visualizing Data with Leaflet

Welcome to the United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.


--------------------------------------------------------------------------------------------------------------------

### Level 1: Basic Visualization

First step is to visualize an earthquake data set.

1. **Get your data set**

   The USGS provides earthquake data in a number of different formats, updated every minute. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example "All Earthquakes from the Past 7 Days", you will be given a JSON representation of that data. You will use the URL of this JSON to pull in the data for our visualization.


2. **Import & Visualize the Data**

   Created a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

   * Included popups that provide additional information about the earthquake when a marker is clicked.

   * Created a legend that will provide context for the map data. Example [here](https://leafletjs.com/examples/choropleth/).

   * Leaflet tile styles used in this project: 
      * [Grayscale](https://maps.omniscale.com/en/examples/leaflet_grayscale) 
      * [Outdoor](https://maps.omniscale.com/en/examples/leaflet) 
      * [Satellite](http://bl.ocks.org/nitaku/047a77e256de17f25e72)

   * The visualization looks like this:
   
   ![BasicMap](Images/BasicMap.png)


--------------------------------------------------------------------------------------------------------------------

### Level 2: More Data 

The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it alongside your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step:

* Plotted a second data set on the map.

* Added a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Added layer controls to the map.

* The visualization looks like this:

![Advanced](Images/Advanced.png)
