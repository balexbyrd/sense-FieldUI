# sense-FieldUI
Bootstrap Radio, Checkbox, Dropdown, or Buttons for a Dimension. Use icons for dimension values (buttons only) and use hidden variables (for changing chart dimensions dynamically)

![Screenshot](https://raw.githubusercontent.com/balexbyrd/sense-FieldUI/master/img/preview.png)
![Screenshot](https://raw.githubusercontent.com/balexbyrd/sense-FieldUI/master/img/button.png)
![Screenshot](https://raw.githubusercontent.com/balexbyrd/sense-FieldUI/master/img/checkbox.png)
![Screenshot](https://raw.githubusercontent.com/balexbyrd/sense-FieldUI/master/img/radio.png)
![Screenshot](https://raw.githubusercontent.com/balexbyrd/sense-FieldUI/master/img/dropdown.png)

Uses Bootstrap, Lodash, Awesome-bootstrap-checkbox and Font Awesome. In other words, you could say it's full of awesome.

## Installation

1. Move sense-FieldUI to the default extension folder in Qlik Sense
2. Open Qlik Sense and add the 'Field UI' extension to a sheet
3. Configure properties	
	
## Usage

This extension takes the dimension and renders values in the dimension as either Radio buttons, Checkbox, Buttons (w/ icons!), or a dropdown/multiselect form. Use bootstrap for formatting, coloring, and rendering. Font awesome for the icons and lodash for the dirty data work.

If the field is disabled, it's because that field value is not in the data model for the current selection (similar to the gray color in Qlik's default coloring).


## Limitations

1. This extension "only" pulls 10K dimension values. I don't know what the use case for even that is, but can be considered a limitation.
2. When making configuration changes, if you notice the extension not acting according to selection, refresh the webpage.
3. Radio buttons only select one value (this is the normal intended use), use a checkbox if you need to select multiple values.
4. Rending vertically and horizonally can be a challenge given the space of the window (especially buttons). 

## License

MIT

## Credits

> **Bootstrap** <http://getbootstrap.com/>

> **Lodash** <https://lodash.com/>

> **Font Awesome Icons** <http://fontawesome.io/icons/>

> **Awesome-bootstrap-checkbox** <https://github.com/flatlogic/awesome-bootstrap-checkbox>