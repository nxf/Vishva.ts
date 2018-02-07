namespace org.ssatguru.babylonjs.vishva.gui {
    import AbstractMesh=BABYLON.AbstractMesh;
    /**
     * Provides a UI to add item to the world
     */
    export class AddItemUI2 {

        private _vishva: Vishva;
        private _assetTree: VTree;
        private _assetDiag: VDialog;

        constructor(vishva: Vishva) {
            this._vishva=vishva;
            this._assetTree=new VTree("assetList",this._vishva.vishvaFiles,"\.babylon$|\.glb$");
            this._assetTree.addClickListener((f,p,l) => {if (l) this.loadAsset(f,p);});
            this._assetDiag=new VDialog("addItemsDiv2","Assets",DialogMgr.leftCenter,300);
            this._assetDiag.setResizable(true);
            
            let fi: HTMLInputElement=<HTMLInputElement>document.getElementById("srchInp");
            let fb: HTMLElement=document.getElementById("srchBtn");
            fb.onclick=()=>{
                this._assetTree.filter(fi.value.trim());
            }
            
            let e: HTMLElement=document.getElementById("expandAll");
            let c: HTMLElement=document.getElementById("collapseAll");
            
            e.onclick=()=>{
                this._assetTree.expandAll();
            }
            c.onclick=()=>{
                this._assetTree.collapseAll();
            }
        }

        private loadAsset(file: string,path: string) {
            //console.log(path+file);
            this._vishva.loadAsset2(path,file);
        }

        public toggle() {
            if(this._assetDiag.isOpen()) {
                this._assetDiag.close();
            } else {
                this._assetDiag.open();
            }
        }


    }
}