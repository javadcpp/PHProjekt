/**
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    $Id$
 * @author     Gustavo Solt <solt@mayflower.de>
 * @package    PHProjekt
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */

dojo.provide("phpr.Timecard.Grid");

dojo.declare("phpr.Timecard.Grid", phpr.Default.Grid, {

    reloadView:function(/*String*/ view, /*int*/ year, /*int*/ month) {
        this.main.setSubGlobalModulesNavigation();
        this.gridLayout = new Array();
        this.setUrl(year, month, view);
        phpr.DataStore.addStore({url: this.url});
        phpr.DataStore.requestData({url: this.url, processData: dojo.hitch(this, "onLoaded")});
    },

    setUrl:function(year, month, view) {
        if (typeof year == "undefined") {
            date = new Date();
            year = date.getFullYear();
        }
        if (typeof month == "undefined") {
            date = new Date();
            month = date.getMonth() + 1;
        }
        if (typeof view == "undefined") {
            view = 'month';
        }
        this.url = phpr.webpath + "index.php/" + phpr.module + "/index/jsonList"
            + "/year/" + year
            + "/month/" + month
            + "/view/" + view;
    },

    showTags:function() {
    },

    canEdit:function(inRowIndex) {
        return false;
    },

    useIdInGrid:function() {
        return false;
    },

    customGridLayout:function(meta) {
       this.gridLayout[0].styles = "cursor:pointer;"
    },

    setSaveChangesButton:function(meta) {
    },

    setExportButton:function(meta) {
        var params = {
            baseClass: "positive",
            iconClass: "export",
            alt:       "Export",
            disabled:  false,
            label:     phpr.nls.get("Working Times")

        };
        var exportButtonHours = new dijit.form.Button(params);
        dojo.byId("buttonRow").appendChild(exportButtonHours.domNode);
        dojo.connect(exportButtonHours, "onClick", dojo.hitch(this, "exportHourData"));

        var params = {
            baseClass: "positive",
            iconClass: "export",
            alt:       "Export",
            disabled:  false,
            label:     phpr.nls.get("Project bookings")
        };
        var exportButtonProjects = new dijit.form.Button(params);
        dojo.byId("buttonRow").appendChild(exportButtonProjects.domNode);
        dojo.connect(exportButtonProjects, "onClick", dojo.hitch(this, "exportProjectData"));
    },

    exportHourData:function() {
        // summary:
        //    Open a new widnows in CVS mode
        // description:
        //    Export hours of the month
        var month = this.main.form.dateObject.getMonth() + 1;
        var year  = this.main.form.dateObject.getFullYear();
        window.open(phpr.webpath + "index.php/" + phpr.module + "/index/csvHourList"
            + "/month/" + month
            + "/year/" + year);
        return false;
    },

    exportProjectData:function() {
        // summary:
        //    Open a new widnows in CVS mode
        // description:
        //    Export projects of the month
        var month = this.main.form.dateObject.getMonth() + 1;
        var year  = this.main.form.dateObject.getFullYear();
        window.open(phpr.webpath + "index.php/" + phpr.module + "/index/csvBookingList"
            + "/month/" + month
            + "/year/" + year);
        return false;
    },

    showForm:function(e) {
        if (e.cellIndex == 0) {
            var item = this.grid.getItem(e.rowIndex);
            var date = this.grid.store.getValue(item, 'date');
            if (date) {
                var year  = date.substr(0, 4);
                var month = date.substr(5, 2);
                var day   = date.substr(8, 2);
                var date  = new Date(year, (month - 1), day);
                this.main.form.setDate(date);
                this.main.form.reloadDateView();
                this.publish("changeDate", [date]);
            }
        }
    }
});
