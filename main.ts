function check () {
    huskylens.request()
    Normforward()
    if (huskylens.readeBox(ID_Red, Content1.yCenter) >= 120 || huskylens.readeBox(ID_Blue, Content1.yCenter) >= 120 || huskylens.readeBox(ID_Yellow, Content1.yCenter) >= 120 || (huskylens.readeBox(ID_White, Content1.yCenter) >= 120 || huskylens.readeBox(ID_Green, Content1.yCenter) >= 120)) {
        if (SeeCount == 0) {
            while (ms < 2) {
                ms += 1
                Backward()
                basic.showNumber(ms)
            }
            ms = 0
            iBIT.MotorStop()
            SeeCount = 1
            basic.pause(200)
        } else {
            checkColor()
            Normforward()
            iBIT.MotorStop()
            SeeCount = 0
        }
    }
}
function PlaceColorBlue () {
    backwardTodropBlue()
}
function forwardToCollect () {
    iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Forward, 29)
    iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Forward, 35)
}
function Collect () {
    basic.pause(200)
    while (ms < 3) {
        ms += 1
        forwardToCollect()
        basic.showNumber(ms)
    }
    ms = 0
    iBIT.MotorStop()
    close()
    basic.showLeds(`
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        . . # . .
        `)
}
function backwardTodropRed () {
    iBIT.Servo(ibitServo.SV1, 35)
    basic.pause(200)
    while (ms < 4) {
        ms += 1
        BackLeft()
        basic.showNumber(ms)
    }
    ms = 0
    iBIT.MotorStop()
    close()
    basic.showLeds(`
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        . . # . .
        `)
}
input.onButtonPressed(Button.A, function () {
    run = 1
})
function BackLeft () {
    iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Backward, 100)
    iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Backward, 30)
}
function backwardTodropBlue () {
    iBIT.Servo(ibitServo.SV1, 180)
    basic.pause(200)
    while (ms < 4) {
        ms += 1
        BackRight()
        basic.showNumber(ms)
    }
    ms = 0
    iBIT.MotorStop()
    close()
    basic.showLeds(`
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        . . # . .
        `)
}
function checkColor () {
    if (huskylens.readeBox(ID_Red, Content1.yCenter) >= 120) {
        iBIT.MotorStop()
        basic.showLeds(`
            # . . . #
            # . . # .
            # . # . .
            # # . . .
            . # # # #
            `)
        Red()
    } else if (huskylens.readeBox(ID_Blue, Content1.yCenter) >= 120) {
        iBIT.MotorStop()
        basic.showLeds(`
            # . . . #
            . # . . #
            . . # . #
            . . . # #
            # # # # .
            `)
        Blue()
    } else if (huskylens.readeBox(ID_Green, Content1.yCenter) >= 120 || (huskylens.readeBox(ID_White, Content1.yCenter) >= 120 || huskylens.readeBox(ID_Yellow, Content1.yCenter) >= 120)) {
        iBIT.MotorStop()
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        Other()
    } else {
        Normforward()
    }
    count += 1
}
function BackRight () {
    iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Backward, 30)
    iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Backward, 100)
}
function close () {
    iBIT.Servo(ibitServo.SV1, 70)
}
function Normforward () {
    iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Forward, 24)
    iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Forward, 28)
}
function PlaceColorRed () {
    backwardTodropRed()
}
input.onButtonPressed(Button.AB, function () {
    close()
    while (ms < 3) {
        ms += 1
        iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Forward, 88)
        iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Forward, 100)
        basic.showNumber(ms)
    }
    ms = 0
    iBIT.MotorStop()
    while (ms < 2) {
        ms += 1
        iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Backward, 40)
        iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Backward, 50)
        basic.showNumber(ms)
    }
    ms = 0
    iBIT.MotorStop()
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.No)
    iBIT.Servo(ibitServo.SV1, 70)
    run = 0
    basic.showIcon(IconNames.Yes)
})
function Other () {
    iBIT.Servo(ibitServo.SV1, 110)
    Collect()
}
function Blue () {
    iBIT.Servo(ibitServo.SV1, 180)
    Collect()
}
function Red () {
    iBIT.Servo(ibitServo.SV1, 35)
    Collect()
}
function Backward () {
    iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Backward, 22)
    iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Backward, 25)
}
let ms = 0
let SeeCount = 0
let run = 0
let ID_Green = 0
let ID_White = 0
let ID_Yellow = 0
let ID_Blue = 0
let ID_Red = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
basic.showIcon(IconNames.Ghost)
ID_Red = 3
ID_Blue = 2
ID_Yellow = 4
ID_White = 1
ID_Green = 5
run = 0
SeeCount = 0
ms = 0
let count = 0
basic.forever(function () {
    while (run == 1) {
        if (count <= 6) {
            check()
        } else {
            backwardTodropBlue()
            run = 0
        }
    }
})
