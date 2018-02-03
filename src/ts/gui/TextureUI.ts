namespace org.ssatguru.babylonjs.vishva.gui {
    /**
     * Provides a UI to manage texture of a material
     * TODO : should be closed or refreshed when mesh switched or deselected
     * TODO : should create new texture if no current texture set
     */
    export class TextureUI {

        private _vishva: Vishva;
        private _textureDiag: VDialog;
        private _textureImg: HTMLImageElement;
        private _textIDEle: HTMLElement;
        private _textType: HTMLElement;
        private _textImgSrc: HTMLElement;
        
        //TODo need to set the initial values
        private _matHScale: HTMLInputElement;
        private _matVScale: HTMLInputElement;
        private _matRot: HTMLInputElement;
        private _matHO: HTMLInputElement;
        private _matVO: HTMLInputElement;
        
        private _matID: string;
        private _matTextImg: HTMLImageElement;
        private _textName:string;
        private _textID:string;

        constructor(vishva: Vishva) {
            this._vishva=vishva;

            this._textureDiag=new VDialog("textureDiag","Texture",DialogMgr.centerBottom);

            this._textureImg=<HTMLImageElement>document.getElementById("textImg");
            this._textIDEle=document.getElementById("textID");
            this._textType=document.getElementById("textType");
            this._textImgSrc=document.getElementById("textImgSrc");
            this._matHScale=<HTMLInputElement>document.getElementById("matHScale");
            this._matHScale.onchange=() => {
                this._vishva.setTextHScale(this._textID,Number(this._matHScale.value));
            }
            this._matVScale=<HTMLInputElement>document.getElementById("matVScale");
            this._matVScale.onchange=() => {
                this._vishva.setTextVScale(this._textID,Number(this._matVScale.value));
            }
            this._matRot=<HTMLInputElement>document.getElementById("matRot");
            this._matRot.oninput=() => {
                this._vishva.setTextRot(this._textID,Number(this._matRot.value));
            }
            this._matHO=<HTMLInputElement>document.getElementById("matHO");
            this._matHO.oninput=() => {
                this._vishva.setTextHO(this._textID,Number(this._matHO.value));
            }
            this._matVO=<HTMLInputElement>document.getElementById("matVO");
            this._matVO.oninput=() => {
                this._vishva.setTextVO(this._textID,Number(this._matVO.value));
            }


            let chgTexture: HTMLButtonElement=<HTMLButtonElement>document.getElementById("changeTexture");
            chgTexture.onclick=() => {
                let imgsrc: string=textList.value;
                //this._vishva.setMatTexture(this._matID,this._textType.innerText,imgsrc);
                this._vishva.setTextURL(this._textID,imgsrc);
                if(textList.value.indexOf(".tga")>=0) {
                    imgsrc=this._vishva.TGA_IMAGE;
                } else {
                    this._textureImg.src=imgsrc;
                    this._matTextImg.src=imgsrc;
                    this._textName=imgsrc;
                    this._textImgSrc.innerText=imgsrc;
                }
            }
            let textList: HTMLSelectElement=<HTMLSelectElement>document.getElementById("textureList");
            var textures: string[]=this._vishva.getTextures();
            GuiUtils.PopulateSelect(textList,textures);
            
        }
        
        public open(){
            this._textureDiag.open();
        }
        
        public setParms(textID:string,textName:string, textType:string,matdId: string,matTextImg: HTMLImageElement){
            this._textID=textID;
            this._textIDEle.innerText=textID;
            this._textName=textName;
            this._textImgSrc.innerText=textName;
            this._textType.innerText=textType;
            this._matID=matdId;
            this._matTextImg=matTextImg;
            this._textureImg.src=this._matTextImg.src;
        }
    }

}
