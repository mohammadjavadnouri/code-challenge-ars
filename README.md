This project was made as a code challenge for ARS (not provided the company name to prevent any SEO disruption) company.

Question:
We would like you to create a web app containing a single page to get "GeoJSON features" of a location given with the coordinates (as geolocation box).
Your application needs to make a call to open street map api
(https://www.openstreetmap.org/api/0.6/map) gather information in "osm" format, convert it to "GeoJSON" and properly display the dataset.

Used libraries and languages: TS, React.js, leaflet and react-leaflet, OsmToGeoJSON.

Used Apis: Open Street Map

In order to focus on main principles of clean code, performance, and short time, less attention paid to styling. Also it is tried to not using any helping library as much as I could.

Components structure:
One parent component named: ArsMap
Several Child components in mapViewer and Inputs folders.
Functions and states are used to transfer data between childs, and parents and vice versa.

Because of a bug in loading marker icon from react-leaflet library some editions have been performed.

To prevent rerending, react states were not used in bounding box form.
