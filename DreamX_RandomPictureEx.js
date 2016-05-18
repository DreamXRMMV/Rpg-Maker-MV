    // Parameter 1: The starting number of the pictures, ie. 1
    // Parameter 2: The ending number of the pictures, ie. 350
    // Parameter 3: The base name of the pictures, ie. "Skill"
    // Parameter 4: The ID of the picture. Appears as Number in the event command.
    // Parameter 5: Name of the picture
    // Parameter 6: Origin of the picture
    //  0 = Upper Left
    //  1 = Center
    // Parameter 7: X Position
    // Parameter 8: Y Position
    // Parameter 9: Scale X
    // Parameter 10: Scale Y
    // Parameter 11: Opacity
    // Parameter 12: Blend Mode
    //  0 = Normal
    //  1 = Additive
    //  2 = Multiply
    //  3 = Screen
MyRandomPicture = function (start, max, baseName, ID, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    // randomly select a number from start to max
    var imgNum = (Math.floor(Math.random() * max)) + start;

    // Name of the picture, don't edit this unless you know what you're doing
    var pictureName = baseName + imgNum;

    $gameScreen.showPicture(ID, pictureName, origin,
            x, y, scaleX, scaleY, opacity, blendMode);
};