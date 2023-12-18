spacePlane = sprites.create(img("""
        . . . . . . f f f f . . . . . .
            . . . . f f f 2 2 f f f . . . .
            . . . f f f 2 2 2 2 f f f . . .
            . . f f f e e e e e e f f f . .
            . . f f e 2 2 2 2 2 2 e e f . .
            . . f e 2 f f f f f f 2 e f . .
            . . f f f f e e e e f f f f . .
            . f f e f b f 4 4 f b f e f f .
            . f e e 4 1 f d d f 1 4 e e f .
            . . f e e d d d d d d e e f . .
            . . . f e e 4 4 4 4 e e f . . .
            . . e 4 f 2 2 2 2 2 2 f 4 e . .
            . . 4 d f 2 2 2 2 2 2 f d 4 . .
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
            . . . . . f f f f f f . . . . .
            . . . . . f f . . f f . . . . .
"""), SpriteKind.player)

spacePlane.set_stay_in_screen(True)


info.set_life(3)

controller.move_sprite(spacePlane, 200, 200)

def on_a_pressed():
    dart = sprites.create_projectile_from_sprite(img("""
           . . . . . . . . 8 . . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . 8 8 8 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """), spacePlane, 0, -200)
    music.play(music.melody_playable(music.pew_pew),
        music.PlaybackMode.UNTIL_DONE)


controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_update_interval():
    bogey = sprites.create(img("""
        . . . . . . c c c c c c c . . . 
            . . . . . c f f 6 6 f f 7 c . . 
            . . . . c 7 6 6 6 6 6 6 7 6 c . 
            . . . c 7 7 7 7 7 7 7 7 7 7 c . 
            . . . c 7 8 1 f f 1 6 7 7 7 c . 
            . . . f 6 f 1 f f 1 f 7 7 7 f . 
            . . . f 6 f 2 2 2 2 f 7 7 7 f . 
            . . c c 6 f 2 2 2 2 f 7 7 6 f . 
            . c 7 7 7 7 2 2 2 2 7 7 f c . . 
            c 7 1 1 1 7 7 7 7 7 c c 7 7 c . 
            f 1 1 1 1 1 7 7 7 f c 6 7 7 7 c 
            f 1 1 1 1 1 1 6 f c c 6 6 6 c c 
            f 6 1 1 1 1 1 6 6 c 6 6 6 c . . 
            f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
            . f 6 1 1 1 1 6 6 6 6 6 c . . . 
            . . f f c c c c c c c c . . . .
    """), SpriteKind.enemy)
    bogey.set_velocity(-100, 0)
    bogey.left = scene.screen_width()
    bogey.y = int(randint(0, scene.screen_height()))
    bogey.set_flag(SpriteFlag.AUTO_DESTROY, True)

game.on_update_interval(500, on_update_interval)
    
def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)

sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)

sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)