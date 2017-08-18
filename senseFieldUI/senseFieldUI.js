var tempId = [];

define([
        "jquery",
        "js/qlik",
        "text!./css/scoped-bootstrap.css",
        "text!./css/awesome-bootstrap-checkbox.css",
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.js"
    ],

    function($, qlik, cssBoot, csscheckBox) {
        'use strict';
        var control = {};

        if (!$("style[id='bootstrap']").length > 0) {
            if (!$("link[id='bootstrap']").length > 0) {
                $('<style id="bootstrap">').html(cssBoot).appendTo('head'); // Adding scoped bootstrap to head
                $('<style>').html(csscheckBox).appendTo('head'); // Adding checkbox styles to head
                $('<script type="text/javascript" extension="senseFieldUI" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">').appendTo('body'); // Bootstrap.js CDN
            }
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
                                show: function(data) {
                                    return data.qListObjectDef && data.qListObjectDef.qLibraryId;
                                }
                            },
                            field: {
                                type: "string",
                                expression: "always",
                                expressionType: "dimension",
                                ref: "qListObjectDef.qDef.qFieldDefs.0",
                                label: "Field",
                                show: function(data) {
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
                                        show: function(data) {
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
                                        show: function(data) {
                                            if (data.vars.StyleOverride !== 'Dropdown') {
                                                return data.vars.StyleOverride;
                                            }
                                        }
                                    },
                                    btnSize: {
                                        ref: "vars.btnSize",
                                        expression: "optional",
                                        translation: "Selection Color:",
                                        translation: "Button Size:",
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
                                        show: function(data) {
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
                                        show: function(data) {
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
                                        show: function(data) {
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
                                        show: function(data) {
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
                                        show: function(data) {
                                            if (data.vars.StyleOverride === 'Dropdown') {
                                                if (!data.vars.Defaulthighlight) { return data.vars.StyleOverride };
                                            }
                                        }
                                    },
                                    dropMultiSelectSize: {
                                        ref: "vars.dropMultiSelectSize",
                                        translation: "Multiple Select box size",
                                        type: "integer",
                                        defaultValue: 7,
                                        show: function(data) {
                                            if (data.vars.dropMultiSelect === true) {
                                                return true;
                                            }
                                        }
                                    },
                                    checkboxStyle: {
                                        ref: "vars.chbxStyle",
                                        translation: "Checkbox Style",
                                        type: "string",
                                        defaultValue: " ",
                                        component: "dropdown",
                                        options: [{
                                            value: " ",
                                            label: "Square (Default)"
                                        }, {
                                            value: "checkbox-circle",
                                            label: "Circle"
                                        }],
                                        show: function(data) {
                                            if (data.vars.StyleOverride === 'Checkbox') {
                                                return data.vars.StyleOverride;
                                            }
                                        }
                                    },
                                    Defaulthighlight: {
                                        ref: "vars.Defaulthighlight",
                                        type: "boolean",
                                        label: "Always One Selected value",
                                        defaultValue: false,
                                        show: function(data) {
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
                                        show: function(data) {
                                            return data.vars.Defaulthighlight;
                                        }
                                    },
                                    hiddenVar: {
                                        ref: "vars.hiddenField",
                                        type: "boolean",
                                        label: "Hidden Field? ( HidePrefix )",
                                        defaultValue: false,
                                        show: function(data) {
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
            paint: function($element, layout) {
                //$element.empty();

                var html = '',
                    app = qlik.currApp(),
                    btnColor = ["default", "info", "primary", "success", "warning", "danger"][layout.vars.selectedColor],
                    icons = layout.vars.iconButton,
                    vars = {
                        v: '1.0.0',
                        id: layout.qInfo.qId,
                        field: [],
                        fieldSize: [],
                        control: layout.qInfo.qId + control,
                        iconOnly: layout.vars.iconOnly,
                        icons: icons.split(","),
                        btnColor: btnColor,
                        btnSize: layout.vars.btnSize,
                        btnSpan: layout.vars.btnSpan,
                        oneSelected: layout.vars.Defaulthighlight,
                        chbxStyle: layout.vars.chbxStyle,
                        dimSelected: layout.vars.Defaulthighlightvalue,
                        hiddenField: layout.vars.hiddenField,
                        dropMultiSelect: layout.vars.dropMultiSelect,
                        ListType: layout.vars.ListType,
                        styletype: layout.vars.StyleOverride,
                        disableFullScreen: layout.disableFullScreen,
                        mSize: layout.vars.dropMultiSelectSize,
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

                // Radio
                if (styles === 'radio') {
                    this.backendApi.eachDataRow(function(rownum, row) {
                        if (row[0].qState === 'S') { var checkedstatus = 'checked'; } else { var checkedstatus = ''; }
                        if (row[0].qState === 'S') { var checkedstatus = 'checked'; } else { var checkedstatus = ''; };
                        if (row[0].qState === 'X') { var dis = 'disabled'; } else { var dis = ''; };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) { elemNo = row[0].qElemNumber; };

                        html += '<div class="radio radio-' + vars.btnColor + ' radio-' + vars.ListType + ' ' + dis + '"><input type="radio"  name="' + n + '_' + styles + '" id=' + n + '_' + row[0].qElemNumber + ' ' + checkedstatus + ' ' + dis + '><label class="inline control-label" >' + row[0].qText + '</label></div>';
                    });
                    // Checkbox	
                } else if (styles === 'checkbox') {
                    this.backendApi.eachDataRow(function(rownum, row) {
                        if (row[0].qState === 'S') { var checkedstatus = 'checked'; } else { var checkedstatus = ''; }
                        if (row[0].qState === 'X') { var dis = 'disabled'; } else { var dis = ''; };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) { elemNo = row[0].qElemNumber; };

                        html += '<div class="checkbox ' + vars.chbxStyle + ' checkbox-' + vars.btnColor + ' checkbox-' + vars.ListType + ' ' + dis + '"><input class="styled" type="checkbox" id=' + n + '_' + row[0].qElemNumber + ' ' + checkedstatus + ' ' + dis + '><label >' + row[0].qText + '</label></div>';
                    });
                    // Dropdown	
                } else if (styles === 'dropdown') {

                    if (vars.dropMultiSelect) { vars.dropDownStyle = 'multiple size="' + vars.mSize + '"' } else { vars.dropDownStyle = '' };
                    html += '<row>'
                    html += '	<div class="col-md-12">';
                    html += '		<div class="form-group">';
                    html += '			<select ' + vars.dropDownStyle + ' class="form-control">';
                    html += '			    <option selected disabled>Nothing selected</option>';
                    this.backendApi.eachDataRow(function(rownum, row) {
                        if (row[0].qState === 'S') { var active = 'lightgreen'; var actv = 'selected' } else {
                            var active = '',
                                actv = '';
                        };
                        if (row[0].qState === 'X') { var dis = 'disabled'; } else { var dis = ''; };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) { elemNo = row[0].qElemNumber; };
                        html += '<option  id=' + n + '_' + row[0].qElemNumber + ' style="background-color: ' + active + '" ' + actv + ' ' + dis + '>' + row[0].qText + '</option>';
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
                    this.backendApi.eachDataRow(function(rownum, row) {
                        if (row[0].qState === 'X') { var dis = 'disabled'; } else { var dis = ''; };
                        if (row[0].qState === 'S') {
                            var active = 'btn-' + vars.btnColor;
                            tempId[n].push(row[0].qElemNumber);
                        } else { var active = 'btn-default'; };

                        if (vars.ListType === ' ') { var ListType = 'btn-block'; } else { var ListType = ''; };
                        if (vars.oneSelected && row[0].qText === vars.dimSelected) { elemNo = row[0].qElemNumber; };
                        if (vars.iconOnly) { var icon = '<i id="sel_' + row[0].qElemNumber + '" class="fa fa-' + vars.icons[rownum] + '"></i>' } else { var icon = row[0].qText };
                        html += '<button ' + spnBtn + ' id=' + vars.id + '_' + row[0].qElemNumber + ' class="btn ' + active + ' ' + vars.btnSize + ' ' + ListType + ' text-center" type="button" title="' + row[0].qText + '" ' + dis + '>' + icon + '</button>';
                        rw += 1;
                    });
                    html += '</div>';
                };
                $bootstrapStyle.html(html);
                $element.html($bootstrapStyle);

                if (vars.oneSelected && control[vars.id] === 0) { //
                    tempId[n] = [];
                    control[vars.id]++;
                    selectFirst(elemNo);
                };

                function selectFirst(dim) {
                    vars.this.backendApi.clearSelections();
                    tempId[n].push(dim);
                    app.field(vars.field[0]).selectMatch(vars.dimSelected, false);
                };

                // Radio or Checkbox
                $('#' + n + ' .' + styles).on('click', function(d) {

                    var id = this.firstChild.id,
                        lastChar = Number(id.split('_')[1]),
                        i = tempId[n].indexOf(lastChar),
                        s = $('#' + vars.id + ' #' + id).prop('checked');

                    if (styles === 'radio' || vars.oneSelected) {
                        tempId[n] = [lastChar];
                        vars.bool = false;
                    } else {
                        if (i > -1) {
                            tempId[n].splice(i, 1);
                        } else {
                            if (!isNaN(lastChar)) { tempId[n].push(lastChar) };
                        };
                        vars.bool = true;
                    }
                    tempId[n] = _.uniq(tempId[n]);

                    if (!vars.oneSelected) {
                        vars.this.backendApi.selectValues(0, tempId[n], vars.bool);
                    } else {
                        if (vars.dimSelected !== $(this)[0].textContent) {
                            vars.this.backendApi.selectValues(0, tempId[n], vars.bool);

                        }
                    }
                });

                // Buttons
                $('#' + vars.id + ' button').on('click', function(d) {
                    var id = d.target.id,
                        lastChar = Number(id.split('_')[1]),
                        i = tempId[n].indexOf(lastChar),
                        before = tempId[n][0];

                    if (i > -1) {
                        tempId[n].splice(i, 1);
                    } else {
                        if (!isNaN(lastChar)) { tempId[n].push(lastChar) };
                    }
                    if (vars.oneSelected) { tempId[n] = [lastChar]; };
                    tempId[n] = _.uniq(tempId[n]);

                    if (!vars.oneSelected) {
                        vars.this.backendApi.selectValues(0, tempId[n], false);
                    } else {
                        var t = d.target.innerText || d.currentTarget.title;
                        if (vars.dimSelected !== t && before !== tempId[n][0]) {
                            vars.this.backendApi.selectValues(0, tempId[n], false);
                        } else {
                            app.field(vars.field[0]).selectMatch(vars.dimSelected, false);
                        }
                    }

                });

                //Dropdown
                $('#' + vars.id + ' .form-control').change(function(d) {
                    var id = $(this).children(":selected").attr("id"),
                        lastChar = Number(id.split('_')[1]),
                        i = tempId[n].indexOf(lastChar);

                    if (vars.dropMultiSelect) {
                        var dm = $('.form-control').val();
                        app.field(vars.field[0]).selectValues(dm, true);
                    } else {
                        if (i > -1) {
                            tempId[n].splice(i, 1);
                        } else {
                            if (!isNaN(lastChar)) { tempId[n].push(lastChar) };
                        }
                        if (vars.oneSelected) {
                            tempId[n] = [lastChar];
                            vars.bool = false
                        } else { vars.bool = true };

                        tempId[n] = _.uniq(tempId[n]);
                        vars.this.backendApi.selectValues(0, tempId[n], vars.bool);
                    };
                });

                // Clear Selections
                $('#clearselections').off('click.senseFieldUI-' + vars.id).on('click.senseFieldUI-' + vars.id, function() {
                    control[vars.id] = 0;
                    tempId[n] = [];
                    if (vars.oneSelected) {
                        app.field(vars.field[0]).selectMatch(vars.dimSelected, true);
                    };
                });

                // switch Full Screen option
                if (vars.disableFullScreen) {
                    if ($('#senseFieldUI-fullScreen').length == 0) {
                        $('<style type="text/css" id="senseFieldUI-fullScreen">.qv-object-senseFieldUI .qv-object-nav a {display: none;}</style>').appendTo("head");
                    }
                }
            }
        };
    });