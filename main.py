def check():
    huskylens.request()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        iBIT.motor_stop()
        basic.show_icon(IconNames.YES)
        Red()
    elif huskylens.is_appear(2, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        iBIT.motor_stop()
        basic.show_icon(IconNames.HAPPY)
        white()
    elif huskylens.is_appear(3, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        iBIT.motor_stop()
        basic.show_icon(IconNames.DUCK)
        Blue()
def forwardToCollect():
    iBIT.set_motor(ibitMotorCH.M1, ibitMotor.FORWARD, 33)
    iBIT.set_motor(ibitMotorCH.M2, ibitMotor.FORWARD, 38)
def Collect():
    global second
    basic.pause(200)
    while second < 3:
        second += 1
        forwardToCollect()
        basic.show_number(second)
    second = 0
    iBIT.motor_stop()
    close()
    basic.show_leds("""
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        . . # . .
        """)
def white():
    iBIT.servo(ibitServo.SV1, 110)
    Collect()

def on_button_pressed_a():
    while not (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK)):
        Normforward()
    check()
input.on_button_pressed(Button.A, on_button_pressed_a)

def close():
    iBIT.servo(ibitServo.SV1, 70)
def Normforward():
    iBIT.set_motor(ibitMotorCH.M1, ibitMotor.FORWARD, 17)
    iBIT.set_motor(ibitMotorCH.M2, ibitMotor.FORWARD, 25)

def on_button_pressed_ab():
    pass
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    iBIT.servo(ibitServo.SV1, 70)
input.on_button_pressed(Button.B, on_button_pressed_b)

def Blue():
    iBIT.servo(ibitServo.SV1, 180)
    Collect()
def Red():
    iBIT.servo(ibitServo.SV1, 35)
    Collect()
second = 0
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
basic.show_icon(IconNames.GHOST)

def on_forever():
    pass
basic.forever(on_forever)
