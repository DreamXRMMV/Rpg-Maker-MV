MyRandomPicture = function () {
    // the last number in the set
    // edit this as you need
    var max = 350;

    // the first number in the set
    // edit this as you need
    var start = 1;

    // the name before the number
    // edit this as you need
    var baseName = "Skill";

    // randomly select a number from start to max
    var imgNum = (Math.floor(Math.random() * max)) + start;

    // parameter variables, edit them as appropriate
    // 
    // The ID of the picture. Appears as Number in the event command.
    var ID = 1;
    // Name of the picture, don't edit this unless you know what you're doing
    var pictureName = baseName + imgNum;
    // origin of the picture
    //  0 = Upper Left
    //  1 = Center
    var origin = 1;
    // X position
    var x = 0;
    // Y Position
    var y = 00;
    // Scale X (Width)
    var scaleX = 1;
    // Scale Y (Height)
    var scaleY = 1;
    // Opacity from 0 to 255
    var opacity = 255;
    // Blend Mode
    //  0 = Normal
    //  1 = Additive
    //  2 = Multiply
    //  3 = Screen
    $gameScreen.showPi
    var blendMode = 0;

    // Parameter 1: The ID of the picture. Appears as Number in the event command.
    // Parameter 2: Name of the picture
    // Parameter 3: Origin of the picture
    //  0 = Upper Left
    //  1 = Center
    // Parameter 4: X Position
    // Parameter 5: Y Position
    // Parameter 6: Scale X
    // Parameter 7: Scale Y
    // Parameter 8: Opacity
    // Parameter 9: Blend Mode
    //  0 = Normal
    //  1 = Additive
    //  2 = Multiply
    //  3 = Screen
    $gameScreen.showPicture(ID, pictureName, origin,
            x, y, scaleX, scaleY, opacity, blendMode);
};