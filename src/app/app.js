/**
 * Add all your dependencies here.
 *
 * @require widgets/Viewer.js
 * @require plugins/OLSource.js
 * @require plugins/OSMSource.js
 * @require plugins/WMSCSource.js
 * @require plugins/ZoomToExtent.js
 * @require plugins/NavigationHistory.js
 * @require plugins/Zoom.js
 * @require plugins/AddLayers.js
 * @require plugins/RemoveLayer.js
 * @require RowExpander.js
 * 
 * dependencies I've added to the default template:
 * @require plugins/ZoomToLayerExtent.js
 * @require plugins/WMSGetFeatureInfo.js
 * @require plugins/GoogleSource.js
 * @require plugins/LayerManager.js
 * @require plugins/GoogleGeocoder.js
 * @require plugins/WMSSource.js
 * 
 * @require OpenLayers/Control/Attribution.js
 * @require OpenLayers/Control/Navigation.js
 * @require OpenLayers/Control/Zoom.js
 * @require OpenLayers/Control/ZoomToMaxExtent.js
 * @require OpenLayers/Control/TouchNavigation.js
 * 
 * @require plugins/Legend.js
 * @require plugins/LoadingIndicator.js
 */

var app = new gxp.Viewer({
    portalConfig: {
        layout: "border",
        region: "center",
        
        // by configuring items here, we don't need to configure portalItems
        // and save a wrapping container
        items: [{
            id: "centerpanel",
            xtype: "panel",
            layout: "fit",
            region: "center",
            border: true,
            items: ["mymap"]
        }, {
            id: "westpanel",
            title: "Layer Tools",
            xtype: "panel",
            layout: "fit",
            region: "west",
            border: true,
            width: 200,
            autoScroll: true,
            split: true,
            header: true,
            headerAsText: true,
            collapsible: true,
            collapsed: true
        }],
        bbar: {id: "mybbar"}
    },
    
    // configuration of all tool plugins for this application
    tools: [{
        ptype: "gxp_layermanager",
        actionTarget: "map.tbar",
        outputConfig: {
            id: "tree",
            border: true,
            tbar: [] // we will add buttons to "tree.bbar" later
        },
        outputTarget: "westpanel"
    }, {
        ptype: "gxp_addlayers",
        actionTarget: "tree.tbar"
    }, {
        ptype: "gxp_removelayer",
        actionTarget: ["tree.tbar", "tree.contextMenu"]
    }, {
        ptype: "gxp_zoomtolayerextent",
        actionTarget: ["tree.tbar", "tree.contextMenu"]
    }, {
        ptype: "gxp_legend",
        actionTarget: "map.tbar",
        outputConfig: {
        	width: "auto",
        	height: "auto",
        	x: 260,
        	y: 62
        }
    }, {
        ptype: "gxp_zoomtoextent",
        actionTarget: "map.tbar"
    }, {
        ptype: "gxp_zoom",
        actionTarget: "map.tbar"
    }, {
        ptype: "gxp_navigationhistory",
        actionTarget: "map.tbar"
    }, {
        ptype: "gxp_wmsgetfeatureinfo",
        actionTarget: "map.tbar"
    }, {
        ptype: "gxp_googlegeocoder",
        outputTarget: "map.tbar",
        outputConfig: {emptyText: "Seach for a location..."}
    }],
    
    // layer sources
    sources: {
        local: {
            ptype: "gxp_wmscsource",
            url: "/geoserver/wms",
            version: "1.1.1"
        },
        osm: {
            ptype: "gxp_osmsource"
        },
        google: {
            ptype: "gxp_googlesource"
        },
        ol: {
            ptype: "gxp_olsource"
        }
    },
    
    // map and layers
    map: {
        id: "mymap", // id needed to reference map in portalConfig above
        title: "MapBrewer",
        projection: "EPSG:3857",
        center: [-8210056.4984, 5213333.1929],
        zoom: 7,
        controls: [
            new OpenLayers.Control.ZoomToMaxExtent(),
            new OpenLayers.Control.Zoom(),
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.TouchNavigation({dragPanOptions: {enableKinetic: true}})
            ],
        layers: [{
            source: "google",
            name: "HYBRID",
            visibility: true,
            group: "background"
        }, {
            source: "osm",
            name: "mapnik",
            visibility: false,
            group: "background"
        }, {
            source: "google",
            name: "TERRAIN",
            visibility: false,
            group: "background"
        }, {
            source: "google",
            name: "SATELLITE",
            visibility: false,
            group: "background"
        }, {
            source: "google",
            name: "ROADMAP",
            visibility: false,
            group: "background"
        }, {
            source: "ol",
            type: "OpenLayers.Layer",
            args: ["Blank"],
            visibility: false,
            group: "background"
        }, {
            source: "local",
            name: "usa:states",
            visibility: false,
            selected: false
        }, {
            source: "local",
            name: "DonMeltz:NYS_CountyBoundaries",
            selected: false
        }],
        items: [
            
        ]
    }
});