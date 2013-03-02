/* 
 * 
 *********************
 * MobileZoom Plugin *
 *********************
 * 
 * This plugin will remove the existing OpenLayers PanPanel, ZoomPanel, and gx_zoomslider
 * from the map, replacing them with the mobile version of the Zoom Control.
 * 
 * 
 * Step 1:
 * Copy this file (MobileZoom.js) to the src/app/plugins directory (Create it if it does not already exist).
 * Step 2:
 * Add the dependency "@require plugins/MobileZoom.js" to the top of your src/app/app.js file.
 * Step 3:
 * In the tools configuration section of the src/app/app.js file add the following item to the bottom of the list:
 
    }, {
    ptype: "dm_mobilezoom",
        actionTarget: "map"
    }],

 * Step 4:
 * Restart the application.
*/ 

/* 
 * Add the required javascript dependencies for this plugin:
 * @require plugins/Tool.js
 * @require OpenLayers/Control/Zoom.js
 * @require OpenLayers/Control/TouchNavigation.js
 */

/* Load the OpenLayers mobile.css style sheet */
var element = document.createElement('link');
    element.href = 'src/openlayers/theme/default/style.mobile.css';
    element.rel = 'stylesheet';
    element.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(element);


/* Hide the PanPanel and ZoomPanel that are loaded automatically with the default GPX template */
document.write("<style>.olControlPanPanel {display: none;}</style>");
document.write("<style>.olControlZoomPanel {display: none;}</style>");
/* Also hide the gx_zoomslider that's included in the default GPX template
 * This could also be removed by editing the app.js file */
document.write("<style>.gx-zoomslider {display: none;}</style>");


/* Add the MobileZoom buttons */
Ext.ns("dm.plugins");

dm.plugins.MobileZoom = Ext.extend(gxp.plugins.Tool, {
    ptype: "dm_mobilezoom",
    
    addActions: function() {
        var map = this.target.mapPanel.map;
        map.addControl(new OpenLayers.Control.Zoom()),
        map.addControl(new OpenLayers.Control.TouchNavigation({dragPanOptions: {enableKinetic: true}}))
    }
});

Ext.preg(dm.plugins.MobileZoom.prototype.ptype, dm.plugins.MobileZoom);
