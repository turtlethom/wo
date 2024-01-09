const getRandomColor = (colorsInUse) => {
    // Separated To Control Colors
    // Potentially use `secondaryHueValues` For More Possible Words
    const mainHueValues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];  // 12 possible colors
    // const secondaryHueValues = [15, 45, 75, 105, 135, 165, 195, 225, 255];

    // const allHueValues = [...mainHueValues, ...secondaryHueValues]
    const saturation = 100;
    const lightness = 50;
    const alpha = 0.7;  // More adjustable, but

    let hue = mainHueValues[Math.floor(Math.random() * mainHueValues.length)];
    let color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

    // Ensure that the color is not reused
    while (colorsInUse.has(color)) {
        hue = mainHueValues[Math.floor(Math.random() * mainHueValues.length)];
        color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }

    colorsInUse.add(color);

    return color;
};

export default getRandomColor;