const color = require("color");

const project_palette = {
    primary_color: "#ff145a",
    secondary_color: "#ff001b",
    terciary_color: "#1e88e5"
};

project_palette.darker_primary_color = color(project_palette.primary_color).darken(0.2);
project_palette.darker_secondary_color = color(project_palette.secondary_color).darken(0.2);
project_palette.darker_terciary_color = color(project_palette.terciary_color).darken(0.2);

module.exports = project_palette;