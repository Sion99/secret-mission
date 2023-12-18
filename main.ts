let spacePlane = sprites.create(img`
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
`, SpriteKind.Player)
spacePlane.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let dart = sprites.createProjectileFromSprite(img`
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
    `, spacePlane, 0, -200)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
game.onUpdateInterval(500, function on_update_interval() {
    let bogey = sprites.create(img`
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
    `, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.left = scene.screenWidth()
    bogey.y = Math.trunc(randint(0, scene.screenHeight()))
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
