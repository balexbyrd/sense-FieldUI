var tempId = [];

define([
	"jquery",
	"qlik",
	"text!./css/scoped-bootstrap.css",
	"text!./css/awesome-bootstrap-checkbox.css",
	"https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.js"
],

    function ($, qlik, cssBoot, csscheckBox) {
        'use strict';
        var control = {}; // support multiple instances

        if (!$("style[id='bootstrap']").length > 0) {
            $('<style id="bootstrap">').html(cssBoot).appendTo('head'); // Adding scoped bootstrap to head
            $('<style>').html(csscheckBox).appendTo('head'); // Adding checkbox styles to head
            $('<script type="text/javascript" extension="senseFieldUI" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">').appendTo('body'); // Bootstrap.js CDN		
        };

        if (!$("link[id='FA']").length > 0) {
            $('<link id="FA" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css">').appendTo('head'); // Font Awesome CDN		
        };

        return {
            initialProperties: {
                version: 1.0,
                qListObjectDef: {
                    qShowAlternatives: true,
                    qFrequencyMode: "V",
                    qSortCriterias: {
                        qSortByState: 1
                    },
                    qInitialDataFetch: [{
                        qWidth: 1,
                        qHeight: 10000
				}]
                }
            },
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    dimension: {
                        type: "items",
                        label: "Dimensions",
                        ref: "qListObjectDef",
                        min: 1,
                        max: 1,
                        items: {
                            label: {
                                type: "string",
                                ref: "qListObjectDef.qDef.qFieldLabels.0",
                                label: "Label",
                                show: true
                            },
                            libraryId: {
                                type: "string",
                                component: "library-item",
                                libraryItemType: "dimension",
                                ref: "qListObjectDef.qLibraryId",
                                label: "Dimension",
                                show: function (data) {
                                    return data.qListObjectDef && data.qListObjectDef.qLibraryId;
                                }
                            },
                            field: {
                                type: "string",
                                expression: "always",
                                expressionType: "dimension",
                                ref: "qListObjectDef.qDef.qFieldDefs.0",
                                label: "Field",
                                show: function (data) {
                                    return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
                                }
                            },
                            qSortByState: {
                                type: "numeric",
                                component: "dropdown",
                                label: "Sort by State",
                                ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByState",
                                options: [{
                                    value: 1,
                                    label: "Ascending"
							}, {
                                    value: 0,
                                    label: "No"
							}, {
                                    value: -1,
                                    label: "Descending"
							}],
                                defaultValue: 0,

                            },
                            qSortByNumeric: {
                                type: "numeric",
                                component: "dropdown",
                                label: "Sort by Numeric",
                                ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByNumeric",
                                options: [{
                                    value: 1,
                                    label: "Ascending"
							}, {
                                    value: 0,
                                    label: "No"
							}, {
                                    value: -1,
                                    label: "Descending"
							}],
                                defaultValue: 0,

                            },

                            qSortByLoadOrder: {
                                type: "numeric",
                                component: "dropdown",
                                label: "Sort by Load Order",
                                ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByLoadOrder",
                                options: [{
                                    value: 1,
                                    label: "Ascending"
							}, {
                                    value: 0,
                                    label: "No"
							}, {
                                    value: -1,
                                    label: "Descending"
							}],
                                defaultValue: 0,

                            },

                            qSortByFrequency: {
                                type: "numeric",
                                component: "dropdown",
                                label: "Sort by Frequence",
                                ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByFrequency",
                                options: [{
                                    value: -1,
                                    label: "Ascending"
							}, {
                                    value: 0,
                                    label: "No"
							}, {
                                    value: 1,
                                    label: "Descending"
							}],
                                defaultValue: 0,

                            },
                            qSortByAscii: {
                                type: "numeric",
                                component: "dropdown",
                                label: "Sort by Alphabetical",
                                ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByAscii",
                                options: [{
                                    value: 1,
                                    label: "Ascending"
							}, {
                                    value: 0,
                                    label: "No"
							}, {
                                    value: -1,
                                    label: "Descending"
							}],
                                defaultValue: 0,
                            }
                        }
                    },
                    settings: {
                        uses: "settings",
                        items: {
                            Chart: {
                                type: "items",
                                label: "Settings",
                                items: {
                                    StyleOverride: {
                                        ref: "vars.StyleOverride",
                                        expression: "optional",
                                        translation: "Render As:",
                                        type: "string",
                                        defaultValue: "Radio",
                                        component: "dropdown",
                                        options: [{
                                            value: "Radio",
                                            label: "Radio"
										}, {
                                            value: "Checkbox",
                                            label: "Checkbox"
										}, {
                                            value: "Button",
                                            label: "Button"
										}, {
                                            value: "Dropdown",
                                            label: "Dropdown"
										}]
                                    },
                                    ListType: {
                                        ref: "vars.ListType",
                                        expression: "optional",
                                        translation: "List Type",
                                        type: "string",
                                        defaultValue: ' ',
                                        component: "dropdown",
                                        show: function (data) {
                                            if (data.vars.StyleOverride !== 'Dropdown') {
                                                return data.vars.StyleOverride;
                                            }
                                        },
                                        options: [{
                                            value: "inline",
                                            label: "horizontal"
										}, {
                                            value: " ",
                                            label: "vertical"
										}]
                                    },
                                    selectedColor: {
                                        ref: "vars.selectedColor",
                                        expression: "optional",
                                        translation: "Selection Color:",
                                        type: "string",
                                        defaultValue: 1,
                                        component: "dropdown",
                                        options: [{
                                            value: 0,
                                            label: "default"
										}, {
                                            value: 1,
                                            label: "info"
										}, {
                                            value: 2,
                                            label: "primary"
										}, {
                                            value: 3,
                                            label: "success"
										}, {
                                            value: 4,
                                            label: "warning"
										}, {
                                            value: 5,
                                            label: "danger"
										}],
                                        show: function (data) {
                                            if (data.vars.StyleOverride !== 'Dropdown') {
                                                return data.vars.StyleOverride;
                                            }
                                        }
                                    },
                                    btnSize: {
                                        ref: "vars.btnSize",
                                        expression: "optional",
                                        translation: "Selection Color:",
                                        type: "string",
                                        defaultValue: "btn-md",
                                        component: "dropdown",
                                        options: [{
                                            value: "btn-xs",
                                            label: "Extra Small"
										}, {
                                            value: "btn-sm",
                                            label: "Small"
										}, {
                                            value: "btn-md",
                                            label: "Medium"
										}, {
                                            value: "btn-lg",
                                            label: "Large"
										}],
                                        show: function (data) {
                                            if (data.vars.StyleOverride === 'Button') {
                                                return data.vars.StyleOverride;
                                            }
                                        }
                                    },
                                    iconOnly: {
                                        ref: "vars.btnSpan",
                                        type: "boolean",
                                        label: "Span width?",
                                        defaultValue: true,
                                        show: function (data) {
                                            if (data.vars.StyleOverride === 'Button') {
                                                return data.vars.StyleOverride;
                                            }
                                        }
                                    },
                                    btnSpan: {
                                        ref: "vars.iconOnly",
                                        type: "boolean",
                                        label: "Use Only Icons?",
                                        defaultValue: false,
                                        show: function (data) {
                                            if (data.vars.StyleOverride === 'Button') {
                                                return data.vars.StyleOverride;
                                            }
                                        }
                                    },
                                    iconButtons: {
                                        ref: "vars.iconButton",
                                        type: "string",
                                        label: "Font-Awesome Icons (split by ',')",
                                        defaultValue: 'hand-peace-o,heart-o,smile-o,beer,gamepad,paw,diamond',
                                        show: function (data) {
                                            if (data.vars.StyleOverride === 'Button') {
                                                return data.vars.iconOnly;
                                            }
                                        }
                                    },
                                    dropMultiSelect: {
                                        ref: "vars.dropMultiSelect",
                                        translation: "Multiple Select ( Listbox Style )",
                                        type: "boolean",
                                        defaultValue: false,
                                        show: function (data) {
                                            if (data.vars.StyleOverride === 'Dropdown') {
                                                if (!data.vars.Defaulthighlight) {
                                                    return data.vars.StyleOverride
                                                };
                                            }
                                        }
                                    },
                                    Defaulthighlight: {
                                        ref: "vars.Defaulthighlight",
                                        type: "boolean",
                                        label: "Always One Selected value",
                                        defaultValue: false,
                                        show: function (data) {
                                            if (!data.vars.dropMultiSelect) {
                                                return data.vars.StyleOverride;
                                            }
                                        }
                                    },
                                    Defaulthighlightvalue: {
                                        ref: "vars.Defaulthighlightvalue",
                                        translation: "Default Selected Value *",
                                        type: "string",
                                        defaultValue: " ",
                                        show: function (data) {
                                            return data.vars.Defaulthighlight;
                                        }
                                    },
                                    hiddenVar: {
                                        ref: "vars.hiddenField",
                                        type: "boolean",
                                        label: "Hidden Field? ( HidePrefix )",
                                        defaultValue: false,
                                        show: function (data) {
                                            return data.vars.Defaulthighlight;
                                        }
                                    },
                                    disableFullScreen: {
                                        ref: "disableFullScreen",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Disable Full Screen Option (press F5 after change)",
                                        defaultValue: false
                                    }
                                }
                            }
                        }
                    }
                }
            },
            /* 		snapshot: {
            			canTakeSnapshot: true
            		}, */
            paint: function ($element, layout) {

                var html = '',
                    app = qlik.currApp(),
                    btnColor = ["default", "info", "primary", "success", "warning", "danger"][layout.vars.selectedColor],
                    icons = layout.vars.iconButton,
                    vars = {
                        v: '1.0.0',
                        id: layout.qInfo.qId,
                        field: [],
                        fieldSize: [],
                        iconOnly: layout.vars.iconOnly,
                        icons: icons.split(","),
                        btnColor: btnColor,
                        btnSize: layout.vars.btnSize,
                        btnSpan: layout.vars.btnSpan,
                        oneSelected: layout.vars.Defaulthighlight,
                        dimSelected: layout.vars.Defaulthighlightvalue,
                        hiddenField: layout.vars.hiddenField,
                        dropMultiSelect: layout.vars.dropMultiSelect,
                        ListType: layout.vars.ListType,
                        styletype: layout.vars.StyleOverride,
                        disableFullScreen: layout.disableFullScreen,
                        this: this
                    },
                    $bootstrapStyle = $(document.createElement('div')).attr('id', vars.id).addClass('bootstrap_inside form-group'),
                    elemNo;
                
                if (!control.hasOwnProperty(vars.id)) {
                    control[vars.id] = 0;
                }
                
                var n = vars.id,
                    styles = vars.styletype;
                styles = styles.toLowerCase(), tempId[n] = [];

                vars.field.push(layout.qListObject.qDimensionInfo.qFallbackTitle);
                vars.fieldSize.push(layout.qListObject.qDimensionInfo.qCardinal);

//                app.getList("CurrentSelections", function (reply) {
//                    if (reply.qSelectionObject.qSelections.length === 0) {
//                        if (!vars.oneSelected) {
//                            tempId[n] = [];
//                        } else if (!vars.hiddenField && !(elemNo == undefined)) {
//                            selectFirst(elemNo);
//                        };
//                    };
//                });

                // Radio
                if (styles === 'radio') {
                    this.backendApi.eachDataRow(function (rownum, row) {
                        if (row[0].qState === 'S') {
                            var checkedstatus = 'checked';
                        } else {
                            var checkedstatus = '';
                        }
                        if (row[0].qState === 'X') {
                            var dis = 'disabled';
                        } else {
                            var dis = '';
                        };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) {
                            elemNo = row[0].qElemNumber;
                        };
                        html += '<div class="radio radio-' + vars.btnColor + ' radio-' + vars.ListType + ' ' + dis + '"><input type="radio" name=' + vars.styletype + ' id=' + vars.id + '_' + row[0].qElemNumber + ' ' + checkedstatus + ' ' + dis + '><label class="inline control-label" >' + row[0].qText + '</label></div>';
                    });
                    // Checkbox	
                } else if (styles === 'checkbox') {
                    this.backendApi.eachDataRow(function (rownum, row) {
                        if (row[0].qState === 'S') {
                            var checkedstatus = 'checked';
                        } else {
                            var checkedstatus = '';
                        }
                        if (row[0].qState === 'X') {
                            var dis = 'disabled';
                        } else {
                            var dis = '';
                        };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) {
                            elemNo = row[0].qElemNumber;
                        };

                        html += '<div class="checkbox checkbox-' + vars.btnColor + ' checkbox-' + vars.ListType + ' ' + dis + '"><input class="styled" type="checkbox" name=' + vars.styletype + ' id=' + vars.id + '_' + row[0].qElemNumber + ' ' + checkedstatus + ' ' + dis + '><label >' + row[0].qText + '</label></div>';
                    });
                    // Dropdown	
                } else if (styles === 'dropdown') {
                    if (vars.dropMultiSelect) {
                        vars.dropDownStyle = 'multiple'
                    } else {
                        vars.dropDownStyle = ''
                    };
                    html += '<row>'
                    html += '	<div class="col-md-12">';
                    html += '		<div class="form-group">';
                    html += '			<select ' + vars.dropDownStyle + ' class="form-control">';
                    this.backendApi.eachDataRow(function (rownum, row) {
                        if (row[0].qState === 'S') {
                            var active = 'lightgreen';
                            var actv = 'selected'
                        } else {
                            var active = '',
                                actv = '';
                        };
                        if (row[0].qState === 'X') {
                            var dis = 'disabled';
                        } else {
                            var dis = '';
                        };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) {
                            elemNo = row[0].qElemNumber;
                        };
                        html += '<option  id=' + vars.id + '_' + row[0].qElemNumber + ' style="background-color: ' + active + '" ' + actv + ' ' + dis + '>' + row[0].qText + '</option>';
                    });
                    html += '			</select>';
                    html += '		</div>';
                    html += '	</div>';
                    html += '</row>';

                    // Button	
                } else {
                    var rw = 0;
                    if (vars.btnSpan) {
                        var spn = 'style="width: 100%; white-space: normal;"',
                            spnBtn = 'style="width: ' + 100 / vars.fieldSize + '%; white-space: normal;"'
                    } else {
                        var spn = '',
                            spnBtn = '';
                    }
                    html += '<div class="btn-group" ' + spn + '>'
                    this.backendApi.eachDataRow(function (rownum, row) {
                        if (row[0].qState === 'S') {
                            var active = 'btn-' + vars.btnColor;
                            tempId[n].push(row[0].qElemNumber);
                        } else {
                            var active = 'btn-default';
                        };
                        if (row[0].qState === 'X') {
                            var dis = 'disabled';
                        } else {
                            var dis = '';
                        };
                        if (vars.ListType === ' ') {
                            var ListType = 'btn-block';
                        } else {
                            var ListType = '';
                        };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) {
                            elemNo = row[0].qElemNumber;
                        };
                        if (vars.iconOnly) {
                            var icon = '<i id="sel_' + row[0].qElemNumber + '" class="fa fa-' + vars.icons[rownum] + '"></i>'
                        } else {
                            var icon = row[0].qText
                        };
                        html += '<button ' + spnBtn + ' id=' + vars.id + '_' + row[0].qElemNumber + ' class="btn ' + active + ' ' + vars.btnSize + ' ' + ListType + ' text-center" type="button" title="' + row[0].qText + '" ' + dis + '>' + icon + '</button>';
                        rw += 1;
                    });
                    html += '</div>';
                };
                $bootstrapStyle.html(html);
                var form = $('<form />').append($bootstrapStyle);
                $element.html(form);

                if (vars.oneSelected && control[vars.id] === 0) {
                    tempId[n] = [];
                    selectFirst(elemNo);
                    control[vars.id]++;
                };

                function selectFirst(dim) {
                    vars.this.backendApi.clearSelections();
                    tempId[n].push(dim);
                    vars.this.backendApi.selectValues(0, [dim], false);
                };

                // Radio or Checkbox
                $('#' + vars.id + ' .' + styles).on('click', function (d) {

                    var lastChar,
                        id = this.firstChild.id,
                        lastChar = Number(id[id.length - 1]),
                        i = tempId[n].indexOf(lastChar),
                        s = $('#' + id).prop('checked');
                    if (styles === 'radio' || vars.oneSelected) {
                        tempId[n] = [lastChar];
                        vars.bool = false;
                    } else {
                        if (i > -1) {
                            tempId[n].splice(i, 1);
                        } else {
                            if (!isNaN(lastChar)) {
                                tempId[n].push(lastChar)
                            };
                        };
                        vars.bool = true;
                    }
                    tempId[n] = _.uniq(tempId[n]);
                    //console.info('Style: '+styles+ '\n' +'In array: '+i+'\n'+'Array: ' +tempId[n]+ '\n'+'Elmnt Number: ' +lastChar+ '\n'+'ID: ' +id+ '\n' +'Property Checked: '+s+ '\n'+'One Selected: ' +vars.oneSelected);
                    vars.this.backendApi.selectValues(0, tempId[n], vars.bool);
                });

                // Buttons
                $('#' + vars.id + ' button').on('click', function (d) {
                    var id = d.target.id,
                        lastChar = Number(id[id.length - 1]),
                        i = tempId[n].indexOf(lastChar);

                    if (i > -1) {
                        tempId[n].splice(i, 1);
                    } else {
                        if (!isNaN(lastChar)) {
                            tempId[n].push(lastChar)
                        };
                    }
                    if (vars.oneSelected) {
                        tempId[n] = [lastChar];
                    };
                    tempId[n] = _.uniq(tempId[n]);
                    //console.info(styles,i, tempId[n],lastChar, id, vars.oneSelected);
                    vars.this.backendApi.selectValues(0, tempId[n], false);
                });

                //Dropdown
                $('#' + vars.id + ' .form-control').change(function (d) {
                    var id = $(this).children(":selected").attr("id"),
                        lastChar = Number(id.slice(-1)),
                        i = tempId[n].indexOf(lastChar);

                    if (vars.dropMultiSelect) {
                        var dm = $('.form-control').val();
                        app.field(vars.field[0]).selectValues(dm, false);
                    } else {
                        if (i > -1) {
                            tempId[n].splice(i, 1);
                        } else {
                            if (!isNaN(lastChar)) {
                                tempId[n].push(lastChar)
                            };
                        }
                        if (vars.oneSelected) {
                            tempId[n] = [lastChar];
                            vars.bool = false
                        } else {
                            vars.bool = true
                        };
                        tempId[n] = _.uniq(tempId[n]);

                        //console.info(id,lastChar,i, tempId[n],vars.oneSelected);
                        vars.this.backendApi.selectValues(0, tempId[n], vars.bool);
                    };
                });

                // Clear Selections
                $('#clearselections').off('click.senseFieldUI-'+vars.id).on('click.senseFieldUI-'+vars.id, function () {
                    control[vars.id] = 0;
                    tempId[n] = [];
                    if (vars.oneSelected) {
                        app.field(vars.field[0]).selectMatch(vars.dimSelected, true);
                    };
                });

                // switch Full Screen option
                if (vars.disableFullScreen) {
                    // prevent multiple style elements
                    if ($('#senseFieldUI-fullScreen').length == 0) {
                        $('<style type="text/css" id="senseFieldUI-fullScreen">.qv-object-senseFieldUI .qv-object-nav a {display: none;}</style>').appendTo("head");
                    }
                }
            }
        };
    });