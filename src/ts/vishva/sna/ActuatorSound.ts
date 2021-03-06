namespace org.ssatguru.babylonjs.vishva {


    import Mesh=BABYLON.Mesh;
    import FileInputType=org.ssatguru.babylonjs.vishva.gui.FileInputType;
    import Range=org.ssatguru.babylonjs.vishva.gui.Range;
    import Sound=BABYLON.Sound;
    import SelectType=org.ssatguru.babylonjs.vishva.gui.SelectType;

    export class ActSoundProp extends ActProperties {

        soundFile: FileInputType=new FileInputType("Sound Files","\.wav$|\.ogg$|\.mp3$",true);
        attachToMesh: boolean=false;
        maxDistance: number=100;
        rolloffFactor: number=1;
        refDistance: number=1
        distanceModel: SelectType=new SelectType();
        volume: Range=new Range(0.0,1.0,1.0,0.1);

        constructor() {
            super();
            this.distanceModel.values=["exponential","linear"];
            this.distanceModel.value="exponential";
        }
    }

    export class ActuatorSound extends ActuatorAbstract {

        sound: Sound;

        public constructor(mesh: Mesh,prop: ActSoundProp) {
            if(prop!=null) {
                super(mesh,prop);
            } else {
                super(mesh,new ActSoundProp());
            }

        }

        public actuate() {
            if(this.properties.toggle) {
                if(this.properties.state_notReversed) {
                    this.sound.play();
                } else {
                    window.setTimeout((() => {return this.onActuateEnd()}),0);
                }
                this.properties.state_notReversed=!this.properties.state_notReversed;
            } else {
                this.sound.play();
            }
        }

        /*
        update is little tricky here as sound file has to be loaded and that
        happens aynchronously
        it is not ready to play immediately
        */
        public onPropertiesChange() {
            var _props: ActSoundProp=<ActSoundProp>this.properties;
            if(_props.soundFile.value==null) return;
            let _sndOptions: Object={
                distanceModel: _props.distanceModel.value,
                rolloffFactor: _props.rolloffFactor,
                maxDistance: _props.maxDistance,
                refDistance: _props.refDistance
            };

            if(this.sound==null||_props.soundFile.value!==this.sound.name) {
                if(this.sound!=null) {
                    this.stop();
                    this.sound.dispose();
                }
                this.actuating=true;
                this.sound=new Sound(_props.soundFile.value,_props.soundFile.value,this.mesh.getScene(),
                    () => {
                        this.actuating=false;
                        if(_props.autoStart || this.queued>0) {
                            this.start(this.properties.signalId);
                        }
                    }
                    ,_sndOptions);
                this.updateSound(_props);
            } else {
                this.stop();
                this.sound.updateOptions(_sndOptions);
                this.updateSound(_props);
            }
        }

        private updateSound(properties: ActSoundProp) {
            if(properties.attachToMesh) {
                this.sound.attachToMesh(this.mesh);
            }
            this.sound.onended=() => {return this.onActuateEnd()};
            this.sound.setVolume(properties.volume.value);
            this.sound.setPosition(this.mesh.position.clone());
        }

        public getName(): string {
            return "Sound";
        }

        public stop() {
            if(this.sound!=null) {
                if(this.sound.isPlaying) {
                    this.sound.stop();
                    window.setTimeout((() => {return this.onActuateEnd()}),0);
                }
            }
        }

        public cleanUp() {
            this.sound.dispose();
        }

        public isReady(): boolean {
            return this.ready;
        }
    }

}

org.ssatguru.babylonjs.vishva.SNAManager.getSNAManager().addActuator("Sound",org.ssatguru.babylonjs.vishva.ActuatorSound);