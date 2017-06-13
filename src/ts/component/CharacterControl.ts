
namespace org.ssatguru.babylonjs.component {

    import Skeleton = BABYLON.Skeleton;
    import ArcRotateCamera = BABYLON.ArcRotateCamera;
    import Vector3 = BABYLON.Vector3;
    import Mesh = BABYLON.Mesh;

    export class CharacterControl {

        avatarSkeleton: Skeleton;
        camera: ArcRotateCamera;
        avatar: Mesh;
        key: Key;

        constructor(avatar: Mesh, avatarSkeleton: Skeleton, anims: AnimData[], camera: ArcRotateCamera) {

            this.avatarSkeleton = avatarSkeleton;
            this.initAnims(anims);
            this.camera = camera;
            this.avatar = avatar;

            this.key = new Key();

            window.addEventListener("keydown", (e) => { return this.onKeyDown(e) }, false);
            window.addEventListener("keyup", (e) => { return this.onKeyUp(e) }, false);
        }

        public setAvatar(avatar: Mesh) {
            this.avatar = avatar;
        }

        public setAvatarSkeleton(avatarSkeleton: Skeleton) {
            this.avatarSkeleton = avatarSkeleton;
        }

        public setAnims(anims: AnimData[]) {
            this.initAnims(anims);
        }

        walk: AnimData;
        walkBack: AnimData;
        idle: AnimData;
        run: AnimData;
        jump: AnimData;
        turnLeft: AnimData;
        turnRight: AnimData;
        strafeLeft: AnimData;
        strafeRight: AnimData;

        private initAnims(anims: AnimData[]) {
            this.walk = anims[0];
            this.walkBack = anims[1];
            this.idle = anims[2];
            this.run = anims[3];
            this.jump = anims[4];
            this.turnLeft = anims[5];
            this.turnRight = anims[6];
            this.strafeLeft = anims[7];
            this.strafeRight = anims[8];
        }

        avatarSpeed: number = 0.05;
        prevAnim: AnimData = null;

        private jumpCycleMax: number = 25;
        private jumpCycle: number = this.jumpCycleMax;
        private wasJumping: boolean = false;

        public moveAVandCamera(): boolean {
            //skip everything if no movement key pressed
            if (!this.move) {
                if (this.prevAnim != this.idle) {
                    this.prevAnim = this.idle
                    if (this.idle.exist)
                        this.avatarSkeleton.beginAnimation(this.idle.name, true, this.idle.r);
                }
                return false;
            }
            var anim: AnimData = this.idle;
            var moving: boolean = false;
            var speed: number = 0;
            var upSpeed: number = 0.05;
            var dir: number = 1;
            var forward: Vector3;
            var backwards: Vector3;
            var stepLeft: Vector3;
            var stepRight: Vector3;
            var up: Vector3;
            if (this.key.up) {
                if (this.key.shift) {
                    speed = this.avatarSpeed * 2;
                    anim = this.run;
                } else {
                    speed = this.avatarSpeed;
                    anim = this.walk;
                }
                if (this.key.jump) {
                    this.wasJumping = true;
                }
                if (this.wasJumping) {
                    upSpeed *= 2;
                    if (this.jumpCycle < this.jumpCycleMax / 2) {
                        dir = 1;
                        if (this.jumpCycle < 0) {
                            this.jumpCycle = this.jumpCycleMax;
                            upSpeed /= 2;
                            this.key.jump = false;
                            this.wasJumping = false;
                        }
                    } else {
                        anim = this.jump;
                        dir = -1;
                    }
                    this.jumpCycle--;
                }
                //TODO testing physics
                forward = this.avatar.calcMovePOV(0, -upSpeed * dir, speed);
                this.avatar.moveWithCollisions(forward);
                //this.avatar.physicsImpostor.applyForce(new BABYLON.Vector3(0, 0, 1), this.avatar.getAbsolutePosition());
                moving = true;
            } else if (this.key.down) {
                backwards = this.avatar.calcMovePOV(0, -upSpeed * dir, -this.avatarSpeed / 2);
                this.avatar.moveWithCollisions(backwards);
                moving = true;
                anim = this.walkBack;
                if (this.key.jump) this.key.jump = false;
            } else if (this.key.stepLeft) {
                anim = this.strafeLeft;
                stepLeft = this.avatar.calcMovePOV(-this.avatarSpeed / 2, -upSpeed * dir, 0);
                this.avatar.moveWithCollisions(stepLeft);
                moving = true;
            } else if (this.key.stepRight) {
                anim = this.strafeRight;
                stepRight = this.avatar.calcMovePOV(this.avatarSpeed / 2, -upSpeed * dir, 0);
                this.avatar.moveWithCollisions(stepRight);
                moving = true;
            }
            if (!moving) {
                if (this.key.jump) {
                    this.wasJumping = true;
                }
                if (this.wasJumping) {
                    upSpeed *= 2;
                    if (this.jumpCycle < this.jumpCycleMax / 2) {
                        dir = 1;
                        if (this.jumpCycle < 0) {
                            this.jumpCycle = this.jumpCycleMax;
                            upSpeed /= 2;
                            this.key.jump = false;
                            this.wasJumping = false;
                        }
                    } else {
                        anim = this.jump;
                        dir = -1;
                    }
                    this.jumpCycle--;
                } else dir = dir / 2;
                this.avatar.moveWithCollisions(new Vector3(0, -upSpeed * dir, 0));
            }
            if (!this.key.stepLeft && !this.key.stepRight) {
                if (this.key.left) {
                    this.camera.alpha = this.camera.alpha + 0.022;
                    if (!moving) {
                        this.avatar.rotation.y = -4.69 - this.camera.alpha;
                        anim = this.turnLeft;
                    }
                } else if (this.key.right) {
                    this.camera.alpha = this.camera.alpha - 0.022;
                    if (!moving) {
                        this.avatar.rotation.y = -4.69 - this.camera.alpha;
                        anim = this.turnRight;
                    }
                }
            }
            if (moving) {
                this.avatar.rotation.y = -4.69 - this.camera.alpha;
            }
            if (this.prevAnim !== anim) {
                if (anim.exist) {
                    this.avatarSkeleton.beginAnimation(anim.name, true, anim.r);
                }
                this.prevAnim = anim;
            }

            this.camera.target = new Vector3(this.avatar.position.x, (this.avatar.position.y + 1.5), this.avatar.position.z);
            return true;
        }

        move:boolean = false;
        private onKeyDown(e: Event) {

            var event: KeyboardEvent = <KeyboardEvent>e;
            var chr: string = String.fromCharCode(event.keyCode);

            if (event.keyCode === 32) this.key.jump = false; 
            else if (event.keyCode === 16) this.key.shift = true;
            //WASD or arrow keys
            else if ((chr === "W") || (event.keyCode === 38)) this.key.up = true;
            else if ((chr === "A") || (event.keyCode === 37)) this.key.left = true;
            else if ((chr === "D") || (event.keyCode === 39)) this.key.right = true;
            else if ((chr === "S") || (event.keyCode === 40)) this.key.down = true;
            else if (chr === "Q") this.key.stepLeft = true;
            else if (chr === "E") this.key.stepRight = true;
            this.move = this.anyMovement();
        }

        public anyMovement(): boolean {
            if (this.key.up || this.key.down || this.key.left || this.key.right || this.key.stepLeft || this.key.stepRight || this.key.jump){
                return true;
            }else{
                return false;
            }
        }

        private onKeyUp(e: Event) {

            var event: KeyboardEvent = <KeyboardEvent>e;
            var chr: string = String.fromCharCode(event.keyCode);

            if (event.keyCode === 32) this.key.jump = true
            else if (event.keyCode === 16) { this.key.shift = false; }
             //WASD or arrow keys
            else if ((chr === "W") || (event.keyCode === 38)) this.key.up = false;
            else if ((chr === "A") || (event.keyCode === 37)) this.key.left = false;
            else if ((chr === "D") || (event.keyCode === 39)) this.key.right = false;
            else if ((chr === "S") || (event.keyCode === 40)) this.key.down = false;
            else if (chr === "Q") this.key.stepLeft = false;
            else if (chr === "E") this.key.stepRight = false;
            
            this.move = this.anyMovement();
        }
    }

    export class AnimData {

        public name: string;
        //start
        public s: number;
        //end
        public e: number;
        //rate
        public r: number;
        public exist: boolean = false;

        public constructor(name: string, s: number, e: number, d: number) {
            this.s = 0;
            this.e = 0;
            this.r = 0;
            this.name = name;
            this.s = s;
            this.e = e;
            this.r = d;
        }
    }

    export class Key {
        public up: boolean;

        public down: boolean;

        public right: boolean;

        public left: boolean;

        public stepRight: boolean;

        public stepLeft: boolean;

        public jump: boolean;

        public shift: boolean;

        public trans: boolean;

        public rot: boolean;

        public scale: boolean;

        public esc: boolean;

        public ctl: boolean;

        public focus: boolean;

        constructor() {
            this.up = false;
            this.down = false;
            this.right = false;
            this.left = false;
            this.stepRight = false;
            this.stepLeft = false;
            this.jump = false;
            this.shift = false;
            this.trans = false;
            this.rot = false;
            this.scale = false;
            this.esc = false;
            this.ctl = false;
            this.focus = false;
        }
    }
}
